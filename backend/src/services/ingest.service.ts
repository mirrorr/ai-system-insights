import { chunkText } from '../utils/chunker.ts';
import { createEmbedding } from './embedding.service.ts';
import { addDocuments } from './vector/jsonVectorStore.ts';

export async function ingestDocument(data: string) {
  // 1. Clean input
  const cleanText = data.trim();

  // 2. Split into chunks
  const chunks = chunkText(cleanText);

  // 3. Create embeddings for each chunk
  const embeddedChunks = await Promise.all(
    chunks.map(async (chunk, index) => {
      const embedding = await createEmbedding(chunk);

      return {
        id: `chunk-${Date.now()}-${index}`,
        text: chunk,
        embedding,
      };
    })
  );

  // 4. Store in vector DB (JSON for now)
  addDocuments(embeddedChunks);

  return {
    status: "indexed",
    chunks: embeddedChunks.length,
  };
}