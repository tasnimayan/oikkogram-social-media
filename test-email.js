const nodemailer = require('nodemailer');

async function sendTestEmail() {
  console.log('running')

  var transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mail@tasnimayan.dev",
      pass: "$71tasnim74$"
    }
  });
  try {
    const info = await transporter.sendMail({
      from: 'mail@tasnimayan.dev', // sender address
      to: 'tasnim.bitsofts@gmail.com', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
