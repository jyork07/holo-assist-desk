import { useState, useCallback } from 'react';

export type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface SystemStatus {
  ollama: 'connected' | 'disconnected' | 'checking';
  gateway: 'connected' | 'disconnected' | 'checking';
  mic: 'granted' | 'denied' | 'prompt' | 'unavailable';
  homeAssistant: 'planned';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  streaming?: boolean;
}

export function useAssistantState() {
  const [state, setState] = useState<AssistantState>('idle');
  const [status, setStatus] = useState<SystemStatus>({
    ollama: 'disconnected',
    gateway: 'disconnected',
    mic: 'prompt',
    homeAssistant: 'planned',
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      sender: 'assistant',
      text: 'JARVIS V1 online. Systems nominal. How may I assist you today?',
      timestamp: new Date(),
    },
  ]);

  const addMessage = useCallback((sender: 'user' | 'assistant', text: string) => {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    return msg;
  }, []);

  const simulateResponse = useCallback(async (userText: string) => {
    addMessage('user', userText);
    setState('thinking');

    const responses = [
      `Processing your request: "${userText}". Analysis complete. Based on local model inference via phi3, I've identified several relevant patterns. Shall I elaborate on any specific aspect?`,
      `Understood. Running "${userText}" through the OpenClaw gateway pipeline. Preliminary results indicate nominal performance across all subsystems. Ready for follow-up queries.`,
      `Acknowledged. I've analyzed "${userText}" using the local Ollama instance. The phi3 model suggests multiple approaches. Would you like me to detail the optimal strategy?`,
      `Request received. Cross-referencing "${userText}" with available local knowledge base. Systems indicate high confidence in the proposed solution pathway.`,
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

    const msgId = Date.now().toString();
    const streamMsg: ChatMessage = {
      id: msgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date(),
      streaming: true,
    };
    setMessages(prev => [...prev, streamMsg]);
    setState('speaking');

    // Simulate streaming
    for (let i = 0; i <= response.length; i++) {
      await new Promise(r => setTimeout(r, 15 + Math.random() * 25));
      setMessages(prev =>
        prev.map(m => m.id === msgId ? { ...m, text: response.slice(0, i) } : m)
      );
    }

    setMessages(prev =>
      prev.map(m => m.id === msgId ? { ...m, streaming: false } : m)
    );
    setState('idle');
  }, [addMessage]);

  const checkConnection = useCallback(async (type: 'ollama' | 'gateway', url: string) => {
    setStatus(prev => ({ ...prev, [type]: 'checking' }));
    await new Promise(r => setTimeout(r, 1500));
    // Simulate: try a real fetch, fall back to demo
    try {
      const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(3000) });
      setStatus(prev => ({ ...prev, [type]: res.ok ? 'connected' : 'disconnected' }));
    } catch {
      setStatus(prev => ({ ...prev, [type]: 'disconnected' }));
    }
  }, []);

  const checkMic = useCallback(async () => {
    try {
      if (!navigator.mediaDevices) {
        setStatus(prev => ({ ...prev, mic: 'unavailable' }));
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      setStatus(prev => ({ ...prev, mic: 'granted' }));
    } catch {
      setStatus(prev => ({ ...prev, mic: 'denied' }));
    }
  }, []);

  return {
    state, setState,
    status, setStatus,
    messages,
    addMessage,
    simulateResponse,
    checkConnection,
    checkMic,
  };
}
