const prisma = require('../config/prismaClient');

// Create a new social link
exports.createSocialLink = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { platform, url } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ error: "Platform and URL are required" });
    }

    const socialLink = await prisma.socialLink.create({
      data: {
        user_type: "JOB_SEEKER",   // or EMPLOYER if needed
        platform,                  // must match enum (LINKEDIN, GITHUB, etc.)
        url,
        // ⚠️ For now, skip seeker_id foreign key
        // Instead, just store employer_id or seeker_id as null
        seeker_id: null,
        employer_id: null
      }
    });

    res.status(201).json({ socialLink });
  } catch (err) {
    console.error("Error creating social link:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all social links
exports.getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { link_id: 'desc' }
    });

    res.json({ socialLinks });
  } catch (err) {
    console.error("Error fetching social links:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a social link
// Update a social link
exports.updateSocialLink = async (req, res) => {
  try {
    const link_id = parseInt(req.params.link_id, 10); // from URL param
    const { platform, url } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ error: "Platform and URL are required" });
    }

    // Update the record
    const updatedLink = await prisma.socialLink.update({
      where: { link_id: link_id },
      data: {
        platform,  // must match enum (LINKEDIN, GITHUB, etc.)
        url
      }
    });

    res.json({ updatedLink });
  } catch (err) {
    console.error("Error updating social link:", err);

    if (err.code === "P2025") {
      // Prisma error when record not found
      return res.status(404).json({ error: "Social link not found" });
    }

    res.status(500).json({ error: "Server error" });
  }
};


// Delete a social link
exports.deleteSocialLink = async (req, res) => {
  try {
    const link_id = parseInt(req.params.link_id, 10);

    await prisma.socialLink.delete({
      where: { link_id: link_id }
    });

    res.json({ message: "Social link deleted successfully" });
  } catch (err) {
    console.error("Error deleting social link:", err);
    res.status(500).json({ error: "Server error" });
  }
};
