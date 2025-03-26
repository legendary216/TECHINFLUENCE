const BackgroundCheck = require('../models/backgroundCheck'); // Assuming BackgroundCheck stores the review status

// Get verification status by ID
exports.getVerificationStatus = async (req, res) => {
  try {
    const backgroundCheck = await BackgroundCheck.findById(req.params.id).populate('candidateId employerId submittedDocuments');
    console.log(req.params.id);
    
    if (!backgroundCheck) {
      return res.status(404).json({ msg: 'Verification status not found' });
    }

    res.json({
      candidate: backgroundCheck.candidateId,
      employer: backgroundCheck.employerId,
      status: backgroundCheck.status, // pending, in-progress, completed, failed
      documentsReviewed: backgroundCheck.submittedDocuments,
      riskAssessmentScore: backgroundCheck.riskAssessmentScore,
      completionDate: backgroundCheck.completionDate,
      resultDetails: backgroundCheck.resultDetails,
    });
  } catch (error) {
    console.error('Error fetching verification status:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
