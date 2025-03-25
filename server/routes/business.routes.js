const express = require('express'); 
const { getBusinessTest } = require('../controllers/business.controller');
const router = express.Router();

router.get('/test_business', getBusinessTest);

module.exports = router;