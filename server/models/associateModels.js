const User = require('./userModel');
const Quote = require('./quoteModel');
const JournalEntry = require('./journalEntryModel');

// User <-> JournalEntry
User.hasMany(JournalEntry, { foreignKey: 'user_id' });
JournalEntry.belongsTo(User, { foreignKey: 'user_id' });

// Quote <-> JournalEntry
Quote.hasMany(JournalEntry, { foreignKey: 'quote_id' });
JournalEntry.belongsTo(Quote, { foreignKey: 'quote_id' });

module.exports = { User, Quote, JournalEntry };