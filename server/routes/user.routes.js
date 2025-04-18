const express = require('express'); 
const { SignUp, Login, ForgetPassword, ResetPassword, LogOut, CheckAuth } = require('../controllers/user.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

//router.use(VerifyToken); 
 
router.post('/signup-user', SignUp);

router.post('/login-user', Login); 

router.post('/forget-password', ForgetPassword); 

router.post('/reset-password/:token', ResetPassword); 

router.post('/logout', LogOut); 

router.post('/check-auth', CheckAuth); 

module.exports = router;