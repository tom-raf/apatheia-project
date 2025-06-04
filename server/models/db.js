require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB! 🐘');
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };