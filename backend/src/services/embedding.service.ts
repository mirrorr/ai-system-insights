export async function createEmbedding(text: string): Promise<number[]> {
  return Array.from({ length: 128 }, (_, index) => index * 0.01);
}
