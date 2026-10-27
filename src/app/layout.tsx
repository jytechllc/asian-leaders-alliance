import type { Metadata } from "next";
import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "亚裔领袖联盟 · 名人录",
    template: "%s · 亚裔领袖联盟",
  },
  description: "亚裔领袖联盟名人录：收录海外华人与亚裔在科技、商业、学术、体育与文化领域的代表人物，资料随维基百科同步更新。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-accent font-serif text-lg font-bold text-white">
                亚
              </span>
              <span className="font-serif text-lg font-bold tracking-wide">亚裔领袖联盟</span>
            </Link>
            <NavLinks />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs leading-relaxed text-muted sm:px-6">
            <p>人物简介与照片来自维基百科（CC BY-SA 4.0），每日同步；未收录维基条目的人物以本站整理资料为准。</p>
            <p>名人录基于公开资料整理，收录不代表本人加入本联盟或对本联盟及任何活动表示认可。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
