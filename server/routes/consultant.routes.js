const express = require('express'); 
const { getAllConsultants, getConsultantById, updateConsultant, deleteConsultant, getQualifications } = require('../controllers/consultant.controller');
const { VerifyToken } = require('../middlewares/verifyToken'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { updateConsultantSchema } = require("../validationSchemas/consultantValidation");  
const router = express.Router();

router.use(VerifyToken); 

router.get('/getall', getAllConsultants);
 
router.get('/get/:id', getConsultantById);

router.put('/update/:id', validateInputs(updateConsultantSchema), updateConsultant);

router.delete('/delete/:id', deleteConsultant);

router.get('/get/qualifications', getQualifications);
 
module.exports = router;