"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dbInstance_1 = __importDefault(require("../models/dbInstance"));
const userModel_1 = __importDefault(require("../models/userModel"));
const quoteModel_1 = __importDefault(require("../models/quoteModel"));
const journalEntryModel_1 = __importDefault(require("../models/journalEntryModel"));
require("../models/associateModels");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbInstance_1.default.sync({ force: true });
            // craete test user
            const hashedPassword = yield bcryptjs_1.default.hash('testpassword', 10);
            const testUser = yield userModel_1.default.create({
                name: 'Test User',
                username: 'testuser',
                password_hash: hashedPassword
            });
            // date format helper
            const formatDate = (date) => date.toISOString().split('T')[0];
            const today = new Date();
            const dates = [
                formatDate(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
                formatDate(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
                formatDate(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)), // yesterday
                formatDate(today), // today
                formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)) // tomorrow
            ];
            // seed the quotes
            const quotes = yield quoteModel_1.default.bulkCreate([
                {
                    quote_text: 'He who angers you conquers you.',
                    author: 'Epictetus',
                    assigned_date: dates[0]
                },
                {
                    quote_text: 'The best revenge is not to be like your enemy.',
                    author: 'Marcus Aurelius',
                    assigned_date: dates[1]
                },
                {
                    quote_text: 'No man is free who is not master of himself.',
                    author: 'Epictetus',
                    assigned_date: dates[2]
                },
                {
                    quote_text: 'We suffer more in imagination than in reality.',
                    author: 'Seneca',
                    assigned_date: dates[3]
                },
                {
                    quote_text: 'Man conquers the world by conquering himself.',
                    author: 'Zeno',
                    assigned_date: dates[4]
                }
            ]);
            // add journal entries for the first three quotes
            yield journalEntryModel_1.default.bulkCreate([
                {
                    journal_text: 'This really resonated with me.',
                    user_id: testUser.id,
                    quote_id: quotes[0].id,
                    date: dates[0]
                },
                {
                    journal_text: 'Trying not to stoop whenever I can.',
                    user_id: testUser.id,
                    quote_id: quotes[1].id,
                    date: dates[1]
                },
                {
                    journal_text: 'Self-control by self-reflection.',
                    user_id: testUser.id,
                    quote_id: quotes[2].id,
                    date: dates[2]
                }
            ]);
            console.log('✅ Seed data created successfully.');
            process.exit();
        }
        catch (err) {
            console.error('❌ Error seeding database:', err);
            process.exit(1);
        }
    });
}
seed();
