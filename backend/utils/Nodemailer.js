const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kaalidash208@gmail.com",
    pass:process.env.pass,
  },
});


exports.SendMail = async ({ email, subject, html }) => {
  const info = await transporter.sendMail({
    from: " <jobcircle@gmail.com>",
    to: email,
    subject: subject,
    html: html,
  });
  return info;
};
