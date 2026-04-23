import { Router } from 'express';
import { ragService } from '../services/rag.service.ts';

const router = Router();

router.post('/', async (req, res) => {
  const { message, mode } = req.body;
console.log("Received chat message:", message, "with mode:", mode);
  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  try {
    const answer = await ragService(message, mode);
    res.json({ answer });
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

export default router;
