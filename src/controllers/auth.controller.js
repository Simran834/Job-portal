const prisma = require('../config/prismaClient');
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/jwt.util');
require ("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Normalize email to lowercase
    const normalizedEmail = email?.trim().toLowerCase();
    
    console.log('📝 Signup attempt:', { name, normalizedEmail, passwordLength: password?.length, role });

    // 1. Validate required fields
    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Normalize role (frontend sends "jobseeker"/"employer")
    const normalizedRole = (role || 'jobseeker').toUpperCase();
    if (!['JOBSEEKER', 'EMPLOYER'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // 3. Check if user exists
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      console.log('⚠️  User already exists:', normalizedEmail);
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✓ Password hashed');

    // 5. Create user (User model doesn't have `name` field)
    const user = await prisma.user.create({
      data: { email: normalizedEmail, password: hashedPassword, role: normalizedRole },
    });
    
    console.log('✅ User created:', { id: user.id, email: user.email, role: user.role });

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
      console.log('✓ Jobseeker profile created');
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
      console.log('✓ Employer profile created');
    }

    // 7. Generate token and return response
    const token = jwt.sign( { id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" } ); 
    res.json({ message: "Signup successful", 
      token, 
      user: { id: user.id, email: user.email, role: user.role } 
    }); 
  } catch (err) { 
    console.error("❌ Signup error:", err); 
    res.status(500).json({ message: "Error signing up: " + err.message }); 
  } };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Normalize email to lowercase
    const normalizedEmail = email?.trim().toLowerCase();
    
    console.log('🔐 Login attempt:', { normalizedEmail, passwordLength: password?.length });

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    
    console.log('🔍 User found:', user ? `Yes (id: ${user.id})` : 'No');
    console.log('📊 Debug - All users in DB:', JSON.stringify(Array.from(prisma.users?.values?.() || []).map(u => ({ id: u.id, email: u.email }))));

    if (!user) {
      console.log('❌ User not found in database');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('🔐 Comparing passwords...');
    const valid = await bcrypt.compare(password, user.password);
    console.log('✓ Password comparison result:', valid);
    
    if (!valid) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5d" }); 
    console.log('✅ Login successful for:', normalizedEmail);
    return res.json({ 
      message: "login successful", 
      token, 
      user: { id: user.id, email: user.email, role: user.role}
     }) ;
  } catch (err) { 
    console.error("❌ Login error:", err); 
    res.status(500).json({ message: "Error logging in: " + err.message });
  
  }}



const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should include { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { signup, login, auth };

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