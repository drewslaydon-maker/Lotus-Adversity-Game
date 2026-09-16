import { FC, useState } from "react";
import { CombatEngineView } from "./CombatEngineView";
import { Swords, Cpu, ShieldAlert, Sparkles, BookOpen, Layers, Terminal } from "lucide-react";

interface FrameworksLabViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const FrameworksLabView: FC<FrameworksLabViewProps> = ({ playSfx }) => {
  const [labTab, setLabTab] = useState<"crypt-slice" | "specs">("crypt-slice");

  return (
    <div className="space-y-6">
      {/* Frameworks & Lab Top Sub-nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base font-bold text-neutral-100 uppercase tracking-wider">
                Frameworks &amp; Interactive Lab
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                Phase 1 Active Sprint
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              Playable combat sandboxes, state machines, and mathematical resolution test benches.
            </p>
          </div>
        </div>

        {/* Sub-view switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setLabTab("crypt-slice");
              playSfx("click");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              labTab === "crypt-slice"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Alderreach Crypt Slice (Duel)</span>
          </button>

          <button
            onClick={() => {
              setLabTab("specs");
              playSfx("click");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              labTab === "specs"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>State Machine &amp; Math Specs</span>
          </button>
        </div>
      </div>

      {/* View Content */}
      {labTab === "crypt-slice" && (
        <CombatEngineView playSfx={playSfx} />
      )}

      {labTab === "specs" && (
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-2 border-b border-neutral-800 pb-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Phase 1 Deliverable Specification
            </span>
            <h2 className="text-2xl font-cinzel font-black text-neutral-100">
              Deterministic AP State Machine &amp; Mitigation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              The mathematical and architectural underpinnings of Adversity's turn-based grid combat. 
              Zero dice rolls, 0% random misses, and strict Action Point budgeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                1. Damage Resolution Pipeline:
              </span>
              <pre className="p-3 rounded-lg bg-black/60 border border-neutral-800/80 text-neutral-300 text-[11px] overflow-x-auto">
{`// 100% Deterministic Resolution Formula:
Effective_Flat_DR = Max(0, Armor_Flat_DR - Armor_Piercing);
Incoming_Base = Max(0, Raw_Attack_Damage - Effective_Flat_DR);

if (Is_Bulwark_Guarding) {
  Incoming_Damage = Round(Incoming_Base * 0.30); // -70% DR
  Posture_Damage = Round(Raw_Posture_Dmg * 0.40);
} else if (Is_Sunyata_Dodging) {
  Incoming_Damage = 0; // 100% Evaded out of reach
  Posture_Damage = 0;
} else if (Is_Tactical_Parrying && Is_Parriable_Stance) {
  Incoming_Damage = 0; // Perfect Deflection
  Enemy_Posture_Damage = 45; // Stagger Counter
} else {
  Incoming_Damage = Incoming_Base;
  Posture_Damage = Raw_Posture_Dmg * (1 - Poise_Buffer);
}`}
              </pre>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                2. Weight Class Triforce + Sunyata Center:
              </span>
              <div className="space-y-2 text-[11px] text-neutral-300">
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="text-amber-400 font-bold">Heavy Plate</span>: 3 AP | Flat DR 16 | 50% Poise Buffer | 1 Tile Sprint / AP
                </div>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="text-amber-300 font-bold">Medium Mail</span>: 3 AP | Flat DR 10 | 30% Poise Buffer | 2 Tiles Sprint / AP
                </div>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-200 font-bold">Light Leather</span>: 3 AP | Flat DR 4 | 15% Poise Buffer | 3 Tiles Sprint / AP
                </div>
                <div className="p-2 rounded bg-rose-950/20 border border-rose-500/40">
                  <span className="text-rose-400 font-bold">Zero Armor (Sunyata Center)</span>: +2 Bonus AP (5 AP) | Flat DR 0 | 4-Tile Sprint | 100% Unmitigated Damage Peril
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2 text-xs">
            <span className="font-mono text-amber-400 font-bold uppercase">
              Phase 1 Next Milestone: 3-Player Triad &amp; 75% Mercenary Companions
            </span>
            <p className="text-neutral-300 font-sans leading-relaxed">
              The next sprint slice expands the Crypt encounter to support party dynamics: Wayfarer (Scout / Trap disarmer), 
              Artificer (Field repairs &amp; posture draughts), and Vanguard (Heavy bulwark), accompanied by tavern-hired 
              NPC mercenaries operating deterministically at 75% baseline player efficiency.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
