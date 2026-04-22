import { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${message.role}`}>
      <span>{message.content}</span>
      <small>{message.role}</small>
    </div>
  );
}

export default MessageBubble;
