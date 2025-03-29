const express = require('express'); 
const { applyConsulting, processPayment, freeTrial, getFullService, getApplicationStatus, updateApplication, updatePaymentStatus, getServiceTest } = require('../controllers/service.controller');
const router = express.Router();

router.get('/test_service', getServiceTest);

router.post('/add', applyConsulting);

router.post('/payment', processPayment);

router.post('/freetrail', freeTrial);

router.post('/getfullservice', getFullService);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/service/update/:id', updateApplication);

router.put('/update/paymentstatus/:id', updatePaymentStatus);

module.exports = router;