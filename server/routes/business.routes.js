const express = require('express'); 
const { addBusiness, getAllBusinesses, getBusinessById } = require('../controllers/business.controller');
const router = express.Router();  
const { VerifyToken } = require('../middlewares/verifyToken'); 

//router.use(VerifyToken);
 
router.post('/add', addBusiness); 

router.get('/getall', getAllBusinesses);

router.get('/get/:id', getBusinessById);

module.exports = router;