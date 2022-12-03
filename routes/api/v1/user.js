const express = require('express');

const router = express.Router();
const usersApi = require('../../../controllers/api/v1/user_api');


router.post('/create-session', usersApi.createSession);

module.exports = router;
//940352218916-kno8jimnpfuak87cilfg7nis4erv5fq9.apps.googleusercontent.com
//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