const express = require('express'); 
const { getLocationTest, addLocation, getAllLocations, getLocationById, deleteLocation, searchLocations, getNearbyLocations} = require('../controllers/location.controller');
const router = express.Router();

router.get('/test_location', getLocationTest);

router.post('/add/:userid', addLocation);
 
router.get('/getall', getAllLocations);
 
router.get('/get/:id', getLocationById);
 
router.delete('/delete/:id', deleteLocation);
 
router.get('/search', searchLocations);
 
router.get('/nearby', getNearbyLocations);

module.exports = router;