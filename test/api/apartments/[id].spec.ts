import mockGen from '@/mockGen';
import apartmentsHandler from '@/pages/api/apartments/[id]';
import { mockRequestResponse } from '@/test/utils';

describe('/api/apartments/[id]', () => {
  describe('GET', () => {
    it('returns the apartments data', async () => {
      const { req, res } = mockRequestResponse();
      const aptId = mockGen.locations[0][0];
      req.query.id = aptId;

      apartmentsHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(res.statusMessage).toEqual('OK');

      expect(res._getJSONData()).toEqual(mockGen.getApts(aptId));
    });
  });
});
