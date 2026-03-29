import { useState, useCallback } from 'react';
import HudBackground from '@/components/jarvis/HudBackground';
import JarvisAvatar from '@/components/jarvis/JarvisAvatar';
import ChatPanel from '@/components/jarvis/ChatPanel';
import VoiceControl from '@/components/jarvis/VoiceControl';
import StatusCards from '@/components/jarvis/StatusCards';
import ArchitecturePanel from '@/components/jarvis/ArchitecturePanel';
import QuickActions from '@/components/jarvis/QuickActions';
import StatusBar from '@/components/jarvis/StatusBar';
import SettingsDrawer from '@/components/jarvis/SettingsDrawer';
import { useSettings } from '@/hooks/useSettings';
import { useAssistantState } from '@/hooks/useAssistantState';

const Index = () => {
  const { settings, setSettings } = useSettings();
  const {
    state, setState,
    status,
    messages,
    simulateResponse,
    checkConnection,
    checkMic,
  } = useAssistantState();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSend = useCallback((text: string) => {
    simulateResponse(text);
  }, [simulateResponse]);

  const handleHoldStart = useCallback(() => {
    setState('listening');
  }, [setState]);

  const handleHoldEnd = useCallback(() => {
    if (state === 'listening') {
      setState('idle');
      // Simulate a voice command
      simulateResponse('Voice command detected — running system check.');
    }
  }, [state, setState, simulateResponse]);

  const handleQuickAction = useCallback((action: string) => {
    simulateResponse(action);
  }, [simulateResponse]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HudBackground />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col p-4 gap-4 max-w-[1600px] mx-auto w-full">
        {/* Top: Avatar + Side panels */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 min-h-0">
          {/* Left column: Chat */}
          <div className="flex flex-col gap-4 min-h-0 order-2 lg:order-1">
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <ChatPanel
                messages={messages}
                onSend={handleSend}
                disabled={state === 'thinking' || state === 'speaking'}
              />
            </div>
            <QuickActions onAction={handleQuickAction} />
          </div>

          {/* Center: Avatar */}
          <div className="flex flex-col items-center justify-center gap-6 order-1 lg:order-2 py-4 lg:py-0 lg:px-8">
            <div className="animate-float">
              <JarvisAvatar state={state} enabled={settings.avatarEnabled} />
            </div>
            <VoiceControl
              state={state}
              micStatus={status.mic}
              voiceMode={settings.voiceMode}
              onHoldStart={handleHoldStart}
              onHoldEnd={handleHoldEnd}
              onRequestMic={checkMic}
            />
          </div>

          {/* Right column: Status + Architecture */}
          <div className="flex flex-col gap-4 order-3">
            <StatusCards
              status={status}
              onCheckOllama={() => checkConnection('ollama', settings.ollamaUrl)}
              onCheckGateway={() => checkConnection('gateway', settings.gatewayUrl)}
              onCheckMic={checkMic}
            />
            <ArchitecturePanel />
          </div>
        </div>

        {/* Bottom status bar */}
        <StatusBar
          state={state}
          model={settings.modelName}
          gatewayStatus={status.gateway}
          avatarEnabled={settings.avatarEnabled}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      </div>

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onChange={setSettings}
      />
    </div>
  );
};

export default Index;
