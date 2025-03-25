const express = require('express'); 
const { getServiceTest } = require('../controllers/service.controller');
const router = express.Router();

router.get('/test_service', getServiceTest);

module.exports = router;