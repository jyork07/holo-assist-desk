const HudBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {/* Grid */}
    <div className="absolute inset-0 grid-bg opacity-40" />
    {/* Scanlines */}
    <div className="absolute inset-0 scanline opacity-30" />
    {/* Radial vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(225 40% 6% / 0.8) 100%)',
      }}
    />
    {/* Corner accents */}
    <svg className="absolute top-0 left-0 w-32 h-32 text-primary/20" viewBox="0 0 100 100">
      <path d="M 0 30 L 0 0 L 30 0" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill="currentColor" />
    </svg>
    <svg className="absolute top-0 right-0 w-32 h-32 text-primary/20" viewBox="0 0 100 100">
      <path d="M 70 0 L 100 0 L 100 30" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="0" r="3" fill="currentColor" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-32 h-32 text-primary/20" viewBox="0 0 100 100">
      <path d="M 0 70 L 0 100 L 30 100" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
    <svg className="absolute bottom-0 right-0 w-32 h-32 text-primary/20" viewBox="0 0 100 100">
      <path d="M 70 100 L 100 100 L 100 70" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

export default HudBackground;
