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
exports.getAQuote = void 0;
const quoteModel_1 = __importDefault(require("../models/quoteModel"));
const getAQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date().toISOString().split('T')[0];
        const quote = yield quoteModel_1.default.findOne({ where: { assigned_date: today } });
        if (!quote) {
            res.status(404).json({ message: 'No quote found for today.' });
            return;
        }
        res.json(quote);
    }
    catch (error) {
        console.error('Error getting quote:', error);
        res.status(500).send('Error while getting quote');
    }
});
exports.getAQuote = getAQuote;
