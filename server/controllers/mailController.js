const { sendEmail } = require('../services/emailService');

const sendEmailController = async (req, res) => {
    try {
        const { recipient, subject, message } = req.body;
        const attachments = [
            {
                path: process.env.FILE_PATH,
                filename: 'תקנון אולם.pdf'
            },
        ];

        await sendEmail(recipient, subject, message, attachments);
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.code === 'ENOTFOUND') {
            res.status(404).json({ error: 'Recipient not found' });
        } else {
            res.status(500).json({ error: 'Error sending email' });
        }
    }
};

module.exports = { sendEmailController };
