import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { put } from '@vercel/blob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { voiceId, text } = req.body;

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
      body: JSON.stringify({
        text,
        output_format: 'mp3_44100_128',
        enable_logging: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBuffer = await response.buffer();
    const fileName = `${voiceId}-${Date.now()}.mp3`;

    // Upload do áudio para o Blob Storage da Vercel
    const blob = await put(fileName, Buffer.from(audioBuffer), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      contentType: 'audio/mpeg',
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}