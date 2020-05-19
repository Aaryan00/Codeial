const nodemailer = require('../config/nodemailer');

//another way of exporting
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'aryanagrawalfirozabad@gmail.com' ,
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info) =>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }

        console.log("Mail Deleivered", info);
        return;
    });
}