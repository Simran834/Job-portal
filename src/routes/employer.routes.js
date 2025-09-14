import {Router} from 'express';
import {auth} from '../middleware/auth.js';
import {isEmployer} from '../middleware/isEmployer.js';

import {createEmployer, getEmployerProfile, updateProfile, deleteProfile} from '../controllers/employer.controller.js';
const router = Router();
router.get("/createemployers", auth, isEmployer, createEmployer);
router.get("/getemployer/:id", auth, isEmployer, getEmployerProfile);
router.put("/updateemployer/:id", auth, isEmployer, updateProfile);
router.delete("/deleteemployer/:id", auth, isEmployer, deleteProfile);

export default router;

