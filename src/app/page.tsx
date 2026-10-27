import Link from "next/link";
import { Directory } from "@/components/directory";
import { REGIONS, leaders } from "@/data/leaders";
import { getWikiInfo } from "@/lib/wiki";

export default async function Home() {
  const wiki = await getWikiInfo(leaders.flatMap((l) => (l.wiki ? [l.wiki] : [])));
  // 有维基资料的人物排在前面，其次是有照片的，其余保持原名录顺序
  const rank = (i: { leader: (typeof leaders)[number]; wiki?: unknown }) => (i.wiki ? 2 : i.leader.image ? 1 : 0);
  const items = leaders
    .map((leader) => ({ leader, wiki: leader.wiki ? wiki[leader.wiki] : undefined }))
    .sort((a, b) => rank(b) - rank(a));
  const withWiki = items.filter((i) => i.wiki).length;

  return (
    <>
      <section className="max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-accent">由亚裔领袖联盟维护</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight sm:text-5xl">世界华人名人录</h1>
        <p className="mt-5 leading-relaxed text-muted">
          很多人说华人在海外存在玻璃天花板（Bamboo Ceiling）。到底如何突破这层天花板？我们整理了在科技、商业、学术、体育与文化领域走在前面的世界各地华人，从他们的经历里找答案。
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { k: "收录人物", v: leaders.length },
            { k: "维基百科同步", v: withWiki },
            { k: "国家与地区", v: REGIONS.length },
          ].map((s) => (
            <div key={s.k}>
              <dd className="font-serif text-3xl font-bold tabular-nums">{s.v}</dd>
              <dt className="text-sm text-muted">{s.k}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          "领导者也是一种职业，需要相应的能力，胆魄和眼界尤其重要。",
          "突破文化界限可以从兴趣出发，自然就能打成一片。",
          "办公室政治难以避免，要学会化险为夷，把握每一次机遇。",
        ].map((t, i) => (
          <div key={i} className="rounded-xl border border-line bg-card p-4">
            <span className="font-serif text-2xl font-bold text-accent">{i + 1}</span>
            <p className="mt-1 text-sm leading-relaxed">{t}</p>
          </div>
        ))}
      </section>

      <div className="mt-14">
        <Directory items={items} regions={REGIONS} />
      </div>

      <section className="mt-16 grid gap-6 rounded-xl border border-line bg-card p-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold">入选标准</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted">
            <li>具有 1 万以上的影响力，或曾见诸新闻报道、有出版作品；</li>
            <li>在海外生活 3 年以上；</li>
            <li>在世或已故人物均可收录。</li>
          </ol>
        </div>
        <Link
          href="/recommend"
          className="inline-flex justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          推荐一位名人
        </Link>
      </section>
    </>
  );
}
