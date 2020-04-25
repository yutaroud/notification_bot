import puppeteer from "puppeteer";
const devices = require("puppeteer/DeviceDescriptors");
const iPhone = devices["iPhone 8"];

class Observation {
  async getAmazonPrice(itemId: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto("https://www.amazon.co.jp/dp/" + itemId, {
        waitUntil: "networkidle0",
      });
      const bodyHandle = await page.$("body");
      const price = await page
        .evaluate((body) => body.innerText, bodyHandle)
        .then((text) => {
          const result = text.match("￥[0-9]{2},[0-9]{3}"); //価格に応じて変更の必要有り
          return result[0];
        });
      await page.setViewport({
        width: 375,
        height: 1024,
      });
      await page.screenshot({ path: "screenshots/result.png" });
      await browser.close();
      return price;
    } catch (e) {
      console.error(e);
    }
  }
}

export { Observation };
