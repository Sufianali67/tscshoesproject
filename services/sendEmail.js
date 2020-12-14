var fs = require("fs");
var request = require("request");
var user = require('../models/user.js');
var path = require('path')
const nodemailer = require("nodemailer");
module.exports = {
  sendEmail1: async (to, subject, text, html) => {
    //var message = `Your app ${fileResult.appId} has reached its qouta limit. \n \t App Name: ${req.body.appName} \n \t token: ${created.token} \n\t at ${created.createdAt} \n \t Thanks for using Drop2Share.`;
    var request = require("request");
    var options = {
      method: 'POST',
      url: process.env.MAILING_SERVER + '/sendEmail',
      headers:
        { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: "false", user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD, from: `Drop2Share<${process.env.SMTP_FROM}>`, to: to, subject: subject, text: text, html: html })
    };
    if (process.env.SEND_EMAIL == "true") {
      request(options, function (error, response, body) {
        if (error) {
          console.log("Error : ", error);
          return error
        } else {
          return response
        }
      });
    } else {
      return true
    }


  },
  sendEmail: async (to, subject, text, html) => {
    if (process.env.SEND_EMAIL == "true") {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: '587',
        secure: false,
        auth: {
          user: 'tscshoes01@gmail.com',
          pass: 'Kashm1r.'
        }
      });
      let info = await transporter.sendMail({
        from: 'tscshoes01@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
      console.log("Message sent: %s", info.messageId);
    } else {
      return null
    }
  }

}
