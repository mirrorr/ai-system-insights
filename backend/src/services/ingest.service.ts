import { chunkText } from '../utils/chunker.ts';
import { hashText } from '../utils/hash.ts';
import { createEmbedding } from './embedding.service.ts';
import { loadStore, saveStore } from './vector/jsonVectorStore.ts';

export async function ingestDocument(data: string, source: string) {

  // 1. Split into chunks
  const chunks = chunkText(data.trim());
  const uploadTime = new Date().toISOString();

  // 2.  Build quick lookup set for existing IDs (FAST)
  const store = loadStore();
  const existingIds = new Set(store.map((doc: any) => doc.id));

  // 3. Create embeddings for each chunk
  let added = 0;
  let skipped = 0;
  const embeddedChunks = await Promise.all(
    chunks.map(async (chunk, index) => {
      const id = hashText(chunk);

      // 🚨 dedup check
      if (existingIds.has(id)) {
        skipped++;
      } else {
        added++;
        existingIds.add(id);
        const embedding = await createEmbedding(chunk);

        store.push({
          id,
          text: chunk,
          embedding,
          metadata: {
            source,
            uploadedAt: uploadTime
          },
        });
      }
      
    })
  );

  // 4. Store in vector DB (JSON for now)
  saveStore(store);
  console.log(`[INGEST] Added: ${added}, Skipped duplicates: ${skipped}`);

  return {
    status: "indexed",
    chunks: embeddedChunks.length,
    added,
    skipped
  };
}