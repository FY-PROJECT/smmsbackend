const cron = require("node-cron");
const Trainer = require("../models/Trainer");
const db = require("../config");
const {getRegexDatePattern} = require("../utils/helper");

cron.schedule("*/1 * * * *", async () => {
  
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    console.log("accountSid " + accountSid);
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    db();
    // Code to fetch the list of trainers with birthdays today from MongoDB
    // Code to send the birthday message to each trainer using Twilio
    const pattern = getRegexDatePattern(Date.now());
    console.log("pattern " + pattern);
    const birthdays = await Trainer.find({ dob: { $regex: pattern } });
    console.log("bday " + birthdays);
    for (const birthday of birthdays) {
        const toNumber = `+91${birthday.phoneNo}`;
        const message = `Happy birthday, ${birthday.name}!`;

      try {
        await client.messages.create({
          body: message,
          from: "+15075568041",
          to: toNumber,
        });
        console.log(`Sent message to ${toNumber}: ${message}`);
      } catch (err) {
        console.error(`Failed to send message to ${toNumber}: ${err}`);
      }
    }
  } catch (err) {
    console.log("Error Occured :",err);
  }
});
