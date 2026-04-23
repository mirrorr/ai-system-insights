import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use embedding model
const model = genAI.getGenerativeModel({
  model: "gemini-embedding-001", // or "gemini-embedding-001" if available
});

export async function createEmbedding(text: string): Promise<number[]> {
    // Mock - return Array.from({ length: 128 }, (_, index) => index * 0.01);
  
    try {
    const result = await model.embedContent(text);

    const embedding = result.embedding.values;
    console.log("Generated embedding of length:", embedding.length);
    return embedding;
  } catch (error) {
    console.error("Embedding error:", error);
    throw new Error("Failed to generate embedding");
  }
}