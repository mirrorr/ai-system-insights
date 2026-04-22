import { useState } from 'react';

interface ChatInputProps {
  onSend?: (text: string) => void;
}

function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        onSend?.(value.trim());
        setValue('');
      }}
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask a question about your system..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
