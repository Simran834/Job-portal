const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const {
  createActivity,
  getActivities,
  deleteActivity
} = require('../controllers/applicationActivity.controller');

// Employer logs activity
router.post('/', auth, requireRole('EMPLOYER'), createActivity);

// Get all activities for an application
router.get('/:applicationId', auth, getActivities);

// Delete activity
router.delete('/:activityId', auth, requireRole('EMPLOYER'), deleteActivity);

module.exports = router;