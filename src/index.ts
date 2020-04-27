require("dotenv").config();
import { Observation } from "./Observation";
import { Notification } from "./Notification";

let observer = new Observation();
let notifier = new Notification();
const envAmazonItemId = process.env.AMAZON_ITEM_ID
  ? process.env.AMAZON_ITEM_ID
  : "";
const envRakutenItemId = process.env.RAKUTEN_ITEM_ID
  ? process.env.RAKUTEN_ITEM_ID
  : "";
const envTargetPrice = process.env.TARGET_PRICE ? process.env.TARGET_PRICE : 0;
const convertInteger = (stringNum: string) => {
  const replaceNum = stringNum.replace(/[^0-9]/g, "");
  if (typeof replaceNum === "number") {
    return replaceNum;
  } else {
    return 0;
  }
};

const notifyTargetPrice = () => {
  observer.getAmazonPrice(envAmazonItemId).then((price: string) => {
    if (convertInteger(price) < envTargetPrice && convertInteger(price) !== 0) {
      notifier.postNotification(price);
    } else {
      console.log("まだ目標金額より高いです。" + price);
    }
  });
};

const notifyRakutenStatus = () => {
  observer.checkRakutenItem(envRakutenItemId).then((status: boolean) => {
    if (status) {
      notifier.postNotification("購入可能になっています！");
    } else {
      console.log("まだ購入可能になっていないです。");
    }
  });
};

const cron = require("node-cron");
cron.schedule("*/5 * * * *", () => notifyTargetPrice()); //5分ごとに実行
cron.schedule("*/1 * * * *", () => notifyRakutenStatus()); //1分毎に実行
