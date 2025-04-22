const express = require('express'); 
const { getAllLocation } = require('../controllers/location.controller');
const router = express.Router();
const { VerifyTokenByRole } = require('../middlewares/verifyByRole'); 

router.use(VerifyTokenByRole(String(process.env.ENTREPRENEUR)));
    
router.get('/get', getAllLocation); 
module.exports = router;