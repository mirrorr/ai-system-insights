// services/vector/jsonVectorStore.adapter.ts
import type { VectorStore, VectorDocument } from './vectorStore.interface.ts';
import { loadStore, saveStore } from './jsonVectorStore.ts';
import { cosineSimilarity } from '../../utils/cosineSimilarity.ts';

export class JsonVectorStore implements VectorStore {
  async addDocument(doc: VectorDocument): Promise<void> {
    const store = loadStore();
    store.push(doc);
    saveStore(store);
  }

  async idExists(id: string): Promise<boolean> {
    const store = loadStore();
    return store.some((doc: VectorDocument) => doc.id === id);
  }

  async query(queryEmbedding: number[], topK: number): Promise<VectorDocument[]> {
    const store = loadStore();
    if (!store.length) return [];

    return store
      .map((doc: VectorDocument) => ({
        ...doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding),
      }))
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, topK);
  }
}