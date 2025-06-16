"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntry = exports.Quote = exports.User = void 0;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const quoteModel_1 = __importDefault(require("./quoteModel"));
exports.Quote = quoteModel_1.default;
const journalEntryModel_1 = __importDefault(require("./journalEntryModel"));
exports.JournalEntry = journalEntryModel_1.default;
// User <-> JournalEntry
userModel_1.default.hasMany(journalEntryModel_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' });
journalEntryModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Quote <-> JournalEntry
quoteModel_1.default.hasMany(journalEntryModel_1.default, { foreignKey: 'quote_id' });
journalEntryModel_1.default.belongsTo(quoteModel_1.default, { foreignKey: 'quote_id' });
