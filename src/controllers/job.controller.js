const { prisma } = require('../config/prismaClient');

// Create job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      work_mode,
      category,
      application_deadline
    } = req.body;

    // Find employer linked to logged-in user
    const employer = await prisma.employer.findUnique({
      where: { user_id: req.user.id }
    });

    if (!employer) {
      return res.status(400).json({ message: "Employer profile not found" });
    }

    const job = await prisma.job.create({
      data: {
        employer_id: employer.employer_id,
        title,
        description,
        location,
        salary_min: salary_min ? parseFloat(salary_min) : null,
        salary_max: salary_max ? parseFloat(salary_max) : null,
        job_type,
        experience_level,
        work_mode,
        category,
        application_deadline: application_deadline ? new Date(application_deadline) : null
      }
    });

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Error posting job" });
  }
};

// Employer jobs
const getEmployerJobs = async (req, res) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { user_id: req.user.id }
    });

    if (!employer) {
      return res.status(400).json({ message: "Employer profile not found" });
    }

    const jobs = await prisma.job.findMany({
      where: { employer_id: employer.employer_id },
      orderBy: { posted_at: 'desc' }
    });

    res.json({ jobs });
  } catch (err) {
    console.error("Error fetching employer jobs:", err);
    res.status(500).json({ message: "Error fetching employer jobs" });
  }
};

// All jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { is_active: true },
      orderBy: { posted_at: 'desc' }
    });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// Job by ID
const getJobById = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await prisma.job.findUnique({
      where: { job_id: jobId }
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ message: "Error fetching job details" });
  }
};

// Jobs by category
const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const jobs = await prisma.job.findMany({
      where: { category, is_active: true },
      orderBy: { posted_at: 'desc' }
    });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs by category" });
  }
};

// Jobseeker applies for a job
const applyJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (req.user.role !== "JOBSEEKER") {
      return res.status(403).json({ message: "Only jobseekers can apply for jobs" });
    }

    const job = await prisma.job.findUnique({
      where: { job_id: jobId }
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existing = await prisma.application.findFirst({
      where: {
        job_id: jobId,
        job_seeker: { user_id: req.user.id }  // ✅ correct relation
      }
    });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    console.log("Applying with jobId:", jobId, "userId:", req.user.id);

    const application = await prisma.application.create({
      data: {
        job: { connect: { job_id: jobId } },
        job_seeker: { connect: { user_id: req.user.id } },
        cover_letter: req.body.cover_letter || null,
        resume: req.body.resume || null,
        applied_at: new Date(),
        status: "PENDING"
      }
    });

    res.json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ message: "Error applying for job" });
  }
};

// Employer applications
const getEmployerApplications = async (req, res) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { user_id: req.user.id }
    });

    if (!employer) {
      return res.status(400).json({ message: "Employer profile not found" });
    }

    const jobsWithApplications = await prisma.job.findMany({
      where: { employer_id: employer.employer_id },
      include: {
        applications: {
          include: { job_seeker: true }
        }
      },
      orderBy: { posted_at: 'desc' }
    });

    res.json({ jobs: jobsWithApplications });
  } catch (err) {
    console.error("Error fetching employer applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// Jobseeker applications
const getJobseekerApplications = async (req, res) => {
  try {
    if (req.user.role !== "JOBSEEKER") {
      return res.status(403).json({ message: "Only jobseekers can view their applications" });
    }

    const applications = await prisma.application.findMany({
      where: { job_seeker: { user_id: req.user.id } },  // ✅ fixed relation
      include: { job: true },
      orderBy: { applied_at: 'desc' }
    });

    res.json({ applications });
  } catch (err) {
    console.error("Error fetching jobseeker applications:", err);
    res.status(500).json({ message: "Error fetching applied jobs" });
  }
};

module.exports = {
  createJob,
  getEmployerJobs,
  getAllJobs,
  getJobsByCategory,
  getJobById,
  applyJob,
  getEmployerApplications,
  getJobseekerApplications
};
