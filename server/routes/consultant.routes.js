const express = require('express'); 
const { getAllConsultants, getConsultantById, updateConsultant, deleteConsultant } = require('../controllers/consultant.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken); 

router.get('/getall', getAllConsultants);

router.get('/get/:id', getConsultantById);

router.put('/update/:id', updateConsultant);

router.delete('/delete/:id', deleteConsultant);

module.exports = router;