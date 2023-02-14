const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, html) => {
  const auth = {
    user: process.env.USER,
    pass: process.env.PASS,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth,
  });

  try {
    const info = await transporter.sendMail({
      from: auth.user,
      to: email,
      subject,
      text,
      html,
    });

    return info.messageId;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
