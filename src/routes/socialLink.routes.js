const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth.middleware');
const {
  createSocialLink,
  getSocialLinks,
  updateSocialLink,
  deleteSocialLink
} = require('../controllers/socialLink.controller');

// Add social link
router.post('/', auth, createSocialLink);

// Get all social links
router.get('/', auth, getSocialLinks);

// Update social link
router.put('/:link_id', auth, updateSocialLink);

// Delete social link
router.delete('/:link_id', auth, deleteSocialLink);

module.exports = router;