const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const jobseekerRoutes = require('./routes/jobseeker.routes');
app.use('/jobseeker', jobseekerRoutes);

const employerRoutes = require('./routes/employer.routes');
app.use('/employer', employerRoutes);

const jobRoutes = require('./routes/job.routes');
app.use('/jobs', jobRoutes);

const applicationRoutes = require('./routes/application.routes');
app.use('/applications', applicationRoutes);

const experienceRoutes = require('./routes/experience.routes');
app.use('/experience', experienceRoutes);

const educationRoutes = require('./routes/education.routes');
app.use('/education', educationRoutes);

const skillRoutes = require('./routes/skill.routes');
app.use('/skill', skillRoutes);

const socialLinkRoutes = require('./routes/socialLink.routes');
app.use('/sociallink', socialLinkRoutes);

const applicationActivityRoutes = require('./routes/applicationActivity.routes');
app.use('/application-activity', applicationActivityRoutes);

const passwordResetRoutes = require('./routes/passwordReset.routes');
app.use('/password-reset', passwordResetRoutes);


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Job portal backend is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;