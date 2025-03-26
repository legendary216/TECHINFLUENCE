const mongoose = require('mongoose');

// Define the VerificationStatus Schema
const VerificationStatusSchema = new mongoose.Schema({
  backgroundCheckId: { type: mongoose.Schema.Types.ObjectId, ref: 'BackgroundCheck', required: true },
  type: { type: String, enum: ['Criminal Record', 'Employment History', 'ID Verification'], required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'failed'], required: true },
  dateInitiated: { type: Date, required: true },
  dateCompleted: { type: Date },
  details: { type: Object },
});

module.exports = mongoose.model("VerificationStatus",VerificationStatusSchema)

// 1️⃣ BackgroundCheck Schema
// Tracks the overall review status of a candidate.

// Managed by the employer, who decides whether the candidate passes or fails.

// Example: "Pending" → "In-Progress" → "Completed" or "Failed."

// Focuses on employer’s decision.

// 2️⃣ VerificationStatus Schema
// Tracks individual verification types like:

// Criminal Record Check

// Employment History Check

// ID Verification

// Each background check can have multiple verification checks.

// Example:

// "Criminal Record" → "Completed"

// "Employment History" → "Failed"

// "ID Verification" → "Pending"