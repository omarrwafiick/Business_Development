const mongoose = require('mongoose');

const locationMarketAnalysisSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },  
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, 
    competitionLevel: { type: String, required: true },
    sameCategoryCount: { type: Number, required: true },
    totalNearbyBusinesses: { type: Number, required: true },
    marketingStrategies: { type: [String], required: true },
    finalLocationAdvice: { type: String, required: true }, 
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
    
const LocationMarketAnalysis = mongoose.model('LocationMarketAnalysis', locationMarketAnalysisSchema);

module.exports = LocationMarketAnalysis;
 
       