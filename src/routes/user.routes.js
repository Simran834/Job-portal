const { Router } = require("express");
const requireRole = require("../middlewares/role.middleware");
const { auth } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const router = Router();

router.post("/createusers", auth, userController.createUser);
router.get("/getusers", auth, userController.getUsers);
router.put("/updateuser/:id", auth, requireRole('ADMIN'), userController.updateUser);
router.delete("/deleteuser/:id", auth, requireRole('ADMIN'), userController.deleteUser);
router.post("/login", userController.loginUser);

module.exports = router;