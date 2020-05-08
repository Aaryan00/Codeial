const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');

router.get('/profile',usersControllers.profile);
router.get('/sign-up',usersControllers.signup);
router.get('/sign-in',usersControllers.signin);

router.post('/create',usersControllers.create);
module.exports = router;