const express = require('express');
const router = express.Router();

const { requestPasswordReset, resetPassword } = require('../controllers/passwordReset.controller');

// Request reset token
router.post('/request', requestPasswordReset);

// Reset password
router.post('/reset', resetPassword);

module.exports = router;