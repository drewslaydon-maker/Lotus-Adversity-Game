import { FC, useState, useRef, PointerEvent } from "react";
import { WarpedGod, Spoke, DominionType } from "../types";
import { spokesData } from "../data/spokesAndPillarsData";
import { 
  Compass, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Info,
  X
} from "lucide-react";

export type SpokeStatus = 'unknown' | 'locked' | 'corrupted' | 'purified';

interface BrokenRingWheelViewProps {
  pantheon: WarpedGod[];
  onSelectGod?: (god: WarpedGod) => void;
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
  
  // Dynamic Engine Props
  interactionMode?: "codex" | "engine";
  spokeStatuses?: Record<number, SpokeStatus>;
  onSpokeInteract?: (spokeId: number) => void;
}

export const BrokenRingWheelView: FC<BrokenRingWheelViewProps> = ({
  pantheon,
  onSelectGod,
  playSfx,
  interactionMode = "codex",
  spokeStatuses,
  onSpokeInteract,
}) => {
  // State: "corrupted" (The Broken RingWheel) vs "uncorrupted" (Original 12-Spoke Wheel)
  const [wheelMode, setWheelMode] = useState<"corrupted" | "uncorrupted">("corrupted");
  const [selectedDominion, setSelectedDominion] = useState<DominionType | null>(null);
  const [selectedSpokeNumber, setSelectedSpokeNumber] = useState<number | null>(null);
  const [inspectionFocus, setInspectionFocus] = useState<"spoke" | "dominion" | null>(null);

  // Wheel Rotation State
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const hasDragged = useRef(false);

  const activeGod = pantheon.find((g) => g.dominion === selectedDominion);
  const activeSpoke = spokesData.find((s) => s.number === selectedSpokeNumber);

  // Rotation Handlers
  const handlePointerDown = (e: PointerEvent<SVGSVGElement>) => {
    // only rotate if dragging the background/SVG, avoid conflicting with clicks if possible, 
    // but we can just track drag distance to differentiate drag vs click if needed.
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    setStartAngle(angle - wheelRotation);
    setIsDragging(true);
    hasDragged.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    const newRot = angle - startAngle;
    if (Math.abs(newRot - wheelRotation) > 1) {
      hasDragged.current = true;
    }
    setWheelRotation(newRot);
  };

  const handlePointerUp = (e: PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      // Optional: play a faint ticking sound on release if we wanted
    }
  };

  const handleDominionClick = (dom: DominionType) => {
    if (hasDragged.current) return; // Prevent click if we were spinning the wheel
    
    setSelectedDominion(dom);
    setInspectionFocus("dominion");
    const god = pantheon.find((g) => g.dominion === dom);
    if (god) {
      // Find first spoke in dominion
      const firstSpoke = spokesData.find((s) => s.dominion === dom);
      if (firstSpoke) setSelectedSpokeNumber(firstSpoke.number);
    }
    playSfx("shield");
  };

  const handleSpokeClick = (spokeNum: number) => {
    if (hasDragged.current) return; // Prevent click if we were spinning the wheel

    if (interactionMode === "engine" && onSpokeInteract) {
      onSpokeInteract(spokeNum);
      return;
    }
    
    setSelectedSpokeNumber(spokeNum);
    setInspectionFocus("spoke");
    const spoke = spokesData.find((s) => s.number === spokeNum);
    if (spoke) {
      setSelectedDominion(spoke.dominion);
    }
    playSfx("click");
  };

  // Geometry calculations for SVG
  const center = 300;
  const radius = 175;
  const innerRadius = 110;
  const innerHubRadius = 55;

  // 12 Spokes positioned sequentially in 4 distinct quadrants starting at 12 o'clock
  // North (330°, 0°, 30°): Ether (Caelen)
  // East (60°, 90°, 120°): Iron (Alden)
  // South (150°, 180°, 210°): Earth (Bram)
  // West (240°, 270°, 300°): Frontier (Mera)
  const outerSpokeAngles = [
    { num: 4, angle: 330, dom: "Ether" },
    { num: 5, angle: 0, dom: "Ether" },     // True North
    { num: 6, angle: 30, dom: "Ether" },
    
    { num: 1, angle: 60, dom: "Iron" },
    { num: 2, angle: 90, dom: "Iron" },   // True East
    { num: 3, angle: 120, dom: "Iron" },
    
    { num: 10, angle: 150, dom: "Earth" },
    { num: 11, angle: 180, dom: "Earth" }, // True South
    { num: 12, angle: 210, dom: "Earth" },
    
    { num: 7, angle: 240, dom: "Frontier" },
    { num: 8, angle: 270, dom: "Frontier" }, // True West
    { num: 9, angle: 300, dom: "Frontier" },
  ];

  // 3 Inner Spokes (Soran's Axis)
  const innerSpokeAngles = [
    { num: 13, angle: 210, dom: "Axis" },
    { num: 14, angle: 330, dom: "Axis" },
    { num: 15, angle: 90, dom: "Axis" },
  ];
  
  const allSpokeAngles = [...outerSpokeAngles, ...innerSpokeAngles];

  const getDominionColor = (dom: DominionType) => {
    switch (dom) {
      case "Iron":
        return "#f59e0b"; // Amber/Iron
      case "Ether":
        return "#38bdf8"; // Sky/Ether
      case "Frontier":
        return "#10b981"; // Emerald/Wild
      case "Earth":
        return "#ea580c"; // Orange/Bronze
      case "Axis":
        return "#a855f7"; // Purple/Obsidian
    }
  };

  const getCorruptedColor = (dom: DominionType) => {
    switch (dom) {
      case "Iron":
        return "#ef4444"; // Blood Rose (Alden)
      case "Ether":
        return "#0284c7"; // Cold Sapphire (Caelen)
      case "Frontier":
        return "#10b981"; // Sickly Emerald (Mera)
      case "Earth":
        return "#ea580c"; // Molten Slag Orange (Bram)
      case "Axis":
        return "#94a3b8"; // Petrified Slate (Soran)
    }
  };

  const getSpokeColor = (spokeNum: number, dom: DominionType) => {
    // If not in engine mode/no status, return default domain colors for uncorrupted, or the specific corrupted color.
    if (!spokeStatuses) {
      if (wheelMode === "corrupted") {
        return getCorruptedColor(dom);
      }
      return getDominionColor(dom);
    }
    
    const status = spokeStatuses[spokeNum];
    if (status === "purified") return "#f59e0b"; // True Amber
    if (status === "corrupted") {
      // In engine mode, corrupted spokes use the explicit corrupted palette mapped to the god
      return getCorruptedColor(dom);
    }
    if (status === "locked") return "#262626"; // Very dark neutral (neutral-800)
    if (status === "unknown") return "#000000"; // Hidden
    
    return getDominionColor(dom); // Fallback
  };

  return (
    <div className="space-y-6">
      {/* View Header & Mode Toggle Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Cosmological View Model</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-cinzel font-black text-neutral-100 uppercase tracking-wide">
            {wheelMode === "corrupted" 
              ? "The Broken RingWheel (The 4 Spikes & The Center)" 
              : "The Original 15-Spoke Wheel of Adversity"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
            {wheelMode === "corrupted"
              ? "2,000 years ago, the 5 companions ascended, fracturing the wheel and bending the 15 spokes into 4 cardinal spiked dominions and a petrified axis."
              : "The ancient, harmonious wheel of mortal trial, where craft and restraint were in perfect balance across 15 paths."}
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 shrink-0">
          <button
            onClick={() => {
              setWheelMode("uncorrupted");
              playSfx("anvil");
            }}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              wheelMode === "uncorrupted"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Uncorrupted (15 Spokes)</span>
          </button>

          <button
            onClick={() => {
              setWheelMode("corrupted");
              playSfx("shield");
            }}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              wheelMode === "corrupted"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Corrupted Ring with Spikes</span>
          </button>
        </div>
      </div>

      {/* Main Wheel Visualizer & Dominion Inspector Overlay */}
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl bg-neutral-950 border border-neutral-800/90 p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden min-h-[580px] lg:min-h-[650px]">
          
          {/* Subtle background glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-20"
            style={{
              background: wheelMode === "corrupted"
                ? "radial-gradient(circle at center, rgba(225, 29, 72, 0.25) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(245, 158, 11, 0.2) 0%, transparent 70%)"
            }}
          />

          {/* Quick instructions indicator */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Click any Spike, Spoke, or Center Hub to inspect</span>
          </div>

          <svg 
            viewBox="0 0 600 600" 
            className="w-full max-w-[540px] h-auto select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <defs>
              {/* Radial gradient for Center Hub */}
              <radialGradient id="centerHubUncorrupted" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="80%" stopColor="#78350f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#451a03" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="centerHubCorrupted" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#09090b" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />
              </radialGradient>
              {/* Filter for glowing corrupted spikes */}
              <filter id="spikeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g transform={`rotate(${wheelRotation}, ${center}, ${center})`}>
              {/* Inner ring connecting Axis spokes */}
              <circle
                cx={center}
                cy={center}
                r={innerRadius}
                fill="none"
                stroke="#3f3f46" // neutral-700
                strokeWidth="1"
                strokeDasharray="2 4"
                className="opacity-50"
              />

              {/* Background Spoke Connecting Lines */}
              {allSpokeAngles.map((spoke) => {
              const rad = ((spoke.angle - 90) * Math.PI) / 180;
              const spkRadius = spoke.dom === "Axis" ? innerRadius : radius;
              const x2 = center + spkRadius * Math.cos(rad);
              const y2 = center + spkRadius * Math.sin(rad);
              const isSelected = selectedSpokeNumber === spoke.num;

              return (
                <line
                  key={`spoke-line-${spoke.num}`}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke={
                    isSelected 
                      ? "#f59e0b" 
                      : wheelMode === "corrupted" 
                        ? "#52525b" 
                        : "#71717a"
                  }
                  strokeWidth={isSelected ? "3" : "1.5"}
                  strokeDasharray={wheelMode === "corrupted" && !isSelected ? "4,4" : undefined}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* THE MAIN RING */}
            {wheelMode === "uncorrupted" ? (
              // Uncorrupted: Smooth pristine golden ring
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#d97706"
                strokeWidth="8"
                strokeOpacity="0.8"
                className="transition-all duration-500"
              />
            ) : (
              // Corrupted: Fractured perimeter with jagged broken segments
              <g className="transition-all duration-500">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="7"
                  strokeDasharray="18, 6, 32, 8, 12, 14"
                  strokeLinecap="round"
                  filter="url(#spikeGlow)"
                  className="opacity-90"
                />
                <circle
                  cx={center}
                  cy={center}
                  r={radius + 8}
                  fill="none"
                  stroke="#7f1d1d"
                  strokeWidth="2"
                  strokeDasharray="8, 24"
                />
              </g>
            )}

            {/* CORRUPTED SPIKES: The 4 Cardinal Dominions bursting outward */}
            {wheelMode === "corrupted" && (
              <g className="transition-opacity duration-500 animate-in fade-in">
                {/* 1. North Spike: Caelen (Ether / Mind) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleDominionClick("Ether")}
                >
                  <polygon
                    points={`${center - 22},${center - radius + 10} ${center},${center - radius - 85} ${center + 22},${center - radius + 10}`}
                    fill={selectedDominion === "Ether" ? "#38bdf8" : "#0284c7"}
                    stroke="#e0f2fe"
                    strokeWidth="2"
                    filter="url(#spikeGlow)"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                  <text
                    x={center}
                    y={center - radius - 95}
                    textAnchor="middle"
                    fill="#38bdf8"
                    className="font-mono text-[11px] font-bold tracking-wider"
                  >
                    CAELEN (ETHER)
                  </text>
                  <text
                    x={center}
                    y={center - radius - 45}
                    textAnchor="middle"
                    fill="#0c4a6e"
                    className="font-mono text-[9px] font-black"
                  >
                    SPIKE
                  </text>
                </g>

                {/* 2. East Spike: Alden (Iron / War) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleDominionClick("Iron")}
                >
                  <polygon
                    points={`${center + radius - 10},${center - 22} ${center + radius + 85},${center} ${center + radius - 10},${center + 22}`}
                    fill={selectedDominion === "Iron" ? "#ef4444" : "#9f1239"}
                    stroke="#ffe4e6"
                    strokeWidth="2"
                    filter="url(#spikeGlow)"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                  <text
                    x={center + radius + 32}
                    y={center - 32}
                    textAnchor="middle"
                    fill="#ef4444"
                    className="font-mono text-[11px] font-bold tracking-wider"
                  >
                    ALDEN (IRON)
                  </text>
                  <text
                    x={center + radius + 40}
                    y={center + 3}
                    textAnchor="middle"
                    fill="#451a03"
                    className="font-mono text-[9px] font-black"
                  >
                    SPIKE
                  </text>
                </g>

                {/* 3. South Spike: Bram (Earth / Labor) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleDominionClick("Earth")}
                >
                  <polygon
                    points={`${center - 22},${center + radius - 10} ${center},${center + radius + 85} ${center + 22},${center + radius - 10}`}
                    fill={selectedDominion === "Earth" ? "#ea580c" : "#9a3412"}
                    stroke="#ffedd5"
                    strokeWidth="2"
                    filter="url(#spikeGlow)"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                  <text
                    x={center}
                    y={center + radius + 105}
                    textAnchor="middle"
                    fill="#ea580c"
                    className="font-mono text-[11px] font-bold tracking-wider"
                  >
                    BRAM (EARTH)
                  </text>
                  <text
                    x={center}
                    y={center + radius + 48}
                    textAnchor="middle"
                    fill="#431407"
                    className="font-mono text-[9px] font-black"
                  >
                    SPIKE
                  </text>
                </g>

                {/* 4. West Spike: Mera (Frontier / Wild) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleDominionClick("Frontier")}
                >
                  <polygon
                    points={`${center - radius + 10},${center - 22} ${center - radius - 85},${center} ${center - radius + 10},${center + 22}`}
                    fill={selectedDominion === "Frontier" ? "#10b981" : "#047857"}
                    stroke="#d1fae5"
                    strokeWidth="2"
                    filter="url(#spikeGlow)"
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                  <text
                    x={center - radius - 32}
                    y={center - 32}
                    textAnchor="middle"
                    fill="#10b981"
                    className="font-mono text-[11px] font-bold tracking-wider"
                  >
                    MERA (WILD)
                  </text>
                  <text
                    x={center - radius - 40}
                    y={center + 3}
                    textAnchor="middle"
                    fill="#064e3b"
                    className="font-mono text-[9px] font-black"
                  >
                    SPIKE
                  </text>
                </g>
              </g>
            )}

            {/* 15 SPOKE NODES ALONG THE PERIMETER AND INNER RING */}
            {allSpokeAngles.map((spoke) => {
              const rad = ((spoke.angle - 90) * Math.PI) / 180;
              const spkRadius = spoke.dom === "Axis" ? innerRadius : radius;
              const cx = center + spkRadius * Math.cos(rad);
              const cy = center + spkRadius * Math.sin(rad);
              const isSelected = selectedSpokeNumber === spoke.num;
              
              // Determine if we should render using default "codex" mode colors or "engine" mode dynamic status colors
              const effectiveSpokeColor = getSpokeColor(spoke.num, spoke.dom as DominionType);
              // Keeps the highlight reticles visually mapped to the specific spoke status
              const glowColor = getDominionColor(spoke.dom as DominionType);

              return (
                <g
                  key={`spoke-node-${spoke.num}`}
                  className={`cursor-pointer group ${spokeStatuses && spokeStatuses[spoke.num] === "unknown" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => handleSpokeClick(spoke.num)}
                >
                  {/* Concentric astrolabe focus reticle when selected (no ping drift) */}
                  {isSelected && (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="20"
                        fill="none"
                        stroke={effectiveSpokeColor}
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity="0.9"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="25"
                        fill="none"
                        stroke={effectiveSpokeColor}
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    </g>
                  )}

                  {/* Main Spoke Node */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "14" : "11"}
                    fill={isSelected ? effectiveSpokeColor : "#18181b"}
                    stroke={effectiveSpokeColor}
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* Spoke Number */}
                  <g transform={`rotate(${-wheelRotation}, ${cx}, ${cy})`}>
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fill={isSelected ? "#000000" : (spokeStatuses && spokeStatuses[spoke.num] === "locked" ? "#52525b" : "#ffffff")}
                      className="font-mono text-[10px] font-bold pointer-events-none"
                    >
                      {spokeStatuses && spokeStatuses[spoke.num] === "unknown" ? "?" : spoke.num}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* CENTER HUB: Soran, The Axis / Blind Stone */}
            <g
              className="cursor-pointer group"
              onClick={() => handleDominionClick("Axis")}
            >
              {/* Outer hub aura */}
              <circle
                cx={center}
                cy={center}
                r={innerHubRadius}
                fill={wheelMode === "corrupted" ? "url(#centerHubCorrupted)" : "url(#centerHubUncorrupted)"}
                stroke={selectedDominion === "Axis" ? "#c084fc" : (wheelMode === "corrupted" ? "#a855f7" : "#f59e0b")}
                strokeWidth={selectedDominion === "Axis" ? "4" : "2"}
                className="transition-all duration-300 group-hover:scale-105"
              />

              {/* Inner Petrification / Lotus glyph */}
              {wheelMode === "corrupted" ? (
                // Corrupted: Pierced / Petrified center with fracture crack
                <g>
                  <path
                    d={`M ${center - 25} ${center - 20} L ${center - 5} ${center} L ${center + 15} ${center - 10} L ${center + 25} ${center + 25}`}
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx={center} cy={center} r="6" fill="#ef4444" />
                  <g transform={`rotate(${-wheelRotation}, ${center}, ${center})`}>
                    <text
                      x={center}
                      y={center - 15}
                      textAnchor="middle"
                      fill="#c084fc"
                      className="font-cinzel text-[10px] font-black uppercase tracking-wider"
                    >
                      SORAN
                    </text>
                    <text
                      x={center}
                      y={center + 20}
                      textAnchor="middle"
                      fill="#9ca3af"
                      className="font-mono text-[8px] tracking-widest"
                    >
                      PETRIFIED AXIS
                    </text>
                  </g>
                </g>
              ) : (
                // Uncorrupted: Pure Sunyata (Empty Vessel) with peaceful golden seed
                <g>
                  <circle cx={center} cy={center} r="16" fill="none" stroke="#fef3c7" strokeWidth="2" />
                  <circle cx={center} cy={center} r="5" fill="#fef3c7" />
                  <g transform={`rotate(${-wheelRotation}, ${center}, ${center})`}>
                    <text
                      x={center}
                      y={center - 20}
                      textAnchor="middle"
                      fill="#fef3c7"
                      className="font-cinzel text-[10px] font-black tracking-wider uppercase"
                    >
                      THE HUB
                    </text>
                    <text
                      x={center}
                      y={center + 26}
                      textAnchor="middle"
                      fill="#fef08a"
                      className="font-mono text-[8px] tracking-widest"
                    >
                      SUNYATA (STILLNESS)
                    </text>
                  </g>
                </g>
              )}
            </g>
            </g>
          </svg>

          {/* Wheel Footer Key */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 mt-2 border-t border-neutral-800/80 w-full text-xs font-mono">

            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Iron (Alden): 1-3
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
              Ether (Caelen): 4-6
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Frontier (Mera): 7-9
            </span>
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
              Earth (Bram): 10-12
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
              Axis (Soran): Center
            </span>
          </div>

        {/* OVERLAY POPUP MODAL (The Big Tooltip) */}
        {inspectionFocus && (activeSpoke || activeGod) && (
          <div className="absolute inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 pointer-events-auto">
            <div className="relative w-full max-w-2xl max-h-full overflow-y-auto overflow-x-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 sm:p-3 space-y-3">
              
              {/* Close Button */}
              <button 
                onClick={() => {
                  setInspectionFocus(null);
                  setSelectedSpokeNumber(null);
                  setSelectedDominion(null);
                  playSfx("click");
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-colors z-50 shadow-xl"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Segmented Inspection Mode Selector */}
              <div className="p-1 rounded-xl bg-neutral-950/50 border border-neutral-800/50 flex items-center gap-1 pr-14">
                <button
                  onClick={() => {
                    setInspectionFocus("spoke");
                    playSfx("click");
                  }}
                  disabled={!activeSpoke}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inspectionFocus === "spoke"
                      ? "bg-amber-500 text-neutral-950 shadow-md"
                      : activeSpoke 
                        ? "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                        : "text-neutral-700 cursor-not-allowed opacity-50"
                  }`}
                >
                  <span className="truncate">⚔️ Spoke {activeSpoke ? `#${activeSpoke.number}` : ""}</span>
                </button>
                <button
                  onClick={() => {
                    setInspectionFocus("dominion");
                    playSfx("shield");
                  }}
                  disabled={!activeGod}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    inspectionFocus === "dominion"
                      ? "bg-neutral-800 text-amber-300 border border-amber-500/40 shadow-md"
                      : activeGod
                        ? "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                        : "text-neutral-700 cursor-not-allowed opacity-50"
                  }`}
                >
                  <span className="truncate">👑 Dominion</span>
                </button>
              </div>

          {/* VIEW MODE A: SPOKE INSPECTION (Defaults on spoke click) */}
          {inspectionFocus === "spoke" ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Primary Spoke Deep Inspection Card */}
              <div className="relative rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-2xl overflow-hidden">
                
                {/* Decorative glowing orb in the corner */}
                <div 
                  className="absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full opacity-20 pointer-events-none"
                  style={{ backgroundColor: getDominionColor(activeSpoke?.dominion as DominionType) }}
                />

                <div className="p-5 space-y-5 relative z-10">
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-800/60 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full inline-block shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: getDominionColor(activeSpoke?.dominion as DominionType), color: getDominionColor(activeSpoke?.dominion as DominionType) }}
                        />
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                          Spoke #{activeSpoke?.number || 1}
                        </span>
                      </div>
                      <h3 
                        className="font-cinzel text-xl sm:text-2xl font-black uppercase tracking-wide"
                        style={{ color: getDominionColor(activeSpoke?.dominion as DominionType) }}
                      >
                        {activeSpoke?.name || "The Spoke"}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-neutral-900 text-neutral-300 border border-neutral-700 uppercase tracking-widest">
                        {activeSpoke?.dominion} Dominion
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
                        {activeSpoke?.category || "Discipline"}
                      </span>
                    </div>
                  </div>

                  {/* Mechanic Purpose */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                      Systemic Mechanical Purpose
                    </span>
                    <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                      {activeSpoke?.purpose || "Fundamental mortal discipline."}
                    </p>
                  </div>

                  {/* Original Virtue vs Imperial Distortion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/20 to-neutral-950 border border-emerald-900/30 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors" />
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400/90 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="tracking-wide">Mortal Virtue</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {activeSpoke?.originalVirtue || "Human craft, patience, and restraint."}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-950/20 to-neutral-950 border border-rose-900/30 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/30 group-hover:bg-rose-400 transition-colors" />
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400/90 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="tracking-wide">Imperial Distortion</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {activeSpoke?.corruptedDistortion || "Warped imperial mandate forcing endless production."}
                      </p>
                    </div>
                  </div>

                  {/* Economic Handshakes: Consumes & Produces */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-2">
                        Consumes Inputs
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(activeSpoke?.consumes || ["Raw Materials"]).map((item, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-800/50 text-neutral-300 border border-neutral-700/50">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
                      <span className="text-[9px] font-mono font-bold text-amber-500/80 uppercase tracking-widest block mb-2">
                        Yields Outputs
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(activeSpoke?.produces || ["Refined Goods"]).map((item, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-1 rounded bg-amber-900/20 text-amber-300 border border-amber-700/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Milestones / Mastery Cape */}
                  {activeSpoke?.milestones && activeSpoke.milestones.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold block mb-2">
                        Progression &amp; Mastery
                      </span>
                      <div className="space-y-2">
                        {activeSpoke.milestones.map((ms, idx) => (
                          <div 
                            key={idx}
                            className={`p-2.5 rounded-xl text-xs flex items-start gap-2.5 border transition-colors ${
                              ms.tier === "Ascendant (Lvl 99)" 
                                ? "bg-amber-950/20 border-amber-500/30 text-amber-200 shadow-[inset_0_0_12px_rgba(245,158,11,0.05)]" 
                                : "bg-neutral-900/30 border-neutral-800/60 text-neutral-300"
                            }`}
                          >
                            <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${ms.tier === "Ascendant (Lvl 99)" ? "text-amber-400" : "text-neutral-600"}`} />
                            <div>
                              <span className="font-mono font-bold text-[10px] tracking-wide text-neutral-200 uppercase">
                                {ms.tier}: <span className={ms.tier === "Ascendant (Lvl 99)" ? "text-amber-400" : "text-neutral-400"}>{ms.title}</span>
                              </span>
                              <p className="text-neutral-400 font-sans text-xs mt-0.5 leading-relaxed">
                                {ms.unlock}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subordinate Dominion Notice & Quick Switch */}
                  <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">
                      Enslaved by: <strong className="text-neutral-300 font-bold">{activeGod?.name}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setInspectionFocus("dominion");
                        playSfx("shield");
                      }}
                      className="text-amber-500/80 hover:text-amber-400 transition-colors cursor-pointer group flex items-center gap-1"
                    >
                      <span>View Corrupter</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW MODE B: DOMINION / GOD INSPECTION (Defaults on spike click) */
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-2xl overflow-hidden">
                
                {/* Decorative glowing orb in the corner */}
                <div 
                  className="absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full opacity-20 pointer-events-none"
                  style={{ backgroundColor: getDominionColor(activeGod.dominion) }}
                />

                <div className="p-5 space-y-5 relative z-10">
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-800/60 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full inline-block shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: getDominionColor(activeGod.dominion), color: getDominionColor(activeGod.dominion) }}
                        />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                          {activeGod.dominionTitle}
                        </span>
                      </div>
                      <h3 
                        className="font-cinzel text-xl sm:text-2xl font-black tracking-wide uppercase"
                        style={{ color: getDominionColor(activeGod.dominion) }}
                      >
                        {activeGod.name}
                      </h3>
                      <p className="text-xs font-serif italic text-neutral-400 mt-1">
                        "{activeGod.folkWhisper}"
                      </p>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm bg-neutral-900 text-neutral-300 border border-neutral-700 uppercase tracking-widest">
                      {activeGod.armorWeightAffinity} Weight
                    </span>
                  </div>

                  {/* Mortal Virtue vs Corrupted Distortion Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/20 to-neutral-950 border border-emerald-900/30 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors" />
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400/90 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="tracking-wide">Original Mortal Virtue</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {activeGod.mortalVirtue}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-950/20 to-neutral-950 border border-rose-900/30 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/30 group-hover:bg-rose-400 transition-colors" />
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400/90 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="tracking-wide">Fractured Corruption</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {activeGod.fracturedCorruption}
                      </p>
                    </div>
                  </div>

                  {/* Consumed Spokes List */}
                  <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2 font-bold">
                      Consumed Spokes (Click to Inspect)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeGod?.consumedSpokes || []).map((spokeStr, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 hover:border-amber-500/40 hover:text-amber-300 transition-colors cursor-pointer"
                          onClick={() => {
                            if (typeof spokeStr === "string") {
                              const matched = spokesData.find(s => spokeStr.includes(s.name) || s.name.includes(spokeStr));
                              if (matched) handleSpokeClick(matched.number);
                            }
                          }}
                        >
                          {spokeStr}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divine Decree */}
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/50">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1 font-bold">
                      Etched Divine Decree
                    </span>
                    <p className="text-sm font-serif italic text-neutral-300 leading-relaxed">
                      "{activeGod?.divineDecree || "None recorded."}"
                    </p>
                  </div>

                  {/* Return to Spoke */}
                  <div className="pt-4 border-t border-neutral-800/60 flex justify-end">
                    <button
                      onClick={() => {
                        setInspectionFocus("spoke");
                        playSfx("click");
                      }}
                      className="text-xs font-mono text-amber-500/80 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      <span>Inspect Spoke #{activeSpoke?.number} ({activeSpoke?.name.replace("The ", "")})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
