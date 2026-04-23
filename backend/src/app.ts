import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatController from './controllers/chat.controller.ts';
import ingestController from './controllers/ingest.controller.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatController);
app.use('/ingest', ingestController);

app.get('/', (_, res) => res.json({ status: 'AI System Insights backend running' }));

export default app;
