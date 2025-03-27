
const express = require('express');
const router = express.Router();
;

const documentController = require('../controllers/documentsControllers.js');
const {upload} = require('../middleware/multerMiddleware');

// Route to submit a document for verification
router.post('/submit',  upload.array('documents'),documentController.submitDocument);

// Route to get a document's validation status
router.get('/:id/status', documentController.getDocumentStatus);

router.get('/:id/getDocuments', documentController.getDocuments);
///:id is a route parameter, meaning it will accept dynamic values.
//status is a static part of the URL.

//GET http://localhost:5000/api/documents/660123456789abcdef123456/status


// Route to validate a document
router.put('/:id/validate', documentController.validateDocument);

module.exports = router;

