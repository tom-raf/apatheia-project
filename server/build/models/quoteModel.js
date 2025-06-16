"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbInstance_1 = __importDefault(require("./dbInstance"));
class Quote extends sequelize_1.Model {
}
Quote.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quote_text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    assigned_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: dbInstance_1.default,
    tableName: 'quotes',
    timestamps: false,
});
exports.default = Quote;
