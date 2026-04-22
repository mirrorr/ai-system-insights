import fs from 'fs/promises';
import path from 'path';

const storagePath = path.resolve(process.cwd(), 'backend', 'src', 'data', 'vectors.json');

export async function getRelevantVectors(query: string) {
  try {
    const raw = await fs.readFile(storagePath, 'utf-8');
    const vectors = JSON.parse(raw);
    return vectors;
  } catch {
    return [];
  }
}

export async function saveVector(vector: unknown) {
  const existing = await getRelevantVectors('');
  existing.push(vector);
  await fs.writeFile(storagePath, JSON.stringify(existing, null, 2), 'utf-8');
}
