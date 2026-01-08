const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const jobseekerController = require('../controllers/jobseeker.controller.js');
const auth = require("../middlewares/auth.middleware.js");
const jobseekerController = require("../controllers/jobseeker.controller.js");

// Create explicitly
router.post("/profile/create", auth, jobseekerController.createProfile);

// Update explicitly
router.put("/profile/update", auth, jobseekerController.updateProfile);

// Save (create or update automatically)
router.post("/profile", auth, jobseekerController.saveProfile);

// Get
router.get("/profile", auth, jobseekerController.getProfile);

// Delete
router.delete("/profile", auth, jobseekerController.deleteProfile);


module.exports = router;