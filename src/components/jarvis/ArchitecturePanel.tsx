import { Cpu, Globe, Layers, Radio, MonitorSmartphone, ArrowRight } from 'lucide-react';

const layers = [
  {
    icon: MonitorSmartphone,
    title: 'UI Frontend',
    desc: 'React + Tailwind HUD interface',
    status: 'Active',
    color: 'var(--neon-cyan)',
  },
  {
    icon: Cpu,
    title: 'Ollama + phi3',
    desc: 'Local LLM inference engine',
    status: 'Configurable',
    color: 'var(--neon-blue)',
  },
  {
    icon: Layers,
    title: 'OpenClaw Gateway',
    desc: 'Tool orchestration & brain layer',
    status: 'Configurable',
    color: 'var(--neon-purple)',
  },
  {
    icon: Globe,
    title: 'Home Assistant',
    desc: 'Smart home control integration',
    status: 'Planned',
    color: 'var(--neon-orange)',
  },
  {
    icon: Radio,
    title: 'Voice Pipeline',
    desc: 'Browser STT/TTS + local ASR',
    status: 'Prototype',
    color: 'var(--neon-green)',
  },
];

const ArchitecturePanel = () => (
  <div className="glass-panel p-4 neon-border">
    <div className="hud-label mb-3">Architecture Stack</div>
    <div className="space-y-2">
      {layers.map((layer, i) => {
        const Icon = layer.icon;
        return (
          <div key={i}>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 border border-border/30">
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `hsl(${layer.color} / 0.15)` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${layer.color})` }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-body text-foreground">{layer.title}</div>
                <div className="text-[10px] font-mono text-muted-foreground truncate">{layer.desc}</div>
              </div>
              <span
                className="text-[9px] font-display uppercase tracking-wider px-1.5 py-0.5 rounded border"
                style={{
                  color: `hsl(${layer.color})`,
                  borderColor: `hsl(${layer.color} / 0.3)`,
                  background: `hsl(${layer.color} / 0.08)`,
                }}
              >
                {layer.status}
              </span>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowRight className="w-3 h-3 text-muted-foreground/30 rotate-90" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default ArchitecturePanel;
