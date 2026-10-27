"use client";

import { useMemo, useState } from "react";
import { LeaderCard } from "@/components/leader-card";
import type { Leader, Region } from "@/data/leaders";
import type { WikiInfo } from "@/lib/wiki";

type Item = { leader: Leader; wiki?: WikiInfo };

export function Directory({ items, regions }: { items: Item[]; regions: Region[] }) {
  const [region, setRegion] = useState<Region | "全部">("全部");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    for (const it of items) c.set(it.leader.region, (c.get(it.leader.region) ?? 0) + 1);
    return c;
  }, [items]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter(({ leader, wiki }) => {
      if (region !== "全部" && leader.region !== region) return false;
      if (!term) return true;
      return [leader.name, leader.position, leader.note, wiki?.zhTitle, wiki?.enTitle, wiki?.enDescription]
        .filter(Boolean)
        .some((s) => s!.toLowerCase().includes(term));
    });
  }, [items, region, q]);

  const tabs: (Region | "全部")[] = ["全部", ...regions];

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="按地区筛选">
          {tabs.map((t) => {
            const n = t === "全部" ? items.length : (counts.get(t) ?? 0);
            const active = region === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setRegion(t)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active ? "border-accent bg-accent text-white" : "border-line bg-card text-muted hover:text-ink"
                }`}
              >
                {t}
                <span className={`ml-1.5 tabular-nums ${active ? "text-white/80" : "text-muted"}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索姓名、公司或领域"
          aria-label="搜索名人"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent sm:w-64"
        />
      </div>

      {shown.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((it) => (
            <LeaderCard key={`${it.leader.region}-${it.leader.name}`} leader={it.leader} wiki={it.wiki} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">没有找到匹配的人物，换个关键词试试。</p>
      )}
    </section>
  );
}
