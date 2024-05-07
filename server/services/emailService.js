const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // Secure connection is not required because port 587 uses STARTTLS
    auth: {
        user: 'heichal@outlook.co.il',
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

// Function to send an email with attachment
function sendEmail(recipient, subject, message, attachments) {
    let mailOptions = {
        from: 'אולם היכל אברהם יצחק<heichal@outlook.co.il>',
        to: recipient,
        subject: subject,
        text: message,
        attachments: attachments // Array of attachments
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };

