import type { VectorStore } from './vectorStore.interface.ts';
import { JsonVectorStore } from './jsonVectorStore.adapter.ts';
import { ChromaVectorStore } from './chromaVectorStore.adapter.ts';

const backend = process.env.VECTOR_STORE ?? 'chroma'; // default to json (chroma is optional and requires separate setup)

const stores: Record<string, () => VectorStore> = {
  json:   () => new JsonVectorStore(),
  chroma: () => new ChromaVectorStore(),
};

if (!stores[backend]) {
  throw new Error(`[VectorStore] Unknown backend: "${backend}". Use "json" or "chroma".`);
}

export const vectorStore: VectorStore = stores[backend]();
console.log(`[VectorStore] Using backend: ${backend}`);