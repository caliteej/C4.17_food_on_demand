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
        Thank you for ordering from nxtDoorChef.
      </h1>
      <h3>
        Your order has been received and will be available soon, so get ready for something delicious!
      </h3>
    </header>
    <main>
      <div>
          ${req.body.user}'s order:<br>
          ${req.body.purchase_name}<br>
          <img src='${req.body.purchase_photo}' style="width: 175vw;height:275vh"><br>
          Item Price: ${req.body.purchase_price} Credits
      </div
    </main>
    <footer>
      Total =  ${req.body.purchase_price} Credits
      <br>
      <br>
      You can pick up your meal at a link that contains the address and chef name</a>
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


{/*<!DOCTYPE html>*/}
{/*<html lang="en">*/}
{/*<head>*/}
    {/*<link rel="stylesheet" type="text/css" href="css/app.css">*/}
        {/*<meta http-equiv="Content-Type" content="text/html; charset=utf-8">*/}
            {/*<meta name="viewport" content="width=device-width">*/}
                {/*<title></title>*/}
    {/*<!-- <style> -->*/}
{/*</head>*/}
{/*<body>*/}
{/*<span class="preheader"></span>*/}
{/*<table class="body">*/}
    {/*<tr>*/}
        {/*<td class="center" align="center" valign="top">*/}
            {/*<center data-parsed="">*/}
                {/*<style type="text/css" align="center" class="float-center">*/}
                    {/*body,*/}
                    {/*html,*/}
                    {/*.body {*/}
                    {/*background: #f3f3f3 !important;*/}
                {/*}*/}
                {/*</style>*/}

                {/*<table align="center" class="container float-center"><tbody><tr><td>*/}

                    {/*<table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table>*/}

                    {/*<table class="row"><tbody><tr>*/}
                        {/*<th class="small-12 large-12 columns first last"><table><tr><th>*/}
                            {/*<h1>Thanks for your order.</h1>*/}
                            {/*<p>Thanks for shopping with us! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad earum ducimus, non, eveniet neque dolores voluptas architecto sed, voluptatibus aut dolorem odio. Cupiditate a recusandae, illum cum voluptatum modi nostrum.</p>*/}

                            {/*<table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table>*/}

                            {/*<table class="callout"><tr><th class="callout-inner secondary">*/}
                                {/*<table class="row"><tbody><tr>*/}
                                    {/*<th class="small-12 large-6 columns first"><table><tr><th>*/}
                                        {/*<p>*/}
                                            {/*<strong>Payment Method</strong><br>*/}
                                            {/*$$*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<strong>Email Address</strong><br>*/}
                                            {/*receipt@nxtdoorchef.com*/}
                                        {/*</p>*/}
                                        {/*<p>*/}
                                            {/*<strong>Order ID</strong><br>*/}
                                            {/*239235983749636*/}
                                        {/*</p>*/}
                                    {/*</th></tr></table></th>*/}
                                    {/*<th class="small-12 large-6 columns last"><table><tr><th>*/}
                                        {/*<p>*/}
                                            {/*<!--<strong>Shipping Method</strong><br>-->*/}
                                            {/*<!--N/A<br>-->*/}
                                            {/*<strong>Pickup Address</strong><br>*/}
                                            {/*Chef Boyardee<br>*/}
                                            {/*9200 Irvine Center Drive<br>*/}
                                            {/*Irvine, CA 92614*/}
                                        {/*</p>*/}
                                    {/*</th></tr></table></th>*/}
                                {/*</tr></tbody></table>*/}
                            {/*</th><th class="expander"></th></tr></table>*/}

                            {/*<h4>Order Details</h4>*/}

                            {/*<table>*/}
                                {/*<tr><th><strong>Item</strong></th><th><strong>#</strong></th><th><strong>Price</strong></th></tr>*/}
                                {/*<tr><td>Mom's Spaghetti</td><td>2</td><td>$10</td></tr>*/}
                                {/*<!--<tr><td>Knees weak</td><td>2</td><td>$100</td></tr>-->*/}
                                {/*<!--<tr><td>Ship's Cannon</td><td>2</td><td>$100</td></tr>-->*/}
                                {/*<tr>*/}
                                    {/*<td colspan="2"><b>Subtotal:</b></td>*/}
                                    {/*<td>$600</td>*/}
                                {/*</tr>*/}
                            {/*</table>*/}

                            {/*<hr>*/}

                                {/*<h4>What's Next?</h4>*/}

                                {/*<p>Our carrier raven will prepare your order for delivery. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi necessitatibus itaque debitis laudantium doloribus quasi nostrum distinctio suscipit, magni soluta eius animi voluptatem qui velit eligendi quam praesentium provident culpa?</p>*/}
                        {/*</th></tr></table></th>*/}
                    {/*</tr></tbody></table>*/}
                    {/*<table class="row footer text-center"><tbody><tr>*/}
                        {/*<th class="small-12 large-3 columns first"><table><tr><th>*/}
                            {/*<img src="http://placehold.it/170x30" alt="">*/}
                        {/*</th></tr></table></th>*/}
                        {/*<th class="small-12 large-3 columns"><table><tr><th>*/}
                            {/*<p>*/}
                                {/*Call us at 800.555.1923<br>*/}
                                {/*Email us at support@discount.boat*/}
                            {/*</p>*/}
                        {/*</th></tr></table></th>*/}
                        {/*<th class="small-12 large-3 columns last"><table><tr><th>*/}
                            {/*<p>*/}
                                {/*123 Maple Rd<br>*/}
                                {/*Campbell, CA 95112*/}
                            {/*</p>*/}
                        {/*</th></tr></table></th>*/}
                    {/*</tr></tbody></table>*/}
                {/*</td></tr></tbody></table>*/}

            {/*</center>*/}
        {/*</td>*/}
    {/*</tr>*/}
{/*</table>*/}
{/*<!-- prevent Gmail on iOS font size manipulation -->*/}
{/*<div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>*/}
{/*</body>*/}
{/*</html>*/}
