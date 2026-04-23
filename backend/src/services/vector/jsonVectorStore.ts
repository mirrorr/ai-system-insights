import fs from "fs";

export type VectorDoc = {
  id: string;
  text: string;
  embedding: number[];
};

const FILE = "./src/data/vectors.json";

export function loadStore(): VectorDoc[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveStore(data: VectorDoc[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function addDocuments(docs: VectorDoc[]) {
  const store = loadStore();
  saveStore([...store, ...docs]);
}