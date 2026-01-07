const prisma = require('../config/prismaClient');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.job_seeker.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Jobseeker profile not found' });
    }

    return res.json({ profile });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { seeker_name, phone, address, bio } = req.body;

    const updated = await prisma.job_seeker.update({
      where: { user_id: userId },
      data: {
        seeker_name,
        phone,
        address,
        bio,
      },
    });

    return res.json({
      message: 'Profile updated successfully',
      profile: updated,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete jobseeker profile
    await prisma.job_seeker.delete({
      where: { user_id: userId },
    });

    // Optionally also delete the user account itself
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.json({ message: 'Jobseeker account and profile deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};