const prisma = require('../config/prismaClient');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// REQUEST Password Reset (generate token)
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes expiry

    await prisma.passwordResetToken.create({
      data: {
        user_id: user.id,
        token,
        expires_at: expiresAt
      }
    });

    // Normally you'd send this via email
    return res.json({ message: 'Password reset token generated', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// RESET Password (using token)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken || resetToken.expires_at < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.user_id },
      data: { password: newPassword }
    });

    // Delete used token
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword
};