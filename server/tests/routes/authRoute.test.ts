import { registerUser, loginUser } from '../../controllers/authController';
import { Request, Response } from 'express';
import User from '../../models/userModel'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// do the mocks 
jest.mock('../../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should return 400 if name or password is missing', async () => {
      req.body = { name: '', password: '' };

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name and password are required.' });
    });

    it('should return 409 if user already exists', async () => {
      req.body = { name: 'Test', username: 'testuser', password: 'password123' };
      (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists.' });
    });

    it('should return 400 if password is too short', async () => {
      req.body = { name: 'Test', username: 'testuser', password: '123' };
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password must be at least 6 characters long.',
      });
    });

    it('should create a user and return 201 with a token', async () => {
      req.body = { name: 'Test', username: 'testuser', password: 'password123' };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.create as jest.Mock).mockResolvedValue({ id: 1, name: 'Test' });
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      process.env.JWT_SECRET = 'testsecret';

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Registration successful.',
        token: 'mockToken',
        name: 'Test',
        id: 1,
      });
    });
  });

  describe('loginUser', () => {
    it('should return 400 if username or password is missing', async () => {
      req.body = { username: '', password: '' };

      await loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username and password required.' });
    });

    it('should return 401 if user not found', async () => {
      req.body = { username: 'testuser', password: 'password123' };
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });

    it('should return 401 if password does not match', async () => {
      req.body = { username: 'testuser', password: 'wrongpassword' };
      (User.findOne as jest.Mock).mockResolvedValue({ password_hash: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });

    it('should return 200 and a token if credentials are valid', async () => {
      req.body = { username: 'testuser', password: 'password123' };
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 1,
        name: 'Test User',
        password_hash: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      process.env.JWT_SECRET = 'testsecret';

      await loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful.',
        token: 'mockToken',
        name: 'Test User',
        id: 1,
      });
    });
  });
});