const express = require('express'); 
const { 
    processPayment, locationMarkrtAnalysisService, salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, 
    salesRevenueOptimizationPremiumService, financialPlanningService, financialPlanningFreeTrialService,financialPlanningPremiumService,
    locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService,consultancyService, getApplicationStatus, 
    updateApplication, updatePaymentStatus, addServiceApplication, getUserApplications, getConsultantApplications, getAllConsultants, 
    getAllServices
} = require('../controllers/service.controller');
const router = express.Router(); 
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 
 
router.use(VerifyTokenByRole(String(process.env.ENTREPRENEUR)));

router.post('/payment', processPayment); 

router.post('/add-service-application', addServiceApplication); 

router.post('/sales-revenue-optimization/:applicantid/:applicationid', salesRevenueOptimizationService);

router.get('/sales-revenue-optimization-free-trial-service/:applicantid/:applicationid', salesRevenueOptimizationFreeTrialService);

router.get('/sales-revenue-optimization-premium-service/:applicantid/:applicationid', salesRevenueOptimizationPremiumService);

router.post('/location-markrt-analysis/:applicantid/:applicationid', locationMarkrtAnalysisService);

router.get('/location-markrt-analysis-free-trial-service/:applicantid/:applicationid', locationMarkrtAnalysisFreeTrialService);

router.get('/location-markrt-analysis-premium-service/:applicantid/:applicationid', locationMarkrtAnalysisPremiumService);
 
router.post('/financial-planning-service/:applicantid/:applicationid', financialPlanningService); 

router.get('/financial-planning-free-trial-service/:applicantid/:applicationid', financialPlanningFreeTrialService);

router.get('/financial-planning-premium-service/:applicantid/:applicationid', financialPlanningPremiumService);

router.get('/get-consultants', getAllConsultants);

router.get('/get-services', getAllServices);

router.get('/user/:applicantId', getUserApplications);

router.get('/consultant', getConsultantApplications);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/update/:id', updateApplication);

router.put('/update/paymentstatus/:id', updatePaymentStatus);

router.use(VerifyTokenByRole(String(process.env.CONSULTANT)));

router.post('/consultancy/:applicantid/:applicationid', consultancyService);

module.exports = router;