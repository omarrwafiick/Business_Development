const express = require('express'); 
const { addAdmin, addConsultantByAdmin, deleteUser, getUser, getAllUsers } = require('../controllers/admin.controller');
const router = express.Router();   
require('dotenv').config();
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 

router.use(VerifyTokenByRole(String(process.env.ADMIN)));

router.post('/add-admin', addAdmin); 

router.post('/add-consultant-by-admin', addConsultantByAdmin); 
  
router.get('/users',  getAllUsers); 

router.get('/user/:id', getUser); 

router.delete('/user/:id',  deleteUser);  

module.exports = router;
