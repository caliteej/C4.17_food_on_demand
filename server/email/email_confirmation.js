const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: "nxtDoorChef@gmail.com",
        pass: "V0ltronLegendaryDefender"
    },
    tls: {
        rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"nxtDoorChef" <nxtDoorChef@gmail.com>', // sender address
    to: 'sfrankie11@gmail.com, sfrankenfield@premiumretail.net', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: `<h3>Thanks for ordering from one of your local nxtDoorChefs!<h3><img src="https://munchies-images.vice.com/wp_upload/eggslut-breakfast-sandwich3.jpg?crop=1xw:0.84375xh;center,center&resize=1050:*" height="42" width="42">` // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ', info.messageId, info.response);
});