const express = require('express');
const router = express.Router();
const riskAssessmentController = require('../controllers/riskAssessmentController');

// Routes for risk assessment
router.get('/:backgroundCheckId', riskAssessmentController.getRiskAssessment);
router.post('/create-riskAssessment', riskAssessmentController.createRiskAssessment);
router.put('/:backgroundCheckId', riskAssessmentController.updateRiskAssessment);
//router.delete('/:backgroundCheckId', riskAssessmentController.deleteRiskAssessment);

module.exports = router;
