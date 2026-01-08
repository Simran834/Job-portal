const prisma = require('../config/prismaClient');
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/jwt.util');
require ("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Normalize role (frontend sends "jobseeker"/"employer")
    const normalizedRole = (role || 'jobseeker').toUpperCase();
    if (!['JOBSEEKER', 'EMPLOYER'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // 3. Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user (User model doesn't have `name` field)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: normalizedRole },
    });

    // 6. Create profile based on role. Provide minimal required fields.
    if (user.role === 'JOBSEEKER') {
      await prisma.job_seeker.create({ data: {
        user_id: user.id,
        seeker_name: name || '',
        phone: req.body.phone || '',
        address: req.body.address || '',
        bio: req.body.bio || '',
        resume: req.body.resume || null,
        profile_image: req.body.profile_image || null,
      } });
    }
    if (user.role === 'EMPLOYER') {
      await prisma.employer.create({ data: {
        user_id: user.id,
        company_name: req.body.company_name || '',
        website: req.body.website || null,
        phone: req.body.phone || '',
        address: req.body.address || '',
        company_logo: req.body.company_logo || null,
        registration_certificate: req.body.registration_certificate || null,
        description: req.body.description || '',
      } });
    }

    // 7. Generate token and return response
    const token = jwt.sign( { id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" } ); 
    res.json({ message: "Signup successful", token, user: { id: user.id, email: user.email, role: user.role } }); 
  } catch (err) { console.error("Signup error:", err); res.status(500).json({ message: "Error signing up" }); 
  } };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password); 
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET); 
    res.json({ 
      message: "login successful", 
      token, 
      user: { id: user.id, email: user.email, role: user.role}
     }) ;
  } catch (err) { console.error("login error:", err); 
    res.status(500).json({ message: "Error logging in" });
  
  }}
//     const token = generateToken(user);

//     return res.json({
//       message: 'Login successful',
//       token,
//       user,
//     });
//   } catch (err) {
//     return res.status(500).json({ message: 'Server error' });
//   }
// };