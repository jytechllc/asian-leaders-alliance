import type { Metadata } from "next";
import { RecommendForm } from "./recommend-form";

export const metadata: Metadata = { title: "推荐名人" };

export default function Recommend() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <section>
        <p className="text-sm font-medium tracking-widest text-accent">RECOMMEND</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight">推荐名人</h1>
        <p className="mt-4 leading-relaxed text-muted">
          认识值得被更多人看到的海外华人或亚裔领袖？告诉我们他们是谁、为什么值得推荐。我们会核实公开资料，符合入选标准的人物将加入名人录。
        </p>
        <ol className="mt-6 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>具有 1 万以上的影响力，或曾见诸新闻报道、有出版作品；</li>
          <li>美国公民或绿卡持有者，或在美国生活 5 年以上；</li>
          <li>本人仍然在世。</li>
        </ol>
        <p className="mt-6 text-sm text-muted">附上维基百科链接，审核会更快，入选后简介与照片也会随维基自动更新。</p>
      </section>
      <RecommendForm />
    </div>
  );
}
