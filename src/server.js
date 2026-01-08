
// Load environment variables
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
// Controllers & middleware
const authController = require('./controllers/auth.controller.js');
const jobseekerController = require('./controllers/jobseeker.controller.js');
const employerController = require('./controllers/employer.controller.js');
const auth = require('./middlewares/auth.middleware.js');

const app = express();

// ✅ Middleware
app.use(cors());                          // allow frontend requests
app.use(express.json());      
  

// ✅ Auth routes
app.post("/auth/signup", authController.signup);
app.post("/auth/login", authController.login);

// ✅ Jobseeker routes (protect profile endpoints and use POST/GET/PUT)
app.route("/jobseeker/profile")
  .post(auth, jobseekerController.createProfile)   // create profile (protected)
  .get(auth, jobseekerController.getProfile) // get profile (protected)
  .put(auth, jobseekerController.updateProfile); // update profile (protected)

// ✅ Employer routes
app.post("/employer/profile", employerController.createProfile);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
