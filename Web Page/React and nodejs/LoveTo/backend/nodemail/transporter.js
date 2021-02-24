const nodemailer = require("nodemailer");
const config = require("../config");
exports.transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
       
        user: config.mail,
        pass: config.mailPass
        

    }
   
});


    