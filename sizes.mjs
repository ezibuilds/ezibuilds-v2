import { chromium } from "playwright";
const b = await chromium.launch();
console.log("viewport   card CSS   @1x    @2x    @3x    srcset pick(@2x)");
const DEVICE=[640,750,828,1080,1200,1920,2048,3840];
for (const w of [390,430,768,1024,1280,1440,1680,1920,2560,3440]) {
  const p = await b.newPage({ viewport:{width:w,height:900} });
  await p.goto("http://localhost:3000/", { waitUntil:"domcontentloaded" });
  await p.waitForTimeout(700);
  const css = await p.evaluate(() => {
    const el = document.querySelector("#capabilities img");
    return el ? Math.round(el.getBoundingClientRect().width) : null;
  });
  const need2 = css*2;
  const pick = DEVICE.find(d => d >= need2) ?? 3840;
  console.log(`${String(w).padStart(5)}px  ${String(css).padStart(6)}px  ${String(css).padStart(5)}  ${String(css*2).padStart(5)}  ${String(css*3).padStart(5)}   ${pick}`);
  await p.close();
}
await b.close();
