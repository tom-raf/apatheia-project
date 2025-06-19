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
const quotesController_1 = require("../../controllers/quotesController");
const quoteModel_1 = __importDefault(require("../../models/quoteModel"));
jest.mock('../../models/quoteModel'); // we need to mock the whole model
describe('getAQuote', () => {
    /* partial is important for typescript, it turns the properties into optional ones
    e.g. id: number becomes id?: number
    if we dont do this then Typescript will get angry at the response not fitting the object*/
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(), //
            send: jest.fn(),
        };
    });
    it('should return quote for today', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQuote = { id: 1, text: 'Test quote', assigned_date: '2025-06-18' };
        quoteModel_1.default.findOne.mockResolvedValue(mockQuote);
        yield (0, quotesController_1.getAQuote)(req, res);
        expect(quoteModel_1.default.findOne).toHaveBeenCalledWith({
            where: { assigned_date: new Date().toISOString().split('T')[0] },
        });
        expect(res.json).toHaveBeenCalledWith(mockQuote);
    }));
    it('should return 404 if no quote is found', () => __awaiter(void 0, void 0, void 0, function* () {
        quoteModel_1.default.findOne.mockResolvedValue(null);
        yield (0, quotesController_1.getAQuote)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No quote found for today.' });
    }));
    it('should handle errors and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        quoteModel_1.default.findOne.mockRejectedValue(new Error('DB error'));
        yield (0, quotesController_1.getAQuote)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error while getting quote');
    }));
});
