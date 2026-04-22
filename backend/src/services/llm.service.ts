export async function callLLM(prompt: string) {
  return {
    text: `LLM response for prompt: ${prompt}`,
    metadata: { prompt },
  };
}
