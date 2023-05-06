const cron = require("node-cron");
const accountSid = "ACf8a837137b83c037b8f58c1fca8c2894";
const authToken = "17299453cd13a03ac6348d51d4c798ec";
const client = require("twilio")(accountSid, authToken);
const Trainer = require("./models/Trainer");
const db = require("./config");

cron.schedule("*/1 * * * *"
, async () => {
  try {
    db();
    const trainers = await Trainer.find();
    const today = new Date();
    for (const trainer of trainers) {
      const expirationDate = new Date(trainer.certificateValidity);
      const oneYearBefore = new Date(expirationDate.getTime() - (366 * 24 * 60 * 60 * 1000));
      console.log("today", today, "\nexpirationDate", expirationDate, "\noneYearBefore", oneYearBefore)
      if (oneYearBefore <= today && expirationDate > today) {
        const message = `Hello ${trainer.name}, your certificate will expire on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
        const toNumber = `+91${trainer.phoneNo}`;
        try {
          await client.messages.create({
            body: message,
            from: "+15075568041",
            to: toNumber,
          });
          console.log(`Sent message to ${toNumber}: ${message}`);
        } catch (err) {
          console.error(`Failed to send message to ${toNumber} : ${err}`);
        }
      }else if(expirationDate <= today){
        const message = `Hello ${trainer.name}, your certificate has expired on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
        const toNumber = `+91${trainer.phoneNo}`;
        try {
          await client.messages.create({
            body: message,
            from: "+15075568041",
            to: toNumber,
          });
          console.log(`Sent message to ${toNumber}: ${message}`);
        } catch (err) {
          console.error(`Failed to send message to ${toNumber} : ${err}`);
        }
      }
    }
  } catch (err) {
    console.log("Error Occured :", err);
  }
});
const cron = require("node-cron");
const accountSid = "ACf8a837137b83c037b8f58c1fca8c2894";
const authToken = "17299453cd13a03ac6348d51d4c798ec";
const client = require("twilio")(accountSid, authToken);
const Trainer = require("./models/Trainer");
const db = require("./config");

cron.schedule("*/1 * * * *"
, async () => {
  try {
    db();
    const trainers = await Trainer.find();
    const today = new Date();
    for (const trainer of trainers) {
      const expirationDate = new Date(trainer.certificateValidity);
      const oneYearBefore = new Date(expirationDate.getTime() - (366 * 24 * 60 * 60 * 1000));
      console.log("today", today, "\nexpirationDate", expirationDate, "\noneYearBefore", oneYearBefore)
      if (oneYearBefore <= today && expirationDate > today) {
        const message = `Hello ${trainer.name}, your certificate will expire on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
        const toNumber = `+91${trainer.phoneNo}`;
        try {
          await client.messages.create({
            body: message,
            from: "+15075568041",
            to: toNumber,
          });
          console.log(`Sent message to ${toNumber}: ${message}`);
        } catch (err) {
          console.error(`Failed to send message to ${toNumber} : ${err}`);
        }
      }else if(expirationDate <= today){
        const message = `Hello ${trainer.name}, your certificate has expired on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
        const toNumber = `+91${trainer.phoneNo}`;
        try {
          await client.messages.create({
            body: message,
            from: "+15075568041",
            to: toNumber,
          });
          console.log(`Sent message to ${toNumber}: ${message}`);
        } catch (err) {
          console.error(`Failed to send message to ${toNumber} : ${err}`);
        }
      }
    }
  } catch (err) {
    console.log("Error Occured :", err);
  }
});
