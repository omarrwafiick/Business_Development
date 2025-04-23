const express = require('express'); 
const { addBusiness, getAllBusinesses, getBusinessById, getAllCategories } = require('../controllers/business.controller');
const router = express.Router();  
const { VerifyToken } = require('../middlewares/verifyToken'); 
const { validateInputs } = require('../middlewares/validateInputs'); 
const { createBusinessSchema } = require("../validationSchemas/businessValidation");  

router.use(VerifyToken);
   
router.post('/add', validateInputs(createBusinessSchema), addBusiness);  

router.get('/getall', getAllBusinesses);

router.get('/get/:id', getBusinessById);

router.get('/categories/getall', getAllCategories);

module.exports = router;