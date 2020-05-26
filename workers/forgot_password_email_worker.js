const queue = require("../config/kue");

const forgotPassword = require('../mailers/forgot_password_mailer');

queue.process('emails', function(job, done){
    console.log("Worker is running",job.data);

    forgotPassword.forgotpassword(job.data);

    done();
})