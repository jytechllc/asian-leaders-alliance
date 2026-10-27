// 推荐提交为 GitHub Issue，管理员审核后手动加入 src/data/leaders.ts
const REPO = process.env.GITHUB_REPO ?? "jytechllc/asian-leaders-alliance";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (clip(body.website, 200)) return Response.json({ ok: true }); // 蜜罐字段，机器人提交直接丢弃

  const name = clip(body.name, 80);
  const region = clip(body.region, 40);
  const position = clip(body.position, 120);
  const wikiUrl = clip(body.wikiUrl, 300);
  const reason = clip(body.reason, 1000);

  if (!name || !reason) return Response.json({ error: "请填写姓名和推荐理由" }, { status: 400 });
  if (wikiUrl && !/^https:\/\/[a-z-]+\.(m\.)?wikipedia\.org\/wiki\//.test(wikiUrl)) {
    return Response.json({ error: "维基百科链接格式不正确" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) return Response.json({ error: "推荐通道暂未开通，请稍后再试" }, { status: 503 });

  const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "asian-leaders-alliance",
    },
    body: JSON.stringify({
      title: `推荐名人：${name}`,
      labels: ["recommendation"],
      body: [
        `**姓名**：${name}`,
        `**国家/地区**：${region || "未填写"}`,
        `**职位/领域**：${position || "未填写"}`,
        `**维基百科**：${wikiUrl || "未填写"}`,
        "",
        "**推荐理由**",
        "",
        reason,
      ].join("\n"),
    }),
  });

  if (!res.ok) return Response.json({ error: "提交失败，请稍后再试" }, { status: 502 });
  return Response.json({ ok: true });
}
