const express = require('express'); 
const { getLocationTest } = require('../controllers/location.controller');
const router = express.Router();

router.get('/test_location', getLocationTest);

module.exports = router;