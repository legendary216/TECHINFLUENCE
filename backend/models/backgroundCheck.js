const mongoose = require('mongoose');

// Define the BackgroundCheck Schema
const BackgroundCheckSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'failed'], required: true },//final status
  submittedDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  riskAssessmentScore: { type: Number },
  completionDate: { type: Date },
  resultDetails: { type: Object },
});

// Create the BackgroundCheck model from the schema

module.exports = mongoose.model('BackgroundCheck', BackgroundCheckSchema);

//	• pending → Background check has been initiated but not started.
//	• in-progress → Verification is ongoing.
//	• completed → Successfully verified, and the candidate is cleared.
//failed → Verification completed, but issues were found that led to rejection.