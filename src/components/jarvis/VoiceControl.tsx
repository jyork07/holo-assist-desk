import { Mic, MicOff } from 'lucide-react';
import type { AssistantState, SystemStatus } from '@/hooks/useAssistantState';

interface Props {
  state: AssistantState;
  micStatus: SystemStatus['mic'];
  voiceMode: string;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onRequestMic: () => void;
}

const VoiceControl = ({ state, micStatus, voiceMode, onHoldStart, onHoldEnd, onRequestMic }: Props) => {
  const isListening = state === 'listening';

  return (
    <div className="glass-panel p-4 neon-border">
      <div className="hud-label mb-3">Voice Control</div>

      <div className="flex flex-col items-center gap-4">
        {/* Waveform visualizer */}
        <div className="flex items-center justify-center gap-[3px] h-10">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full transition-all duration-150"
              style={{
                height: isListening ? `${12 + Math.random() * 28}px` : '6px',
                background: isListening
                  ? 'hsl(var(--neon-green))'
                  : 'hsl(var(--muted-foreground) / 0.3)',
                animation: isListening ? `waveform-bar ${0.4 + Math.random() * 0.4}s ease-in-out ${i * 0.05}s infinite` : 'none',
              }}
            />
          ))}
        </div>

        {/* Mic button */}
        {micStatus === 'granted' ? (
          <button
            onMouseDown={voiceMode === 'hold-to-talk' ? onHoldStart : undefined}
            onMouseUp={voiceMode === 'hold-to-talk' ? onHoldEnd : undefined}
            onMouseLeave={voiceMode === 'hold-to-talk' && isListening ? onHoldEnd : undefined}
            onClick={voiceMode === 'click-to-talk' ? (isListening ? onHoldEnd : onHoldStart) : undefined}
            className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'border-neon-green bg-neon-green/20 shadow-[0_0_30px_hsl(var(--neon-green)/0.4)]'
                : 'border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary/60'
            }`}
          >
            <Mic className={`w-6 h-6 ${isListening ? 'text-neon-green' : 'text-primary'}`} />
            {isListening && (
              <div className="absolute inset-0 rounded-full border-2 border-neon-green/40 animate-ping" />
            )}
          </button>
        ) : (
          <button
            onClick={onRequestMic}
            className="w-16 h-16 rounded-full border-2 border-destructive/40 bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-all"
          >
            <MicOff className="w-6 h-6 text-destructive" />
          </button>
        )}

        <span className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">
          {micStatus !== 'granted'
            ? 'Mic Access Required'
            : voiceMode === 'hold-to-talk'
              ? 'Hold to Talk'
              : voiceMode === 'click-to-talk'
                ? 'Click to Talk'
                : 'Wake Word Mode'
          }
        </span>
      </div>
    </div>
  );
};

export default VoiceControl;
