const RiskAssessment = require('../models/riskAssessment');
const BackgroundCheck = require('../models/backgroundCheck');

// ✅ Get a risk assessment by backgroundCheckId
exports.getRiskAssessment = async (req, res) => {
  try {
    const { backgroundCheckId } = req.params;

    const riskAssessment = await RiskAssessment.findOne({ backgroundCheckId });

    if (!riskAssessment) {
      return res.status(404).json({ error: 'Risk assessment not found' });
    }

    res.json(riskAssessment);
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    res.status(500).json({ error: 'Failed to fetch risk assessment' });
  }
};

// ✅ Create a new risk assessment
exports.createRiskAssessment = async (req, res) => {
  try {
    const { backgroundCheckId, riskScore, details } = req.body;

    // Check if background check exists
    const backgroundCheck = await BackgroundCheck.findById(backgroundCheckId);
    if (!backgroundCheck) {
      return res.status(404).json({ error: 'Background check not found' });
    }

    // Create new risk assessment
    const newRiskAssessment = new RiskAssessment({
      backgroundCheckId,
      riskScore,
      details,
    });

    await newRiskAssessment.save();
    res.status(201).json({ message: 'Risk assessment created successfully', newRiskAssessment });
  } catch (error) {
    console.error('Error creating risk assessment:', error);
    res.status(500).json({ error: 'Failed to create risk assessment' });
  }
};

// ✅ Update an existing risk assessment
exports.updateRiskAssessment = async (req, res) => {
  try {
    const { backgroundCheckId } = req.params;
    const { riskScore, details } = req.body;

    // Find and update risk assessment
    const updatedRiskAssessment = await RiskAssessment.findOneAndUpdate(
      { backgroundCheckId },
      { riskScore, details },
      { new: true } // Return updated document
    );

    if (!updatedRiskAssessment) {
      return res.status(404).json({ error: 'Risk assessment not found' });
    }

    res.json({ message: 'Risk assessment updated successfully', updatedRiskAssessment });
  } catch (error) {
    console.error('Error updating risk assessment:', error);
    res.status(500).json({ error: 'Failed to update risk assessment' });
  }
};

// ✅ Delete a risk assessment
// exports.deleteRiskAssessment = async (req, res) => {
//   try {
//     const { backgroundCheckId } = req.params;

//     const deletedRiskAssessment = await RiskAssessment.findOneAndDelete({ backgroundCheckId });

//     if (!deletedRiskAssessment) {
//       return res.status(404).json({ error: 'Risk assessment not found' });
//     }

//     res.json({ message: 'Risk assessment deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting risk assessment:', error);
//     res.status(500).json({ error: 'Failed to delete risk assessment' });
//   }
// };
