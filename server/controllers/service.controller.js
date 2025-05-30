const { default: mongoose } = require('mongoose');
const Application = require('../models/application.model');
const Consultancy = require('../models/consultancy.model'); 
const Service = require('../models/service.model'); 
const Consultant = require('../models/consultant.model');  
const FinancialPlanning = require('../models/financialPlanning.model');
const Business = require('../models/business.model'); 
const LocationMarketAnalysis = require('../models/locationMarkrtAnalysis.model'); 
const SalesRevenueOptimization = require('../models/salesRevenueOptimization.model'); 
const User = require('../models/user.model'); 
const { VerifyApplication, VerifyService } = require('../utilities/common');
const Mailing = require('../services/mailing.service');

const addServiceApplication = async (req, res) => {  
    try {  
        const { serviceId, status, paymentStatus } = req.body;

        if(!serviceId || !status ){
            throw new Error("All fields are required!");
        }   
        const applicantId = req.params.applicantid;
 
        const userExist = await User.findById(applicantId);

        if (!userExist) {
            return res.status(404).json({success: false, message: "User was not found" });}  

        const service = await Service.findOne({ _id: serviceId }); 
      
        if (!service) {
          return res.status(404).json({ success: false, message: "Service not found" });
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

        if (!newApplication || !newApplication._id) { 
            return res.status(400).json({ success: false, message: 'Failed to create new application' });
        }

        return res.status(201).json({ success: true, applicationId: newApplication._id });

    } catch (error) { 
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};    
 
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

    if(!stageOfBusiness || !monthlyProfitStatus || !monthlyCustomerCount || !repeatCustomerLevel || !currentChallenge ){
      throw new Error("All fields are required!");
    }   
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
  
    const application = await VerifyApplication(applicantId, applicationId);
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const service = await VerifyService(process.env.LOCATION_MARKET_ANALYSIS, application.serviceId);
 
    if (!service) {
      return res.status(404).json({ success: false, message: "Service was not found" });
    }

    const serviceFullfilled = await LocationMarketAnalysis.find({applicationId, applicantId}); 
 
    if (serviceFullfilled) {
      return res.status(400).json({ success: false, message: "Service is already exists with this application" });
    }
 
    const business = await Business.findOne({ ownerId: applicantId }).populate('categoryId locationId'); 
 
    if (!business) {
      return res.status(404).json({ success: false, message: "Business was not found" });
    } 

    const businessLocation = business.locationId;
    const businessCategory = business.categoryId;
 
    const nearbyBusinessesLocations = await Location.find({name: businessLocation.name, 'businesses.categoryId': businessCategory });

    const sameCategoryNearby = nearbyBusinessesLocations.count; 

    const competitionLevel = sameCategoryNearby > 10
      ? "High competition in this location"
      : sameCategoryNearby >= 5
        ? "Moderate competition detected"
        : "Low competition – potential opportunity"; 

    const marketingStrategies = [];
    let finalLocationAdvice = ""; 

    //todos make it dynamic
    switch (businessCategory.name) {
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
 
    const totalNearbyBusinesses = await Location.find({name: businessLocation.name});

    const analysisData = {
      applicantId,
      businessId: business._id,
      applicationId,
      serviceId: application.serviceId,
      locationId: location._id,
      sameCategoryCount : sameCategoryNearby,
      totalNearbyBusinesses: totalNearbyBusinesses.count, 
      competitionLevel,
      marketingStrategies,
      finalLocationAdvice
    };

    const newLocation = await LocationMarketAnalysis.create(analysisData);

    if (!newLocation || !newLocation._id) { 
      return res.status(400).json({ success: false, message: 'Failed to create new Service' });
    }

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

    const serviceExist = await LocationMarketAnalysis.findOne({applicantId: applicantId, applicationId: applicationId});
 
    if (!serviceExist) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }  
    
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
 
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const serviceExist = await LocationMarketAnalysis.findOne({applicantId: applicantId, applicationId: applicationId});
 
    if (!serviceExist || !application.paymentStatus) {
      return res.status(404).json({ success: false, message: "User has not completed payment for the service." });
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
    const { numberOfEmployees, averagePrice, expectedDailySales, workingDays, estimatedRevenue } = req.body;

    if(!numberOfEmployees || !averagePrice || !expectedDailySales || !workingDays || !estimatedRevenue ){
      throw new Error("All fields are required!");
    }      
        
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

    const serviceFullfilled = await SalesRevenueOptimization.find({applicationId, applicantId}); 

    if (serviceFullfilled) {
      return res.status(400).json({ success: false, message: "Service is already exists with this application" });
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
 
    const serviceExist = await SalesRevenueOptimization.findOne({applicantId: applicantId, applicationId: applicationId});

    if (!serviceExist) {
      return res.status(404).json({ success: false, message: "No service was found" });
    }   
    
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
      monthlyRevenue, 
      monthlyCosts, 
      startupCost 
    } = req.body; 
    
    if(!monthlyRevenue || !monthlyCosts || !startupCost ){
        throw new Error("All fields are required!");
    } 

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

    const serviceFullfilled = await FinancialPlanning.find({applicationId, applicantId}); 
 
    if (serviceFullfilled) {
      return res.status(400).json({ success: false, message: "Service is already exists with this application" });
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
    
    application.status = 'Approved';
    await application.save();
    
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

      const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId});

      if (!serviceExist) {
        return res.status(404).json({ success: false, message: "No service was found" });
      }  
      
      return res.status(200).json({ success: true, 
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
      const serviceExist = await FinancialPlanning.findOne({applicantId: applicantId, applicationId: applicationId}); 
   
      if (!serviceExist) {
        return res.status(404).json({ success: false, message: "No service was found" });
      }   
 
      return res.status(200).json({ 
        success: true,
        data: {
          ...serviceExist
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

      if(!consultantId  || !businessIdea || !stageOfBusiness 
       || !targetMarket || !monthlyBudget || !mainGoal 
      ){
          throw new Error("All fields are required!");
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
  
      const serviceFullfilled = await Consultancy.find({applicationId, applicantId}); 
   
      if (serviceFullfilled) {
        return res.status(400).json({ success: false, message: "Service is already exists with this application" });
      }      const user = await User.findOne({ _id: applicantId });

      if (!user) { 
          return res.status(404).json({success: false, message: "User was not found "});
      }   

      const consultant = await Consultant.findOne({ _id: consultantId });
      if (!consultant) { 
        return res.status(404).json({success: false, message: "Consultant was not found "});
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

        if(!businessOverview || !industryAnalysis || !competitorInsights || !locationRecommendation 
           || !targetAudienceDefinition || !marketingSuggestions || !operationsAdvice || !legalConsiderations ||
           !growthStrategy || !commonPitfalls || !summaryRecommendation
        ){
            throw new Error("All fields are required!");
        }    

        const consultencyId = req.params.consultencyid;
        const applicantId = req.params.applicantid;
        const applicationId = req.params.applicationid;

        const application = await VerifyApplication(applicantId, applicationId);
 
        if (!application) {
          return res.status(404).json({ success: false, message: "Application not found" });
        }

        const serviceFullfilled = await Consultancy.find({applicationId, applicantId}); 
     
        if (!serviceFullfilled) {
          return res.status(400).json({ success: false, message: "Service does not exist with this application" });
        }

        const consultancyService = await Consultancy.findById(consultencyId);

        if (!consultancyService) { 
          return res.status(404).json({success: false, message: "Service was not found "});
        }

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

        const consultancyServiceResult = await consultancyService.save();

        application.status = 'Approved';
        await application.save();

        const user = await User.findById(applicantId);
        await Mailing(
          user.email,
          'Consultancy Service Response',
          `
            <p>This is your consultancy results as you applied for - all fields corresponds to your business data you provided</p>  
            <p>Business Overview : ${businessOverview}}</p>
            <p>Industry Analysis : ${industryAnalysis}}</p>
            <p>Competitor Insights: ${competitorInsights}}</p>
            <p>Location Recommendation : ${locationRecommendation}}</p>
            <p>Target Audience Definition : ${targetAudienceDefinition}}</p>
            <p>Marketing Suggestions : ${marketingSuggestions}}</p>
            <p>Operations Advice : ${operationsAdvice}}</p>
            <p>Legal Considerations : ${legalConsiderations}}</p>
            <p>Growth Strategy : ${growthStrategy}}</p>
            <p>Common Pit falls : ${commonPitfalls}}</p>
            <p>Summary Recommendation : ${summaryRecommendation}}</p>
          `
        );

        return res.status(201).json({ success: true, consultsncyId : consultancyServiceResult._id });

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
         data
      });
 
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
    const consultantId = req.params.consultantid;

    const consultations = await Consultancy.findById(consultantId).limit(10); 

    if (!consultations) {  
      return res.status(404).json({ success: false, message: "No consultation was found" });
    }  

    return res.status(200).json({ success: true, data: consultations });

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
        
        if(!application.isModified()){
          return res.status(400).json({ success: false, message: "Application couldn't be updated"}); 
        };  
 
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

        if(!application.isModified()){
          return res.status(400).json({ success: false, message: "Application couldn't be updated"}); 
        };  
 
        await application.save();
 
        return res.status(200).json({ success: true, paymentStatus});    
    
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
    const consultancyResult = await Consultancy.find({applicantId}).populate('applicationId');
    const financialPlannigResult = await FinancialPlanning.find({applicantId}).populate('applicationId');
    const locationAnalysisResult = await LocationMarketAnalysis.find({applicantId}).populate('applicationId');
    const salesOptimizationResult = await SalesRevenueOptimization.find({applicantId}).populate('applicationId');

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
      return res.status(400).json({success: false, message: "Service is not paid"});
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

module.exports = { 
    locationMarkrtAnalysisService, locationMarkrtAnalysisFreeTrialService, locationMarkrtAnalysisPremiumService,
    salesRevenueOptimizationService, salesRevenueOptimizationFreeTrialService, salesRevenueOptimizationPremiumService,
    financialPlanningService, financialPlanningFreeTrialService,financialPlanningPremiumService, consultancyService,
    getApplicationStatus, updateApplication, updatePaymentStatus, addServiceApplication, getUserApplications, 
    getConsultantApplications, getAllConsultants, getAllServices, seedDataToConsultant, businessGuideService, 
    getConsultancyResult, integratedReport
}; 