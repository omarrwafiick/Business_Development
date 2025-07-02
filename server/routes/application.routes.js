const express = require('express');  
require('dotenv').config(); 
const { getApplicationStatus, updateApplication,
    updatePaymentStatus, addServiceApplication, getUserApplications, getConsultantApplications
} = require('../controllers/application.controller'); 
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { paymentStatusSchema, updateApplicationSchema, addApplicationSchema } = require("../validationSchemas/serviceValidation");  
const router = express.Router();

router.use(VerifyTokenByRole([String(process.env.ENTREPRENEUR), String(process.env.BUSINESS_OWNER)]));

router.post('/add-service-application/:applicantid', validateInputs(addApplicationSchema), addServiceApplication); 

router.get('/applications/:applicantId', getUserApplications);

router.get('/consultant-applications/:consultantid', getConsultantApplications);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/:id', validateInputs(updateApplicationSchema), updateApplication);

router.put('/paymentstatus/:id', validateInputs(paymentStatusSchema), updatePaymentStatus);

module.exports = router;