import { getAQuote } from '../../controllers/quotesController';
import { Request, Response } from 'express';
import Quote from '../../models/quoteModel'

jest.mock('../../models/quoteModel'); // we need to mock the whole model

// Explicitly mock static methods
(Quote.findOne as jest.Mock) = jest.fn();

describe('getAQuote', () => {
  /* partial is important for typescript, it turns the properties into optional ones 
  e.g. id: number becomes id?: number 
  if we dont do this then Typescript will get angry at the response not fitting the object*/
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => { // put this at the top and it fires before each test
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(), //
      send: jest.fn(),
    };
  });

  it('should return quote for today', async () => {
    const mockQuote = { id: 1, text: 'Test quote', assigned_date: '2025-06-18' };
    (Quote.findOne as jest.Mock).mockResolvedValue(mockQuote);

    await getAQuote(req as Request, res as Response);

    expect(Quote.findOne).toHaveBeenCalledWith({
      where: { assigned_date: new Date().toISOString().split('T')[0] },
    });
    expect(res.json).toHaveBeenCalledWith(mockQuote);
  });

  it('should return 404 if no quote is found', async () => {
    (Quote.findOne as jest.Mock).mockResolvedValue(null);

    await getAQuote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No quote found for today.' });
  });

  it('should handle errors and return 500', async () => {
    (Quote.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));

    await getAQuote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error while getting quote');
  });
});
