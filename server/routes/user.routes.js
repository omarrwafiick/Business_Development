const express = require('express'); 
const { SignUp, Login, ForgetPassword, ResetPassword, LogOut, CheckAuth, Contact, getAllRoles } = require('../controllers/user.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { registerSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema, contactSchema } = require("../validationSchemas/consultantValidation");  
 
router.post('/signup-user',validateInputs(registerSchema), SignUp); 
 
router.post('/login-user',validateInputs(loginSchema), Login); 

router.post('/forget-password',validateInputs(forgetPasswordSchema), ForgetPassword); 

router.post('/reset-password/:token',validateInputs(resetPasswordSchema), ResetPassword); 

router.use(VerifyToken); 

router.post('/logout', LogOut); 

router.post('/check-auth', CheckAuth); 

router.use(VerifyTokenByRole(String(process.env.ENTREPRENEUR)));

router.post('/contact/:id',validateInputs(contactSchema), Contact); 

router.get('/roles', getAllRoles); 

module.exports = router;