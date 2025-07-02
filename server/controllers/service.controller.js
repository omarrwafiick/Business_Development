const Application = require('../models/application.model');
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const Consultant = require('../models/consultant.model');   
const Location = require('../models/location.model');  
const FinancialPlanning = require('../models/financialPlanning.model');
const Business = require('../models/business.model'); 
const LocationMarketAnalysis = require('../models/locationMarkrtAnalysis.model'); 
const SalesRevenueOptimization = require('../models/salesRevenueOptimization.model'); 
const User = require('../models/user.model'); 
const { VerifyApplication, VerifyService } = require('../utilities/common');
const Mailing = require('../services/mailing.service');
require('dotenv').config();

const businessGuideService = async (req, res) => {
  // 1 = Just an idea, 2 = Started but early, 3 = Running for a while
  // 1 = No profit, 2 = Small/inconsistent, 3 = Steady profit
  // 1 = 0–10, 2 = 10–100, 3 = 100+
  // 1 = None, 2 = Some, 3 = Regular
  // 1 = Getting customers, 2 = Managing operations, 3 = Marketing, 4 = Not sure
  try {
    const {  
      stageOfBusiness,          
      monthlyProfitStatus,     
      monthlyCustomerCount,   
      repeatCustomerLevel,     
      currentChallenge          
    } = req.body; 

    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid; 
 
    const application = await VerifyApplication(applicantId, applicationId);
   
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    
    const service = await VerifyService(process.env.BUSINESS_GUIDE, application.serviceId);
 
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    let recommendation = '';
    let suggestion = '';
    let cta = '';

    switch (true) {
      case stageOfBusiness === 1:
        recommendation = 'You need to validate your idea first. Talk to potential customers, build a simple version of your product, and test demand.';
        suggestion = 'Use Feasibility Study tool';
        cta = 'Try our idea checker or book a session.';
        break;

      case stageOfBusiness === 2 &&
          monthlyProfitStatus === 1 &&
          (monthlyCustomerCount === 1 || monthlyCustomerCount === 2):
        recommendation = 'Focus on improving your product or service and building a small but loyal customer base before thinking about growth.';
        suggestion = 'Use Sales Estimator and Marketing Estimator';
        cta = 'Run a mini campaign and measure response.';
        break;

      case monthlyProfitStatus === 2 &&
          monthlyCustomerCount === 2 &&
          repeatCustomerLevel === 2 &&
          (currentChallenge === 1 || currentChallenge === 3):
        recommendation = 'Your business shows potential. Focus on improving your marketing and increasing customer retention.';
        suggestion = 'Use Marketing Estimator';
        cta = 'Book a growth session to identify quick wins.';
        break;

      case monthlyProfitStatus === 3 &&
          monthlyCustomerCount === 3 &&
          repeatCustomerLevel === 3:
        recommendation = "You're ready to scale. Explore new markets, products, or digital transformation.";
        suggestion = 'Business Strategy session';
        cta = 'Let us help you plan your next growth phase.';
        break;

      case (repeatCustomerLevel === 2 || repeatCustomerLevel === 3) &&
          currentChallenge === 3:
        recommendation = "You have a loyal base. You're missing out by not doing enough marketing. Create a simple campaign.";
        suggestion = 'Use Marketing Estimator';
        cta = 'Try our basic marketing plan generator.';
        break;

      case currentChallenge === 4:
        recommendation = "Let's help you figure things out. A quick review of your business status can guide your next step.";
        suggestion = 'Feasibility Study';
        cta = 'Start with a free assessment.';
        break;

      default:
        recommendation = 'We need more context to provide recommendations.';
        suggestion = 'Speak to our consultants';
        cta = 'Book a discovery session.';
        break;
    }
 
    return res.status(201).json({
      success: true,
      data : [ 
        recommendation,
        suggestion,
        cta,
      ]
    });

  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}; 

const locationMarkrtAnalysisService = async (req, res) => {
  try {
    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid; 
    //verifications
    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const service = await VerifyService(process.env.LOCATION_MARKET_ANALYSIS, application.serviceId);
 
    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }

    const applicationExpired = await LocationMarketAnalysis.find({applicationId: applicationId});

    if (applicationExpired.length > 0) {
      return res.status(400).json({ success: false, message: "Application expired please apply again" });
    } 
    //business logic
    const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId'); 
 
    if (!business) {
      return res.status(404).json({ success: false, message: "Business was not found" });
    } 

    const businessCategoryId = business.categoryId;
 
    const nearbyBusinessesLocations = await Location.find({name: business.locationName, 'businesses.categoryId': businessCategoryId });

    const sameCategoryNearby = nearbyBusinessesLocations.filter(l => l.businesses.categoryId === businessCategoryId).length; 

    const competitionLevel = sameCategoryNearby > 10
      ? "High competition in this location"
      : sameCategoryNearby >= 5
        ? "Moderate competition detected"
        : "Low competition – potential opportunity"; 

    const marketingStrategies = [];
    let finalLocationAdvice = ""; 

    //todos make it dynamic
    switch (business.categoryId.name) {
      case process.env.RETAIL: 
        marketingStrategies.push("Launch local influencer campaigns", "Use bold storefront visuals");
        finalLocationAdvice = competitionLevel.includes("Low")
          ? "Capitalize on low competition and promote opening deals"
          : "Focus on branding and loyalty programs to stand out.";
        break;  
      default:
        marketingStrategies.push("Test localized ad campaigns", "Engage through community events");
        finalLocationAdvice = "Observe your category’s local presence and align your strategy with underserved needs.";
    } 

    let bestLocation = nearbyBusinessesLocations
      .filter(loc => loc.businesses.some(b => b.categoryId.toString() === businessCategoryId._id.toString()))
      .sort((a, b) => {
        const aCount = a.businesses.filter(b => b.categoryId.toString() === businessCategoryId._id.toString()).length;
        const bCount = b.businesses.filter(b => b.categoryId.toString() === businessCategoryId._id.toString()).length;
        return aCount - bCount;
      })[0];

    //fallback
    if (!bestLocation && nearbyBusinessesLocations.length > 0) {
      bestLocation = nearbyBusinessesLocations[0];
    }
        
    const analysisData = {
      applicantId,
      businessId: business._id,
      applicationId,
      serviceId: application.serviceId,
      locationId: bestLocation._id,
      sameCategoryCount : sameCategoryNearby,
      totalNearbyBusinesses: nearbyBusinessesLocations.length,
      competitionLevel,
      marketingStrategies,
      finalLocationAdvice
    };

    const newLocation = await LocationMarketAnalysis.create(analysisData);

    if (!newLocation || !newLocation._id) { 
      return res.status(400).json({ success: false, message: 'Failed to create new Service' });
    }

    await approveApplication(application); 

    return res.status(201).json({ success: true, serviceId: newLocation._id });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const locationMarkrtAnalysisFreeTrialService = async (req, res) => {
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;
    
    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    
    let serviceExist = await LocationMarketAnalysis.find({applicantId: applicantId, applicationId: applicationId});

    if (serviceExist.length <= 0) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }  
    
    serviceExist = serviceExist[serviceExist.length-1];

    return res.status(200).json({ success: true, 
        data :{ 
            competitionLevel: serviceExist.competitionLevel,
            totalNearbyBusinesses: serviceExist.totalNearbyBusinesses
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
    
    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application || !application.paymentStatus) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const serviceExist = await LocationMarketAnalysis.find({applicantId: applicantId, applicationId: applicationId});;
 
    if (serviceExist.length <= 0) {
      return res.status(404).json({ success: false, message: "User has not completed payment for the service." });
    }  

    return res.status(200).json({ success: true, 
        data : serviceExist[serviceExist.length-1]
     });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

const salesRevenueOptimizationService = async (req, res) => {
  try {
    const { numberOfEmployees, averagePrice, expectedDailySales, workingDays, estimatedRevenue } = req.body;  
        
    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid;
      
    const application = await VerifyApplication(applicantId, applicationId);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const service = await VerifyService(process.env.SALES_REVENUE_OPTIMIZATION, application.serviceId);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }
 
    const applicationExpired = await SalesRevenueOptimization.find({applicationId: applicationId});

    if (applicationExpired.length>0) {
      return res.status(400).json({ success: false, message: "Application expired please apply again" });
    }

    const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId'); 
  
    if (!business) {
      return res.status(404).json({ success: false, message: "Business was not found" });
    } 
  
    const category = business.categoryId.name;

    const pricingStrategySuggestions = [];
    const upsellOpportunities = [];
    const revenueBoostIdeas = [];
    const revenueRiskFactors = []; 
    let finalOptimizationAdvice = "";
 
    //todos :make it dynamic
    switch (category) {
      case process.env.RETAIL:  
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
    //todos :make it dynamic
    if (numberOfEmployees < 2) revenueRiskFactors.push("Low staffing may limit service capacity");
    if (averagePrice < 10) revenueRiskFactors.push("Low product pricing reduces margin buffer");
    if (estimatedRevenue < 10000) revenueRiskFactors.push("Revenue below sustainability threshold");  

    const salesData = {
      applicantId,
      applicationId,
      businessId: business._id,
      serviceId: application.serviceId,
      numberOfEmployees,
      avgPrice : averagePrice,
      expectedDailySales,
      workingDaysPerMonth: workingDays,
      estimatedMonthlyRevenue: estimatedRevenue, 
      pricingStrategySuggestions,
      upsellOpportunities,
      revenueBoostIdeas,
      revenueRiskFactors, 
      finalOptimizationAdvice
    };

    const newSales = await SalesRevenueOptimization.create(salesData);
     
    if(!newSales || !newSales._id){
      return res.status(400).json({ success: false, message: "Failed to create new Service" });
    }

    await approveApplication(application); 

    return res.status(201).json({ success: true, serviceId :newSales._id }); 
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
 
const salesRevenueOptimizationFreeTrialService  = async (req, res) => {
  try {  
    const applicantId = req.params.applicantid;
    const applicationId = req.params.applicationid;

    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
 
    let serviceExist = await SalesRevenueOptimization.find({applicantId: applicantId, applicationId: applicationId});

    if (serviceExist.length <= 0) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }    

    serviceExist = serviceExist[serviceExist.length-1];
    
    return res.status(200).json({ success: true, 
        data :{
            revenueBoostIdeas: serviceExist.revenueBoostIdeas,
            upsellOpportunities: serviceExist.upsellOpportunities, 
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

    const application = await VerifyApplication(applicantId, applicationId);

    if (!application || !application.paymentStatus) { 
        return res.status(400).json({success: false, message: "User has not completed payment for the service."});
    }     
    const serviceExist = await SalesRevenueOptimization.find({applicantId: applicantId, applicationId: applicationId}); 
 
    if (serviceExist.length <= 0) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }  
    
    return res.status(200).json({ 
        success: true, 
        data : serviceExist[serviceExist.length-1]
     });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 
 
const financialPlanningService = async (req, res) => {
  try {  
    const { 
      monthlyRevenue, 
      monthlyCosts, 
      startupCost 
    } = req.body;  

    const applicationId = req.params.applicationid;
    const applicantId = req.params.applicantid;   
  
    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const service = await VerifyService(process.env.FINANCIAL_PLANNING, application.serviceId);
 
    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }
 
    const applicationExpired = await FinancialPlanning.find({applicationId: applicationId});

    if (applicationExpired.length > 0) {
      return res.status(400).json({ success: false, message: "Application expired please apply again" });
    }
 
    const business = await Business.findOne({ownerId: applicantId}).populate('categoryId');

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business was not found' });
    } 
    
    const location = await Location.find({name: business.locationName}).populate('businesses.categoryId').lean();
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found.' });
    } 

    const netProfit = monthlyRevenue - monthlyCosts;
    const breakEvenMonths = netProfit > 0 ? Math.ceil(startupCost / netProfit) : null;
    const roi6Months = (netProfit * 6) - startupCost;
    
    const financialHealthIndex = netProfit > 0
      ? breakEvenMonths <= 6
        ? 'Healthy'
        : 'Break-even'
      : 'At Risk';
    
    const categoryBusiness = location.businesses?.find(
      (b) => b.categoryId._id.toString() === business.categoryId._id.toString()
    );

    const totalBusinesses = location.businesses?.reduce(
      (sum, b) => sum + b.count,
      0
    ) || 0;
    
    const locationMarketScore = categoryBusiness
      ? Math.round((categoryBusiness.count / totalBusinesses) * 100)
      : 0;
    let competitiveInsight = '';
    let suggestedStrategy = '';
    
    if (locationMarketScore > 70) {
      competitiveInsight = 'Highly competitive area';
      suggestedStrategy = 'Differentiate via pricing, service, or niche';
    } else if (locationMarketScore > 30) {
      competitiveInsight = 'Moderate competition';
      suggestedStrategy = 'Leverage marketing, improve retention';
    } else {
      competitiveInsight = 'Low competition';
      suggestedStrategy = 'Capitalize on first-mover advantage';
    } 

    const financialPlan = await FinancialPlanning.create({
      applicantId,
      businessId: business._id,
      applicationId,
      monthlyRevenue,
      monthlyCosts,
      startupCost,
      netProfit,
      breakEvenMonths,
      roi6Months,
      financialHealthIndex,
      locationMarketScore,
      competitiveInsight,
      suggestedStrategy
    });
    
    await approveApplication(application); 
    
    return res.status(201).json({
      success: true,
      financialPlanningId: financialPlan._id
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 

const financialPlanningFreeTrialService  = async (req, res) => { 
   try {  
      const applicantId = req.params.applicantid;
      const applicationId = req.params.applicationid;

      const application = await VerifyApplication(applicantId, applicationId);
 
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }

      let serviceExist = await FinancialPlanning.find({applicantId: applicantId, applicationId: applicationId});

      if (serviceExist.length <= 0) {
        return res.status(404).json({ success: false, message: "No service was found" });
      }  

      serviceExist = serviceExist[serviceExist.length-1];

      return res.status(200).json({ 
          success: true, 
          data :{
              breakEvenMonths: serviceExist.breakEvenMonths,
              financialHealthIndex: serviceExist.financialHealthIndex
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

      const application = await VerifyApplication(applicantId, applicationId);
 
      if (!application || !application.paymentStatus) { 
          return res.status(400).json({success: false, message: "User has not completed payment for the service."});
      }     
      const serviceExist = await FinancialPlanning.find({applicantId: applicantId, applicationId: applicationId}); 
   
      if ( serviceExist.length <= 0 ) {
        return res.status(404).json({ success: false, message: "No service was found" });
      }   
 
      return res.status(200).json({ 
        success: true,
        data: {
          ...serviceExist[serviceExist.length-1]
        }
      }); 
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
 
const seedDataToConsultant  = async (req, res) => {
  try {  
      const { 
          consultantId,  
          businessIdea,
          stageOfBusiness, 
          targetMarket,
          monthlyBudget,
          mainGoal
      } = req.body; 
     
      const consultant = await Consultant.findOne({ _id: consultantId });
      
      if (!consultant) { 
        return res.status(404).json({success: false, message: "Consultant was not found "});
      } 

      const applicantId = req.params.applicantid;
      const applicationId = req.params.applicationid;

      const application = await VerifyApplication(applicantId, applicationId);
 
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      const service = await VerifyService(process.env.CONSULTANCY, application.serviceId);
   
      if (!service) {
        return res.status(404).json({ success: false, message: "Service was not found" });
      }
  
      const applicationExpired = await Consultancy.find({applicationId: applicationId});

      if (applicationExpired.length > 0) {
        return res.status(400).json({ success: false, message: "Application expired please apply again" });
      }  

      const newConsultancyService = await Consultancy.create({
          consultantId ,
          applicantId , 
          applicationId,
          businessIdea,
          stageOfBusiness,
          targetMarket,
          monthlyBudget,
          mainGoal
      });  

      if (!newConsultancyService || !newConsultancyService._id) { 
          return res.status(400).json({ success: false, message: 'Failed to create new Service' });
      }
       
      application.status = 'Approved';
      await application.save();

      return res.status(201).json({ success: true, consultsncyId : newConsultancyService._id });

  } catch (error) {
      console.error('Error in addLocation:', error); 
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}; 
 
const consultancyService  = async (req, res) => {
    try {  
        const {   
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
            summaryRecommendation
        } = req.body;
   
        const consultencyId = req.params.consultencyid;
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const application = await VerifyApplication(applicantId, applicationId);
 
        if (!application) {
          return res.status(404).json({ success: false, message: "Application not found" });
        } 

        var consultancyService = await Consultancy.find({_id: consultencyId});
        
        if (consultancyService.length <= 0 || consultancyService.length > 1) { 
          return res.status(404).json({success: false, message: "Service was not found or application was expired"});
        }
        consultancyService = consultancyService[consultancyService.length-1];

        consultancyService.businessOverview = businessOverview;
        consultancyService.industryAnalysis = industryAnalysis;
        consultancyService.competitorInsights = competitorInsights;
        consultancyService.locationRecommendation = locationRecommendation;
        consultancyService.targetAudienceDefinition = targetAudienceDefinition;
        consultancyService.marketingSuggestions = marketingSuggestions;
        consultancyService.operationsAdvice = operationsAdvice;
        consultancyService.legalConsiderations = legalConsiderations;
        consultancyService.growthStrategy = growthStrategy;
        consultancyService.commonPitfalls = commonPitfalls;
        consultancyService.summaryRecommendation = summaryRecommendation;
 
        if (!consultancyService.isModified()) { 
          return res.status(400).json({ success: false, message: 'Failed to create new Service' });
        }

        await consultancyService.save();

        await approveApplication(application); 

        const user = await User.findById(applicantId);

        await Mailing(
          user.email,
          'Consultancy Service Response',
          `
            <p>A consultant of id ${consultancyService.consultantId} respond to your request please check your box on our platform</p>  
          `
        );

        return res.status(201).json({ success: true });

    } catch (error) {
        console.error('Error in addLocation:', error); 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 

const getConsultancyResult = async (req, res) => { 
  try {  
     const applicantId = req.params.applicantid; 
     
     const data = await Consultancy.find({applicantId: applicantId});
 
     if (!data) {
       return res.status(404).json({ success: false, message: "No service was found" });
     }  
     
     return res.status(200).json({ success: true, 
        data: data[data.length-1]
      });
 
   } catch (error) {
     return res.status(500).json({ message: 'Internal server error', error: error.message });
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

const integratedReport = async (req, res) => {
  try {     
    const applicantId = req.params.applicantid; 

    const user = await User.findById(applicantId);

    if (!user) { 
        return res.status(400).json({success: false, message: "No service result was found"});
    }  
    var consultancyResult = await Consultancy.find({applicantId});
    var financialPlannigResult = await FinancialPlanning.find({applicantId});
    var locationAnalysisResult = await LocationMarketAnalysis.find({applicantId});
    var salesOptimizationResult = await SalesRevenueOptimization.find({applicantId});

    consultancyResult = consultancyResult[consultancyResult.length-1];
    financialPlannigResult = financialPlannigResult[financialPlannigResult.length-1];
    locationAnalysisResult = locationAnalysisResult[locationAnalysisResult.length-1];
    salesOptimizationResult = salesOptimizationResult[salesOptimizationResult.length-1];
    
    if(
      !consultancyResult.applicantId.paymentStatus ||
      !financialPlannigResult.applicantId.paymentStatus ||
      !locationAnalysisResult.applicantId.paymentStatus ||
      !salesOptimizationResult.applicantId.paymentStatus
    ){
      return res.status(400).json({success: false, message: "Services or some was not paid"});
    }

    return res.status(200).json({ success: true, servicesResult : {
      consultancyResult,
      financialPlannigResult,
      locationAnalysisResult,
      salesOptimizationResult
    }});    
  
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    } 
};

const approveApplication = async (application) => {
  try {     
    application.status = 'Approved';
    await application.save();   
  
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    } 
};

module.exports = { 
    locationMarkrtAnalysisService, locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService,
    salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, salesRevenueOptimizationPremiumService,
    financialPlanningService, financialPlanningFreeTrialService,financialPlanningPremiumService, consultancyService,
    getAllServices, seedDataToConsultant, businessGuideService, getConsultancyResult, integratedReport
}; 