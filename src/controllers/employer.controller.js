const prisma = require('../config/prismaClient');

// Create or update employer profile
const createProfile = async (req, res) => {
  try {
    const {
      company_name,
      website,
      phone,
      address,
      company_logo,
      registration_certificate,
      description
    } = req.body;

    const employer = await prisma.employer.update({
      where: { user_id: req.user.id },
      data: {
        company_name,
        website,
        phone,
        address,
        company_logo,
        registration_certificate,
        description
      }
    });

    return res.json({ message: "Profile created/updated successfully", employer });
  } catch (err) {
    console.error("Create profile error:", err);
    return res.status(500).json({ message: "Error creating profile" });
  }
};

// Get employer profile
const getProfile = async (req, res) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: { user_id: req.user.id }
    });

    if (!employer) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json(employer);
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update employer profile
const updateProfile = async (req, res) => {
  try {
    const employer = await prisma.employer.update({
      where: { user_id: req.user.id },
      data: req.body
    });

    return res.json({ message: "Profile updated successfully", employer });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Error updating profile" });
  }
};

// Delete employer profile
const deleteProfile = async (req, res) => {
  try {
    await prisma.employer.delete({
      where: { user_id: req.user.id }
    });

    return res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Delete profile error:", err);
    return res.status(500).json({ message: "Error deleting profile" });
  }
};

// Export all controllers
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};
