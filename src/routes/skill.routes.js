const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill
} = require('../controllers/skills.controller');

// Add a new skill
router.post('/', auth, requireRole('JOBSEEKER'), addSkill);

// Get all skills for the logged-in jobseeker
router.get('/', auth, requireRole('JOBSEEKER'), getSkills);

// Update a specific skill
router.put('/:skillId', auth, requireRole('JOBSEEKER'), updateSkill);

// Delete a specific skill
router.delete('/:skillId', auth, requireRole('JOBSEEKER'), deleteSkill);

module.exports = router;
