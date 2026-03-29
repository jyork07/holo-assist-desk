import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import type { ChatMessage } from '@/hooks/useAssistantState';

interface Props {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatPanel = ({ messages, onSend, disabled }: Props) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="glass-panel flex flex-col h-full neon-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <span className="hud-label">Communication Log</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-lg text-sm font-body leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary/15 border border-primary/30 text-foreground'
                  : 'bg-secondary/60 border border-border/50 text-card-foreground'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}{msg.streaming && <span className="inline-block w-1.5 h-4 bg-primary/70 ml-0.5 animate-pulse" />}</p>
              <span className="block text-[10px] text-muted-foreground mt-1 font-mono">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
            disabled={disabled}
            className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="px-4 py-2.5 bg-primary/20 border border-primary/40 rounded-lg text-primary hover:bg-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
