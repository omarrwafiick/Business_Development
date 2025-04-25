const mongoose = require('mongoose'); 

const businessGuideSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicantionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application Service', required: true }, 
  answers: {
    stageOfBusiness: {
      type: Number, // 1 = Just an idea, 2 = Started but early, 3 = Running for a while
      required: true,
      enum: [1, 2, 3] 
    },
    monthlyProfitStatus: {
      type: Number, // 1 = No profit, 2 = Small/inconsistent, 3 = Steady profit
      required: true,
      enum: [1, 2, 3]
    },
    monthlyCustomerCount: {
      type: Number, // 1 = 0–10, 2 = 10–100, 3 = 100+
      required: true,
      enum: [1, 2, 3]
    },
    repeatCustomerLevel: {
      type: Number, // 1 = None, 2 = Some, 3 = Regular
      required: true,
      enum: [1, 2, 3]
    },
    currentChallenge: {
      type: Number, // 1 = Getting customers, 2 = Managing operations, 3 = Marketing, 4 = Not sure
      required: true,
      enum: [1, 2, 3, 4]
    }
  },
  recommendation: { type: String, required: true },
  suggestion: { type: String, required: true },
  cta: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BusinessGuide = mongoose.model('Business Guide', businessGuideSchema);
 
module.exports = BusinessGuide;
