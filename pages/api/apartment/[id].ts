import mockGen from '@/mockGen';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    return res.status(200).json(mockGen.getOneApt(String(id)));
  }

  if (req.method === 'POST') {
    console.log(await new Promise((resolve) => {
      setTimeout(() => { resolve(req.body); }, 1000);
    }));

    return res.status(201).end();
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
