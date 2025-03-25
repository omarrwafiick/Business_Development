const express = require('express'); 
const { getConsultantTest } = require('../controllers/consultant.controller');
const router = express.Router();

router.get('/test_consultant', getConsultantTest);

module.exports = router;