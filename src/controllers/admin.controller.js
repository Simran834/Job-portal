const prisma = require('../config/prismaClient');

exports.getDashboardStats = async (req, res) => {
  try {
    const jobseekersCount = await prisma.user.count({ where: { role: "JOBSEEKER" } });
    const employersCount = await prisma.user.count({ where: { role: "EMPLOYER" } });
    const jobsCount = await prisma.job.count();
    const applicationsCount = await prisma.application.count();

    res.json({
      jobseekersCount,
      employersCount,
      jobsCount,
      applicationsCount,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
