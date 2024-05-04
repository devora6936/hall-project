// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.office365.com',
//   port: 587,
//   secure: false,
//   auth: {
//       user: '37325573798@mby.co.il',
//       pass: 'Student@264'
//   }
// });

// function sendEmail(to, body) {
//   const mailOptions = {
//       from: 'heichal avraham <37325573798@mby.co.il>',
//       to: to,
//       subject: "hello ",
//       text: body
//   };
//   return transporter.sendMail(mailOptions);
// }

// module.exports = {
//   sendEmail
// };

// emailService.js

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Secure connection is not required because port 587 uses STARTTLS
        auth: {
            user: 'heichal@outlook.co.il',
            pass: 'kehilotYaakov21'
        },
        tls: {
            //ciphers: 'SSLv3'
            rejectUnauthorized: false // Accept self-signed certificates

        }
});

// Function to send an email
function sendEmail(recipient, subject, message) {
    let mailOptions = {
        from: '<heichal@outlook.co.il>',
        to: recipient,
        subject: subject,
        text: message
    };

    return transporter.sendMail(mailOptions);
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log('Error occurred:', error.message);
    //         return;
    //     }
    //     console.log('Email sent successfully!', info.response);
    // });
}

module.exports = { sendEmail };

