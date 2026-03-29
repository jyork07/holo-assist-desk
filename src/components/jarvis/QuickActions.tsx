import { Activity, Wrench, Link, Mic, LayoutGrid } from 'lucide-react';

interface Props {
  onAction: (action: string) => void;
}

const actions = [
  { label: 'System Status', icon: Activity, action: 'Run a full system status check across all connected services.' },
  { label: 'Run Diagnostics', icon: Wrench, action: 'Run diagnostics on the current system configuration and report any issues.' },
  { label: 'Connect Gateway', icon: Link, action: 'Attempt to connect to the OpenClaw gateway and report the connection status.' },
  { label: 'Enable Voice', icon: Mic, action: 'Enable voice input and check microphone permissions.' },
  { label: 'Show Architecture', icon: LayoutGrid, action: 'Describe the full Jarvis V1 architecture stack and how each component connects.' },
];

const QuickActions = ({ onAction }: Props) => (
  <div className="flex flex-wrap gap-2">
    {actions.map(a => {
      const Icon = a.icon;
      return (
        <button
          key={a.label}
          onClick={() => onAction(a.action)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-primary/20 text-xs font-body text-primary/80 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all"
        >
          <Icon className="w-3 h-3" />
          {a.label}
        </button>
      );
    })}
  </div>
);

export default QuickActions;
