import { Settings } from 'lucide-react';
import type { AssistantState } from '@/hooks/useAssistantState';

interface Props {
  state: AssistantState;
  model: string;
  gatewayStatus: string;
  avatarEnabled: boolean;
  onOpenSettings: () => void;
}

const stateColors: Record<AssistantState, string> = {
  idle: 'text-primary',
  listening: 'text-neon-green',
  thinking: 'text-neon-purple',
  speaking: 'text-neon-orange',
};

const StatusBar = ({ state, model, gatewayStatus, avatarEnabled, onOpenSettings }: Props) => (
  <div className="glass-panel-strong px-4 py-2 flex items-center justify-between text-[10px] font-mono neon-border">
    <div className="flex items-center gap-4">
      <span className="font-display text-primary tracking-widest neon-text">JARVIS V1</span>
      <span className="text-muted-foreground">|</span>
      <span className={stateColors[state]}>{state.toUpperCase()}</span>
      <span className="text-muted-foreground">|</span>
      <span className="text-muted-foreground">Model: <span className="text-foreground">{model}</span></span>
      <span className="text-muted-foreground">|</span>
      <span className="text-muted-foreground">Gateway: <span className={gatewayStatus === 'connected' ? 'text-neon-green' : 'text-neon-red'}>{gatewayStatus}</span></span>
      <span className="text-muted-foreground">|</span>
      <span className="text-muted-foreground">Avatar: <span className="text-foreground">{avatarEnabled ? 'ON' : 'OFF'}</span></span>
    </div>
    <div className="flex items-center gap-3">
      <span className="px-1.5 py-0.5 rounded border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan font-display tracking-wider">
        PROTOTYPE UI
      </span>
      <span className="px-1.5 py-0.5 rounded border border-neon-green/30 bg-neon-green/10 text-neon-green font-display tracking-wider">
        LOCAL-FIRST
      </span>
      <button onClick={onOpenSettings} className="p-1 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-primary">
        <Settings className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export default StatusBar;
