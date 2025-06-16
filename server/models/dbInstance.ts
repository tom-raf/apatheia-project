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



// i'm still not sure why the code below didn't work
// 


// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// const {
//   DATABASE_NAME,
//   DATABASE_USER,
//   DATABASE_PASSWORD,
//   DATABASE_HOST,
// } = process.env

// if (!DATABASE_NAME || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST) {
//   console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
//   console.log('DATABASE_USER:', process.env.DATABASE_USER);
//   console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
//   console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
//   throw new Error('Missing required database environment variables.');
// }

// const sequelize = new Sequelize(
//   DATABASE_NAME,
//   DATABASE_USER,
//   DATABASE_PASSWORD,
//   {
//     host: DATABASE_HOST,
//     dialect: 'postgres',
//     logging: false,
//   }
// );

// export default sequelize;