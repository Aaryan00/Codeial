const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//only to enter post if user is signed in 2nd level of security
router.post('/create',passport.checkAuthentication, commentsController.create);

module.exports = router;