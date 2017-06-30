const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
//possible incoming routes
router.post('/confirmation', sendConfirmationEmail);
function sendConfirmationEmail(req, res){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 25,
        secure: false,
        auth: {
            user: "user",
            pass: "password"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"nxtDoorChef" <nxtDoorChef@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Your nxtDoorChef has your order!', // Subject line
        html:
   ``
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId, info.response);
        res.status(200).send(info.response);
    });
}

module.exports = router;
