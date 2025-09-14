import {Router} from 'express';
import {auth} from '../middleware/auth.js';
import {IsJobSeeker} from '../middleware/isJobSeeker.js';
import {createJobSeekerProfile, getJobSeekerProfile, updateProfile, deleteProfile } from '../controllers/jobSeeker.controller.js';   
const router = Router();

router.post("/create" , IsJobSeeker, createJobSeekerProfile);
router.get(":id", auth, IsJobSeeker, getJobSeekerProfile);
router.put("/update/:id", auth, IsJobSeeker, updateProfile);
router.delete("/delete/:id", auth, IsJobSeeker, deleteProfile);

export default router;