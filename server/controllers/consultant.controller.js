const Consultant = require("../models/consultant.model");  
const User = require("../models/user.model");    
const Qualification = require("../models/qualification.model");

const getAllConsultants = async (req, res) => {
    try {       
        const consutants = await Consultant.find().populate('userId');
            
        if(consutants.length === 0){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };  
    
        return res.status(200).json({ success: true, consutants });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};    
  
const getConsultantById = async (req, res) => {
    try {       
        const consultantId = req.params.id;
        const consultant = await Consultant.findById(consultantId).populate('userId');;
            
        if(!consultant){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };  
    
        return res.status(200).json({ success: true, consultant });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};

const updateConsultant = async (req, res) => {
    try {       
        const { qualificationsIds, experienceYears } = req.body;
 
        const consultantId = req.params.id;
        const consultant = await Consultant.findById(consultantId);
            
        if(!consultant){
            return res.status(404).json({ success: false, message: "No consultant was found"}); 
        };   
        
        const qualifications = await Qualification.find();
        const matchedIds = qualifications
                                .filter(q => qualificationsIds.includes(q._id.toString()))
                                .map(q => q._id);

        consultant.qualificationsIds = matchedIds;
        consultant.experienceYears = experienceYears;
  
        if (!consultant.isModified()) { 
            return res.status(400).json({ success: false, message: 'Failed to update consultant' });
        }

        await consultant.save();
    
        return res.status(200).json({ success: true, message : "Updated successfully"});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error:error.message });
        } 
};

const deleteConsultant = async (req, res) => {
    try {
      const consultantId = req.params.id;
  
      const consultant = await Consultant.findById(consultantId);
  
      if (!consultant) {
        return res.status(404).json({ success: false, message: "No consultant was found" }); 
      } 

      const user = await User.findById(consultant.userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "No user was found" }); 
      } 

      await Consultant.deleteOne(consultant);
      await User.deleteOne(user);

      return res.status(204).send();  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}; 
  
const getQualifications = async (req, res) => {
    try {       
        const qualifications = await Qualification.find();
            
        if(qualifications.length === 0){
            return res.status(404).json({ success: false, message: "No qualification was found"}); 
        };  
    
        return res.status(200).json({ success: true, qualifications });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        } 
};   

module.exports = { getAllConsultants, getConsultantById, updateConsultant, deleteConsultant, getQualifications }; 