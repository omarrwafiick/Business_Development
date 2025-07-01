const User = require("../models/user.model");  
const { createUser, createConsultant } = require('../utilities/common');
 
const getUser = async (req, res) => {
    try {  
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: "No user was found" }); 
      } 

      return res.status(200).json(user);  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  
 
const getAllUsers = async (req, res) => {
    try {  
      const users = await User.find();

      if (users.length === 0) {
        return res.status(404).json({ success: false, message: "No user was found" }); 
      } 

      return res.status(200).json(users);  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  

const addConsultantByAdmin = async (req, res) => {
    try {      
        const { qualificationsIds, experienceYears, fullName, email, password, phoneNumber } = req.body;
        
        const userResult = await createUser({fullName, email, password, phoneNumber, roleName: String(process.env.CONSULTANT)});
        if (!userResult._id) {
          return res.status(400).json({ success: false, message:"User couldn't be created"});
        } 
        const userId = userResult.id;

        const consultantResult = await createConsultant({ userId, qualificationsIds, experienceYears });
        if (!consultantResult._id) {
          return res.status(400).json({ success: false, message:"Consultant couldn't be created"});
        } 
        
        return res.status(201).json({ success: true, consultantId : consultantResult._id });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 
 
const addAdmin = async (req, res) => {
  try {   
    const {fullName, email, password, phoneNumber } = req.body;
       
    const userResult = await createUser({fullName, email, password, phoneNumber, roleName: String(process.env.ADMIN)});
    if (!userResult._id) {
      return res.status(400).json({ success: false, message:"User couldn't be created", });
    }  
        
    return res.status(201).json({ success: true, userId : userResult._id }); 

  } catch (error) { 
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const result = await User.findByIdAndDelete(userId);
  
      if (!result) {
        return res.status(404).json({ success: false, message: "No user was found to be deleted" }); 
      } 

      return res.status(204).send();  
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}; 

module.exports = { addAdmin, addConsultantByAdmin, deleteUser, getUser, getAllUsers }; 