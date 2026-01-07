import { Router } from "express";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";
import { getAllUsers, deleteUserById } from "../controllers/admin.controller.js";   
import { requireRole } from "../middleware/role";
const router = Router();

// Apply admin authentication middleware to all routes in this router
router.use(authenticateAdmin);
// Route to get all users
router.get("/users", getAllUsers);
// Route to delete a user by ID
router.delete("/users/:id", deleteUserById);
export default router;
