const express = require('express'); 
const { VerifyTokenByRole } = require('../middlewares/verifyByRole');
const { getAllConsultants, getConsultantById, updateConsultant, deleteConsultant, getQualifications } = require('../controllers/consultant.controller');
const { validateInputs } = require('../middlewares/validateInputs'); 
const { updateConsultantSchema } = require("../validationSchemas/consultantValidation");  
const router = express.Router();

router.use(VerifyTokenByRole([String(process.env.CONSULTANT)]));
 
router.get('', getAllConsultants);

router.get('/qualifications', getQualifications);
 
router.get('/:id', getConsultantById);

router.put('/:id', validateInputs(updateConsultantSchema), updateConsultant);

router.delete('/:id', deleteConsultant);
  
module.exports = router;