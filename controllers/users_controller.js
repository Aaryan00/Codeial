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
    //TODO later

}

//sign in and create a session 
module.exports.createsession = function(req,res){
    //todo later
}