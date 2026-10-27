import { cacheLife } from "next/cache";

export type WikiInfo = {
  enTitle: string;
  enUrl: string;
  enDescription?: string;
  zhTitle?: string;
  zhUrl?: string;
  extract?: string;
  thumbnail?: string;
  updatedAt?: string;
  deceased?: boolean;
};

const UA = { "User-Agent": "AsianLeadersAlliance/1.0 (directory site)" };
const BATCH = 20; // extracts 在 exintro 模式下单次最多 20 条

type ApiPage = {
  title: string;
  missing?: boolean;
  extract?: string;
  description?: string;
  thumbnail?: { source: string };
  revisions?: { timestamp: string }[];
  langlinks?: { lang: string; title: string }[];
  varianttitles?: Record<string, string>;
};

type ApiResponse = {
  query?: {
    pages?: ApiPage[];
    redirects?: { from: string; to: string }[];
    normalized?: { from: string; to: string }[];
  };
};

async function query(lang: "en" | "zh", titles: string[], params: Record<string, string>) {
  const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
  const search = {
    action: "query",
    format: "json",
    formatversion: "2",
    redirects: "1",
    titles: titles.join("|"),
    ...params,
  };
  for (const [k, v] of Object.entries(search)) url.searchParams.set(k, v);

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: UA });
    if (res.ok) return (await res.json()) as ApiResponse;
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }
  return {} as ApiResponse;
}

// 把请求标题映射到最终页面（处理规范化与重定向）
function resolve(data: ApiResponse, titles: string[]) {
  const alias = new Map<string, string>();
  for (const n of data.query?.normalized ?? []) alias.set(n.from, n.to);
  for (const r of data.query?.redirects ?? []) alias.set(r.from, r.to);
  const pages = new Map((data.query?.pages ?? []).map((p) => [p.title, p]));
  const out = new Map<string, ApiPage>();
  for (const t of titles) {
    let key = t;
    for (let i = 0; i < 3 && alias.has(key); i++) key = alias.get(key)!;
    const page = pages.get(key);
    if (page && !page.missing) out.set(t, page);
  }
  return out;
}

const pageUrl = (lang: string, title: string) =>
  `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;

export async function getWikiInfo(titles: string[]): Promise<Record<string, WikiInfo>> {
  "use cache";
  cacheLife("days");

  const unique = [...new Set(titles)];
  const result: Record<string, WikiInfo> = {};

  for (let i = 0; i < unique.length; i += BATCH) {
    const chunk = unique.slice(i, i + BATCH);
    const en = resolve(
      await query("en", chunk, {
        prop: "extracts|pageimages|description|revisions|langlinks",
        exintro: "1",
        explaintext: "1",
        exsentences: "2",
        exlimit: "max",
        piprop: "thumbnail",
        pithumbsize: "320",
        pilimit: "max",
        rvprop: "timestamp",
        lllang: "zh",
        lllimit: "max",
      }),
      chunk,
    );

    const zhTitles = [...en.values()]
      .map((p) => p.langlinks?.find((l) => l.lang === "zh")?.title)
      .filter((t): t is string => Boolean(t));
    const zh = zhTitles.length
      ? resolve(
          await query("zh", zhTitles, {
            prop: "extracts|info|revisions",
            exintro: "1",
            explaintext: "1",
            exsentences: "2",
            exlimit: "max",
            inprop: "varianttitles",
            rvprop: "timestamp",
            variant: "zh-cn",
          }),
          zhTitles,
        )
      : new Map<string, ApiPage>();

    for (const t of chunk) {
      const page = en.get(t);
      if (!page) continue;
      const zhLink = page.langlinks?.find((l) => l.lang === "zh")?.title;
      const zhPage = zhLink ? zh.get(zhLink) : undefined;
      const times = [page.revisions?.[0]?.timestamp, zhPage?.revisions?.[0]?.timestamp].filter(
        (x): x is string => Boolean(x),
      );
      result[t] = {
        enTitle: page.title,
        enUrl: pageUrl("en", page.title),
        enDescription: page.description,
        // 去掉消歧义后缀，如「袁征 (企业家)」
        zhTitle: zhPage ? (zhPage.varianttitles?.["zh-cn"] ?? zhPage.title).replace(/\s*[（(][^）)]*[）)]$/, "") : undefined,
        zhUrl: zhPage ? pageUrl("zh", zhPage.title) : undefined,
        extract: zhPage?.extract?.trim() || page.extract?.trim(),
        thumbnail: page.thumbnail?.source,
        updatedAt: times.sort().at(-1),
        // 维基描述中的 "(1922–2025)" 形式表示生卒年
        deceased: /\(\d{3,4}\s*[–-]\s*\d{3,4}\)/.test(page.description ?? ""),
      };
    }
  }

  return result;
}
