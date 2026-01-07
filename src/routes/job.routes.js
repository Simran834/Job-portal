const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/job.controller');

// Employer creates a job
router.post('/', auth, requireRole('EMPLOYER'), createJob);

// Anyone can view jobs
router.get('/', getJobs);
router.get('/:jobId', getJobById);

// Employer updates/deletes their job
router.put('/:jobId', auth, requireRole('EMPLOYER'), updateJob);
router.delete('/:jobId', auth, requireRole('EMPLOYER'), deleteJob);

module.exports = router;