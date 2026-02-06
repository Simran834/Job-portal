const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const jobController = require('../controllers/job.controller');


// Employer posts a job
router.post('/', auth, requireRole('EMPLOYER'), jobController.createJob);

// Employer fetches their jobs
router.get('/employer', auth, requireRole('EMPLOYER'), jobController.getEmployerJobs);

// Public: fetch all jobs
router.get('/', jobController.getAllJobs);

// Public: fetch jobs by category
router.get('/category/:category', jobController.getJobsByCategory);

router.get("/:id", jobController.getJobById);
// Jobseeker applies for a job
router.post('/:id/apply', auth, requireRole('JOBSEEKER'), jobController.applyJob);

// Employer applications tab
router.get('/applications', auth, requireRole('EMPLOYER'), jobController.getEmployerApplications);

// Jobseeker applied jobs tab
router.get('/applied', auth, requireRole('JOBSEEKER'), jobController.getJobseekerApplications);




module.exports = router;
