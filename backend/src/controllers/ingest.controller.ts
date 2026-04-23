import { Router } from 'express';
import { ingestDocument } from '../services/ingest.service.ts';

const router = Router();

router.post('/', async (req, res) => {
console.log("Received ingest request with body:", req.body);
  const { data } = req.body;

  if (!data) {
    console.warn("Ingest request missing 'data' field");
    return res.status(400).json({ error: 'Ingest data is required' });
  }
  console.log("Starting ingestion process for data length:", data.length);

  await ingestDocument(data); // chunk + embed + store

  res.json({ status: 'ok', ingested: true });

});

export default router;
