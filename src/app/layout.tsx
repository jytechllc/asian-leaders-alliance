import type { Metadata } from "next";
import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "世界华人名人录",
    template: "%s · 世界华人名人录",
  },
  description: "世界华人名人录：收录世界各地华人在科技、商业、学术、体育与文化领域的代表人物，资料随维基百科同步更新。由亚裔领袖联盟维护。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-accent font-serif text-lg font-bold text-white">
                华
              </span>
              <span className="font-serif text-lg font-bold tracking-wide">世界华人名人录</span>
            </Link>
            <NavLinks />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs leading-relaxed text-muted sm:px-6">
            <p className="font-medium text-ink">本名录由亚裔领袖联盟维护。</p>
            <p>人物简介与照片来自维基百科（CC BY-SA 4.0），每日同步；未收录维基条目的人物以本站整理资料为准。</p>
            <p>名人录基于公开资料整理，收录不代表本人加入亚裔领袖联盟，或对该联盟及其任何活动表示认可。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
