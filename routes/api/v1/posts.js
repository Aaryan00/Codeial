const express = require('express');

const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts__api');

router.get('/',postsApi.index);


module.exports = router;