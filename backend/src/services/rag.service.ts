import { retrieveRelevantChunks, buildContext } from "./retrieval.service.ts";
import { callLLM } from "./llm.service.ts";

export type RagMode = "strict" | "creative";

export async function ragService(query: string, mode: RagMode ) {
  // 1. Retrieve relevant chunks
  const docs = await retrieveRelevantChunks(query);

  // 2. Build context
  const context = buildContext(docs);

  console.log("[RAG] Context length:", context.length);

  const prompt = buildPrompt(query, context, mode);


  // 4. Call LLM
  const answer = await callLLM(prompt);

  return answer;
}

function buildPrompt(
  query: string,
  context: string,
  mode: RagMode
) {
  if (mode === "strict") {
    return `
You are an AI system analyzing logs and system data.

Rules:
- Use ONLY the provided context
- Do NOT add external knowledge
- If unsure, say "I don't know"
- Be concise and precise

Context:
${context}

Question:
${query}
`;
  }

  // creative mode
  return `
You are a senior system engineer diagnosing system issues.

Instructions:
- Use the provided context as the primary source
- You MAY extend with general engineering knowledge
- Explain root causes, implications, and possible fixes
- Be insightful and analytical, not just extractive

Context:
${context}

Question:
${query}
`;
}