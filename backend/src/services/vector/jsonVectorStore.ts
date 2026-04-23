import fs from "fs";
import type { VectorDocument } from "./vectorStore.interface.ts";

const FILE = "./src/data/vectors.json";

export function loadStore(): VectorDocument[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveStore(data: VectorDocument[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function addDocuments(docs: VectorDocument[]) {
  const store = loadStore();
  saveStore([...store, ...docs]);
}