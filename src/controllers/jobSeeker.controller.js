const prisma = require("../config/prismaClient");

// CREATE profile (first time)
exports.createProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      seeker_name,
      phone,
      address,
      bio,
      current_position,
      current_salary,
      expected_salary,
      is_open_to_work
    } = req.body;

    const profile = await prisma.job_seeker.create({
      data: {
        seeker_name,
        phone,
        address,
        bio,
        current_position,
        current_salary: current_salary ? parseFloat(current_salary) : null,
        expected_salary: expected_salary ? parseFloat(expected_salary) : null,
        is_open_to_work: !!is_open_to_work,
        user_id
      }
    });

    return res.json({ message: "Profile created successfully", profile });
  } catch (err) {
    console.error("createProfile error:", err);
    return res.status(500).json({ message: "Error creating profile" });
  }
};

// UPDATE profile (modify existing)
exports.updateProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      seeker_name,
      phone,
      address,
      bio,
      current_position,
      current_salary,
      expected_salary,
      is_open_to_work
    } = req.body;

    const updated = await prisma.job_seeker.update({
      where: { user_id },
      data: {
        seeker_name,
        phone,
        address,
        bio,
        current_position,
        current_salary: current_salary ? parseFloat(current_salary) : null,
        expected_salary: expected_salary ? parseFloat(expected_salary) : null,
        is_open_to_work: !!is_open_to_work
      }
    });

    return res.json({ message: "Profile updated successfully", profile: updated });
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ message: "Error updating profile" });
  }
};

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const profile = await prisma.job_seeker.findUnique({
      where: { user_id },
      include: { user: { select: { email: true } } }
    });

    if (!profile) return res.json({ profile: null });
    return res.json({ profile });
  } catch (err) {
    console.error("getProfile error:", err);
    return res.status(500).json({ message: "Error fetching profile" });
  }
};

// DELETE profile
exports.deleteProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    await prisma.job_seeker.delete({ where: { user_id } });
    await prisma.user.delete({ where: { id: user_id } });

    return res.json({ message: "Jobseeker account and profile deleted successfully" });
  } catch (err) {
    console.error("deleteProfile error:", err);
    return res.status(500).json({ message: "Error deleting profile" });
  }
};


// SAVE profile (create if none exists, update if it does)
exports.saveProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      seeker_name,
      phone,
      address,
      bio,
      current_position,
      current_salary,
      expected_salary,
      is_open_to_work
    } = req.body;

    const profile = await prisma.job_seeker.upsert({
      where: { user_id },
      update: {
        seeker_name,
        phone,
        address,
        bio,
        current_position,
        current_salary: current_salary ? parseFloat(current_salary) : null,
        expected_salary: expected_salary ? parseFloat(expected_salary) : null,
        is_open_to_work: !!is_open_to_work
      },
      create: {
        seeker_name,
        phone,
        address,
        bio,
        current_position,
        current_salary: current_salary ? parseFloat(current_salary) : null,
        expected_salary: expected_salary ? parseFloat(expected_salary) : null,
        is_open_to_work: !!is_open_to_work,
        user_id
      }
    });

    return res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("saveProfile error:", err);
    return res.status(500).json({ message: "Error saving profile" });
  }
};
