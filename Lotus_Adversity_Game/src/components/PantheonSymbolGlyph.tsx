import { FC } from "react";
import { SymbolForm } from "../types";

interface PantheonSymbolGlyphProps {
  symbolForm: SymbolForm;
  size?: number;
  className?: string;
  isCorrupted?: boolean;
}

export const PantheonSymbolGlyph: FC<PantheonSymbolGlyphProps> = ({
  symbolForm,
  size = 120,
  className = "",
  isCorrupted = false,
}) => {
  const { svgShapeType, accentColor } = symbolForm;
  const strokeColor = accentColor || (isCorrupted ? "#ef4444" : "#f59e0b");

  return (
    <div 
      className={`relative flex items-center justify-center p-3 rounded-xl border transition-all ${
        isCorrupted 
          ? "bg-rose-950/20 border-rose-900/60 shadow-[0_0_15px_rgba(225,29,72,0.15)]" 
          : "bg-amber-950/20 border-amber-800/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
      } ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible select-none"
      >
        <defs>
          <filter id={`glyph-glow-${isCorrupted ? 'corrupt' : 'true'}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isCorrupted ? "2.5" : "1.5"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer alignment circle */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={isCorrupted ? "#7f1d1d" : "#78350f"}
          strokeWidth="1"
          strokeDasharray={isCorrupted ? "4 3 8 3" : "2 2"}
          className="opacity-70"
        />

        {/* 1. TRAPEZOID (The Anvil of the Envoy vs The Slag-Welded Carapace) */}
        {svgShapeType === "trapezoid" && !isCorrupted && (
          // True: Broad, symmetrical, grounded trapezoid housing a balanced golden seed
          <g filter="url(#glyph-glow-true)">
            <polygon
              points="24,34 76,34 66,74 34,74"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Upper anvil shelf */}
            <line x1="16" y1="34" x2="84" y2="34" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            {/* Center balanced seed */}
            <circle cx="50" cy="54" r="6" fill={strokeColor} />
            <circle cx="50" cy="54" r="12" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        )}

        {svgShapeType === "trapezoid" && isCorrupted && (
          // Corrupted: Slag-welded trapezoid distorted by barbed rivets and jagged jagged edges
          <g filter="url(#glyph-glow-corrupt)">
            <polygon
              points="20,28 80,32 72,78 28,74"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinejoin="miter"
            />
            {/* Barbed rivets cutting inwards */}
            <line x1="28" y1="20" x2="34" y2="38" stroke={strokeColor} strokeWidth="3" />
            <line x1="72" y1="20" x2="66" y2="38" stroke={strokeColor} strokeWidth="3" />
            <line x1="15" y1="52" x2="32" y2="52" stroke={strokeColor} strokeWidth="3" />
            <line x1="85" y1="52" x2="68" y2="52" stroke={strokeColor} strokeWidth="3" />
            {/* Pierced bleeding center */}
            <line x1="42" y1="44" x2="58" y2="64" stroke="#f43f5e" strokeWidth="4" />
            <line x1="58" y1="44" x2="42" y2="64" stroke="#f43f5e" strokeWidth="4" />
          </g>
        )}

        {/* 2. DIAMOND (The Sheathed Verge vs The Burst Razor-Sheath) */}
        {svgShapeType === "diamond" && !isCorrupted && (
          // True: Pristine vertical diamond with an offset hairline tension line
          <g filter="url(#glyph-glow-true)">
            <polygon
              points="50,14 82,50 50,86 18,50"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Offset tension line (blade held in reserve) */}
            <line x1="42" y1="22" x2="42" y2="78" stroke={strokeColor} strokeWidth="2.5" />
            {/* Center restraining lock dot */}
            <circle cx="50" cy="50" r="4.5" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "diamond" && isCorrupted && (
          // Corrupted: Split diamond with sheared off-axis razor blade slicing outward
          <g filter="url(#glyph-glow-corrupt)">
            <path
              d="M 50 12 L 86 48 L 54 88 L 18 52 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
            />
            {/* The burst razor edge splitting out through the vertex */}
            <line x1="40" y1="92" x2="62" y2="8" stroke="#f43f5e" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="62" y1="8" x2="74" y2="24" stroke="#f43f5e" strokeWidth="3" />
          </g>
        )}

        {/* 3. CRESCENTS (The Severed Scabbard vs The Serrated Cleaver) */}
        {svgShapeType === "crescents" && !isCorrupted && (
          // True: Twin dynamic crescent arcs framing a clean surgical needle
          <g filter="url(#glyph-glow-true)">
            <path
              d="M 30 20 C 15 35, 15 65, 30 80 C 22 65, 22 35, 30 20 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
            />
            <path
              d="M 70 20 C 85 35, 85 65, 70 80 C 78 65, 78 35, 70 20 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
            />
            {/* Central clean needle */}
            <line x1="50" y1="16" x2="50" y2="84" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="30" r="3.5" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "crescents" && isCorrupted && (
          // Corrupted: Serrated bone cleaver with backward tearing hooks
          <g filter="url(#glyph-glow-corrupt)">
            <path
              d="M 24 16 L 36 28 L 24 40 L 36 52 L 24 64 L 36 76 L 24 88"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
            />
            <path
              d="M 76 16 L 64 28 L 76 40 L 64 52 L 76 64 L 64 76 L 76 88"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
            />
            {/* Naked blood gutter line */}
            <line x1="50" y1="12" x2="50" y2="88" stroke="#f43f5e" strokeWidth="4" />
          </g>
        )}

        {/* 4. HORNED CALYX (The Horned Calyx / Alden's Full Corrupted Seal) */}
        {svgShapeType === "horned-calyx" && (
          <g filter="url(#glyph-glow-corrupt)">
            {/* Shattered outer perimeter ring */}
            <circle
              cx="50"
              cy="58"
              r="26"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeDasharray="16 8 20 6"
            />
            {/* Left upward bone horn */}
            <path
              d="M 32 64 C 20 48, 16 28, 22 14 C 28 26, 36 42, 38 52"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right upward bone horn */}
            <path
              d="M 68 64 C 80 48, 84 28, 78 14 C 72 26, 64 42, 62 52"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Weeping tar tears dripping downwards */}
            <circle cx="50" cy="62" r="6" fill="#f43f5e" />
            <line x1="46" y1="72" x2="46" y2="86" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="54" y1="72" x2="54" y2="92" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 5. WEDGE (Bram: Reverent Chisel vs The Crucible Wedge) */}
        {svgShapeType === "wedge" && !isCorrupted && (
          // True: Clean architectural wedge on horizontal granite bedrock
          <g filter="url(#glyph-glow-true)">
            <line x1="18" y1="74" x2="82" y2="74" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            <polygon
              points="50,22 72,66 28,66"
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="48" r="4.5" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "wedge" && isCorrupted && (
          // Corrupted: Crushing wedge cleaving an anvil with molten slag veins
          <g filter="url(#glyph-glow-corrupt)">
            <line x1="14" y1="76" x2="44" y2="74" stroke={strokeColor} strokeWidth="4" />
            <line x1="56" y1="74" x2="86" y2="80" stroke={strokeColor} strokeWidth="4" />
            <polygon
              points="50,14 78,72 22,72"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
            />
            {/* Molten fissure splitting through the base */}
            <path
              d="M 50 18 L 46 42 L 54 58 L 50 86"
              stroke="#ea580c"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 6. LOTUS (Soran: Sunyata Vessel vs The Pierced Obsidian Lotus) */}
        {svgShapeType === "lotus" && !isCorrupted && (
          // True: Pure Sunyata (Empty Vessel) with 8 harmonious radiating petal nodes
          <g filter="url(#glyph-glow-true)">
            <circle cx="50" cy="50" r="14" fill="none" stroke={strokeColor} strokeWidth="3" />
            {/* Four balanced petals */}
            <circle cx="50" cy="24" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
            <circle cx="50" cy="76" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
            <circle cx="24" cy="50" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
            <circle cx="76" cy="50" r="8" fill="none" stroke={strokeColor} strokeWidth="2" />
            {/* Center unburdened seed */}
            <circle cx="50" cy="50" r="4" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "lotus" && isCorrupted && (
          // Corrupted: Pierced lotus skewered by 4 obsidian spikes into petrification
          <g filter="url(#glyph-glow-corrupt)">
            <circle cx="50" cy="50" r="16" fill="none" stroke={strokeColor} strokeWidth="3" strokeDasharray="6 4" />
            {/* 4 skewering spikes from the cardinal points */}
            <line x1="50" y1="10" x2="50" y2="44" stroke="#a855f7" strokeWidth="3.5" />
            <line x1="50" y1="56" x2="50" y2="90" stroke="#a855f7" strokeWidth="3.5" />
            <line x1="10" y1="50" x2="44" y2="50" stroke="#a855f7" strokeWidth="3.5" />
            <line x1="56" y1="50" x2="90" y2="50" stroke="#a855f7" strokeWidth="3.5" />
            {/* Petrified black center */}
            <rect x="44" y="44" width="12" height="12" fill="#ef4444" stroke="#a855f7" strokeWidth="2" />
          </g>
        )}

        {/* 7. CIRCLE / MERIDIAN (Caelen: Flowing Meridian vs Scribed Wedge) */}
        {svgShapeType === "circle" && !isCorrupted && (
          <g filter="url(#glyph-glow-true)">
            <circle cx="50" cy="50" r="28" fill="none" stroke={strokeColor} strokeWidth="3" />
            <path d="M 26 50 Q 50 30, 74 50 Q 50 70, 26 50 Z" fill="none" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="50" cy="50" r="5" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "circle" && isCorrupted && (
          <g filter="url(#glyph-glow-corrupt)">
            <circle cx="50" cy="50" r="28" fill="none" stroke={strokeColor} strokeWidth="3" strokeDasharray="8 4" />
            {/* Rigid grid clamp */}
            <line x1="30" y1="20" x2="30" y2="80" stroke="#38bdf8" strokeWidth="3" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#38bdf8" strokeWidth="3" />
            <line x1="70" y1="20" x2="70" y2="80" stroke="#38bdf8" strokeWidth="3" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="#f43f5e" strokeWidth="3" />
          </g>
        )}

        {/* 8. CALIPER (Mera: Wandering Path vs Caliper Snare) */}
        {svgShapeType === "caliper" && !isCorrupted && (
          <g filter="url(#glyph-glow-true)">
            {/* Flowing river path */}
            <path
              d="M 32 82 C 32 50, 68 50, 68 18"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="68" cy="18" r="5" fill={strokeColor} />
            <circle cx="32" cy="82" r="5" fill={strokeColor} />
          </g>
        )}

        {svgShapeType === "caliper" && isCorrupted && (
          <g filter="url(#glyph-glow-corrupt)">
            {/* Rigid hinged brass calipers pinching shut */}
            <line x1="50" y1="18" x2="26" y2="76" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="18" x2="74" y2="76" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="18" r="7" fill="none" stroke={strokeColor} strokeWidth="3" />
            {/* Barbed snare wire */}
            <line x1="30" y1="64" x2="70" y2="64" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray="4 2" />
          </g>
        )}
      </svg>
    </div>
  );
};
