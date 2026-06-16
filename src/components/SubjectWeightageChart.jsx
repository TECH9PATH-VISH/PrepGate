import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, AlertTriangle } from 'lucide-react';

const weightageData = [
  { name: 'General Aptitude', value: 15, color: '#d946ef' }, // Fuchsia
  { name: 'Engineering & Discrete Mathematics', value: 13, color: '#8b5cf6' }, // Violet
  { name: 'Programming & Data Structures', value: 12, color: '#6366f1' }, // Indigo
  { name: 'Computer Networks', value: 10, color: '#3b82f6' }, // Blue
  { name: 'Operating Systems', value: 9, color: '#06b6d4' }, // Cyan
  { name: 'Theory of Computation (TOC)', value: 9, color: '#14b8a6' }, // Teal
  { name: 'Computer Organization & Architecture (COA)', value: 9, color: '#10b981' }, // Emerald
  { name: 'Algorithms', value: 8, color: '#f59e0b' }, // Amber
  { name: 'Databases (DBMS)', value: 8, color: '#f97316' }, // Orange
  { name: 'Digital Logic', value: 5, color: '#ef4444' }, // Red
  { name: 'Compiler Design', value: 2, color: '#ec4899' }, // Pink
];

// Self-contained keyframe styles for glowing cyberpunk effects
const styleTagContent = `
  @keyframes core-pulse {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.45));
    }
    50% {
      transform: scale(1.04);
      filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.75));
    }
  }
  @keyframes core-radar {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes core-glow {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.35; }
  }
`;

const OrbitalSystem = ({ size = 480, interactive = true, hoveredIndex, setHoveredIndex, hoveredCoords, setHoveredCoords }) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  
  // DOM element references
  const orbRefs = useRef([]);
  
  // Spread out initial starting angles around the circle
  const anglesRef = useRef(
    weightageData.map((_, i) => (i * 360) / weightageData.length + i * 12)
  );

  const scale = size / 500;
  const centerX = size / 2;
  const centerY = size / 2;

  // Mathematics: Radii mapped to order (higher weightage closer to core, lower further out)
  const getOrbRadius = (index) => (65 + index * 17.5) * scale;
  
  // Mathematics: Size directly proportional to weightage percentage
  const getParticleRadius = (weightage) => (4.5 + (weightage - 2) * 0.75) * scale;
  
  // Mathematics: Speed (angular velocity) slower for outer orbits, faster for inner orbits
  const getSpeed = (index) => (2000 / (65 + index * 17.5)) * 0.65; // degrees per second

  // Physics animation loop using high-performance requestAnimationFrame
  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = (time - previousTimeRef.current) / 1000; // time in seconds
        
        anglesRef.current.forEach((angle, index) => {
          // If this orb is currently hovered, pause its orbit
          if (hoveredIndex === index) {
            return;
          }
          
          const speed = getSpeed(index);
          const newAngle = (angle + speed * deltaTime) % 360;
          anglesRef.current[index] = newAngle;
          
          const rad = (newAngle * Math.PI) / 180;
          const R = getOrbRadius(index);
          const r = getParticleRadius(weightageData[index].value);
          const x = centerX + R * Math.cos(rad) - r;
          const y = centerY + R * Math.sin(rad) - r;
          
          const el = orbRefs.current[index];
          if (el) {
            el.style.transform = `translate(${x}px, ${y}px)`;
          }
        });
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [hoveredIndex, size]);

  // Handle position resolution on hover
  const handleMouseEnter = (index) => {
    if (!interactive) return;
    
    const angle = anglesRef.current[index];
    const rad = (angle * Math.PI) / 180;
    const R = getOrbRadius(index);
    const x = centerX + R * Math.cos(rad);
    const y = centerY + R * Math.sin(rad);
    
    setHoveredIndex(index);
    setHoveredCoords({ x, y });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoveredIndex(null);
    setHoveredCoords(null);
  };

  return (
    <div 
      className="relative select-none" 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <style>{styleTagContent}</style>

      {/* SVG Background Layer for Orbit Tracks and Laser Connections */}
      <svg 
        className="absolute inset-0 z-0 pointer-events-none" 
        width={size} 
        height={size}
      >
        {/* Orbit Tracks */}
        {weightageData.map((subject, index) => {
          const r = getOrbRadius(index);
          const isCurrentHovered = hoveredIndex === index;
          return (
            <circle
              key={`track-${subject.name}`}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke={isCurrentHovered ? subject.color : "rgba(63, 63, 70, 0.2)"}
              strokeWidth={isCurrentHovered ? 1.5 : 1}
              strokeDasharray={isCurrentHovered ? "none" : "3 5"}
              style={{
                transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                opacity: hoveredIndex === null || isCurrentHovered ? 1 : 0.15
              }}
            />
          );
        })}

        {/* Laser target connection line from core center to hovered node */}
        {hoveredIndex !== null && hoveredCoords && (
          <>
            <line
              x1={centerX}
              y1={centerY}
              x2={hoveredCoords.x}
              y2={hoveredCoords.y}
              stroke={weightageData[hoveredIndex].color}
              strokeWidth={1.5}
              strokeDasharray="4 2"
              opacity={0.8}
              style={{
                filter: `drop-shadow(0 0 6px ${weightageData[hoveredIndex].color})`
              }}
            />
            {/* Target Ring pinging over orb */}
            <circle
              cx={hoveredCoords.x}
              cy={hoveredCoords.y}
              r={getParticleRadius(weightageData[hoveredIndex].value) + 6}
              fill="none"
              stroke={weightageData[hoveredIndex].color}
              strokeWidth={1}
              className="animate-ping"
              style={{ animationDuration: '1.5s' }}
            />
          </>
        )}
      </svg>

      {/* Central Core Pulsating Knowledge Node */}
      <div 
        className="absolute z-15 rounded-full border border-violet-500/40 bg-zinc-950 flex flex-col items-center justify-center text-center shadow-lg"
        style={{
          width: `${82 * scale}px`,
          height: `${82 * scale}px`,
          left: `${centerX - 41 * scale}px`,
          top: `${centerY - 41 * scale}px`,
          animation: 'core-pulse 3s ease-in-out infinite',
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.45)',
          opacity: hoveredIndex === null ? 1 : 0.45,
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Animated HUD details ring inside core */}
        <div 
          className="absolute inset-1 rounded-full border border-dashed border-zinc-700/60 pointer-events-none"
          style={{ animation: 'core-rotate 25s linear infinite' }}
        />
        
        {scale > 0.3 && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] font-black text-violet-400 tracking-wider font-mono">100%</span>
            <span className="text-[7px] uppercase tracking-widest text-zinc-400 font-bold mt-0.5">GATE</span>
          </div>
        )}
      </div>

      {/* Orbiting Subject Nodes (Orbs) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {weightageData.map((subject, index) => {
          const sizePx = getParticleRadius(subject.value) * 2;
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={`orb-${subject.name}`}
              ref={(el) => (orbRefs.current[index] = el)}
              className="absolute rounded-full pointer-events-auto transition-opacity duration-300"
              style={{
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                backgroundColor: subject.color,
                boxShadow: `0 0 ${8 * scale}px ${subject.color}, 0 0 ${16 * scale}px ${subject.color}`,
                opacity: hoveredIndex === null || isHovered ? 1 : 0.25,
                transform: `translate(${centerX}px, ${centerY}px)` // Position calculated dynamically in loop
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </div>
  );
};

const SubjectWeightageChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredCoords, setHoveredCoords] = useState(null);

  // Sync state update for legend interaction
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Handler triggered when hovering legend items
  const handleLegendHover = (index) => {
    if (index === null) {
      setHoveredIndex(null);
      setHoveredCoords(null);
      return;
    }
    
    // Trigger coordinate mapping via event bubble or calculation mock
    setHoveredIndex(index);
    
    // Compute target orb coordinate for legend laser connection
    const scale = 430 / 500;
    const centerX = 430 / 2;
    const centerY = 430 / 2;
    const getOrbRadius = (idx) => (65 + idx * 17.5) * scale;
    
    // We fetch coordinates from active orbit angles
    const angles = document.querySelector('.modal-orb-container')?.querySelector('svg') 
      ? window.__activeAngles || [] 
      : [];
      
    // Simulating mapping coordinates from the orbital loops
    const R = getOrbRadius(index);
    const mockAngle = (index * 360) / weightageData.length + 45; // static estimate fallback
    const rad = (mockAngle * Math.PI) / 180;
    
    setHoveredCoords({
      x: centerX + R * Math.cos(rad),
      y: centerY + R * Math.sin(rad),
    });
  };

  return (
    <>
      {/* Mini Widget Card layout */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group relative flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/40 backdrop-blur-md p-3 pr-5 shadow-lg transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/40 cursor-pointer select-none overflow-hidden"
      >
        <div className="absolute -right-6 -bottom-6 h-12 w-12 rounded-full bg-violet-500/10 blur-xl group-hover:bg-violet-500/20 transition-all duration-300" />
        
        {/* Miniature core loop */}
        <div className="relative h-14 w-14 flex-shrink-0 flex items-center justify-center bg-zinc-900/20 rounded-xl border border-zinc-900/40">
          <OrbitalSystem 
            size={56} 
            interactive={false} 
            hoveredIndex={null}
            setHoveredIndex={() => {}}
            hoveredCoords={null}
            setHoveredCoords={() => {}}
          />
        </div>

        <div className="flex flex-col z-10">
          <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Data Core</span>
          <span className="text-xs font-black text-zinc-200 mt-0.5 flex items-center gap-1.5">
            Syllabus Weightage
            <Maximize2 className="h-3 w-3 text-violet-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </span>
          <p className="text-[9px] text-zinc-500 mt-0.5 font-medium group-hover:text-zinc-400 transition-colors">Hover/click to explore</p>
        </div>
      </div>

      {/* Expanded Cyber-HUD Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container Panel */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-4xl rounded-3xl border border-zinc-800/80 bg-zinc-950 p-6 md:p-8 shadow-2xl z-10 flex flex-col md:flex-row gap-8 items-center max-h-[95vh] overflow-y-auto animate-zoomIn"
            style={{
              boxShadow: '0 0 50px rgba(0,0,0,0.9), 0 0 30px rgba(139, 92, 246, 0.1)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white rounded-lg p-1.5 hover:bg-zinc-900/80 transition-colors cursor-pointer z-30"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Box: Large Animated Orbital Core System */}
            <div className="relative flex-shrink-0 flex items-center justify-center modal-orb-container select-none">
              {/* Radial gradient background to enhance visual glow */}
              <div 
                className="absolute h-96 w-96 rounded-full bg-radial from-violet-500/10 to-transparent blur-3xl pointer-events-none opacity-40" 
                style={{ animation: 'core-glow 4s ease-in-out infinite' }}
              />

              <OrbitalSystem 
                size={430} 
                interactive={true} 
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                hoveredCoords={hoveredCoords}
                setHoveredCoords={setHoveredCoords}
              />

              {/* HUD glassmorphism overlay tooltip */}
              {hoveredIndex !== null && hoveredCoords && (
                <div
                  className="absolute z-30 pointer-events-none transition-all duration-200"
                  style={{
                    top: `${hoveredCoords.y}px`,
                    left: `${hoveredCoords.x}px`,
                    transform: hoveredCoords.x > (430 / 2) 
                      ? 'translate(-100%, -50%) translate(-20px, 0)' 
                      : 'translate(20px, -50%)',
                  }}
                >
                  <div 
                    className="rounded-xl border bg-zinc-950/95 p-3.5 shadow-2xl backdrop-blur-xl min-w-[210px] text-left"
                    style={{
                      borderColor: weightageData[hoveredIndex].color,
                      boxShadow: `0 0 25px rgba(0,0,0,0.85), 0 0 15px ${weightageData[hoveredIndex].color}25`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold font-mono">Node #{hoveredIndex + 1}</span>
                      {weightageData[hoveredIndex].value >= 10 ? (
                        <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[8px] font-black text-rose-400 border border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.15)] uppercase">
                          🔥 High Yield
                        </span>
                      ) : weightageData[hoveredIndex].value >= 5 ? (
                        <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[8px] font-black text-amber-400 border border-amber-500/20 uppercase">
                          ⚡ Core Topic
                        </span>
                      ) : (
                        <span className="rounded bg-zinc-800 px-2 py-0.5 text-[8px] font-bold text-zinc-400 border border-zinc-700 uppercase">
                          Standard
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-xs font-black text-white leading-tight mb-2 tracking-tight">
                      {weightageData[hoveredIndex].name}
                    </h4>
                    
                    <div className="flex items-baseline gap-1.5 border-t border-zinc-900 pt-2">
                      <span className="text-xl font-black font-mono" style={{ color: weightageData[hoveredIndex].color }}>
                        {weightageData[hoveredIndex].value}%
                      </span>
                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Weightage</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Box: Cyberpunk Legends list & strategic advice */}
            <div className="flex-1 flex flex-col w-full">
              <div className="mb-4">
                <span className="text-[9px] uppercase tracking-widest text-violet-400 font-black">Interactive HUD Interface</span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-1">Syllabus Data Core</h3>
                <p className="text-xs text-zinc-400 mt-1.5">Hover orbits or node elements to pause fragments and visualize active connections.</p>
              </div>

              {/* Subject List Grid */}
              <div className="grid gap-1.5 overflow-y-auto max-h-[300px] pr-2 scrollbar-thin">
                {weightageData.map((item, index) => {
                  const isHigh = item.value >= 10;
                  const isHovered = hoveredIndex === index;
                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => handleLegendHover(index)}
                      onMouseLeave={() => handleLegendHover(null)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition-all duration-200 cursor-pointer border ${
                        isHovered
                          ? 'bg-zinc-900/60 border-zinc-700 text-white shadow-lg'
                          : 'bg-zinc-900/10 border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-300'
                      }`}
                      style={{
                        boxShadow: isHovered ? `inset 3px 0 0 ${item.color}` : 'none',
                      }}
                    >
                      <div className="flex items-center gap-3 truncate mr-2">
                        <span 
                          className="h-2 w-2 rounded-full flex-shrink-0" 
                          style={{ 
                            backgroundColor: item.color,
                            boxShadow: `0 0 6px ${item.color}`
                          }} 
                        />
                        <span className="truncate font-semibold tracking-wide">{item.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-extrabold text-zinc-300 font-mono">{item.value}%</span>
                        {isHigh && (
                          <span 
                            className="inline-flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" 
                            title="High Yield Core Module" 
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sci-Fi Advice Block */}
              <div className="mt-5 p-3.5 rounded-xl bg-violet-950/10 border border-violet-900/30 flex items-start gap-3 relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-violet-500/80" />
                <AlertTriangle className="h-4.5 w-4.5 text-violet-400 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                  <span className="font-bold text-violet-300 uppercase tracking-widest block mb-0.5">ORBITAL SYSTEM DYNAMICS</span>
                  Node sizing reflects average paper weightage. Orbs orbiting closer to the core represent highest-priority CSE elements. Adjust study cycles to secure nodes with the highest mass.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SubjectWeightageChart;
