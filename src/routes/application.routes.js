const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { applyJob, getApplicationsForJob, updateApplicationStatus, deleteApplication } = require('../controllers/application.controller');

// Job seeker applies
router.post('/', auth, requireRole('JOB_SEEKER'), applyJob);

// Employer views applications for a job
router.get('/:jobId', auth, requireRole('EMPLOYER'), getApplicationsForJob);

// Employer updates application status
router.put('/:applicationId', auth, requireRole('EMPLOYER'), updateApplicationStatus);

// Employer deletes application
router.delete('/:applicationId', auth, requireRole('EMPLOYER'), deleteApplication);

module.exports = router;