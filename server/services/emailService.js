const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'heichal@outlook.co.il',
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendEmail(recipient, subject, message, attachments) {
    let mailOptions = {
        from: 'אולם היכל אברהם יצחק<heichal@outlook.co.il>',
        to: recipient,
        subject: subject,
        text: message,
        html: `
        <html dir="rtl">
        <head>
            <style>
                /* Add any additional styling here */
            </style>
        </head>
        <body>
            <p>${message}</p>
        </body>
        </html>
    `,
        attachments: attachments 
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };

