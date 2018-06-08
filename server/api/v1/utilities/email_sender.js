'use strict';
exports.send_email = (email, subject, text, html) => {
  const keys = require('../../../../config/keys_dev')
  const nodemailer = require('nodemailer');

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADRESS || keys.mail.email,
        pass: process.env.EMAIL_PASS || keys.mail.password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Yens Broothaers" <yensbroothaers@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
  });
}