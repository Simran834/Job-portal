const prisma = require('../config/prismaClient');

// CREATE Social Link
const createSocialLink = async (req, res) => {
  try {
    const { user_type, platform, url } = req.body;

    let data = { user_type, platform, url };

    if (user_type === 'JOB_SEEKER') {
      if (!req.user.job_seeker?.seeker_id) {
        return res.status(403).json({ message: 'Forbidden: Only job seekers can add social links' });
      }
      data.seeker_id = req.user.job_seeker.seeker_id;
    } else if (user_type === 'EMPLOYER') {
      if (!req.user.employer?.employer_id) {
        return res.status(403).json({ message: 'Forbidden: Only employers can add social links' });
      }
      data.employer_id = req.user.employer.employer_id;
    }

    const link = await prisma.socialLink.create({ data });
    return res.json({ message: 'Social link added successfully', link });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ Social Links
const getSocialLinks = async (req, res) => {
  try {
    let where = {};
    if (req.user.job_seeker?.seeker_id) {
      where.seeker_id = req.user.job_seeker.seeker_id;
    } else if (req.user.employer?.employer_id) {
      where.employer_id = req.user.employer.employer_id;
    }

    const links = await prisma.socialLink.findMany({ where });
    return res.json({ links });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE Social Link
const updateSocialLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const data = req.body;

    const updated = await prisma.socialLink.update({
      where: { link_id: parseInt(linkId) },
      data
    });

    return res.json({ message: 'Social link updated successfully', link: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE Social Link
const deleteSocialLink = async (req, res) => {
  try {
    const { linkId } = req.params;

    await prisma.socialLink.delete({
      where: { link_id: parseInt(linkId) }
    });

    return res.json({ message: 'Social link deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSocialLink,
  getSocialLinks,
  updateSocialLink,
  deleteSocialLink
};