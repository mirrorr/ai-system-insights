import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Ingest data is required' });
  }

  res.json({ status: 'ok', ingested: true });
});

export default router;
