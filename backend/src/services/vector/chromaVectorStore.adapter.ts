// services/vector/chromaVectorStore.adapter.ts
import type { VectorStore, VectorDocument } from './vectorStore.interface.ts';
import { addToStore, idExists, queryStore } from './chromaVectorStore.ts';

export class ChromaVectorStore implements VectorStore {
  async addDocument(doc: VectorDocument): Promise<void> {
    await addToStore(doc.id, doc.text, doc.embedding, doc.metadata);
  }

  async idExists(id: string): Promise<boolean> {
    return idExists(id);
  }

  async query(queryEmbedding: number[], topK: number): Promise<VectorDocument[]> {
    const results = await queryStore(queryEmbedding, topK);
    return results.documents[0].map((text: string, i: number) => ({
      id: results.ids[0][i],
      text,
      embedding: [],  // Chroma doesn't return embeddings by default
      metadata: results.metadatas[0][i] as Record<string, string>,
    }));
  }
}