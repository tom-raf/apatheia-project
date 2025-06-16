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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password } = req.body;
        if (!name || !password) {
            res.status(400).json({ message: 'Name and password are required.' });
            return;
        }
        const existingUser = yield userModel_1.default.findOne({ where: { username } });
        if (existingUser) {
            res.status(409).json({ message: 'User already exists.' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long.' });
            return;
        }
        const password_hash = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({
            name,
            username,
            password_hash,
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '30m' });
        res.status(201).json({
            message: 'Registration successful.',
            token,
            name: newUser.name,
            id: newUser.id,
        });
    }
    catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password required.' });
            return;
        }
        const user = yield userModel_1.default.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password_hash);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30m' });
        res.status(200).json({
            message: 'Login successful.',
            token,
            name: user.name,
            id: user.id,
        });
    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.loginUser = loginUser;
