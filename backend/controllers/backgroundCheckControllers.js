const backgroundCheck = require('../models/backgroundCheck');
const BackgroundCheck = require('../models/backgroundCheck');
const Document = require('../models/documents');
const analyzeDocumentsWithGemini = require("../services/geminiservice");

exports.deleteAllBackgroundChecks = async (req, res) => {
  try {
    await BackgroundCheck.deleteMany({}); // Deletes all background check documents
    res.status(200).json({ message: 'All background checks deleted successfully' });
  } catch (error) {
    console.error('Error deleting background checks:', error);
    res.status(500).json({ error: 'Failed to delete background checks' });
  }
};


  // Controller to submit a background check
  exports.submitBackgroundCheck = async (req, res) => {
    try {
      const { candidateId, employerId, submittedDocuments } = req.body;

      // Create a new background check record
      const newBackgroundCheck = new BackgroundCheck({
        candidateId,
        employerId,
        status: 'pending',
        submittedDocuments, // Array of Document IDs
      });

      
      
      await newBackgroundCheck.save();  
      
      console.log("submited Documents : ",submittedDocuments);

       const documentIds = Array.isArray(submittedDocuments) ? submittedDocuments : [submittedDocuments];
      
      const { score, details } = await analyzeDocumentsWithGemini(documentIds);
      console.log("score ",score);

      newBackgroundCheck.riskAssessmentScore = score;
      newBackgroundCheck.resultDetails = details;
      newBackgroundCheck.status = "completed";
      newBackgroundCheck.completionDate = new Date();

      res.status(201).json({ message: 'Background check submitted successfully', newBackgroundCheck });
    } catch (error) {
      console.error('Error submitting background check:', error);
      res.status(500).json({ error: 'Failed to submit background check' });
    }
  };

// Controller to get background check status
exports.getBackgroundCheckStatus = async (req, res) => {
  try {
    const backgroundCheck = await BackgroundCheck.findById(req.params.id)
      .populate('submittedDocuments') //: Replaces the ObjectId references in submittedDocuments with the actual document data from the referenced collection (Document model).
      .exec();//exec() makes the query an explicit Promise, so you can handle errors using .catch() or try/catch.

    if (!backgroundCheck) {
      return res.status(404).json({ error: 'Background check not found' });
    }

    res.json(backgroundCheck);
  } catch (error) {
    console.error('Error fetching background check status:', error);
    res.status(500).json({ error: 'Failed to fetch background check status' });
  }
};

// Controller to update background check status
exports.updateBackgroundCheckStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const backgroundCheck = await BackgroundCheck.findByIdAndUpdate(
      req.params.id,//Extracts the id from the request URL (/api/background-checks/:id).
      { status },//The update object – Mongoose will update the status field of the found document.
      { new: true }//Ensures that the updated document is returned, not the old one.
    );

    if (!backgroundCheck) {
      return res.status(404).json({ error: 'Background check not found' });
    }

    res.json({ message: 'Status updated successfully', backgroundCheck });
  } catch (error) {
    console.error('Error updating background check status:', error);
    res.status(500).json({ error: 'Failed to update background check status' });
  }
};
