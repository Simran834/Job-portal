const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/job.controller');


router.post('/', auth, requireRole('EMPLOYER'), createJob);
router.get('/', getJobs);
router.get('/:jobId', getJobById);
router.put('/:jobId', auth, requireRole('EMPLOYER'), updateJob);
router.delete('/:jobId', auth, requireRole('EMPLOYER'), deleteJob);

module.exports = router;