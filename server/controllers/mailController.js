// const mailer = require('../services/mail');

// function sendEmailToUserf(to, body,subject) {
//     mailer.sendEmail(to, body)
//         .then(info => {
//             console.log('Email sent: ', info.response);
//         })
//         .catch(error => {
//             console.log('Error sending email: ', error);
//         });
// }

// module.exports = { sendEmailToUserf }

//sendEmailToUserf(user.email,"your password is: "+user.password)

// mailController.js

const { sendEmail } = require('../services/emailService');

// Controller function to handle sending email
const sendEmailController = (req, res) => {
    const { recipient, subject, message } = req.body;

    // Call the sendEmail function with appropriate parameters
    sendEmail(recipient, subject, message).then(info => {
                  console.log('Email sent: ', info.response);
              })
              .catch(error => {
                  console.log('Error sending email: ', error);
              });

    res.status(200).json({ message: 'Email sent successfully!' });
}

module.exports = { sendEmailController };





