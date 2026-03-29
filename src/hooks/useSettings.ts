import { useState, useCallback } from 'react';

export interface AppSettings {
  ollamaUrl: string;
  modelName: string;
  gatewayUrl: string;
  gatewayToken: string;
  agentId: string;
  voiceMode: 'hold-to-talk' | 'click-to-talk' | 'wake-word';
  ttsEnabled: boolean;
  avatarEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  ollamaUrl: 'http://localhost:11434',
  modelName: 'phi3',
  gatewayUrl: 'http://localhost:8000',
  gatewayToken: '',
  agentId: 'main',
  voiceMode: 'hold-to-talk',
  ttsEnabled: false,
  avatarEnabled: true,
};

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem('jarvis-settings');
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings);

  const setSettings = useCallback((update: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem('jarvis-settings', JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, setSettings };
}
