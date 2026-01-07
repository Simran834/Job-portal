const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
} = require('../controllers/skill.controller');

// Add skill
router.post('/', auth, requireRole('JOBSEEKER'), createSkill);

// Get all skills
router.get('/', auth, requireRole('JOBSEEKER'), getSkills);

// Update skill
router.put('/:skillId', auth, requireRole('JOBSEEKER'), updateSkill);

// Delete skill
router.delete('/:skillId', auth, requireRole('JOBSEEKER'), deleteSkill);

module.exports = router;