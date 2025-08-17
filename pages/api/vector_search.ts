// pages/api/vector_search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from './lib/mongodb';

// This is the required handler function for Next.js Pages Router API routes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { embedding } = req.body;

    if (!embedding || !Array.isArray(embedding)) {
      return res.status(400).json({ error: 'Missing or invalid embedding array' });
    }
    console.log("searching...")
    const db = await getDb();
    const topMatches = await db.collection('documents').aggregate([
      {
        $vectorSearch: {
          index: 'vector_index', // MongoDB vector search index name
          path: 'embedding',     // field in documents containing embeddings
          queryVector: embedding,
          numCandidates: 100,
          limit: 5,
        },
      },
    ]).toArray();

    return res.status(200).json({ matches: topMatches });
  } catch (err) {
    console.error('Vector search error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
