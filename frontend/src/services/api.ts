import { ChatMessage } from '../types/chat';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function sendChatMessage(message: string): Promise<ChatMessage> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }

  return response.json();
}
