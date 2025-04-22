const { default: mongoose } = require('mongoose');
const Application = require('../models/application.model');
const paymentService = require('../services/payment.service');
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const Consultant = require('../models/consultant.model');  
const FinancialPlanning = require('../models/financialPlanning.model');
const Business = require('../models/business.model'); 
const LocationMarketAnalysis = require('../models/locationMarkrtAnalysis.model'); 
const SalesRevenueOptimization = require('../models/salesRevenueOptimization.model'); 
 
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

const locationMarkrtAnalysisService = async (req, res) => {
  try {
    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid;

    const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId locationId');
    const application = await Application.findById(applicationId);
 
    if (!business || !application) {
      return res.status(404).json({ success: false, message: "Business or application not found" });
    }

    const service = await Service.findOne({ _id: application.serviceId, name: process.env.LOCATION_MARKET_ANALYSIS });
  
    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }

    const location = business.locationId;
    const category = business.categoryId.name;
    console.log(business.locationId) 
    const nearbyBusinesses = await Business.find({locationId: location._id, _id: { $ne: business._id }}).populate('categoryId');

    const sameCategoryNearby = nearbyBusinesses.filter(b => b.categoryId.name === category).length; 

    const competitionLevel = sameCategoryNearby > 10
      ? "High competition in this location"
      : sameCategoryNearby >= 5
        ? "Moderate competition detected"
        : "Low competition – potential opportunity";

    const populationDensity = location.populationDensity;
    const footTrafficScore = location.distanceToMainRoad < 2 ? "High" : "Moderate";

    const marketingStrategies = [];
    let finalLocationAdvice = ""; 

    switch (business.categoryId.name) {
      case process.env.RETAIL: 
        marketingStrategies.push("Launch local influencer campaigns", "Use bold storefront visuals");
        finalLocationAdvice = competitionLevel.includes("Low")
          ? "Capitalize on low competition and promote opening deals"
          : "Focus on branding and loyalty programs to stand out.";
        break;
    
      case process.env.FOOD_BEVERAGE:
        marketingStrategies.push("Offer app-based delivery promotions", "Create neighborhood tasting events");
        finalLocationAdvice = footTrafficScore === "High"
          ? "High foot traffic supports walk-in customers—optimize your exterior and signage."
          : "Focus on delivery optimization and online marketing due to moderate foot traffic.";
        break;
    
      case process.env.HEALTHCARE:
        marketingStrategies.push("Partner with local gyms or spas", "Advertise health awareness locally");
        finalLocationAdvice = sameCategoryNearby < 3
          ? "There’s a service gap—great potential for gaining loyal patients"
          : "You’ll need to differentiate with service quality and pricing.";
        break;
    
      default:
        marketingStrategies.push("Test localized ad campaigns", "Engage through community events");
        finalLocationAdvice = "Observe your category’s local presence and align your strategy with underserved needs.";
    }

    const analysisData = {
      applicantId,
      businessId: business._id,
      applicationId,
      serviceId: application.serviceId,
      locationId: location._id,
      sameCategoryCount : sameCategoryNearby,
      totalNearbyBusinesses: sameCategoryNearby,
      populationDensity,
      footTrafficScore,
      competitionLevel,
      marketingStrategies,
      finalLocationAdvice
    };

    const locationResult = await LocationMarketAnalysis.create(analysisData);

    if (!locationResult || !locationResult._id) { 
      return res.status(400).json({ success: false, message: 'Failed to create new Service' });
    }

    return res.status(201).json({ success: true, serviceId: locationResult._id });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const locationMarkrtAnalysisFreeTrialService = async (req, res) => {
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;

    const serviceExist = await LocationMarketAnalysis.findOne({applicantId: applicantId, applicationId: applicationId});
 
    if (!serviceExist) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }  
    
    return res.status(200).json({ success: true, 
        data :{ 
            totalNearbyBusinesses: serviceExist.totalNearbyBusinesses,
            sameCategoryCount: serviceExist.sameCategoryCount, 
            competitionLevel: serviceExist.competitionLevel
        }
     });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

const locationMarkrtAnalysisPremiumService = async (req, res) => { 
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;

    const serviceExist = await LocationMarketAnalysis.findOne({applicantId: applicantId, applicationId: applicationId});
 
    if (!serviceExist) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }   
    return res.status(200).json({ success: true, 
        data : {
          ...serviceExist
        }
     });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

const salesRevenueOptimizationService = async (req, res) => {
  try {
    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid;

    const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId');
    const application = await Application.findOne({ _id: applicationId, applicantId: applicantId});
  
    if (!business || !application) {
      return res.status(404).json({ success: false, message: "Business or application not found" });
    }
    
    const service = await Service.findOne({ _id: application.serviceId, name: process.env.SALES_REVENUE_OPTIMIZATION });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }

    const avgPrice = Number(business.serviceProductAvgPrice);
    const expectedDailySales = Number(business.expectedCustomersPerDay);
    const workingDays = Number(business.workingDaysPerMonth);
    const estRevenue = avgPrice * expectedDailySales * workingDays;
    const category = business.categoryId.name;

    const pricingStrategySuggestions = [];
    const upsellOpportunities = [];
    const revenueBoostIdeas = [];
    const revenueRiskFactors = []; 
    let finalOptimizationAdvice = "";
 
    switch (category) {
      case process.env.RETAIL: 
        pricingStrategySuggestions.push("Use tiered pricing for product lines", "Offer time-limited bundle deals");
        upsellOpportunities.push("Offer accessories at checkout", "Highlight premium product alternatives");
        revenueBoostIdeas.push("Run seasonal campaigns", "Partner with local influencers");
        finalOptimizationAdvice = "Focus on bundling products, optimizing shelf placement and localized ads.";
        break;
    
      case process.env.FOOD_BEVERAGE:
        pricingStrategySuggestions.push("Happy hour discounts", "Combo meals with fixed pricing");
        upsellOpportunities.push("Add drink or dessert suggestions", "Offer premium upgrades");
        revenueBoostIdeas.push("Launch a loyalty program", "Promote limited-time items");
        finalOptimizationAdvice = "Create combos, upsell sides and reward repeat customers through loyalty programs.";
        break;
    
      case process.env.HEALTHCARE:
        pricingStrategySuggestions.push("Offer consultation packages", "First-time checkup discounts");
        upsellOpportunities.push("Recommend regular checkups", "Promote wellness programs");
        revenueBoostIdeas.push("Enable digital booking", "Offer subscription wellness plans");
        finalOptimizationAdvice = "Bundle care services, upsell health packages and digitize patient interaction.";
        break;
    
      default:
        pricingStrategySuggestions.push("Introductory pricing", "A/B test price points");
        upsellOpportunities.push("Offer premium upgrades", "Cross-sell related services");
        revenueBoostIdeas.push("Email remarketing", "Google/Meta ads");
        finalOptimizationAdvice = "Test price points, upsell effectively and market online strategically.";
    }
 
    if (business.employees < 2) revenueRiskFactors.push("Low staffing may limit service capacity");
    if (avgPrice < 10) revenueRiskFactors.push("Low product pricing reduces margin buffer");
    if (estRevenue < 10000) revenueRiskFactors.push("Revenue below sustainability threshold");

    const salesData = {
      applicantId,
      applicationId,
      businessId: business._id,
      serviceId: application.serviceId,
      avgPrice,
      expectedDailySales,
      workingDaysPerMonth: workingDays,
      estimatedMonthlyRevenue: estRevenue, 
      pricingStrategySuggestions,
      upsellOpportunities,
      revenueBoostIdeas,
      revenueRiskFactors,
      finalOptimizationAdvice
    };

    const newSales = await SalesRevenueOptimization.create(salesData);

    const salesResult = await newSales.save();
      
    if(!salesResult || !salesResult._id){
      return res.status(400).json({ success: false, message: "Failed to create new Service" });
    }

    return res.status(201).json({ success: true, serviceId :salesResult._id }); 
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
 
const salesRevenueOptimizationFreeTrialService  = async (req, res) => {
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;

    const serviceExist = await SalesRevenueOptimization.findOne({applicantId: applicantId, applicationId: applicationId});
    console.log(serviceExist)
    if (!serviceExist) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }   
    
    return res.status(200).json({ success: true, 
        data :{
            expectedDailySales: serviceExist.expectedDailySales,
            estimatedMonthlyRevenue: serviceExist.estimatedMonthlyRevenue, 
        }
     });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 
 
const salesRevenueOptimizationPremiumService  = async (req, res) => {
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;

    const application = await Application.findOne({ _id: applicationId, applicantId: applicantId });

    console.log(application)
    if (!application || !application.paymentStatus) { 
        return res.status(400).json({success: false, message: "User has not completed payment for the service."});
    }     
    const serviceExist = await SalesRevenueOptimization.findOne({applicantId: applicantId, applicationId: applicationId}); 
 
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
 
const financialPlanningService = async (req, res) => {
    try {
      const {
        personalSavings,
        externalFunding,
        breakEvenTargetInMonths,
        expectedROIInMonths,
        marketingBudget, 
        registrationCost,
        legalConsultationCost
      } = req.body; 

      if(!personalSavings || !externalFunding|| !breakEvenTargetInMonths || !expectedROIInMonths 
        || !marketingBudget || !registrationCost || !legalConsultationCost){
        throw new Error("All fields are required!");
      }  

      const applicantId = req.params.applicantid;
      const applicationId = req.params.applicationid;
      const application = await Application.findOne({_id: applicationId, applicantId: applicantId});
      const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId'); 
     
      if (!business || !application) {
        return res.status(404).json({ success: false, message: "Business or application not found" });
      }
      const service = await Service.findOne({ _id: application.serviceId, name: process.env.FINANCIAL_PLANNING });

      if (!service) {
        return res.status(404).json({ success: false, message: "Service was not found" });
      }

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
          case process.env.RETAIL: 
            expectedRevenueStreams = ["In-store Sales", "Online Sales"];
            taxStrategy = "Retail-specific deductions like inventory write-offs";
            complianceConsiderations = ["Sales tax registration", "Return policy regulations"];
            finalRecommendation = "Use (E-commerce Ads, Influencer Marketing, Search Engine Optimization and Email Marketing)to drive foot traffic and expand e-commerce reach.";
            break;
        
          case process.env.FOOD_BEVERAGE:
            expectedRevenueStreams = ["Dine-in Sales", "Delivery Services", "Takeaway"];
            taxStrategy = "Include food-related deductions like spoilage and delivery mileage";
            complianceConsiderations = ["Health inspections", "Food safety certifications"];
            finalRecommendation = "Promote specials via (Instagram and Facebook, Food Bloggers and Influencers and Event Sponsorships) and prioritize hygiene compliance.";
            break;
        
          case process.env.HEALTHCARE:
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
        
      const financialPlanData  = {
        applicantId, 
        businessId: business._id,
        serviceId: application.serviceId,
        applicationId: applicationId, 
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
   
      const newFinancialPlanning = await FinancialPlanning.create(financialPlanData);
      const financialPlanningResult = await newFinancialPlanning.save();
      
      application.status = 'Approved';
      const result = await application.save();
      
      if(!result || !result._id){
        return res.status(400).json({ success: false, message:"Failed to create new Service" });
      }
      return res.status(201).json({ success: true, serviceId :financialPlanningResult._id });
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
            serviceId,   
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
            } = req.body;

        if(!consultantId || !applicantId || !serviceId || !businessOverview || !industryAnalysis || !competitorInsights ||
             !locationRecommendation || !targetAudienceDefinition || !marketingSuggestions || !operationsAdvice || !legalConsiderations ||
             !growthStrategy || !commonPitfalls || !summaryRecommendation || !deliveryFormat || !applicationId 
        ){
            throw new Error("All fields are required!");
        }    

        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const application = await Application.findOne({_id: applicationId, applicantId: applicantId, serviceId: serviceId});
    
        if (!application) { 
            return res.status(400).json({success: false, message: "Application was not found "});
        }   
        const service = await Service.findOne({ _id: application.serviceId, name: process.env.CONSULTANCY });

        if (!service) {
          return res.status(404).json({ success: false, message: "Service was not found" });
        }

        const consultancyData = {
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
        };  

        const newConsultancyService = await Consultancy.create(consultancyData);

        const consultancyServiceResult = await newConsultancyService.save();
 
        if (!consultancyServiceResult || !consultancyServiceResult._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new Service' });
        }
         
        application.status = 'Approved';
        await application.save();

        return res.status(201).json({ success: true, serviceId : consultancyServiceResult._id });

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
    processPayment, locationMarkrtAnalysisService, locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService,
    salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, salesRevenueOptimizationPremiumService,
    financialPlanningService, financialPlanningFreeTrialService,financialPlanningPremiumService, consultancyService,
    getApplicationStatus, updateApplication, updatePaymentStatus, addServiceApplication, getUserApplications, 
    getConsultantApplications, getAllConsultants, getAllServices
}; 