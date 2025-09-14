import { Router } from "express";
import userRoutes from "./user.routes.js";
import jobSeekerRoutes from "./jobSeeker.routes.js";
import employerRoutes from "./employer.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/jobseekers", jobSeekerRoutes);
router.use("/employers", employerRoutes);


export default router;