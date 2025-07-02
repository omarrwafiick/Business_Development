const { default: mongoose } = require('mongoose');
const Application = require('../models/application.model');
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const User = require('../models/user.model'); 
require('dotenv').config();

const addServiceApplication = async (req, res) => {  
    try {  
        const { serviceId, status } = req.body;  

        const applicantId = req.params.applicantid;
 
        const userExist = await User.findById(applicantId);

        if (!userExist) {
            return res.status(404).json({success: false, message: "User was not found" });}  

        const service = await Service.findOne({ _id: serviceId }); 
      
        if (!service) {
          return res.status(404).json({ success: false, message: "Service not found" });
        }
          
        const newApplication = await Application.create({
            applicantId,
            serviceId, 
            status
        });

        if (!newApplication || !newApplication._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new application' });
        }

        return res.status(201).json({ success: true, applicationId: newApplication._id });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};    

const getApplicationStatus = async (req, res) => {
    try {
      const applicationid = req.params.id;
   
      if (!mongoose.isValidObjectId(applicationid)) {
        return res.status(400).json({ success: false, message: "Invalid application ID" });
      }
   
      const application = await Application.findById(applicationid); 

      if (!application) {  
        return res.status(404).json({ success: false, message: "No application was found" });
      }
  
      return res.status(200).json({ success: true, status: application.status });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
};

const getConsultantApplications = async (req, res) => {
  try { 
    const consultantId = req.params.consultantid;

    var consultations = await Consultancy.find({consultantId: consultantId}).populate('applicationId'); 
 
    if (!consultations) {  
      return res.status(404).json({ success: false, message: "No consultation was found" });
    }  

    consultations = consultations.filter(c => c.applicationId.status !== "Approved");
    
    return res.status(200).json({ success: true, data: consultations });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateApplication = async (req, res) => {
    try {     
        const { status, paymentStatus } = req.body;

        const applicationid = req.params.id;

        const application = await Application.findOne({_id: applicationid });
            
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.status = status;

        application.paymentStatus = paymentStatus; 
 
        await application.save();
 
        return res.status(200).json({ success: true, application });    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        } 
};
 
const updatePaymentStatus = async (req, res) => {
    try {     
        const { paymentStatus } = req.body;
     
        const applicationid = req.params.id;

        const application = await Application.findById(applicationid);
        
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.paymentStatus = paymentStatus;
 
        await application.save();
 
        return res.status(200).json({ success: true, paymentStatus});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        } 
};

const getUserApplications = async (req, res) => {
  try {  
    const applicantId = req.params.applicantId;
   
    const applications = await Application.find({applicantId}); 

    if (!applications) {  
      return res.status(404).json({ success: false, message: "No application was found" });
    }

    return res.status(200).json({ success: true, applications });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


module.exports = { 
    getApplicationStatus, updateApplication, updatePaymentStatus, 
    addServiceApplication, getUserApplications, getConsultantApplications
}; 