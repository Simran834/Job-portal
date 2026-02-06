const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const employerController = require('../controllers/employer.controller');

router.post('/profile', auth, requireRole('EMPLOYER'), employerController.createProfile);
router.get('/profile', auth, requireRole('EMPLOYER'), employerController.getProfile);
router.put('/profile', auth, requireRole('EMPLOYER'), employerController.updateProfile);
router.delete('/profile', auth, requireRole('EMPLOYER'), employerController.deleteProfile);

module.exports = router;
