import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  const options = {
    method: 'GET',
    headers: { 'xi-api-key': apiKey }
  };

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', options as RequestInit);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}