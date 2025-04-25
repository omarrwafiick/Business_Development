const Joi = require('joi');
//reusables
const paymentStatus = Joi.boolean().required();
const status = Joi.string().valid('Pending', 'Approved', 'Rejected').required();
const consultantId = Joi.string().length(24).required(); 
const serviceId = Joi.string().length(24).required();   
////////////////////////////////////////////////////////
const paymentStatusSchema = Joi.object({
    paymentStatus
});
 
const updateApplicationSchema = Joi.object({
    paymentStatus,
    status: Joi.boolean().required()
});
 
const consultancyServiceSchema = Joi.object({
    consultantId,   
    businessOverview: Joi.string().min(10).required(),
    industryAnalysis: Joi.string().min(10).required(),
    competitorInsights: Joi.string().min(10).required(),
    locationRecommendation: Joi.string().min(10).required(),
    targetAudienceDefinition: Joi.string().min(10).required(),
    marketingSuggestions: Joi.string().min(10).required(),
    operationsAdvice: Joi.string().min(10).required(),
    legalConsiderations: Joi.string().min(10).required(),
    growthStrategy: Joi.string().min(10).required(),
    commonPitfalls: Joi.string().min(10).required(),
    summaryRecommendation: Joi.string().min(10).required(),
});

const seedConsultantSchema = Joi.object({
    consultantId,  
    businessIdea: Joi.string().min(10).required(), 
    stageOfBusiness: Joi.string().valid('Idea', 'Startup', 'Growth', 'Mature').required(),  
    targetMarket: Joi.string().min(10).required(),  
    monthlyBudget: Joi.number().positive().required(), 
    mainGoal: Joi.string().min(10).required(),  
});
 
const financialPlanningServiceSchema = Joi.object({ 
    monthlyRevenue: Joi.number().positive().required(),  
    monthlyCosts: Joi.number().positive().required(),  
    startupCost: Joi.number().positive().required()  
});
 
const addApplicationSchema = Joi.object({  
    serviceId,
    status, 
    paymentStatus 
});

const salesOptimizationSchema = Joi.object({ 
    numberOfEmployees: Joi.number().positive().required(),
    averagePrice: Joi.number().positive().required(),
    expectedDailySales: Joi.number().integer().min(0).required(),
    workingDays: Joi.number().integer().min(1).max(31).required(),
    estimatedRevenue: Joi.number().min(0).required()
});

const businessGuideSchema = Joi.object({  
    stageBusiness: Joi.number().required(), 
    currentlymakingMonthlyProfit: Joi.number().required(), 
    customersDoYouGetPerMonth: Joi.number().required(), 
    repeatCustomers: Joi.number().required(), 
    mainChallengeRightNow: Joi.number().required(), 
}); 

module.exports = { 
    paymentStatusSchema, updateApplicationSchema, consultancyServiceSchema, seedConsultantSchema,
    financialPlanningServiceSchema, addApplicationSchema, salesOptimizationSchema, businessGuideSchema
};