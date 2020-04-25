require("dotenv").config();
import { Observation } from "./Observation";
import { Notification } from "./Notification";

let observer = new Observation();
let notifier = new Notification();
const envItemId = process.env.itemId ? process.env.itemId : "";
const envTargetPrice = process.env.TARGET_PRICE ? process.env.TARGET_PRICE : 0;
const convertInteger = (stringNum: string) => {
  return stringNum.replace(/[^0-9]/g, "");
};

observer.getAmazonPrice(envItemId).then((price: string) => {
  if (convertInteger(price) < envTargetPrice) {
    notifier.postNotification(convertInteger(price));
  } else {
    console.log("まだ目標金額より高いです。");
  }
});
