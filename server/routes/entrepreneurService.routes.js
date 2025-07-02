const express = require('express'); 
const { 
    locationMarkrtAnalysisService, salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, 
    salesRevenueOptimizationPremiumService, financialPlanningService, financialPlanningFreeTrialService,
    financialPlanningPremiumService,locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService, 
    getAllServices, seedDataToConsultant, businessGuideService, getConsultancyResult, integratedReport
} = require('../controllers/service.controller');
const router = express.Router();  
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { seedConsultantSchema,financialPlanningServiceSchema,salesOptimizationSchema, businessGuideSchema } = require("../validationSchemas/serviceValidation");  
require('dotenv').config();

router.use(VerifyTokenByRole([String(process.env.ENTREPRENEUR), String(process.env.BUSINESS_OWNER)]));
 
router.post('/business-guide/:applicantid/:applicationid', validateInputs(businessGuideSchema) , businessGuideService); 

router.post('/sales-revenue-optimization/:applicantid/:applicationid', validateInputs(salesOptimizationSchema), salesRevenueOptimizationService);

router.get('/sales-revenue-optimization-free-trial-service/:applicantid/:applicationid', salesRevenueOptimizationFreeTrialService);

router.get('/sales-revenue-optimization-premium-service/:applicantid/:applicationid', salesRevenueOptimizationPremiumService);

router.post('/location-markrt-analysis-service/:applicantid/:applicationid', locationMarkrtAnalysisService);

router.get('/location-markrt-analysis-free-trial-service/:applicantid/:applicationid', locationMarkrtAnalysisFreeTrialService);

router.get('/location-markrt-analysis-premium-service/:applicantid/:applicationid', locationMarkrtAnalysisPremiumService);
 
router.post('/financial-planning-service/:applicantid/:applicationid', validateInputs(financialPlanningServiceSchema), financialPlanningService); 

router.get('/financial-planning-free-trial-service/:applicantid/:applicationid', financialPlanningFreeTrialService);

router.get('/financial-planning-premium-service/:applicantid/:applicationid', financialPlanningPremiumService);
 
router.get('', getAllServices); 

router.post('/seed-consultant/:applicantid/:applicationid', validateInputs(seedConsultantSchema), seedDataToConsultant);

router.get('/consultancy/:applicantid', getConsultancyResult);

router.get('/report/:applicantid', integratedReport);
 
module.exports = router;