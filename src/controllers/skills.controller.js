const prisma = require('../config/prismaClient');

// CREATE Skill
const addSkill = async (req, res) => {
  try {
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can add skills' });
    }

    let { name, proficiency } = req.body;

    // ✅ Validation
    if (!name || !proficiency) {
      return res.status(400).json({ message: "Missing required fields: name, proficiency" });
    }

    // Normalize proficiency to match enum (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
    proficiency = proficiency.toUpperCase();
    const validProficiencies = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
    if (!validProficiencies.includes(proficiency)) {
      return res.status(400).json({ message: `Invalid proficiency. Allowed values: ${validProficiencies.join(", ")}` });
    }

    const skill = await prisma.skill.create({
      data: {
        seeker_id: seeker.seeker_id,
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

// GET Skills
const getSkills = async (req, res) => {
  try {
    const seeker = await prisma.job_seeker.findUnique({
      where: { user_id: req.user.id }
    });

    if (!seeker) {
      return res.status(403).json({ message: 'Forbidden: Only job seekers can view skills' });
    }

    const skills = await prisma.skill.findMany({
      where: { seeker_id: seeker.seeker_id }
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
    let { name, proficiency } = req.body;

    if (proficiency) {
      proficiency = proficiency.toUpperCase();
      const validProficiencies = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];
      if (!validProficiencies.includes(proficiency)) {
        return res.status(400).json({ message: `Invalid proficiency. Allowed values: ${validProficiencies.join(", ")}` });
      }
    }

    const updated = await prisma.skill.update({
      where: { skill_id: parseInt(skillId) },
      data: {
        name,
        proficiency
      }
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
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill
};
