const express = require('express'); 
const { addLocation, getAllBusinessLocations, getAllLocation, deleteBusinessLocation, searchLocations, getNearbyLocations} = require('../controllers/location.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

//router.use(VerifyToken);
  
router.post('/add', addLocation);  

router.get('/getall/:businessid', getAllBusinessLocations);
 
router.get('/get', getAllLocation);
 
router.delete('/delete/:id/:businessid', deleteBusinessLocation);
  
router.get('/search/:city/:district', searchLocations);
 
router.get('/nearby/:longitude/:latitude', getNearbyLocations);

module.exports = router;