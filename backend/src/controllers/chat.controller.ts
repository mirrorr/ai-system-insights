import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  res.json({ role: 'assistant', content: `Received message: ${message}` });
});

export default router;
