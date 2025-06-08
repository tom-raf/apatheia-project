const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    // Delete the user
    await User.destroy({ where: { id: userId } });
   
    res.status(200).json({ message: 'User account deleted.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateUserName = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.name = name;
    await user.save();

    res.status(200).json({ message: 'Name updated successfully.', name: user.name });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required.' });
    }

    // Check if username is taken by someone else
    const existingUser = await User.findOne({
      where: { username }
    });

    if (existingUser && existingUser.id !== userId) {
      return res.status(409).json({ message: 'Username already in use.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: 'Username updated successfully.', username: user.username });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = newHashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};