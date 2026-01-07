const prisma = require('../config/prismaClient');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/jwt.util');

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: role || 'JOBSEEKER',
      },
    });

    // Create profile based on role
    if (user.role === 'JOBSEEKER') {
      await prisma.job_seeker.create({
        data: {
          user_id: user.id,
          seeker_name: '',
          phone: '',
          address: '',
          bio: '',
        },
      });
    }

    if (user.role === 'EMPLOYER') {
      await prisma.employer.create({
        data: {
          user_id: user.id,
          company_name: '',
          phone: '',
          address: '',
          description: '',
        },
      });
    }

    return res.json({ message: 'Signup successful', user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};