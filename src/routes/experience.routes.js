const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware')
const {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience
} = require('../controllers/experience.controller');

// Add experience
router.post('/', auth, requireRole('JOBSEEKER'), createExperience);

// Get all experiences
router.get('/', auth, requireRole('JOBSEEKER'), getExperiences);

// Update experience
router.put('/:experienceId', auth, requireRole('JOBSEEKER'), updateExperience);

// Delete experience
router.delete('/:experienceId', auth, requireRole('JOBSEEKER'), deleteExperience);

module.exports = router;
