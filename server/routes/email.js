const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

//possible incoming routes
router.post('/confirmation', sendConfirmationEmail);

function sendConfirmationEmail(req, res){
    console.log(req.body);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "outlook",
        port: 25,
        secure: false,
        auth: {
            user: "nxtDoorChef@outlook.com",
            pass: "SeptimusH0dge"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"nxtDoorChef" <nxtDoorChef@outlook.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        html: `<h3>Thanks ${req.body.user} for ordering from one of your local nxtDoorChefs!<h3><img src="${req.body.purchase_photo}" height="100" width="100">` // html body
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

