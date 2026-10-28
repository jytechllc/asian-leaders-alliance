// 渲染封面：cover.html → out/cover-vertical.jpg（Shorts 1080×1920）、out/cover-16x9.jpg（1280×720）
import { chromium } from "playwright";

const browser = await chromium.launch();
for (const [layout, w, h, name] of [["v", 1080, 1920, "cover-vertical"], ["h", 1280, 720, "cover-16x9"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`file://${process.cwd()}/cover.html?layout=${layout}`);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  await page.screenshot({ path: `out/${name}.jpg`, type: "jpeg", quality: 90 });
}
await browser.close();
