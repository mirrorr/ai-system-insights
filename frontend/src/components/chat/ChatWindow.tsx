import { ChatMessage } from '../../types/chat';
import MessageBubble from './MessageBubble';

const sampleMessages: ChatMessage[] = [
  { role: 'assistant', content: 'Ask me about your system logs or configuration.', timestamp: new Date().toISOString() },
];

function ChatWindow() {
  return (
    <section>
      <h2>System Insights Chat</h2>
      <div className="chat-window">
        {sampleMessages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
    </section>
  );
}

export default ChatWindow;
