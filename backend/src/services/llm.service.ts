import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use fast + cheap model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // or latest flash version
});

export async function callLLM(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("[LLM ERROR]:", error);
    throw new Error("LLM request failed");
  }
}