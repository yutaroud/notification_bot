const line = require("@line/bot-sdk");

const client = new line.Client({
  channelAccessToken: process.env.ACCESS_TOKEN,
});

class Notification {
  async postNotification(message: string) {
    const postMessage = {
      type: "text",
      text: message + "だよ！",
    };
    try {
      await client.pushMessage(process.env.USER_ID, postMessage);
    } catch (error) {
      console.log(error);
    }
  }
}

export { Notification };
