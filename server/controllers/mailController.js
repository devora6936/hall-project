
const { sendEmail } = require('../services/emailService');

// Controller function to handle sending email
const sendEmailController = (req, res) => {
    const { recipient, subject, message } = req.body;
    const attachments = [
        {
            path: "C:\\Users\\devora shira\\Documents\\project\\hall-project\\server\\תקנון אולם.pdf" ,// Replace with the actual path to your PDF file
            filename: 'תקנון אולם.pdf' // Specify the desired filename

        },
        // You can add more attachments here if needed
    ];

    // Call the sendEmail function with appropriate parameters
    sendEmail(recipient, subject, message, attachments).then(info => {
              console.log('Email sent: ', info.response);
          })
          .catch(error => {
              console.log('Error sending email: ', error);
          });

    res.status(200).json({ message: 'Email sent successfully!' });
}

module.exports = { sendEmailController };



