const prisma = require('../config/prismaClient');

// CREATE a new job
const createJob = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find employer linked to this user
    const employer = await prisma.employer.findUnique({
      where: { user_id: userId },
    });

    if (!employer) {
      return res.status(400).json({ message: 'Employer profile not found' });
    }

    const {
      title,
      description,
      location,
      salary_min,
      salary_max,
      job_type,            // Enum: FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT
      experience_level,    // Enum: JUNIOR, MID, SENIOR
      work_mode,           // Enum: ONSITE, REMOTE, HYBRID
      category,            // Enum: IT, MARKETING, DESIGN, etc.
      application_deadline // Date string
    } = req.body;

    const job = await prisma.job.create({
      data: {
        employer_id: employer.employer_id,
        title,
        description,
        location,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        work_mode,
        category,
        application_deadline: application_deadline ? new Date(application_deadline) : null,
      },
    });

    return res.json({ message: 'Job created successfully', job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { employer: true },
    });
    return res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ single job by ID
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await prisma.job.findUnique({
      where: { job_id: parseInt(jobId) },
      include: { employer: true, applications: true },
    });

    if (!job) return res.status(404).json({ message: 'Job not found' });

    return res.json({ job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE job
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
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
      application_deadline,
      is_active
    } = req.body;

    const updated = await prisma.job.update({
      where: { job_id: parseInt(jobId) },
      data: {
        title,
        description,
        location,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        work_mode,
        category,
        application_deadline: application_deadline ? new Date(application_deadline) : null,
        is_active,
      },
    });

    return res.json({ message: 'Job updated successfully', job: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE job
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    await prisma.job.delete({
      where: { job_id: parseInt(jobId) },
    });

    return res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };