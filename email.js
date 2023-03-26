const nodemailer = require("nodemailer");

const mail = async (toEmail, subject, body) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 465,
    secure: false, // use SSL
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASS,
    }
  });

  // send mail with defined transport object
  let mailContent = {
    from: process.env.EMAIL_HOST_USER, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
  };

  try {
    const response = await transporter.sendMail(mailContent);
    // console.log("Message sent: %s", response.messageId);
    return { status: true, msg: "Mail sent successfully" };
  } catch (error) {
    // console.log(error);
    return { status: false, msg: "Error sending mail", error: error.message };
  }
};

module.exports = mail;
