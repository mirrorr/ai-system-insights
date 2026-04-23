import { Router } from 'express';
import { ragService } from '../services/rag.service.ts';

const router = Router();

router.post('/', async (req, res) => {
  const { message, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const answer = await ragService(message, mode);

  res.json({ answer });
});

export default router;
