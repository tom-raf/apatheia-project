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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./models/db"));
const associateModels_1 = require("./models/associateModels");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const quotesRoute_1 = __importDefault(require("./routes/quotesRoute"));
const journalRoutes_1 = __importDefault(require("./routes/journalRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
app.use('/api/quote', quotesRoute_1.default);
app.use('/api/journal', journalRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield associateModels_1.User.sync();
        yield associateModels_1.Quote.sync();
        yield associateModels_1.JournalEntry.sync();
        console.log('Server running Λ');
    }
    catch (error) {
        console.error('Failed to connect to DB:', error);
        process.exit(1);
    }
}));
