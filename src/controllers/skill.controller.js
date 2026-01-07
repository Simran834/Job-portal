const prisma = require('../config/prismaClient');

// CREATE Skill
const createSkill = async (req, res) => {
  try {
    const seekerId = req.user.job_seeker?.seeker_id;
    if (!seekerId) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can add skills' });
    }

    const { name, proficiency } = req.body;

    const skill = await prisma.skill.create({
      data: {
        seeker_id: seekerId,
        name,
        proficiency
      }
    });

    return res.json({ message: 'Skill added successfully', skill });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ Skills
const getSkills = async (req, res) => {
  try {
    const seekerId = req.user.job_seeker?.seeker_id;
    if (!seekerId) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can view skills' });
    }

    const skills = await prisma.skill.findMany({
      where: { seeker_id: seekerId }
    });

    return res.json({ skills });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE Skill
const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const data = req.body;

    const updated = await prisma.skill.update({
      where: { skill_id: parseInt(skillId) },
      data
    });

    return res.json({ message: 'Skill updated successfully', skill: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE Skill
const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    await prisma.skill.delete({
      where: { skill_id: parseInt(skillId) }
    });

    return res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
};