require("dotenv").config();
import { Observation } from "./Observation";
import { Notification } from "./Notification";
import { exec } from "child_process";

let observer = new Observation();
let notifier = new Notification();
const envAmazonItemId = process.env.AMAZON_ITEM_ID
  ? process.env.AMAZON_ITEM_ID
  : "";
const envRakutenItemId = process.env.RAKUTEN_ITEM_ID
  ? process.env.RAKUTEN_ITEM_ID
  : "";
const envPayPayItemId = process.env.PAYPAY_SEARCH_ITEM
  ? process.env.PAYPAY_SEARCH_ITEM
  : "";
const envTargetPrice = process.env.TARGET_PRICE ? process.env.TARGET_PRICE : 0;
const envMinPrice = process.env.MIN_PRICE ? process.env.MIN_PRICE : "0";
const envMaxPrice = process.env.MAX_PRICE ? process.env.MAX_PRICE : "0";
const convertInteger = (stringNum: string) => {
  const replaceNum = stringNum.replace(/[^0-9]/g, "");
  if (replaceNum !== "") {
    return parseInt(replaceNum);
  } else {
    return 0;
  }
};

const notifyTargetPrice = () => {
  observer.getAmazonPrice(envAmazonItemId).then((price: string) => {
    if (convertInteger(price) < envTargetPrice && convertInteger(price) !== 0) {
      notifier.postNotification(
        price + "https://www.amazon.co.jp/dp/" + envAmazonItemId
      );
    } else {
      console.log("まだ目標金額より高いです。" + price);
    }
  });
};

const notifyRakutenStatus = () => {
  observer.checkRakutenItem(envRakutenItemId).then((status: boolean) => {
    if (status) {
      notifier.postNotification(
        `購入可能になっています！https://books.rakuten.co.jp/rb/${envRakutenItemId}`
      );
    } else {
      console.log("まだ購入可能になっていないです。");
    }
  });
};

const notifyPayPayStatus = () => {
  observer
    .checkPayPayMallItem(envPayPayItemId, envMinPrice, envMaxPrice)
    .then((status: boolean) => {
      if (status) {
        notifier.postNotification(
          `購入可能になっています！https://paypaymall.yahoo.co.jp/search?ss_first=1&p=${envPayPayItemId}&ei=UTF-8&pf=${envMinPrice}&pt=${envMaxPrice}`
        );
      } else {
        console.log("まだ購入可能になっていないです。");
      }
    });
};

const killChromeZombieProcess = () => {
  exec(
    `ps aux | grep chrome | grep -v grep | awk '{ print "kill -9", $2}' | sh`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
};

const cron = require("node-cron");
cron.schedule("*/5 * * * *", () => notifyTargetPrice()); //5分ごとに実行
cron.schedule("*/1 * * * *", () => notifyRakutenStatus()); //1分毎に実行
cron.schedule("*/1 * * * *", () => notifyPayPayStatus()); //1分毎に実行
cron.schedule("*/11 * * * *", () => killChromeZombieProcess()); //11分毎に実行
