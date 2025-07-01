const express = require('express'); 
const { getAllLocation } = require('../controllers/location.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 
require('dotenv').config();

router.use(VerifyToken); 
    
router.get('', getAllLocation);  

module.exports = router;