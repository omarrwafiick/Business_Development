const mongoose = require('mongoose');
 
const consultancySchema = new mongoose.Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },  
  businessIdea: { type: String, required: true  },
  stageOfBusiness : { type: String , enum: ['Idea', 'Startup', 'Growth', 'Mature'], required: true },
  targetMarket: { type: String, required: true  },
  monthlyBudget: { type: Number, required: true },
  mainGoal: { type: String, required: true  },
  businessOverview: { type: String }, // User's business description
  industryAnalysis: { type: String }, // Consultant's summary of market/sector
  competitorInsights: { type: String }, // Competitor evaluation & gaps
  locationRecommendation: { type: String }, // Suggested city/area
  targetAudienceDefinition: { type: String }, // Who the user should target
  marketingSuggestions: { type: String }, // Channels, branding, messaging
  operationsAdvice: { type: String }, // Staffing, process setup, logistics
  legalConsiderations: { type: String }, // Registration, license, permits
  growthStrategy: { type: String }, // Consultant’s plan to scale the businessS
  commonPitfalls: { type: String }, // What to avoid based on industry/context
  summaryRecommendation: { type: String }, // Final clear call-to-action or conclusion     
});  

const Consultancy = mongoose.model('Consultancy', consultancySchema);

module.exports = Consultancy;