# AI-Native System Insights Assistant

## 🚀 Overview

This project is an AI-native full-stack application that analyzes system data (logs, configs, documents) and provides intelligent insights using Large Language Models (LLMs).

It demonstrates:
- AI-first architecture
- Retrieval-Augmented Generation (RAG)
- Model-driven structured outputs
- Full-stack integration (React + Node.js)

---

## 🧠 Key Features

### 1. Chat with your data
Ask questions like:
- "Why is the system slow?"
- "Summarize the logs"
- "Find critical errors"

---

### 2. Retrieval-Augmented Generation (RAG)
- Documents are chunked and embedded
- Relevant context is retrieved per query
- LLM generates grounded answers

---

### 3. AI-first architecture
AI is the **core reasoning engine**, not just an add-on.

---

### 4. Structured outputs
Responses include machine-readable insights:

```json
{
  "issue": "High latency",
  "cause": "Database bottleneck",
  "confidence": 0.87
}

---

## 🛠 Tools

### 1. Local vectors vs ChromaDB
To switch local vs chroma use vectorStore.factory.ts file (line const backend = process.env.VECTOR_STORE ?? 'chroma'; // default to json (chroma is optional and requires separate setup))

### 2. ChromaDB
Start with: chroma run --path ./chroma_data
Debug with: http://localhost:4000/debug/chroma