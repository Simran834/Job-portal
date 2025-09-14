import {Router} from "express";
import {isAdmin} from "../middleware/isAdmin.js";
import {auth} from "../middleware/auth.js";
import {createUser, getUsers, updateUser, deleteUser} from "../controllers/user.controller.js"; 

const router = Router();

router.post("/createusers", createUser);
router.get("/getusers", auth, isAdmin, getUsers);
router.put("/updateuser/:id", auth, isAdmin, updateUser);
router.delete("/deleteuser/:id", auth, isAdmin, deleteUser);


export default router;