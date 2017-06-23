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
        to: req.body.email, // list of receivers
        subject: 'Your nxtDoorChef has your order!', // Subject line
        html:
   `<!DOCTYPE html>
    <html>
    <head>
    <meta name="nxtDoorChef confirmation email" content="customer order and promotions">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style.css">
    </head>
    <body>
    <header>
      <h1>
        Thank you for ordering from one of your nxtDoorChefs.
      </h1>
      <h3>
        Your order has been recieved and will be ready for you soon, so get ready for something delicious!
      </h3>
    </header>
    <main>
      <div>
          ${req.body.user}'s order:<br>
          ${req.body.purchase_name}<br>
          <img src='http://www.cartoon-clipart.co/amp/images/shaggy-scooby-doo.png' style="width: 20vw;height:20vh"><br>
          ${req.body.purchase_price} 
      </div
    </main>
    <footer>
      Total = $ ${req.body.purchase_price + req.body.purchase_price}
      <br>
      <br>
      You can pick up your meal at <a href="https://www.google.com/maps/place/${address}">${chefsname}</a>
    </footer>
    </body>
    </html>` // html body
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
