const express = require('express'); 
const { Test, SignUp, Login } = require('../controllers/user.controller');
const router = express.Router();

router.get('/test_user', Test);

router.post('/signup_user', SignUp);

router.post('/login_user', Login);

module.exports = router;