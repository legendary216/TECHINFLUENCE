const express = require('express');
const router = express.Router();
const verificationStatusController = require('../controllers/verificationStatusControllers');

// Route to check the status of an individual verification

router.get('/:id', verificationStatusController.getVerificationStatus);

module.exports = router;
