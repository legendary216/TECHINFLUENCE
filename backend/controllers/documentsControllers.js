
const Document = require('../models/documents.js');

// Controller to submit a document
exports.submitDocument = async (req, res) => {
  try {
    const { candidateId, type, filePath } = req.body;

    const newDocument = new Document({
      candidateId,
      type,
      filePath,
      status: 'pending',
    });

    await newDocument.save();

    res.status(201).json({ message: 'Document submitted successfully', newDocument });
  } catch (error) {
    console.error('Error submitting document:', error);
    res.status(500).json({ error: 'Failed to submit document' });
  }
};

// Controller to get document validation status
exports.getDocumentStatus = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);


    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    console.error('Error fetching document status:', error);
    res.status(500).json({ error: 'Failed to fetch document status' });
  }
};

// Controller to validate a document
exports.validateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Simulate validation (can be AI-powered, external API, etc.)
    document.status = 'validated';
    document.validatedAt = new Date();
    document.validationDetails = { success: true };

    await document.save();

    res.json({ message: 'Document validated successfully', document });
  } catch (error) {
    console.error('Error validating document:', error);
    res.status(500).json({ error: 'Failed to validate document' });
  }
};

