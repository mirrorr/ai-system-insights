
import express from 'express';
import { getCollection } from '../services/vector/chromaVectorStore.ts';

const router = express.Router();

// Quick check — count and sample via Chroma v2
router.get('/chroma', async (req, res) => {
  const col = await getCollection();
  const count = await col.count();
  const sample = await col.get({ limit: 5 });

  res.json({
    collection: col.name,
    totalDocuments: count,
    sample: sample.documents.map((text, i) => ({
      id: sample.ids[i],
      text: text?.slice(0, 200) + '...',
      metadata: sample.metadatas[i],
    })),
  });
});

export default router;