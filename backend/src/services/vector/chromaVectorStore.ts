// services/vector/chromaVectorStore.ts
import { ChromaClient, type Collection } from 'chromadb';

const client = new ChromaClient(); // connects to http://localhost:8000 by default
let collection: Collection | null = null;

export async function getCollection(): Promise<Collection> {
  if (!collection) {
    collection = await client.getOrCreateCollection({
      name: 'rag_documents',
      metadata: { 'hnsw:space': 'cosine' }, // cosine similarity — best for text embeddings
    });
  }
  return collection;
}

export async function addToStore(
  id: string,
  text: string,
  embedding: number[],
  metadata: Record<string, string>
) {
  const col = await getCollection();
  await col.add({
    ids: [id],
    embeddings: [embedding],
    documents: [text],
    metadatas: [metadata],
  });
}

export async function idExists(id: string): Promise<boolean> {
  const col = await getCollection();
  const result = await col.get({ ids: [id] });
  return result.ids.length > 0;
}

export async function queryStore(
  queryEmbedding: number[],
  nResults: number = 5
) {
  const col = await getCollection();
  return col.query({
    queryEmbeddings: [queryEmbedding],
    nResults,
  });
}