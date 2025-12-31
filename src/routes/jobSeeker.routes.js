import {Router} from 'express';
import {auth} from '../middleware/auth.js';
import {IsJobSeeker} from '../middleware/isJobSeeker.js';
import {createJobSeekerProfile, getJobSeekerProfile, updateProfile, deleteProfile } from '../controllers/jobSeeker.controller.js';   
const router = Router();

router.post("/create", auth, createJobSeekerProfile);
router.get("/:id",  IsJobSeeker, getJobSeekerProfile);
router.put("/update/:id", auth, IsJobSeeker, updateProfile);
router.delete("/delete/:id", IsJobSeeker, deleteProfile);

export default router;