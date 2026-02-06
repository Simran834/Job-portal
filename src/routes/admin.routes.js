const express = require("express");
const router = express.Router();

// Import middlewares with correct folder name
const { auth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

// ✅ Controller import (make sure admin.controller.js exports { getDashboardStats })
const { getDashboardStats } = require("../controllers/admin.controller");

// Admin dashboard route (only accessible by ADMIN role)
router.get("/dashboard", auth, requireRole("ADMIN"), getDashboardStats);

module.exports = router;
