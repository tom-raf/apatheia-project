const sequelize = require('./dbInstance');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB! 🐘');
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
