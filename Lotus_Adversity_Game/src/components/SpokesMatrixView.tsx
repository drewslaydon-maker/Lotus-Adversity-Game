import { FC, useState } from "react";
import { spokesData } from "../data/spokesAndPillarsData";
import { Spoke, DominionType } from "../types";
import { Compass, Award, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

interface SpokesMatrixViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const SpokesMatrixView: FC<SpokesMatrixViewProps> = ({ playSfx }) => {
  const [selectedSpoke, setSelectedSpoke] = useState<Spoke>(spokesData[0]); // Spoke 1: The Bastion
  const [filterDominion, setFilterDominion] = useState<string>("All");

  const consumingAscendant: Record<string, string> = {
    Iron: "Alden",
    Ether: "Caelen",
    Frontier: "Mera",
    Earth: "Bram",
  };

  const dominionGroups: ("All" | DominionType)[] = ["All", "Iron", "Ether", "Frontier", "Earth"];

  const filteredSpokes = spokesData.filter((s) => {
    return filterDominion === "All" || s.dominion === filterDominion;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 0 Architecture • 15-Spoke Wheel Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            The 15-Spoke Wheel Matrix
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            In the ancient world, the 15 spokes operated as a balanced matrix of human virtue and craft — 12 mortal paths across the Four Dominions, completed by the three-spoke Axis of Soran. 
            When the Broken RingWheel ascended, each of the 4 Cardinal Dominions consumed 3 spokes, 
            bending human capability into imperial servitude. Review each discipline's input/output handshakes, 
            original virtue versus imperial distortion, and milestone unlocks at Levels 25, 50, 75, and 99.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Dominion Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-2">
            Filter by Consuming Dominion:
          </span>
          {dominionGroups.map((dom) => (
            <button
              key={dom}
              onClick={() => {
                setFilterDominion(dom);
                playSfx("click");
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filterDominion === dom
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                  : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
              }`}
            >
              {dom === "All" ? "All 15 Spokes" : `${dom} Dominion`}
            </button>
          ))}
        </div>

        {/* Spokes Wheel Selection Bar (15 spokes grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {filteredSpokes.map((spoke) => {
              const isSelected = selectedSpoke.id === spoke.id;
              return (
                <button
                  key={spoke.id}
                  onClick={() => {
                    setSelectedSpoke(spoke);
                    playSfx("click");
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-neutral-900 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40"
                      : "bg-neutral-950/80 hover:bg-neutral-900/60 border-neutral-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold" style={{ color: spoke.color }}>
                        Spoke #{spoke.number}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500">
                        {spoke.dominion}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-200 line-clamp-1 mt-1 block">
                      {spoke.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 mt-2 block">
                    {spoke.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Spoke Deep Dive */}
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold" 
                    style={{ backgroundColor: `${selectedSpoke.color}20`, color: selectedSpoke.color, border: `1px solid ${selectedSpoke.color}50` }}
                  >
                    Spoke #{selectedSpoke.number} • {selectedSpoke.dominion} Dominion (Consumed by {consumingAscendant[selectedSpoke.dominion]})
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                    {selectedSpoke.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-neutral-100">
                  {selectedSpoke.name}
                </h2>
              </div>
            </div>

            {/* Mortal Discipline vs Imperial Distortion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Original Mortal Discipline (Virtue):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                  {selectedSpoke.originalVirtue}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Imperial Distortion (The Godman's Warp):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                  {selectedSpoke.corruptedDistortion}
                </p>
              </div>
            </div>

            {/* Purpose */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1.5">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                Gameplay Mechanic &amp; Combat Interaction
              </span>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {selectedSpoke.purpose}
              </p>
            </div>

            {/* Input & Output Symbiosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold block">
                  Consumes From Other Spokes:
                </span>
                <ul className="space-y-1.5">
                  {(selectedSpoke.consumes || []).map((inp, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 font-mono flex items-start gap-2">
                      <span className="text-rose-500 font-bold">←</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                  {(!selectedSpoke.consumes || selectedSpoke.consumes.length === 0) && (
                    <li className="text-xs text-neutral-500 font-mono italic">Independent discipline</li>
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                  Provides To Other Spokes:
                </span>
                <ul className="space-y-1.5">
                  {(selectedSpoke.produces || []).map((out, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 font-mono flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">→</span>
                      <span>{out}</span>
                    </li>
                  ))}
                  {(!selectedSpoke.produces || selectedSpoke.produces.length === 0) && (
                    <li className="text-xs text-neutral-500 font-mono italic">Direct combat manifestation</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Progression Milestones & Level 99 Mastery Cape */}
            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Spoke Progression Milestones &amp; Mastery Capes</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(selectedSpoke.milestones || []).map((m, idx) => {
                  const isCap = idx === (selectedSpoke.milestones.length - 1);
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        isCap 
                          ? "bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                          : "bg-neutral-900/60 border-neutral-800"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                            {m.tier}
                          </span>
                          {isCap && (
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <h4 className="font-cinzel text-sm font-bold text-neutral-100">
                          {m.title}
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {m.unlock}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};
