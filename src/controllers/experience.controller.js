const prisma = require('../config/prismaClient');

// CREATE Experience
const createExperience = async (req, res) => {
  try {
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can add experience' });
    }

    const { job_title, company_name, start_date, end_date, is_current, description } = req.body;

    // ✅ Validation
    if (!job_title || !company_name || !start_date) {
      return res.status(400).json({ message: "Missing required fields: job_title, company_name, start_date" });
    }
    if (typeof is_current !== "boolean") {
      return res.status(400).json({ message: "is_current must be true or false" });
    }

    const experience = await prisma.experience.create({
      data: {
        seeker_id: seeker.seeker_id,
        job_title,
        company_name,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        is_current,
        description
      }
    });

    return res.json({ message: 'Experience added successfully', experience });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET Experiences
const getExperiences = async (req, res) => {
  try {
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can view experiences' });
    }

    const experiences = await prisma.experience.findMany({
      where: { seeker_id: seeker.seeker_id }
    });

    return res.json({ experiences });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE Experience
const updateExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { job_title, company_name, start_date, end_date, is_current, description } = req.body;

    const updated = await prisma.experience.update({
      where: { experience_id: parseInt(experienceId) },
      data: {
        job_title,
        company_name,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : null,
        is_current,
        description
      }
    });

    return res.json({ message: 'Experience updated successfully', experience: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE Experience
const deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;

    await prisma.experience.delete({
      where: { experience_id: parseInt(experienceId) }
    });

    return res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience
};
