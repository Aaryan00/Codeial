//because we have to check the email and password are correct or not
const User = require('../models/users');


module.exports.profile = function(req,res){
    return res.render('users_profile',{
        title: "users page"
    })
}

// Render the sign up page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// Render the sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

//get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
            }
            return res.redirect('/users/sign-in');
        })
    }else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session 
module.exports.createsession = function(req,res){
    //todo later
}