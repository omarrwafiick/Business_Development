const express = require('express'); 
const router = express.Router();   
const { addAdmin, addConsultantByAdmin, deleteUser, getUser, getAllUsers } = require('../controllers/admin.controller');
require('dotenv').config();
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { adminCreateConsultantSchema, createAdminSchema } = require("../validationSchemas/adminValidation");  

router.use(VerifyTokenByRole(String(process.env.ADMIN))); 

router.post('', validateInputs(createAdminSchema), addAdmin); 
 
router.post('/add-consultant-by-admin', validateInputs(adminCreateConsultantSchema), addConsultantByAdmin); 
  
router.get('/users',  getAllUsers); 

router.get('/user/:id', getUser); 

router.delete('/user/:id',  deleteUser);  

module.exports = router;
