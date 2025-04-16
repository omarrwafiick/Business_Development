const { default: mongoose } = require('mongoose');
const Application = require('../models/application.model');
const paymentService = require('../services/payment.service');
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const Consultant = require('../models/consultant.model'); 
const FinancialPlanning = require('../models/financialPlanning.model');
const Business = require('../models/business.model'); 

const processPayment = async (req, res) => {  
    try {
        await paymentService(req).then(res => {
            if(res.ok) return res.json();
        }).then(({ url }) => window.location = url);
    } catch (error) {
        console.error("payment error");
    }
};   

const addServiceApplication = async (req, res) => {  
    try {  
        const { applicantId, serviceId, status, paymentStatus } = req.body;

        if(!applicantId || !serviceId || !status ){
            throw new Error("All fields are required!");
        }  
        
        const applicationExist = await Application.findOne({ applicantId: applicantId, serviceId: serviceId });

        if (applicationExist) {
            return res.status(400).json({success: false, message: "Application already exists" });}  

        const newApplication = await Application.create({
            applicantId,
            serviceId, 
            status, 
            paymentStatus
        });

        const result = await newApplication.save();

        if (!result || !result._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new application' });
        }

        return res.status(201).json({ success: true, applicationId: result._id });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
////////////////////////////////////////////////////////
const locationMarkrtAnalysis = async (req, res) => {
    res.send("marketingStrategyService applied");
};

const salesRevenueOptimization  = async (req, res) => {
    res.send("marketAnalysisService applied");
};
////////////////////////////////////////////////////////
 
const financialPlanningService = async (req, res) => {
    try {
      const {
        applicantId, 
        applicationid,
        personalSavings,
        externalFunding,
        breakEvenTargetInMonths,
        expectedROIInMonths,
        marketingBudget, 
        registrationCost,
        legalConsultationCost
      } = req.body; 

      const application = await Application.findOne({_id: applicationid, applicantId: applicantId});
  
        if (!application) { 
            return res.status(400).json({success: false, message: "Application was not found "});
        }  

      const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId');
      if (!business) {
        return res.status(400).json({success: false, message: "No business found for user"}); }
   
      const startupCostsBreakdown = {
        registration: registrationCost,
        legal: legalConsultationCost,
        marketing: marketingBudget,
        equipment: business.employees * 1000,
        misc: 2000
      };
  
      const totalStartupCost = Object.values(startupCostsBreakdown).reduce((sum, val) => sum + Number(val), 0);
   
      const monthlyFixedCosts = business.employees * 1500 + 1000;
      const monthlyVariableCosts = Number(business.serviceProductAvgPrice) * 0.2 * Number(business.expectedCustomersPerDay) * Number(business.workingDaysPerMonth);
   
      const projectedRevenue = Number(business.serviceProductAvgPrice) * Number(business.expectedCustomersPerDay) * Number(business.workingDaysPerMonth);
   
      const expectedROI = (projectedRevenue * expectedROIInMonths) - (monthlyFixedCosts + monthlyVariableCosts) * expectedROIInMonths;
  
      const breakEvenPoint = (projectedRevenue * breakEvenTargetInMonths) >= totalStartupCost
        ? `Break-even achievable in ${breakEvenTargetInMonths} months`
        : `Break-even will take more than ${breakEvenTargetInMonths} months`
   
        let expectedRevenueStreams = [];
        let taxStrategy = "";
        let complianceConsiderations = [];
        let finalRecommendation = "";
        
      switch (business.categoryId.name) {
          case "Retail":
            expectedRevenueStreams = ["In-store Sales", "Online Sales"];
            taxStrategy = "Retail-specific deductions like inventory write-offs";
            complianceConsiderations = ["Sales tax registration", "Return policy regulations"];
            finalRecommendation = "Use (E-commerce Ads, Influencer Marketing, Search Engine Optimization and Email Marketing)to drive foot traffic and expand e-commerce reach.";
            break;
        
          case "Food & Beverage":
            expectedRevenueStreams = ["Dine-in Sales", "Delivery Services", "Takeaway"];
            taxStrategy = "Include food-related deductions like spoilage and delivery mileage";
            complianceConsiderations = ["Health inspections", "Food safety certifications"];
            finalRecommendation = "Promote specials via (Instagram and Facebook, Food Bloggers and Influencers and Event Sponsorships) and prioritize hygiene compliance.";
            break;
        
          case "Healthcare":
            expectedRevenueStreams = ["Consultation Fees", "Treatment Packages"];
            taxStrategy = "Healthcare-specific deductions like equipment depreciation";
            complianceConsiderations = ["Medical licenses", "Patient data regulations (HIPAA-like rules)"];
            finalRecommendation = "Build trust through (Healthcare Portals, Patient Referrals & Testimonials and Healthcare Partnerships) and focus on regulatory approvals.";
            break;
        
          default:
            expectedRevenueStreams = ["Product Sales", "Services"];
            taxStrategy = "Standard corporate deductions";
            complianceConsiderations = ["Business license", "Local permits"];
            finalRecommendation = "Focus marketing on (Google Ads, Search Engine Optimization and Email Newsletters) and ensure compliance with local laws.";
      }
        
      const financialPlan = {
        applicantId,
        businessId: business._id,
        serviceId: application.serviceId,
        applicationId: applicationid, 
        capitalAvailable: personalSavings + externalFunding,
        startupCostsBreakdown,
        monthlyFixedCosts,
        monthlyVariableCosts,
        expectedRevenueStreams,
        expectedROI,
        breakEvenPoint,
        taxStrategy,
        complianceConsiderations,
        finalRecommendation
      };
   
      const newFinancialPlanning = await FinancialPlanning.create(financialPlan);
      const financialPlanningResult = await newFinancialPlanning.save();
  
      return res.status(201).json({ success: true, financialPlanningId :financialPlanningResult._id });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 
 
const financialPlanningFreeTrialService  = async (req, res) => { 
     try {  
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId});
        console.log(serviceExist)
        if (!serviceExist) {
          return res.status(404).json({ success: false, message: "No service was found" });
        }  
        
        return res.status(200).json({ success: true, 
            data :{
                businessDescription: serviceExist.businessDescription,
                capitalAvailable: serviceExist.capitalAvailable,
                startupCostsBreakdown: serviceExist.startupCostsBreakdown,
                monthlyFixedCosts: serviceExist.monthlyFixedCosts,
                monthlyVariableCosts: serviceExist.monthlyVariableCosts
            }
         });
    
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
};
 
const financialPlanningPremiumService  = async (req, res) => { 
    try {  
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const application = await Application.findOne({ _id: applicationId, applicantId: applicantId });

        console.log(application)
        if (!application || !application.paymentStatus) { 
            return res.status(400).json({success: false, message: "User has not completed payment for the service."});
        }     
        const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId}); 
     
        if (!serviceExist) {
          return res.status(404).json({ success: false, message: "No service was found" });
        }  
        
        return res.status(200).json({ success: true, 
            data :{
                ...serviceExist
            }
         });
    
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
};
 
const consultancyService  = async (req, res) => {
    try {  
        const { 
            consultantId,
            applicantId,
            businessId,
            serviceId,  
            applicationId,
            businessOverview ,  
            industryAnalysis,
            competitorInsights,
            locationRecommendation,
            targetAudienceDefinition,
            marketingSuggestions,
            operationsAdvice,
            legalConsiderations,
            growthStrategy,
            commonPitfalls,
            summaryRecommendation, 
            sessionsCount,
            deliveryFormat
            } = req.body;

        if(!consultantId || !applicantId || !serviceId || !businessOverview || !industryAnalysis || !competitorInsights ||
             !locationRecommendation || !targetAudienceDefinition || !marketingSuggestions || !operationsAdvice || !legalConsiderations ||
             !growthStrategy || !commonPitfalls || !summaryRecommendation || !deliveryFormat || !applicationId
        ){
            throw new Error("All fields are required!");
        }    

        const application = await Application.findOne({_id: applicationId, applicantId: applicantId, serviceId: serviceId});
    
        if (!application) { 
            return res.status(400).json({success: false, message: "Application was not found "});
        }   

        const newConsultancyService = await Consultancy.create({
            consultantId ,
            applicantId ,
            serviceId ,  
            applicationId,
            businessOverview ,  
            industryAnalysis,
            competitorInsights,
            locationRecommendation,
            targetAudienceDefinition,
            marketingSuggestions,
            operationsAdvice,
            legalConsiderations,
            growthStrategy,
            commonPitfalls,
            summaryRecommendation,  
            deliveryFormat
        });  

        const consultancyServiceResult = await newConsultancyService.save();
 
        if (!consultancyServiceResult || !consultancyServiceResult._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new Service' });
        }
         
        application.status = 'Approved';
        await application.save();

        return res.status(201).json({ success: true, consultsncyId : consultancyServiceResult._id });

    } catch (error) {
        console.error('Error in addLocation:', error); 
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
 
const getConsultantApplications = async (req, res) => {
  try {
    //if status is pending mean consultant can respond to application 
    const applications = await Application.find({status: "Pending"}).limit(10); 

    if (!applications) {  
      return res.status(404).json({ success: false, message: "No application was found" });
    } 

    return res.status(200).json({ success: true, data: applications });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
  
const getAllConsultants = async (req, res) => {
  try { 
    const consultants = await Consultant.find().populate('userId').limit(10); 

    if (!consultants) {  
      return res.status(404).json({ success: false, message: "No consultant was found" });
    } 

    return res.status(200).json({ success: true, data: consultants });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
  
const getAllServices = async (req, res) => {
  try { 
    const services = await Service.find(); 

    if (!services) {  
      return res.status(404).json({ success: false, message: "No service was found" });
    } 

    return res.status(200).json({ success: true, data: services });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateApplication = async (req, res) => {
    try {     
        const { status, paymentStatus } = req.body;
    
        if(!status || !paymentStatus){
            throw new Error("All fields are required!");
        }

        const applicationid = req.params.id;

        const application = await Application.findOne({_id: applicationid });
            
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.status = status;

        application.paymentStatus = paymentStatus;
        
        await application.save();
 
        return res.status(200).json({ success: true, application});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};

const updatePaymentStatus = async (req, res) => {
    try {     
        const { paymentStatus } = req.body;
    
        if(!paymentStatus){
            throw new Error("All fields are required!");
        }

        const applicationid = req.params.id;

        const application = await Application.findById(applicationid);
        
        if(!application){
            return res.status(404).json({ success: false, message: "No application was found"}); 
        };  

        application.paymentStatus = paymentStatus;

        await application.save();
 
        return res.status(200).json({ success: true, paymentStatus});    
    
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        } 
};

module.exports = { 
    processPayment, locationMarkrtAnalysis, salesRevenueOptimization, financialPlanningService, financialPlanningFreeTrialService,
    financialPlanningPremiumService, consultancyService, getApplicationStatus, updateApplication, updatePaymentStatus, 
    addServiceApplication, getUserApplications, getConsultantApplications, getAllConsultants, getAllServices
}; 