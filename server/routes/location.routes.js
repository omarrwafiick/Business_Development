const express = require('express'); 
const { getAllLocation } = require('../controllers/location.controller');
const router = express.Router();
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 

router.use(VerifyTokenByRole(String(process.env.BUSINESS_OWNER)));
    
router.get('/getall', getAllLocation);  

module.exports = router;