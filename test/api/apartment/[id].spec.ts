import mockGen from '@/mockGen';
import apartmentHandler from '@/pages/api/apartment/[id]';
import { mockRequestResponse } from '@/test/utils';

describe('/api/apartment/[id]', () => {
  describe('GET', () => {
    it('returns the apartment data', async () => {
      const { req, res } = mockRequestResponse();
      const aptId = mockGen.getApts(mockGen.locations[0][0])?.apt[0][0];
      req.query.id = aptId;
      await apartmentHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(res.statusMessage).toEqual('OK');

      expect(res._getJSONData()).toEqual(mockGen.getOneApt(aptId!));
    });
  });

  describe('POST', () => {
    const mockBody = {
      name: 'mock name',
      message: 'mock message',
      contact: 'mock contact'
    };

    it('creates a message', async () => {
      const { req, res } = mockRequestResponse('POST', mockBody);

      await apartmentHandler(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.getHeaders()).toEqual({});
      expect(res.statusMessage).toEqual('OK');
    });

    it('returns 400 if the body is not valid', async () => {
      const { req, res } = mockRequestResponse('POST', {});

      await apartmentHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(res.statusMessage).toEqual('OK');

      expect(res._getJSONData()).toEqual({ error: 'Name is required' });
    });
  });

  describe('OTHER', () => {
    it('returns method not allowed', async () => {
      const { req, res } = mockRequestResponse('OPTIONS');
      await apartmentHandler(req, res);

      expect(res.statusCode).toBe(405);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(res.statusMessage).toEqual('OK');

      expect(res._getJSONData()).toEqual({ error: 'Method Not Allowed' });
    });
  });
});
