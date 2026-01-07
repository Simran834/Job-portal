const prisma = require('../config/prismaClient');

// CREATE employer profile
const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      company_name,
      website,
      phone,
      address,
      company_logo,
      registration_certificate,
      description,
      verified
    } = req.body;

    // Check if employer profile already exists
    const existing = await prisma.employer.findUnique({
      where: { user_id: userId },
    });

    if (existing) {
      return res.status(400).json({ message: 'Employer profile already exists' });
    }

    const profile = await prisma.employer.create({
      data: {
        user_id: userId,
        company_name,
        website,
        phone,
        address,
        company_logo,
        registration_certificate,
        description,
        verified: verified ?? false, // default false if not provided
      },
    });

    return res.json({
      message: 'Employer profile created successfully',
      profile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ employer profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.employer.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    return res.json({ profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE employer profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      company_name,
      website,
      phone,
      address,
      company_logo,
      registration_certificate,
      description,
      verified
    } = req.body;

    const updated = await prisma.employer.update({
      where: { user_id: userId },
      data: {
        company_name,
        website,
        phone,
        address,
        company_logo,
        registration_certificate,
        description,
        verified,
      },
    });

    return res.json({
      message: 'Profile updated successfully',
      profile: updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE employer profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.employer.delete({
      where: { user_id: userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.json({ message: 'Employer account and profile deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProfile, getProfile, updateProfile, deleteProfile };