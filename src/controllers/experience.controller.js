const prisma = require('../config/prismaClient');

// CREATE Experience
const createExperience = async (req, res) => {
  try {
    const seekerId = req.user.job_seeker?.seeker_id; // logged-in job seeker
    if (!seekerId) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can add experiences' });
    }

    const { job_title, company_name, start_date, end_date, is_current, description } = req.body;

    const experience = await prisma.experience.create({
      data: {
        seeker_id: seekerId,
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

// READ Experiences (all for logged-in job seeker)
const getExperiences = async (req, res) => {
  try {
    const seekerId = req.user.job_seeker?.seeker_id;
    if (!seekerId) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can view experiences' });
    }

    const experiences = await prisma.experience.findMany({
      where: { seeker_id: seekerId }
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
    const data = req.body;

    const updated = await prisma.experience.update({
      where: { experience_id: parseInt(experienceId) },
      data
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
