// 逐帧渲染 stage.html → frames/*.jpg，再用 ffmpeg 合成旁白、音乐
import { chromium } from "playwright";
import { execFileSync } from "child_process";
import fs from "fs";

const FPS = 30, GAP = 0.45, LEAD = 0.3, TAIL = 2.6;
const script = JSON.parse(fs.readFileSync("script.json", "utf-8"));
const offsets = JSON.parse(fs.readFileSync("assets/offsets.json", "utf-8"));
const dur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

let t = LEAD;
const timeline = script.map((s, i) => {
  const vo = dur(`out/vo/${s.id}.mp3`);
  const start = t, voEnd = start + vo, end = voEnd + (i === script.length - 1 ? TAIL : GAP);
  t = end;
  return { ...s, start, voEnd, end };
});
timeline[0].start = 0;
const total = t;
fs.writeFileSync("out/timeline.json", JSON.stringify(timeline, null, 1));
console.log("total", total.toFixed(2), "s");

fs.rmSync("frames", { recursive: true, force: true });
fs.mkdirSync("frames");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto("file://" + process.cwd() + "/stage.html");
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
await page.evaluate(([tl, off]) => window.setup(tl, off), [timeline, offsets]);
const n = Math.ceil(total * FPS);
const only = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;
for (let f = 0; f < n; f++) {
  const sec = f / FPS;
  if (only && !only.some((x) => Math.abs(x - sec) < 0.5 / FPS)) continue;
  await page.evaluate((s) => window.render(s), sec);
  await page.screenshot({ path: `frames/${String(f).padStart(5, "0")}.jpg`, type: "jpeg", quality: 92 });
  if (f % 150 === 0) console.log("frame", f, "/", n);
}
await browser.close();
if (only) process.exit(0);

// 旁白按时间轴放置，音乐压低并在结尾淡出
const inputs = [], filters = [];
timeline.forEach((s, i) => {
  inputs.push("-i", `out/vo/${s.id}.mp3`);
  filters.push(`[${i + 1}:a]adelay=${Math.round(s.start * 1000)}|${Math.round(s.start * 1000)}[v${i}]`);
});
const m = timeline.length + 1;
filters.push(`${timeline.map((_, i) => `[v${i}]`).join("")}amix=inputs=${timeline.length}:normalize=0[vo]`);
filters.push(`[${m}:a]atrim=0:${total},volume=0.16,afade=t=in:d=0.8,afade=t=out:st=${total - 2}:d=2[bgm]`);
filters.push(`[vo][bgm]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]`);
execFileSync("ffmpeg", [
  "-y", "-framerate", String(FPS), "-i", "frames/%05d.jpg", ...inputs,
  "-i", process.env.BGM,
  "-filter_complex", filters.join(";"), "-map", "0:v", "-map", "[a]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
  "-t", String(total), "-movflags", "+faststart", "out/world-chinese-leaders-promo.mp4",
], { stdio: "inherit" });
