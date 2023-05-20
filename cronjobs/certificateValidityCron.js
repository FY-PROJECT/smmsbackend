const cron = require("node-cron");
const Trainer = require("../models/Trainer");
const db = require("../config");
const { formatDate } = require("../utils/helper");

cron.schedule("*/1 * * * *"
, async () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  console.log("accountSid " + accountSid);
  const client = require("twilio")(accountSid, authToken);
  try {
    db();

    const today = new Date();
    const todayPattern = formatDate(today);
    const prevYear = new Date(today.setFullYear(today.getFullYear() - 1));
    const previousYearPattern = formatDate(prevYear);
    
    const trainers = await Trainer.find({$or:[{certificateValidity:todayPattern},{certificateValidity:previousYearPattern}]});
    console.log(trainers);
    for (const trainer of trainers) {
      let message = "";
      if(trainer.certificateValidity === previousYearPattern){ 
        message = `Hello ${trainer.name}, your certificate will expire on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
      }else if(trainer.certificateValidity === todayPattern){
        message = `Hello ${trainer.name}, your certificate has expired on ${trainer.certificateValidity}. Please renew your certificate as soon as possible.`;
      }
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
  } catch (err) {
    console.log("Error Occured :", err);
  }
});
