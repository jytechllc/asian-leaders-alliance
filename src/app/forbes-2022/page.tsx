import type { Metadata } from "next";
import { forbes2022 } from "@/data/leaders";
import { getWikiInfo } from "@/lib/wiki";

export const metadata: Metadata = { title: "福布斯 2022 海外华人富豪" };

export default async function Forbes2022() {
  const wiki = await getWikiInfo(forbes2022.flatMap((f) => (f.wiki ? [f.wiki] : [])));

  const industries = new Map<string, number>();
  for (const f of forbes2022) for (const i of f.industry) industries.set(i, (industries.get(i) ?? 0) + 1);
  const stats = [...industries].sort((a, b) => b[1] - a[1]);
  const max = stats[0][1];

  return (
    <>
      <section className="max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-accent">FORBES BILLIONAIRES 2022</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight">福布斯 2022 海外华人富豪</h1>
        <p className="mt-4 leading-relaxed text-muted">
          福布斯 2022 年全球亿万富豪榜共收录 2,578 位十亿美元级富豪。下表列出排名最前的 10 位海外华人（不含中国大陆与台湾）及其所在行业，排名与描述为 2022 年榜单原文。
        </p>
      </section>

      <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">排名</th>
              <th className="w-52 px-4 py-3 font-medium">姓名</th>
              <th className="px-4 py-3 font-medium">简介</th>
              <th className="px-4 py-3 font-medium">行业</th>
            </tr>
          </thead>
          <tbody>
            {forbes2022.map((f) => {
              const w = f.wiki ? wiki[f.wiki] : undefined;
              return (
                <tr key={f.rank} className="border-b border-line last:border-0 align-top">
                  <td className="px-4 py-3 font-serif text-lg font-bold tabular-nums text-accent">{f.rank}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {w ? (
                        <a href={w.zhUrl ?? w.enUrl} target="_blank" rel="noreferrer" className="hover:text-accent hover:underline">
                          {f.name}
                        </a>
                      ) : (
                        f.name
                      )}
                    </div>
                    {w?.zhTitle && <div className="text-xs text-muted">{w.zhTitle}</div>}
                    {w?.deceased && <div className="mt-1 text-xs text-muted">已故</div>}
                  </td>
                  <td className="px-4 py-3 leading-relaxed text-muted">{f.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {f.industry.map((i) => (
                        <span key={i} className="rounded border border-line px-1.5 py-0.5 text-xs text-muted">
                          {i}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="mt-10 max-w-md">
        <h2 className="font-serif text-xl font-bold">行业分布</h2>
        <ul className="mt-4 space-y-2">
          {stats.map(([name, n]) => (
            <li key={name} className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-sm">
              <span className="text-muted">{name}</span>
              <span className="h-2 rounded-full bg-accent" style={{ width: `${(n / max) * 100}%` }} />
              <span className="tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          来源：
          <a href="https://www.forbes.com/billionaires/" target="_blank" rel="noreferrer" className="hover:underline">
            Forbes Billionaires
          </a>
        </p>
      </section>
    </>
  );
}
