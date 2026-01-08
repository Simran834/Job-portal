const { Router } = require("express");
const requireRole = require("../middlewares/role.middleware");
const { auth } = require("../middlewares/auth.middleware");
// const { getAllUsers, deleteUserById } = require("../controllers/admin.controller");
const { getUsers, deleteUser } = require("../controllers/user.controller"); // assuming

const router = Router();

// Apply admin authentication middleware to all routes in this router
router.use(auth, requireRole('ADMIN'));
// Route to get all users
router.get("/users", getUsers);
// Route to delete a user by ID
router.delete("/users/:id", deleteUser);

module.exports = router;
