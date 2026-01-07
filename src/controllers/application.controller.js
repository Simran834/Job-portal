const prisma = require('../config/prismaClient');

// CREATE application (Job Seeker applies to a job)
const applyJob = async (req, res) => {
  try {
    const seekerId = req.user.id; // logged-in job seeker
    const { job_id, cover_letter, resume } = req.body;

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { job_id } });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const application = await prisma.application.create({
      data: {
        job_id,
        seeker_id: seekerId,
        cover_letter,
        resume,
      },
    });

    return res.json({ message: 'Application submitted successfully', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ applications for a job (Employer views)
const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await prisma.application.findMany({
      where: { job_id: parseInt(jobId) },
      include: { job_seeker: true },
    });

    return res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE application status (Employer updates)
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const updated = await prisma.application.update({
      where: { application_id: parseInt(applicationId) },
      data: { status },
    });

    return res.json({ message: 'Application status updated', application: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE application (optional)
const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    await prisma.application.delete({
      where: { application_id: parseInt(applicationId) },
    });

    return res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyJob, getApplicationsForJob, updateApplicationStatus, deleteApplication };