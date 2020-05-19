const queue = require("../config/kue");

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done){
    console.log("Worker is running",job.data);

    commentsMailer.newComment(job.data);

    done();
})