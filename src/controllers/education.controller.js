const prisma = require('../config/prismaClient');

// CREATE Education
const createEducation = async (req, res) => {
  try {
    // Find seeker_id linked to this user
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can add education' });
    }

    const { institution, degree, field_of_study, start_date, end_date, is_current, description } = req.body;

    const education = await prisma.education.create({
      data: {
        seeker_id: seeker.seeker_id,
        institution,
        degree,
        field_of_study,
        start_date: new Date(start_date),
        end_date: end_date ? new Date(end_date) : null,
        is_current,
        description
      }
    });

    return res.json({ message: 'Education added successfully', education });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ Education entries
const getEducations = async (req, res) => {
  try {
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can view education' });
    }

    const educations = await prisma.education.findMany({
      where: { seeker_id: seeker.seeker_id }
    });

    return res.json({ educations });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE Education
const updateEducation = async (req, res) => {
  try {
    const { educationId } = req.params;
    const { institution, degree, field_of_study, start_date, end_date, is_current, description } = req.body;

    const updated = await prisma.education.update({
      where: { education_id: parseInt(educationId) },
      data: {
        institution,
        degree,
        field_of_study,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : null,
        is_current,
        description
      }
    });

    return res.json({ message: 'Education updated successfully', education: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// DELETE Education
const deleteEducation = async (req, res) => {
  try {
    const { educationId } = req.params;

    await prisma.education.delete({
      where: { education_id: parseInt(educationId) }
    });

    return res.json({ message: 'Education deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation
};
