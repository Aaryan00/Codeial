const nodemailer = require('../config/nodemailer');

//another way of exporting a method
exports.forgotpassword = (token) => {
    // console.log('enter in mailer', token);
    let htmlString = nodemailer.renderTemplate({token: token},'/forgot_password/reset_password.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'aryanagrawalfirozabad@gmail.com' ,
        to: token.user.email,
        subject: "Forgot Password",
        html: htmlString
    }, (err, info) =>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }

        // console.log("Mail Deleivered", info);
        return;
    });
}