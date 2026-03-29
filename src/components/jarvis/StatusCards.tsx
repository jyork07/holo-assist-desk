import { Wifi, WifiOff, Loader2, Mic, MicOff, Server, AlertCircle } from 'lucide-react';
import type { SystemStatus } from '@/hooks/useAssistantState';

interface Props {
  status: SystemStatus;
  onCheckOllama: () => void;
  onCheckGateway: () => void;
  onCheckMic: () => void;
}

const statusConfig = {
  connected: { icon: Wifi, color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30', label: 'Online' },
  disconnected: { icon: WifiOff, color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/30', label: 'Offline' },
  checking: { icon: Loader2, color: 'text-neon-orange', bg: 'bg-neon-orange/10', border: 'border-neon-orange/30', label: 'Checking...' },
  granted: { icon: Mic, color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30', label: 'Granted' },
  denied: { icon: MicOff, color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/30', label: 'Denied' },
  prompt: { icon: AlertCircle, color: 'text-neon-orange', bg: 'bg-neon-orange/10', border: 'border-neon-orange/30', label: 'Not Requested' },
  unavailable: { icon: MicOff, color: 'text-muted-foreground', bg: 'bg-muted/20', border: 'border-muted/30', label: 'Unavailable' },
  planned: { icon: Server, color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/30', label: 'Planned' },
};

interface CardProps {
  title: string;
  statusKey: string;
  onClick?: () => void;
}

const StatusCard = ({ title, statusKey, onClick }: CardProps) => {
  const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.disconnected;
  const Icon = cfg.icon;
  const spinning = statusKey === 'checking';

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`glass-panel p-3 flex items-center gap-3 ${cfg.border} border hover:bg-card/80 transition-all ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${cfg.color} ${spinning ? 'animate-spin' : ''}`} />
      </div>
      <div className="text-left">
        <div className="text-xs font-body text-foreground">{title}</div>
        <div className={`text-[10px] font-mono ${cfg.color}`}>{cfg.label}</div>
      </div>
    </button>
  );
};

const StatusCards = ({ status, onCheckOllama, onCheckGateway, onCheckMic }: Props) => {
  return (
    <div className="glass-panel p-4 neon-border">
      <div className="hud-label mb-3">System Status</div>
      <div className="grid grid-cols-2 gap-2">
        <StatusCard title="Ollama LLM" statusKey={status.ollama} onClick={onCheckOllama} />
        <StatusCard title="OpenClaw GW" statusKey={status.gateway} onClick={onCheckGateway} />
        <StatusCard title="Microphone" statusKey={status.mic} onClick={onCheckMic} />
        <StatusCard title="Home Assistant" statusKey={status.homeAssistant} />
      </div>
    </div>
  );
};

export default StatusCards;
