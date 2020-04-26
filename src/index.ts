require("dotenv").config();
import { Observation } from "./Observation";
import { Notification } from "./Notification";

let observer = new Observation();
let notifier = new Notification();
const envItemId = process.env.itemId ? process.env.itemId : "";
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
  observer.getAmazonPrice(envItemId).then((price: string) => {
    if (convertInteger(price) < envTargetPrice && convertInteger(price) !== 0) {
      notifier.postNotification(price);
    } else {
      console.log("まだ目標金額より高いです。");
    }
  });
};

const cron = require("node-cron");
cron.schedule("*/5 * * * *", () => notifyTargetPrice()); //5分ごとに実行
