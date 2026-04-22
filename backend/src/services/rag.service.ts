import { getRelevantVectors } from './vector/jsonVectorStore.js';

export async function retrieveAndGenerate(question: string) {
  const context = await getRelevantVectors(question);
  return { answer: `Generated response for: ${question}`, context };
}
