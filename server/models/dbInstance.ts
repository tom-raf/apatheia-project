import { Sequelize } from 'sequelize';

// heavily modified from original implementation
const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;

