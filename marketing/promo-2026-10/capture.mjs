// 用移动端视口截取线上页面，作为宣传片素材
import { chromium } from "playwright";
const BASE = "https://asian-leaders.jytech.us";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "light" });
for (const [name, path] of [["home", "/"], ["updates", "/updates"], ["recommend", "/recommend"]]) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  });
  await page.screenshot({ path: `assets/${name}.png`, fullPage: true });
  console.log(name, await page.evaluate(() => document.body.scrollHeight));
}
await browser.close();
