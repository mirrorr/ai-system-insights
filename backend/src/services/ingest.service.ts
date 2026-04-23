import { chunkText } from '../utils/chunker.ts';
import { hashText } from '../utils/hash.ts';
import { createEmbedding } from './embedding.service.ts';
import { vectorStore } from './vector/vectorStore.factory.ts';

export async function ingestDocument(data: string, source: string) {
  const chunks = chunkText(data.trim());
  const uploadTime = new Date().toISOString();

  let added = 0;
  let skipped = 0;

  for (const chunk of chunks) {
    const id = hashText(chunk);

    if (await vectorStore.idExists(id)) {
      skipped++;
      continue;
    }

    const embedding = await createEmbedding(chunk);
    await vectorStore.addDocument({ id, text: chunk, embedding, metadata: { source, uploadedAt: uploadTime } });
    added++;
  }

  console.log(`[INGEST] Added: ${added}, Skipped duplicates: ${skipped}`);
  return { status: 'indexed', chunks: chunks.length, added, skipped };
}