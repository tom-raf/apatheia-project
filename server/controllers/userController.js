const User = require('../models/userModel');
const JournalEntry = require('../models/journalEntryModel');

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
