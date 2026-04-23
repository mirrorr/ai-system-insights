import 'dotenv/config';
import app from './app.ts';
import { getCollection } from './services/vector/chromaVectorStore.ts';

const port = Number(process.env.PORT || 4000);

async function start() {
  // Only check Chroma if it's the active backend
  console.log(`[Startup] Checking vector store: ${process.env.VECTOR_STORE}`); //TODO: not working
  if (process.env.VECTOR_STORE === 'chroma') {
    try {
      await getCollection();
      console.log('[Chroma] Connected ✓');
    } catch (err) {
      console.error('[Chroma] Could not connect — is the Chroma server running?');
      console.error('[Chroma] Start it with: chroma run --path ./chroma_data');
      process.exit(1); // stop Node.js from starting if Chroma is unavailable
    }
  }

  app.listen(port, () => {
    console.log(`[Server] Listening on http://localhost:${port}`);
  });
}

start();