import type { AssistantState } from '@/hooks/useAssistantState';

interface Props {
  state: AssistantState;
  enabled: boolean;
}

const stateColors: Record<AssistantState, string> = {
  idle: 'hsl(185 100% 50%)',
  listening: 'hsl(150 80% 50%)',
  thinking: 'hsl(260 80% 60%)',
  speaking: 'hsl(30 100% 55%)',
};

const stateLabels: Record<AssistantState, string> = {
  idle: 'STANDBY',
  listening: 'LISTENING',
  thinking: 'PROCESSING',
  speaking: 'RESPONDING',
};

const JarvisAvatar = ({ state, enabled }: Props) => {
  if (!enabled) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground font-display text-sm tracking-widest uppercase">
          Avatar Disabled
        </div>
      </div>
    );
  }

  const color = stateColors[state];
  const isActive = state !== 'idle';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Outer ring */}
      <svg className="absolute inset-0 w-full h-full animate-ring-spin" viewBox="0 0 280 280">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="0.1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle cx="140" cy="140" r="135" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5"
          strokeDasharray={isActive ? "20 10 5 10" : "40 20"} />
      </svg>

      {/* Middle ring */}
      <svg className="absolute inset-0 w-full h-full animate-ring-spin-reverse" viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="115" fill="none" stroke={color} strokeWidth="0.8"
          strokeDasharray={isActive ? "8 4 15 4" : "30 15"} opacity="0.5" />
      </svg>

      {/* Inner ring */}
      <svg className="absolute inset-0 w-full h-full animate-ring-spin" viewBox="0 0 280 280"
        style={{ animationDuration: '12s' }}>
        <circle cx="140" cy="140" r="95" fill="none" stroke={color} strokeWidth="0.5"
          strokeDasharray="5 10" opacity="0.4" />
      </svg>

      {/* Core glow */}
      <div
        className={`absolute rounded-full ${isActive ? 'animate-avatar-pulse' : 'animate-glow-pulse'}`}
        style={{
          width: 160,
          height: 160,
          background: `radial-gradient(circle, ${color}20 0%, ${color}08 50%, transparent 70%)`,
        }}
      />

      {/* Eye / Core */}
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Central iris */}
        <div
          className="rounded-full transition-all duration-500"
          style={{
            width: state === 'listening' ? 60 : state === 'thinking' ? 40 : state === 'speaking' ? 55 : 50,
            height: state === 'listening' ? 60 : state === 'thinking' ? 40 : state === 'speaking' ? 55 : 50,
            background: `radial-gradient(circle, ${color} 0%, ${color}60 40%, transparent 70%)`,
            boxShadow: `0 0 30px ${color}80, 0 0 60px ${color}40, 0 0 90px ${color}20`,
          }}
        />

        {/* Thinking spinner */}
        {state === 'thinking' && (
          <svg className="absolute w-24 h-24 animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke={color} strokeWidth="2"
              strokeDasharray="60 180" strokeLinecap="round" opacity="0.8" />
          </svg>
        )}

        {/* Speaking waveform bars */}
        {state === 'speaking' && (
          <div className="absolute bottom-2 flex items-end gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: 20,
                  background: color,
                  animation: `waveform-bar 0.6s ease-in-out ${i * 0.08}s infinite`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}

        {/* Listening pulse rings */}
        {state === 'listening' && (
          <>
            <div className="absolute rounded-full animate-ping" style={{
              width: 80, height: 80, border: `1px solid ${color}40`,
              animationDuration: '1.5s',
            }} />
            <div className="absolute rounded-full animate-ping" style={{
              width: 100, height: 100, border: `1px solid ${color}20`,
              animationDuration: '2s',
            }} />
          </>
        )}
      </div>

      {/* State label */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
        <span
          className="font-display text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full border"
          style={{
            color,
            borderColor: `${color}40`,
            background: `${color}10`,
            textShadow: `0 0 8px ${color}60`,
          }}
        >
          {stateLabels[state]}
        </span>
      </div>
    </div>
  );
};

export default JarvisAvatar;
