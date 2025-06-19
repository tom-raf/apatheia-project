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
const authController_1 = require("../../controllers/authController");
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// do the mocks 
jest.mock('../../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
describe('Auth Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe('registerUser', () => {
        it('should return 400 if name or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { name: '', password: '' };
            yield (0, authController_1.registerUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Name and password are required.' });
        }));
        it('should return 409 if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { name: 'Test', username: 'testuser', password: 'password123' };
            userModel_1.default.findOne.mockResolvedValue({ id: 1 });
            yield (0, authController_1.registerUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: 'User already exists.' });
        }));
        it('should return 400 if password is too short', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { name: 'Test', username: 'testuser', password: '123' };
            userModel_1.default.findOne.mockResolvedValue(null);
            yield (0, authController_1.registerUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Password must be at least 6 characters long.',
            });
        }));
        it('should create a user and return 201 with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { name: 'Test', username: 'testuser', password: 'password123' };
            userModel_1.default.findOne.mockResolvedValue(null);
            bcryptjs_1.default.hash.mockResolvedValue('hashedPassword');
            userModel_1.default.create.mockResolvedValue({ id: 1, name: 'Test' });
            jsonwebtoken_1.default.sign.mockReturnValue('mockToken');
            process.env.JWT_SECRET = 'testsecret';
            yield (0, authController_1.registerUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Registration successful.',
                token: 'mockToken',
                name: 'Test',
                id: 1,
            });
        }));
    });
    describe('loginUser', () => {
        it('should return 400 if username or password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { username: '', password: '' };
            yield (0, authController_1.loginUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Username and password required.' });
        }));
        it('should return 401 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { username: 'testuser', password: 'password123' };
            userModel_1.default.findOne.mockResolvedValue(null);
            yield (0, authController_1.loginUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
        }));
        it('should return 401 if password does not match', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { username: 'testuser', password: 'wrongpassword' };
            userModel_1.default.findOne.mockResolvedValue({ password_hash: 'hashedPassword' });
            bcryptjs_1.default.compare.mockResolvedValue(false);
            yield (0, authController_1.loginUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
        }));
        it('should return 200 and a token if credentials are valid', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { username: 'testuser', password: 'password123' };
            userModel_1.default.findOne.mockResolvedValue({
                id: 1,
                name: 'Test User',
                password_hash: 'hashedPassword',
            });
            bcryptjs_1.default.compare.mockResolvedValue(true);
            jsonwebtoken_1.default.sign.mockReturnValue('mockToken');
            process.env.JWT_SECRET = 'testsecret';
            yield (0, authController_1.loginUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Login successful.',
                token: 'mockToken',
                name: 'Test User',
                id: 1,
            });
        }));
    });
});
