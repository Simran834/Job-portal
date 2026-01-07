const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // return null if invalid or expired
  }
}

module.exports = {
  generateToken,
  verifyToken,
};