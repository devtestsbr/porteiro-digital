import mockGen from '@/mockGen';
import locationsHandler from '@/pages/api/locations';
import { mockRequestResponse } from '../utils';

describe('/api/locations', () => {
  describe('GET', () => {
    it('returns the locations data', async () => {
      const { req, res } = mockRequestResponse();
      locationsHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(res.statusMessage).toEqual('OK');

      expect(res._getJSONData()).toEqual(mockGen.locations);
    });
  });
});
