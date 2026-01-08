const express = require('express');
const router = express.Router();

// Mount all route modules here (matches src/app.js route layout)
const authRoutes = require('./auth.routes');
const jobseekerRoutes = require('./jobseeker.routes');
const employerRoutes = require('./employer.routes');
const jobRoutes = require('./job.routes');
const applicationRoutes = require('./application.routes');
const experienceRoutes = require('./experience.routes');
const educationRoutes = require('./education.routes');
const skillRoutes = require('./skill.routes');
const socialLinkRoutes = require('./socialLink.routes');
const applicationActivityRoutes = require('./applicationActivity.routes');
const passwordResetRoutes = require('./passwordReset.routes');
const categoryRoutes = require('./category.routes');

router.use('/auth', authRoutes);
router.use('/jobseeker', jobseekerRoutes);
router.use('/employer', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/skill', skillRoutes);
router.use('/sociallink', socialLinkRoutes);
router.use('/application-activity', applicationActivityRoutes);
router.use('/password-reset', passwordResetRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
