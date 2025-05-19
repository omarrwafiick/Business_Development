const express = require('express'); 
const { 
    locationMarkrtAnalysisService, salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, 
    salesRevenueOptimizationPremiumService, financialPlanningService, financialPlanningFreeTrialService,financialPlanningPremiumService,
    locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService,consultancyService, getApplicationStatus, 
    updateApplication, updatePaymentStatus, addServiceApplication, getUserApplications, getConsultantApplications, getAllConsultants, 
    getAllServices, seedDataToConsultant, businessGuideService, getConsultancyResult, integratedReport
} = require('../controllers/service.controller');
const router = express.Router(); 
const { VerifyToken } = require('../middlewares/verifyToken');  
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const {  
    paymentStatusSchema, updateApplicationSchema, consultancyServiceSchema,seedConsultantSchema,financialPlanningServiceSchema,
    addApplicationSchema, salesOptimizationSchema, businessGuideSchema
} = require("../validationSchemas/serviceValidation");  
   
router.use(VerifyToken); 

router.post('/business-guide/:applicantid/:applicationid', validateInputs(businessGuideSchema) , businessGuideService); 

router.use(VerifyTokenByRole(String(process.env.ENTREPRENEUR)));
 
router.post('/add-service-application/:applicantid', validateInputs(addApplicationSchema), addServiceApplication); 

router.post('/sales-revenue-optimization/:applicantid/:applicationid', validateInputs(salesOptimizationSchema), salesRevenueOptimizationService);

router.get('/sales-revenue-optimization-free-trial-service/:applicantid/:applicationid', salesRevenueOptimizationFreeTrialService);

router.get('/sales-revenue-optimization-premium-service/:applicantid/:applicationid', salesRevenueOptimizationPremiumService);

router.post('/location-markrt-analysis-service/:applicantid/:applicationid', locationMarkrtAnalysisService);

router.get('/location-markrt-analysis-free-trial-service/:applicantid/:applicationid', locationMarkrtAnalysisFreeTrialService);

router.get('/location-markrt-analysis-premium-service/:applicantid/:applicationid', locationMarkrtAnalysisPremiumService);
 
router.post('/financial-planning-service/:applicantid/:applicationid', validateInputs(financialPlanningServiceSchema), financialPlanningService); 

router.get('/financial-planning-free-trial-service/:applicantid/:applicationid', financialPlanningFreeTrialService);

router.get('/financial-planning-premium-service/:applicantid/:applicationid', financialPlanningPremiumService);

router.get('/get-consultants', getAllConsultants);
 
router.get('/get-services', getAllServices);

router.get('/user/:applicantId', getUserApplications);

router.get('/consultant-applications/:consultantid', getConsultantApplications);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/update/:id', validateInputs(updateApplicationSchema), updateApplication);

router.put('/update/paymentstatus/:id', validateInputs(paymentStatusSchema), updatePaymentStatus);

router.post('/seed-consultant/:applicantid/:applicationid', validateInputs(seedConsultantSchema), seedDataToConsultant);

router.get('/consultancy/:applicantid', getConsultancyResult);

router.get('/report/:applicantid', integratedReport);

router.use(VerifyTokenByRole(String(process.env.CONSULTANT)));

router.post('/consultancy/:applicantid/:applicationid/:consultencyid', validateInputs(consultancyServiceSchema), consultancyService);

module.exports = router;