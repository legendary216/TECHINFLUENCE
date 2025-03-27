const mongoose = require('mongoose');

// Define the Document Schema
const DocumentSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //send user id in postman
  type: { type: String, enum: ['ID', 'Resume', 'Criminal Record', 'Employment Proof']},
  filePath: { type: String, required: true },// where the uploaded document is stored.uploads/documents/resume_12345.pdf
  status: { type: String, enum: ['pending', 'validated', 'failed'], required: true },
  validatedAt: { type: Date },
  validationDetails: { type: Object },
});

// Create the Document model from the schema
module.exports = mongoose.model('Document', DocumentSchema);
//export const Document = mongoose.model('Document', DocumentSchema);