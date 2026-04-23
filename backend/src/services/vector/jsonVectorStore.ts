import fs from "fs";

export type VectorDoc = {
  id: string;              // hash
  text: string;
  embedding: number[];
  metadata: {
    source: string;        // filename
    uploadedAt: string;    // ISO date string
  };
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