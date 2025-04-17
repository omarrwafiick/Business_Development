const mongoose = require('mongoose');

const salesRevenueOptimizationSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },  
    currentMonthlyRevenue: { type: Number },
    salesConversionRate: { type: Number },
    averageTransactionValue: { type: Number },
    suggestedUpsellingStrategies: [{ type: String }],
    pricingOptimizationTips: [{ type: String }],
    channelPerformance: [{ channel: String, percentage: Number }],  
    performanceBenchmarks: { type: String },
    revenueBoostPlan: { type: String }, // Strategic summary 
    reportPublishedAt: { type: Date, default: Date.now }
});
   
const SalesRevenueOptimization = mongoose.model('SalesRevenueOptimization', salesRevenueOptimizationSchema);

module.exports = SalesRevenueOptimization;