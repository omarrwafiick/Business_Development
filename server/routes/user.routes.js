const express = require('express'); 
const { SignUp, Login } = require('../controllers/user.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

//router.use(VerifyToken); 
 
router.post('/signup-user', SignUp);

router.post('/login-user', Login); 

module.exports = router;