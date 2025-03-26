
const mongoose = require('mongoose');

// Define the RiskAssessment Schema
const RiskAssessmentSchema = new mongoose.Schema({
  backgroundCheckId: { type: mongoose.Schema.Types.ObjectId, ref: 'BackgroundCheck', required: true },
  riskScore: { type: Number, required: true },
  //assessmentDate: { type: Date, required: true },
  details: { type: Object },
});

// Create the RiskAssessment model from the schema
module.exports = mongoose.model('RiskAssessment', RiskAssessmentSchema);

