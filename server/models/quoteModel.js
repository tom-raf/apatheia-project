const { DataTypes } = require('sequelize');
const sequelize = require('./dbInstance');

const Quote = sequelize.define('Quote', {
  quote_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assigned_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'quotes',
  timestamps: false
});

module.exports = Quote;