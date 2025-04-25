const mongoose = require('mongoose');

const salesRevenueOptimizationSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },  
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    avgPrice: { type: Number, required: true },
    numberOfEmployees: { type: Number, required: true },
    expectedDailySales: { type: Number, required: true },
    workingDaysPerMonth: { type: Number, required: true },
    estimatedMonthlyRevenue: { type: Number, required: true }, 
    pricingStrategySuggestions: { type: [String], required: true },
    upsellOpportunities: { type: [String], required: true },
    revenueBoostIdeas: { type: [String], required: true },
    revenueRiskFactors: { type: [String], required: true },
    finalOptimizationAdvice: { type: String, required: true },
    chartImage: { 
        type: Buffer, 
        required: false
      },
      chartImageType: {
        type: String, 
        required: false
      },
    reportGeneratedAt: { type: Date, default: Date.now }
});  
   
const SalesRevenueOptimization = mongoose.model('SalesRevenueOptimization', salesRevenueOptimizationSchema);

module.exports = SalesRevenueOptimization;
            