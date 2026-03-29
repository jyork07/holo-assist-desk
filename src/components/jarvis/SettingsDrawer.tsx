import { X } from 'lucide-react';
import type { AppSettings } from '@/hooks/useSettings';

interface Props {
  open: boolean;
  onClose: () => void;
  settings: AppSettings;
  onChange: (update: Partial<AppSettings>) => void;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-display uppercase tracking-[0.2em] text-primary/60">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";
const selectClass = "w-full bg-muted/50 border border-border rounded-md px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer";

const SettingsDrawer = ({ open, onClose, settings, onChange }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-md h-full glass-panel-strong border-l border-glass-border overflow-y-auto"
        style={{ animation: 'slide-in 0.3s ease-out' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <span className="font-display text-sm tracking-widest uppercase text-primary neon-text">
            Systems Configuration
          </span>
          <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Ollama */}
          <div className="space-y-3">
            <div className="text-xs font-display uppercase tracking-widest text-neon-cyan/70 border-b border-border/30 pb-1">
              Ollama Configuration
            </div>
            <Field label="Base URL">
              <input
                className={inputClass}
                value={settings.ollamaUrl}
                onChange={e => onChange({ ollamaUrl: e.target.value })}
                placeholder="http://localhost:11434"
              />
            </Field>
            <Field label="Model Name">
              <input
                className={inputClass}
                value={settings.modelName}
                onChange={e => onChange({ modelName: e.target.value })}
                placeholder="phi3"
              />
            </Field>
          </div>

          {/* OpenClaw */}
          <div className="space-y-3">
            <div className="text-xs font-display uppercase tracking-widest text-neon-purple/70 border-b border-border/30 pb-1">
              OpenClaw Gateway
            </div>
            <Field label="Gateway URL">
              <input
                className={inputClass}
                value={settings.gatewayUrl}
                onChange={e => onChange({ gatewayUrl: e.target.value })}
                placeholder="http://localhost:8000"
              />
            </Field>
            <Field label="Gateway Token">
              <input
                type="password"
                className={inputClass}
                value={settings.gatewayToken}
                onChange={e => onChange({ gatewayToken: e.target.value })}
                placeholder="Enter token..."
              />
            </Field>
            <Field label="Agent ID">
              <input
                className={inputClass}
                value={settings.agentId}
                onChange={e => onChange({ agentId: e.target.value })}
                placeholder="main"
              />
            </Field>
          </div>

          {/* Voice */}
          <div className="space-y-3">
            <div className="text-xs font-display uppercase tracking-widest text-neon-green/70 border-b border-border/30 pb-1">
              Voice & Interface
            </div>
            <Field label="Voice Input Mode">
              <select
                className={selectClass}
                value={settings.voiceMode}
                onChange={e => onChange({ voiceMode: e.target.value as AppSettings['voiceMode'] })}
              >
                <option value="hold-to-talk">Hold to Talk</option>
                <option value="click-to-talk">Click to Talk</option>
                <option value="wake-word">Wake Word (Requires Backend)</option>
              </select>
            </Field>

            <div className="flex items-center justify-between">
              <span className="text-xs font-body text-foreground">Text-to-Speech</span>
              <button
                onClick={() => onChange({ ttsEnabled: !settings.ttsEnabled })}
                className={`w-10 h-5 rounded-full transition-all relative ${
                  settings.ttsEnabled ? 'bg-neon-green/30 border border-neon-green/50' : 'bg-muted border border-border'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                  settings.ttsEnabled ? 'left-5 bg-neon-green' : 'left-0.5 bg-muted-foreground'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-body text-foreground">Animated Avatar</span>
              <button
                onClick={() => onChange({ avatarEnabled: !settings.avatarEnabled })}
                className={`w-10 h-5 rounded-full transition-all relative ${
                  settings.avatarEnabled ? 'bg-primary/30 border border-primary/50' : 'bg-muted border border-border'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                  settings.avatarEnabled ? 'left-5 bg-primary' : 'left-0.5 bg-muted-foreground'
                }`} />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-[10px] font-mono text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border/30">
            <span className="text-neon-orange font-display tracking-wider">NOTE:</span> Wake-word mode requires a backend speech recognition service. TTS depends on browser Speech Synthesis API or a connected TTS engine. Settings are stored locally in your browser.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SettingsDrawer;
