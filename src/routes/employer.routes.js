const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/employer.controller');

router.post('/profile', auth, requireRole('EMPLOYER'), createProfile);
router.get('/profile', auth, requireRole('EMPLOYER'), getProfile);
router.put('/profile', auth, requireRole('EMPLOYER'), updateProfile);
router.delete('/profile', auth, requireRole('EMPLOYER'), deleteProfile);

module.exports = router;
