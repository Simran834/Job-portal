const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const jobseekerController = require('../controllers/jobseeker.controller.js');

// Jobseeker profile routes (all protected)
router.post('/create', auth, requireRole('JOBSEEKER'), jobseekerController.createProfile);
router.put('/update', auth, requireRole('JOBSEEKER'), jobseekerController.updateProfile);
router.post('/save', auth, requireRole('JOBSEEKER'), jobseekerController.saveProfile);
router.get('/get', auth, requireRole('JOBSEEKER'), jobseekerController.getProfile);
router.delete('/delete', auth, requireRole('JOBSEEKER'), jobseekerController.deleteProfile);

module.exports = router;