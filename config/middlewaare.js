//if we dont make a middleware then we have to write everywhere that
//res.redirect('url',{flash: {success: "message"}});
//and it become complicated

module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }

    next();
}