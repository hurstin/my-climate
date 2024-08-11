const { text } = require('express');
const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split('')[0];
    this.url = url;
    this.from = `okechukwu <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  // send the actual mail
  async sendMail(_, subject) {
    // define mailOption
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.url,
    };
    // create a transport and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.sendMail(
      'passwordReset',
      'your password reset token (valid for only 10 minutes)',
    );
  }
};

// const sendEmail = async (options) => {
//   // create a trnsporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   // define the email options
//   const mailOptions = {
//     from: 'Augustine Okechukwu <hurstin@mail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   // actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
