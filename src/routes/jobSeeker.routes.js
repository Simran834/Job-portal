const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/jobseeker.controller.js');

router.get('/profile', auth, requireRole('JOBSEEKER'), getProfile);
router.put('/profile', auth, requireRole('JOBSEEKER'), updateProfile);
router.delete('/profile', auth, requireRole('JOBSEEKER'), deleteProfile);

module.exports = router;