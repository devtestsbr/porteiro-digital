import mockGen from '@/mockGen';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    return res.status(200).json(mockGen.getOneApt(String(id)));
  }

  if (req.method === 'POST') {
    const { name, message, contact } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!contact) {
      return res.status(400).json({ error: 'Contact is required' });
    }

    console.log(await new Promise((resolve) => {
      setTimeout(() => { resolve(req.body); }, 1000);
    }));

    return res.status(201).end();
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
