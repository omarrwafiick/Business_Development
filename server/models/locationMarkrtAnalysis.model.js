const mongoose = require('mongoose');

const locationMarketAnalysisSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true },
    currentLocationScore: { type: Number },  
    idealLocationTraits: [{ type: String }],  
    competitorLocations: [{ name: String, distanceInKm: Number }], 
    trafficFlowEstimate: { type: Number }, 
    nearbyAmenities: [{ type: String }],
    zoningCompliance: { type: String },
    locationSuitabilityCommentary: { type: String }, 
    reportPublishedAt: { type: Date, default: Date.now }
});
    
const LocationMarketAnalysis = mongoose.model('LocationMarketAnalysis', locationMarketAnalysisSchema);

module.exports = LocationMarketAnalysis;