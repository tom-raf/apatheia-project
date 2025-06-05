const { DataTypes } = require('sequelize');
const sequelize = require('./dbInstance');

const JournalEntry = sequelize.define('JournalEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  journal_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quote_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'journal_entries',
  timestamps: true
});

module.exports = JournalEntry;