const User = require('../models/user');
const AccessToken = require('../models/acessToken');
const crypto = require('crypto');
const forgotpasswordMailer = require('../mailers/forgot_password_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/forgot_password_email_worker');

//get email for password
module.exports.getemail = function(req,res){
    return res.render('user_get_email', {
        title: "Codeial | Reset Password"
    })
}

module.exports.maketoken = async function(req,res){
    try{

        let user = await User.findOne({email: req.body.email});
            if(user){
                let CryptoToken = crypto.randomBytes(30).toString('hex');

                let token = await AccessToken.create({
                    user: user._id,
                    Token: CryptoToken,
                    valid: 1
                });
                
                    token = await token.populate('user', 'name email').execPopulate();
                    // console.log(token);
                    forgotpasswordMailer.forgotpassword(token);
                    // let job = queue.create('emails',token).save(function(err){
                    //     if(err){
                    //         console.log("Error in creating a queue");
                    //     }
                    //     console.log('job enqued',job.id);
                    // })
                    req.flash('success',"Check your email");
                    return res.redirect('back');

            }else{
                req.flash('error','Invalid user');
                return res.redirect('back');
            }

    }catch(err){
        if(err){
            console.log('error',err);
            return;
        }
    }
}


module.exports.changepassword = function(req,res){
    
    AccessToken.find({}, function(err, Token){
        return res.render('user_update_password', {
            title: "Codeial | Reset Password",
            tokens: Token,
            param: req.params.accesstoken 
        })
    })   
}

module.exports.confirmchanging = function(req,res){
    try{
        AccessToken.findOne({Token: req.params.accesstoken}, function(err,token){
  
            token.valid= 0,
            User.findById(token.user,function(err,user){

                user.password = req.body.password;
                user.save();
            })
            token.save();
            req.flash('success','password changed successfully');
            return res.redirect('/');  
        })
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
    
}