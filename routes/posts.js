const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

//only to enter post if user is signed in 2nd level of security
router.post('/create',passport.checkAuthentication, postsController.create);

module.exports = router;