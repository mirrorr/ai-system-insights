import express from 'express';
import cors from 'cors';

import chatController from './controllers/chat.controller.ts';
import ingestController from './controllers/ingest.controller.ts';
import debugController from './controllers/debug.controller.ts';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatController);
app.use('/ingest', ingestController);
app.use('/debug', debugController);

app.get('/', (_, res) => res.json({ status: 'AI System Insights backend running' }));

export default app;
