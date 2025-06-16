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
exports.updatePassword = exports.updateUsername = exports.updateUserName = exports.deleteUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
// delete path
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        yield userModel_1.default.destroy({ where: { id: userId } });
        res.status(200).json({ message: 'User account deleted.' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.deleteUser = deleteUser;
// PUT /api/users/name
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Name is required.' });
            return;
        }
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        user.name = name;
        yield user.save();
        res.status(200).json({ message: 'Name updated successfully.', name: user.name });
    }
    catch (error) {
        console.error('Error updating name:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.updateUserName = updateUserName;
// put username
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { username } = req.body;
        if (!username) {
            res.status(400).json({ message: 'Username is required.' });
            return;
        }
        const existingUser = yield userModel_1.default.findOne({ where: { username } });
        if (existingUser && existingUser.id !== userId) {
            res.status(409).json({ message: 'Username already in use.' });
            return;
        }
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        user.username = username;
        yield user.save();
        res.status(200).json({ message: 'Username updated successfully.', username: user.username });
    }
    catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.updateUsername = updateUsername;
// put password
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({ message: 'Both current and new passwords are required.' });
            return;
        }
        const user = yield userModel_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(currentPassword, user.password_hash);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Current password is incorrect.' });
            return;
        }
        if (newPassword.length < 6) {
            res.status(400).json({ message: 'New password must be at least 6 characters long.' });
            return;
        }
        const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password_hash = newHashedPassword;
        yield user.save();
        res.status(200).json({ message: 'Password updated successfully.' });
    }
    catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
exports.updatePassword = updatePassword;
