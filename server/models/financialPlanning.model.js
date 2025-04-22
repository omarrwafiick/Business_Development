const mongoose = require('mongoose');

const financialPlanningSchema = new mongoose.Schema({ 
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },   
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },   
  capitalAvailable: { type: Number }, // User's total available budget
  startupCostsBreakdown: {
    type: Map,
    of: Number // e.g., { equipment: 10000, marketing: 5000 }
  },// initial costs a startup incurs when it begins operations. It helps to understand where the money is going during the early stages of business
  monthlyFixedCosts: { type: Number },
  monthlyVariableCosts: { type: Number },  expectedRevenueStreams: [{ type: String }],   
  expectedROI: { type: Number },
  breakEvenPoint: { type: String },  
  taxStrategy: { type: String },
  complianceConsiderations: [{ type: String }], 
  finalRecommendation: { type: String }, // Summary advice from planner      
  chartImage: {
    type: Buffer, 
    required: false
  },
  chartImageType: {
    type: String, 
    required: false
  },
  reportPublishedAt: { type: Date, default: Date.now }
});
 
const FinancialPlanning = mongoose.model('FinancialPlanning', financialPlanningSchema);
  
module.exports = FinancialPlanning;