import {Router} from "express";
import {isAdmin} from "../middleware/isAdmin.js";
import {auth} from "../middleware/auth.js";
import {createUser, getUsers, updateUser, deleteUser, loginUser} from "../controllers/user.controller.js"; 

const router = Router();

router.post("/createusers", createUser);
router.get("/getusers", auth, getUsers);
router.put("/updateuser/:id", auth, updateUser);
router.delete("/deleteuser/:id", auth, deleteUser);
router.post("/login", loginUser);


export default router;