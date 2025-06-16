"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts
const sequelize_1 = require("sequelize");
// Just use process.env directly — dotenv is already loaded in index.ts
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
