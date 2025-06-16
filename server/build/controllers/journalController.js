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
exports.getTodaysEntry = exports.updateJournalEntry = exports.getUserJournalHistory = exports.createJournalEntry = void 0;
const journalEntryModel_1 = __importDefault(require("../models/journalEntryModel"));
const quoteModel_1 = __importDefault(require("../models/quoteModel"));
const createJournalEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { journal_text, quote_id } = req.body;
        const userId = req.userId;
        if (!journal_text || !quote_id || !userId) {
            res.status(400).json({ message: 'Missing journal text, quote, or user ID.' });
            return;
        }
        const today = new Date().toISOString().split('T')[0];
        const entry = yield journalEntryModel_1.default.create({
            journal_text,
            quote_id,
            user_id: userId,
            date: today,
        });
        res.status(201).json({ message: 'Journal entry saved.', entry });
    }
    catch (error) {
        console.error('Error saving journal entry:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.createJournalEntry = createJournalEntry;
const getUserJournalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({ message: 'Missing user ID.' });
            return;
        }
        const entries = yield journalEntryModel_1.default.findAll({
            where: { user_id: userId },
            include: {
                model: quoteModel_1.default,
                attributes: ['quote_text', 'author'],
            },
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
        res.status(200).json(entries);
    }
    catch (error) {
        console.error('Error fetching journal history:', error);
        res.status(500).json({ message: 'Could not retrieve journal entries.' });
    }
});
exports.getUserJournalHistory = getUserJournalHistory;
const updateJournalEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { journal_text, date } = req.body;
        const userId = req.userId;
        if (!journal_text || !date || !userId) {
            res.status(400).json({ message: 'Missing updated journal text, date, or user ID.' });
            return;
        }
        const entry = yield journalEntryModel_1.default.findOne({
            where: {
                user_id: userId,
                date,
            },
        });
        if (!entry) {
            res.status(404).json({ message: 'Entry not found for this date.' });
            return;
        }
        entry.journal_text = journal_text;
        yield entry.save();
        res.status(200).json({ message: 'Journal entry updated.', entry });
    }
    catch (error) {
        console.error('Error updating journal entry:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.updateJournalEntry = updateJournalEntry;
const getTodaysEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const today = new Date().toISOString().split('T')[0];
        if (!userId) {
            res.status(400).json({ message: 'Missing user ID.' });
            return;
        }
        const entry = yield journalEntryModel_1.default.findOne({
            where: {
                user_id: userId,
                date: today,
            },
            include: {
                model: quoteModel_1.default,
                attributes: ['quote_text', 'author'],
            },
        });
        if (!entry) {
            res.status(404).json({ message: 'No entry found for today.' });
            return;
        }
        res.status(200).json(entry);
    }
    catch (error) {
        console.error("Error fetching today's entry:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.getTodaysEntry = getTodaysEntry;
