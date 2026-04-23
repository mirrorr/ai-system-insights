import { createEmbedding } from './embedding.service.ts';
import { vectorStore } from './vector/vectorStore.factory.ts';

export async function retrieveRelevantChunks(query: string, topK = 5) {
  const queryEmbedding = await createEmbedding(query);
  const results = await vectorStore.query(queryEmbedding, topK);

  if (!results.length) return [];

  console.log('[RETRIEVAL] Top scores:',
    results.map((r: any) => r.score?.toFixed(3) ?? 'n/a')
  );

  return results;
}

export function buildContext(docs: any[]) {
  return docs.map((d, i) => `Chunk ${i + 1}:\n${d.text}`).join('\n\n');
}