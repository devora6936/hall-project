
const { sendEmail } = require('../services/emailService');

const sendEmailController = (req, res) => {
    const { recipient, subject, message } = req.body;
    const attachments = [
        {
            path: process.env.FILE_PATH ,
            filename: 'תקנון אולם.pdf' 

        },
    ];

    sendEmail(recipient, subject, message, attachments).then(info => {
              console.log('Email sent: ', info.response);
          })
          .catch(error => {
              console.log('Error sending email: ', error);
          });

    res.status(200).json({ message: 'Email sent successfully!' });
}

module.exports = { sendEmailController };



