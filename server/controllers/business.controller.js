const Business = require("../models/business.model");  

const addBusiness = async (req, res) => {
    try {  
        const { name, description, ownerId, categoryId, competitionScore,employees, operatingHoursPerDay,
         workingDaysPerMonth, serviceProductAvgPrice, expectedCustomersPerDay } = req.body;

        if(!name || !description || !ownerId || !categoryId || !competitionScore || !employees || 
            !operatingHoursPerDay || !workingDaysPerMonth || !serviceProductAvgPrice || !expectedCustomersPerDay ){
            throw new Error("All fields are required!");
        }  
        
        const businessExist = await Business.findOne({ name, ownerId, categoryId});

        if (businessExist) {
            return res.status(400).json({  success: false, message:"Business already exists with same owner", });
        }  

        const newBusiness = await Business.create({
            name, 
            description, 
            ownerId, 
            categoryId, 
            competitionScore,
            employees, 
            operatingHoursPerDay,
            workingDaysPerMonth, 
            serviceProductAvgPrice, 
            expectedCustomersPerDay
        }); 

        const result = await newBusiness.save();

        if (!result || !result._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new Business' });
        }

        return res.status(201).json({ success: true, newBusiness });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAllBusinesses = async (req, res) => {
    try {       
        const businesses = await Business.find();
            
        if(businesses.length === 0){
            return res.status(404).json({ success: false, message: "No business was found"}); 
        };  
    
        return res.status(200).json({ success: true, businesses });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};

const getBusinessById = async (req, res) => {
    try {       
        const businessId = req.params.id;
        const business = await Business.findById(businessId);
            
        if(!business){
            return res.status(404).json({ success: false, message: "No business was found"}); 
        };  
    
        return res.status(200).json({ success: true, business });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};

module.exports = { addBusiness, getAllBusinesses, getBusinessById };
 