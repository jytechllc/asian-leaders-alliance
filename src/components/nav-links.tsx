"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "名人录" },
  { href: "/forbes-2022", label: "福布斯 2022" },
  { href: "/updates", label: "维基动态" },
  { href: "/recommend", label: "推荐名人" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="-mx-2 flex flex-wrap text-sm">
      {NAV.map((n) => {
        const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-2 py-1.5 ${active ? "font-medium text-accent" : "text-muted hover:text-ink"}`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
