const express = require('express'); 
const router = express.Router();  
const { addBusiness, getAllBusinesses, getBusinessById, getAllCategories } = require('../controllers/business.controller');
const { VerifyToken } = require('../middlewares/verifyToken'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { createBusinessSchema } = require("../validationSchemas/businessValidation");  

router.use(VerifyToken);
   
router.post('', validateInputs(createBusinessSchema), addBusiness);  

router.get('', getAllBusinesses);

router.get('/categories', getAllCategories);

router.get('/:id', getBusinessById); 
 
module.exports = router;