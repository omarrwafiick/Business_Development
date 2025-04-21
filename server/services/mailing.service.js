var nodemailer = require('nodemailer');

const Mailing = (receiverMail, mailSubject, mailBody) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: receiverMail,
        subject: mailSubject,
        html: mailBody 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('❌ Error sending email:', error.message);
        } else {
            console.log('✅ Email sent: ' + info.response);
        }
    });
};

module.exports = Mailing;
//visit https://myaccount.google.com/apppasswords to make application to be apple to send mails
