const mongoose = require('mongoose');

const locationMarketAnalysisSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },  
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    populationDensity: { type: Number, required: true },
    footTrafficScore: { type: String, enum :["High", "Moderate"], required: true },
    competitionLevel: { type: String, required: true },
    sameCategoryCount: { type: Number, required: true },
    totalNearbyBusinesses: { type: Number, required: true },
    marketingStrategies: { type: [String], required: true },
    finalLocationAdvice: { type: String, required: true }, 
    reportGeneratedAt: { type: Date, default: Date.now }
}); 
    
const LocationMarketAnalysis = mongoose.model('LocationMarketAnalysis', locationMarketAnalysisSchema);

module.exports = LocationMarketAnalysis;
 
       