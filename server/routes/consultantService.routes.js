const express = require('express'); 
const { consultancyService } = require('../controllers/service.controller');
const router = express.Router();  
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { consultancyServiceSchema } = require("../validationSchemas/serviceValidation");  
require('dotenv').config();
 
router.use(VerifyTokenByRole([String(process.env.CONSULTANT)]));
 
router.post('/consultancy/:applicantid/:applicationid/:consultencyid', validateInputs(consultancyServiceSchema), consultancyService);

module.exports = router;