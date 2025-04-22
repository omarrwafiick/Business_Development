const express = require('express'); 
const { SignUp, Login, ForgetPassword, ResetPassword, LogOut, CheckAuth, Contact } = require('../controllers/user.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.post('/signup-user', SignUp);
 
router.post('/login-user', Login); 

router.post('/forget-password', ForgetPassword); 

router.post('/reset-password/:token', ResetPassword); 

router.use(VerifyToken); 

router.post('/logout', LogOut); 

router.post('/check-auth', CheckAuth); 

router.use(VerifyTokenByRole(String(process.env.ENTREPRENEUR)));

router.post('/contact/:id', Contact); 

module.exports = router;