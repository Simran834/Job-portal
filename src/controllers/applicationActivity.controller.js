const { prisma } = require('../config/prismaClient');

// CREATE Activity (Employer marks an action on an application)
const createActivity = async (req, res) => {
  try {
    const { application_id, action } = req.body;

    // Only employers should be able to log activities
    if (!req.user.employer?.employer_id) {
      return res.status(403).json({ message: 'Forbidden: Only employers can log activities' });
    }

    const activity = await prisma.applicationActivity.create({
      data: {
        application_id,
        action
      }
    });

    return res.json({ message: 'Activity logged successfully', activity });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// READ Activities for an application
const getActivities = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const activities = await prisma.applicationActivity.findMany({
      where: { application_id: parseInt(applicationId) }
    });

    return res.json({ activities });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE Activity (optional, if employer wants to remove a log)
const deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    await prisma.applicationActivity.delete({
      where: { activity_id: parseInt(activityId) }
    });

    return res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createActivity,
  getActivities,
  deleteActivity
};