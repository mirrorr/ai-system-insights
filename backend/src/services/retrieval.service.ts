import { cosineSimilarity } from "../utils/cosineSimilarity.ts";
import { createEmbedding } from "./embedding.service.ts";
import { loadStore } from "./vector/jsonVectorStore.ts";

export async function retrieveRelevantChunks(
  query: string,
  topK = 5
) {
  // 1. Create embedding for query
  const queryEmbedding = await createEmbedding(query);

  // 2. Load stored vectors
  const store = loadStore();

  if (!store.length) {
    return [];
  }

  // 3. Compute similarity scores
  const scored = store.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  // 4. Sort by similarity (descending)
  scored.sort((a, b) => b.score - a.score);

  // 5. Take top K results
  const topResults = scored.slice(0, topK);

  // Debug (VERY useful)
  console.log("[RETRIEVAL] Top scores:",
    topResults.map(r => r.score.toFixed(3))
  );

  return topResults;
}

export function buildContext(docs: any[]) {
  return docs.map((d, i) => 
    `Chunk ${i + 1}:\n${d.text}`
  ).join("\n\n");
}