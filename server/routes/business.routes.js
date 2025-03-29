const express = require('express'); 
const { addBusiness, getAllBusinesses, getBusinessById, getBusinessTest } = require('../controllers/business.controller');
const router = express.Router();

router.get('/test_business', getBusinessTest);

router.post('/add', addBusiness);

router.get('/getall', getAllBusinesses);

router.get('/get/:id', getBusinessById);

module.exports = router;