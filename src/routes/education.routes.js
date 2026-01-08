const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation
} = require('../controllers/education.controller');

// Add education
router.post('/', auth, requireRole('JOBSEEKER'), createEducation);

// Get all education entries
router.get('/', auth, requireRole('JOBSEEKER'), getEducations);

// Update education
router.put('/:educationId', auth, requireRole('JOBSEEKER'), updateEducation);

// Delete education
router.delete('/:educationId', auth, requireRole('JOBSEEKER'), deleteEducation);

module.exports = router;