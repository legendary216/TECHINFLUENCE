
const express = require('express');
const router = express.Router();
const backgroundCheckController = require('../controllers/backgroundCheckControllers');

// Route to submit a background check
router.post('/submit', backgroundCheckController.submitBackgroundCheck);

// Route to get a background check status
router.get('/:id/status', backgroundCheckController.getBackgroundCheckStatus);

// Route to update the background check status 
router.put('/:id/update-status', backgroundCheckController.updateBackgroundCheckStatus);

router.delete('/delete-background-checks', backgroundCheckController.deleteAllBackgroundChecks);

module.exports = router;
