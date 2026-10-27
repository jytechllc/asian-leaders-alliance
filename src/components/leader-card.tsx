import type { Leader } from "@/data/leaders";
import type { WikiInfo } from "@/lib/wiki";

export function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function Avatar({ name, src, logo }: { name: string; src?: string; logo?: boolean }) {
  if (src) {
    const fit = logo ? "border border-line bg-white object-contain p-1" : "object-cover object-top";
    // 维基图片直接加载，不经过图片优化
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} loading="lazy" className={`size-16 shrink-0 rounded-lg ${fit}`} />;
  }
  return (
    <span
      aria-hidden
      className="grid size-16 shrink-0 place-items-center rounded-lg bg-accent-soft font-serif text-2xl text-accent"
    >
      {Array.from(name)[0]}
    </span>
  );
}

export function LeaderCard({ leader, wiki }: { leader: Leader; wiki?: WikiInfo }) {
  const zhName = wiki?.zhTitle && wiki.zhTitle !== leader.name ? wiki.zhTitle : undefined;

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-card p-4">
      <div className="flex gap-4">
        <Avatar
          name={leader.name}
          src={wiki?.thumbnail ?? leader.image?.src}
          logo={!wiki?.thumbnail && leader.image?.kind === "logo"}
        />
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-bold leading-snug">
            {leader.name}
            {zhName && <span className="ml-2 text-base font-normal text-muted">{zhName}</span>}
          </h3>
          {leader.position && <p className="mt-0.5 text-sm text-muted">{leader.position}</p>}
          <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
            <span className="rounded border border-line px-1.5 py-0.5 text-muted">{leader.region}</span>
            {wiki?.deceased && <span className="rounded bg-ink/10 px-1.5 py-0.5 text-muted">已故</span>}
          </div>
        </div>
      </div>

      {leader.note && <p className="mt-3 text-sm leading-relaxed">{leader.note}</p>}
      {wiki?.extract && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{wiki.extract}</p>}

      {(wiki || leader.link) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs">
          {wiki?.zhUrl && (
            <a href={wiki.zhUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              中文维基
            </a>
          )}
          {wiki && (
            <a href={wiki.enUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              English Wikipedia
            </a>
          )}
          {leader.link && (
            <a href={leader.link.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              {leader.link.label}
            </a>
          )}
          {wiki?.updatedAt && <span className="ml-auto text-muted">维基更新 {formatDate(wiki.updatedAt)}</span>}
        </div>
      )}
    </article>
  );
}
