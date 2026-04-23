export type VectorDocument = {
  id: string;
  text: string;
  embedding: number[];
  metadata: Record<string, string>;
};

export type VectorStore = {
  addDocument(doc: VectorDocument): Promise<void>;
  idExists(id: string): Promise<boolean>;
  query(queryEmbedding: number[], topK: number): Promise<VectorDocument[]>;
};