const cron = require("node-cron");
const accountSid = "ACf8a837137b83c037b8f58c1fca8c2894";
const authToken = "20f325a8a605a083dac013119107fd8f";
const client = require("twilio")(accountSid, authToken);
const Trainer = require("./models/Trainer");
const db = require("./config");

cron.schedule("*/1 * * * *", async () => {
  try {
    db();
    // Code to fetch the list of trainers with birthdays today from MongoDB
    // Code to send the birthday message to each trainer using Twilio
    const birthdays = await Trainer.find({ dob: "2023-02-11" });
    console.log("bday " + birthdays);
    for (const birthday of birthdays) {
        const toNumber = "+918652865086";
      const message = `Happy birthday, ${birthday.name}!`;

      try {
        await client.messages.create({
          body: message,
          from: "+15075568041",
          to: "+918652865086",
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
