const Location = require("../models/location.model");  
const mongoose = require('mongoose');

const addLocation = async (req, res) => { 
    try {  
        const { city, district, footTrafficScore, longitude, latitude, businessId } = req.body;

        if(!city || !district || !footTrafficScore || !longitude || !latitude || !businessId){
            throw new Error("All fields are required!");
        }  
        
        const locationExist = await Location.findOne({ latitude, longitude });

        if (locationExist) {
            return res.status(400).json({
                success: false,
                message: `Location already exists with these coordinates: longitude ${longitude} - latitude ${latitude}`,
            });
        }  

        const newLocation = await Location.create({
            city, 
            district, 
            footTrafficScore, 
            longitude, 
            latitude,
            businessId: new mongoose.Types.ObjectId(businessId)
        }); 

        const result = await newLocation.save();

        if (!result || !result._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new location' });
        }

        return res.status(201).json({ success: true, newLocation });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllBusinessLocations = async (req, res) => { 
    try {     
        const businessid = req.params.businessid;
        const locations = await Location.find({businessId: businessid});
            
        if(locations.length === 0){
            return res.status(404).json({ success: false, message: "No location was found for this business"}); 
        };  
    
        return res.status(200).json({ success: true, locations});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};
  
const getAllLocation = async (req, res) => { 
    try {       
        const locations = await Location.find();
            
        if(locations.length === 0){
            return res.status(404).json({ success: false, message: "No location was found"}); 
        };  
    
        return res.status(200).json({ success: true, locations});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
}; 

const deleteBusinessLocation = async (req, res) => { 
    try {     
        const businessid  = req.params.businessid;
        const id = req.params.id; 
        
        const deletedLocation = await Location.deleteOne({_id: id, businessId: businessid});
            
        if(deletedLocation.deletedCount === 0){
            return res.status(404).json({ success: false, message: "No location found for this business to be deleted"}); 
        };     
        return res.status(204).send();    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};
 
const searchLocations = async (req, res) => { 
    try {     
        const district = req.params.district;
        const city = req.params.city;

        const locations = await Location.find({city: city, district: district}).limit(10);
        console.log(locations);
        if(locations.length === 0){
            return res.status(404).json({ success: false, message: "No location was found"}); 
        };  
    
        return res.status(200).json({ success: true, locations});      
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};
 
const getNearbyLocations = async (req, res) => {
    try { 
      const userLng = parseFloat(req.params.longitude);
      const userLat = parseFloat(req.params.latitude);
        
      const allLocations = await Location.find();
   
      if (!allLocations.length) {
        return res.status(404).json({ success: false, message: "No location found" });
      }
  
      const toRad = (val) => (val * Math.PI) / 180;

      const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };
   
      const nearestLocation = allLocations
        .map(loc => {
          const locLat = parseFloat(loc.latitude);
          const locLng = parseFloat(loc.longitude); 
          const distance = getDistance(userLat, userLng, locLat, locLng);
          return { ...loc.toObject(), distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);
  
      return res.status(200).json({ success: true, nearestLocation });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
};
  
module.exports = { addLocation, getAllBusinessLocations, getAllLocation, deleteBusinessLocation, searchLocations, getNearbyLocations };
 