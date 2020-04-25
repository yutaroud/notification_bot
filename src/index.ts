require("dotenv").config();
import { Observation } from "./Observation";
import { Notification } from "./Notification";

let observer = new Observation();
let notifier = new Notification();
const env = process.env.itemId ? process.env.itemId : "";

observer.getAmazonPrice(env).then((price: any) => {
  notifier.postNotification(price);
});
