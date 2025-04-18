const Consultant = require("../models/consultant.model");  
const User = require("../models/user.model");  
//test
const addConsultant = async (req, res) => {
    try {   
        const { salary, bonus, userId, qualificationsIds, experienceYears } = req.body;

        if(!salary || !bonus || !userId || !qualificationsIds || !experienceYears){
            throw new Error("All fields are required!");
        }  
        const userExist = await User.findById(userId);

        if (!userExist) {
            return res.status(404).json({ success: false, message:"User was not found", });
        }  
        
        const consultantExist = await Consultant.findOne({ userId });

        if (consultantExist) {
            return res.status(400).json({ success: false, message:"Consultant is already exists", });
        }  

        const newConsultant = await Consultant.create({
            salary, 
            bonus, 
            userId, 
            qualificationsIds,
            experienceYears 
        }); 

        const result = await newConsultant.save();

        if (!result || !result._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new consultant' });
        }

        return res.status(201).json({ success: true, newConsultant });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
//test
const getAllConsultants = async (req, res) => {
    try {       
        const consutants = await Consultant.find();
            
        if(consutants.length === 0){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };  
    
        return res.status(200).json({ success: true, consutants });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};
//test
const getConsultantById = async (req, res) => {
    try {       
        const consultantId = req.params.id;
        const consultant = await Consultant.findById(consultantId);
            
        if(!consultant){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };  
    
        return res.status(200).json({ success: true, consultant });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};
//test
const updateConsultant = async (req, res) => {
    try {       
        const { salary, bonus, qualificationsIds, experienceYears } = req.body;

        if(!salary || !bonus || !qualificationsIds || !experienceYears){
            throw new Error("All fields are required!");
        }    
        const consultantId = req.params.id;
        const consultant = await Consultant.findById(consultantId);
            
        if(!consultant){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };   

        consultant.salary = salary;
        consultant.bonus = bonus;
        consultant.qualificationsIds.push(...qualificationsIds);
        consultant.experienceYears = experienceYears;
  
        if (!consultant.isModified()) { 
            return res.status(400).json({ success: false, message: 'Failed to update consultant' });
        }

        await consultant.save();
    
        return res.status(200).json({ success: true, message : "Updated successfully"});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};
//test
const deleteConsultant = async (req, res) => {
    try {
      const consultantId = req.params.id;
  
      const consultant = await Consultant.findByIdAndDelete(consultantId);
  
      if (!consultant) {
        return res.status(404).json({ success: false, message: "No consultant was found to be deleted" }); 
      } 

      return res.status(204).send();  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}; 
  
module.exports = { addConsultant, getAllConsultants, getConsultantById, updateConsultant, deleteConsultant }; 