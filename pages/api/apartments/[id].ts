import mockGen from '@/mockGen';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  return res.status(200).json(mockGen.getApts(String(id)));
};
