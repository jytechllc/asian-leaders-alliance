import type { Metadata } from "next";
import { formatDate } from "@/components/leader-card";
import { forbes2022, leaders } from "@/data/leaders";
import { getWikiInfo } from "@/lib/wiki";

export const metadata: Metadata = { title: "维基动态" };

export default async function Updates() {
  const names = new Map<string, string>();
  for (const l of leaders) if (l.wiki) names.set(l.wiki, l.name);
  for (const f of forbes2022) if (f.wiki && !names.has(f.wiki)) names.set(f.wiki, f.name);

  const wiki = await getWikiInfo([...names.keys()]);
  const rows = [...names]
    .map(([title, name]) => ({ name, info: wiki[title] }))
    .filter((r) => r.info?.updatedAt)
    .sort((a, b) => b.info!.updatedAt!.localeCompare(a.info!.updatedAt!));
  const missing = [...names].filter(([t]) => !wiki[t]).map(([, n]) => n);

  return (
    <>
      <section className="max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-accent">WIKIPEDIA TRACKER</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight">维基动态</h1>
        <p className="mt-4 leading-relaxed text-muted">
          名人录中有维基百科条目的人物，按条目最近一次编辑时间排序（中英文条目取较新者）。条目近期有改动，往往意味着人物有新动态：任职变化、新的荣誉或重大事件，值得核对名人录信息是否需要更新。
        </p>
      </section>

      <ol className="mt-10 divide-y divide-line rounded-xl border border-line bg-card">
        {rows.map(({ name, info }) => (
          <li key={info!.enTitle} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
            <time className="w-24 shrink-0 text-sm tabular-nums text-muted">{formatDate(info!.updatedAt)}</time>
            <div className="min-w-0 flex-1">
              <span className="font-medium">{name}</span>
              {info!.zhTitle && <span className="ml-2 text-sm text-muted">{info!.zhTitle}</span>}
              {info!.deceased && <span className="ml-2 rounded bg-ink/10 px-1.5 py-0.5 text-xs text-muted">已故</span>}
              {info!.enDescription && <p className="truncate text-sm text-muted">{info!.enDescription}</p>}
            </div>
            <div className="flex shrink-0 gap-4 text-xs">
              {info!.zhUrl && (
                <a href={`${info!.zhUrl}?action=history`} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  中文修订历史
                </a>
              )}
              <a href={`${info!.enUrl}?action=history`} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                英文修订历史
              </a>
            </div>
          </li>
        ))}
      </ol>

      {missing.length > 0 && (
        <p className="mt-6 text-xs text-muted">暂未取到维基数据：{missing.join("、")}</p>
      )}
    </>
  );
}
