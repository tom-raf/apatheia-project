"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbInstance_1 = __importDefault(require("./dbInstance"));
// TODO:move to types file
class JournalEntry extends sequelize_1.Model {
}
// Initialize the model
JournalEntry.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    journal_text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    quote_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize: dbInstance_1.default,
    tableName: 'journal_entries',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'date'],
        },
    ],
});
exports.default = JournalEntry;
