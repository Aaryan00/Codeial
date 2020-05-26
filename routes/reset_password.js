const express = require('express');
const router = express.Router();

const forgotpasswordController = require('../controllers/reset_password_controller');

router.get('/get_email',forgotpasswordController.getemail);
router.post('/make_token',forgotpasswordController.maketoken);
router.get('/:accesstoken',forgotpasswordController.changepassword);
router.post('/confirmchanging/:accesstoken',forgotpasswordController.confirmchanging);

module.exports = router;