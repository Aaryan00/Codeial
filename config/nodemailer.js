const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'aryanagrawalfirozabad@gmail.com',
        pass: ''
    }
})

//template is the html part of our email
let renderTemplate = (data, relativePath ) => {
    let mailHTML;
    ejs.renderFile(

        //relative path is the place where this fnction is called
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering template",err);
                return;
            }
            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
