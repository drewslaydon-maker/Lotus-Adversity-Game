import { FC, useState } from "react";
import { ArmorSymbol, ArmorWeightClass, ArmorSlot, DominionType } from "../types";
import { PantheonSymbolGlyph } from "./PantheonSymbolGlyph";
import { 
  Shield, 
  Sparkles, 
  Flame, 
  Hammer, 
  Copy, 
  Check, 
  Filter, 
  Info,
  Swords,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface ArmorSymbolsViewProps {
  symbols: ArmorSymbol[];
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const ArmorSymbolsView: FC<ArmorSymbolsViewProps> = ({
  symbols,
  playSfx,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<string>("All");
  const [selectedDominion, setSelectedDominion] = useState<string>("All");
  const [activeSymbol, setActiveSymbol] = useState<ArmorSymbol>(() => symbols[0] || ({} as ArmorSymbol));
  const [activeFormTab, setActiveFormTab] = useState<"dual" | "true" | "corrupted">("dual");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive mitigation test state
  const [testStrikePower, setTestStrikePower] = useState<"light" | "medium" | "heavy">("medium");

  const weights = ["All", "Heavy", "Medium", "Light", "Zero"];
  const dominions: ("All" | DominionType)[] = ["All", "Iron", "Ether", "Frontier", "Earth", "Axis"];

  const filteredSymbols = symbols.filter((s) => {
    const matchesWeight = selectedWeight === "All" || s.weightClass === selectedWeight;
    const matchesDominion = selectedDominion === "All" || s.dominion === selectedDominion;
    return matchesWeight && matchesDominion;
  });

  const handleCopySymbol = (sym: ArmorSymbol) => {
    const text = `=== SACRED ARMOR SYMBOL: ${sym.name} ===\nChronological Era: ${sym.chronologicalEra}\nWeight Class: ${sym.weightClass} | Slot: ${sym.slot}\nGod Affinity: ${sym.godAffinity} (${sym.dominion} Dominion)\n\n[TRUE / HEALTHY FORM: ${sym.trueForm.name}]\nGeometry: ${sym.trueForm.geometry}\nMeaning: ${sym.trueForm.inUniverseMeaning}\n\n[CORRUPTED IMPERIAL FORM: ${sym.corruptedForm.name}]\nGeometry: ${sym.corruptedForm.geometry}\nMeaning: ${sym.corruptedForm.inUniverseMeaning}\n\nForging Incantation: "${sym.forgingIncantation}"\nMitigation: ${sym.postureMitigation}\nSynergy: ${sym.weightSynergy}`;
    navigator.clipboard.writeText(text);
    setCopiedId(sym.id);
    playSfx("scribe");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const calculateMitigationSample = (strike: "light" | "medium" | "heavy", sym: ArmorSymbol) => {
    const rawDamage = strike === "light" ? 20 : strike === "medium" ? 40 : 70;
    let mitigated = rawDamage;
    let postureLoss = strike === "light" ? 12 : strike === "medium" ? 25 : 50;

    if (sym.weightClass === "Heavy") {
      mitigated = Math.max(5, rawDamage - 24);
      postureLoss = Math.max(3, Math.round(postureLoss * 0.35));
    } else if (sym.weightClass === "Medium") {
      mitigated = Math.max(8, rawDamage - 14);
      postureLoss = Math.max(5, Math.round(postureLoss * 0.6));
    } else if (sym.weightClass === "Light") {
      mitigated = Math.max(12, rawDamage - 8);
      postureLoss = Math.max(7, Math.round(postureLoss * 0.8));
    } else {
      mitigated = rawDamage; // Zero armor takes full damage
      postureLoss = postureLoss * 1.4;
    }

    return { rawDamage, mitigated, postureLoss };
  };

  return (
    <div className="space-y-8">
      {/* Introduction Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>The Heraldic Battleground of Alderreach</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            Armor Symbols: True vs. Corrupted Forms
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            In Alderreach, heraldic symbols are not cosmetic adornments. Every symbol is an 
            <strong className="text-neutral-100 font-semibold"> ideological battleground</strong>: 
            the <span className="text-amber-400 font-medium">True Form</span> preserves the ancient, balanced geometry 
            of human virtue before the ascension, while the <span className="text-rose-400 font-medium">Corrupted Form</span> reflects 
            the Ascendant's specific trauma and imperial obsession. Notice Alden’s chronological fall: from the grounded Anvil of the Envoy, 
            to the coiled Sheathed Verge, to the naked edge of the Severed Scabbard.
          </p>
        </div>
      </div>

      {/* Main Layout: Left Side List, Right Side Detail/Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Filters and Symbol Grid (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Filter Bar */}
          <div className="bg-neutral-900/70 p-4 rounded-xl border border-neutral-800 space-y-3">
            {/* Weight Class Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider pl-1">
                Weight:
              </span>
              {weights.map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setSelectedWeight(w);
                    playSfx("click");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedWeight === w
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                      : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Dominion Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider pl-1">
                Dominion:
              </span>
              {dominions.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDominion(d);
                    playSfx("click");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedDominion === d
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 font-bold"
                      : "bg-neutral-950 text-neutral-400 hover:text-neutral-300 border border-neutral-800"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Symbol Cards List */}
          <div className="space-y-3">
            {filteredSymbols.map((sym) => {
              const isSelected = activeSymbol?.id === sym.id;
              return (
                <div
                  key={sym.id}
                  onClick={() => {
                    setActiveSymbol(sym);
                    playSfx("shield");
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                    isSelected
                      ? "bg-neutral-900 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40"
                      : "bg-neutral-950/70 hover:bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700"
                  }`}
                >
                  {/* Left Glyphs Comparison Mini */}
                  <div className="flex items-center gap-2 shrink-0">
                    <PantheonSymbolGlyph symbolForm={sym.trueForm} size={36} isCorrupted={false} />
                    <span className="text-neutral-600 font-mono text-xs">→</span>
                    <PantheonSymbolGlyph symbolForm={sym.corruptedForm} size={36} isCorrupted={true} />
                  </div>

                  {/* Middle Info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {sym.weightClass} • {sym.slot}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400/90 truncate">
                        {sym.chronologicalEra}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-neutral-200 group-hover:text-amber-300 transition-colors truncate">
                      {sym.name}
                    </h4>

                    <p className="text-xs text-neutral-400 truncate">
                      Patron: {sym.godAffinity}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-neutral-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dual Form Comparison & Posture Inspector (6 cols) */}
        {activeSymbol && (
          <div className="lg:col-span-6 sticky top-24 space-y-4">
            <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 space-y-6 shadow-2xl">
              
              {/* Active Symbol Header */}
              <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      {activeSymbol.weightClass} Armor • {activeSymbol.slot}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {activeSymbol.dominion} Dominion
                    </span>
                  </div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-black text-neutral-100">
                    {activeSymbol.name}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 mt-0.5">
                    {activeSymbol.chronologicalEra}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopySymbol(activeSymbol)}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 border border-neutral-800 transition-all cursor-pointer"
                    title="Copy full symbol documentation"
                  >
                    {copiedId === activeSymbol.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* DUAL FORM COMPARISON BOX */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                    <Swords className="w-4 h-4 text-amber-400" />
                    <span>The Ideological Battleground</span>
                  </span>
                  
                  {/* Form View Switcher */}
                  <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs font-mono">
                    <button
                      onClick={() => setActiveFormTab("dual")}
                      className={`px-2 py-0.5 rounded ${activeFormTab === "dual" ? "bg-neutral-800 text-neutral-100 font-bold" : "text-neutral-400"}`}
                    >
                      Dual View
                    </button>
                    <button
                      onClick={() => setActiveFormTab("true")}
                      className={`px-2 py-0.5 rounded ${activeFormTab === "true" ? "bg-amber-500/20 text-amber-300 font-bold" : "text-neutral-400"}`}
                    >
                      True Only
                    </button>
                    <button
                      onClick={() => setActiveFormTab("corrupted")}
                      className={`px-2 py-0.5 rounded ${activeFormTab === "corrupted" ? "bg-rose-500/20 text-rose-300 font-bold" : "text-neutral-400"}`}
                    >
                      Corrupted Only
                    </button>
                  </div>
                </div>

                {/* Render Forms Side by Side or Solo */}
                <div className={`grid ${activeFormTab === "dual" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
                  
                  {/* True Form Card */}
                  {(activeFormTab === "dual" || activeFormTab === "true") && (
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-500/40 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
                        <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>True / Healthy Form</span>
                        </span>
                      </div>

                      <div className="flex justify-center py-2">
                        <PantheonSymbolGlyph symbolForm={activeSymbol.trueForm} size={110} isCorrupted={false} />
                      </div>

                      <div>
                        <h5 className="font-cinzel text-sm font-bold text-neutral-100">
                          {activeSymbol.trueForm.name}
                        </h5>
                        <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">
                          {activeSymbol.trueForm.inUniverseMeaning}
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-amber-300/90">
                        <strong>Geometry: </strong> {activeSymbol.trueForm.geometry}
                      </div>
                    </div>
                  )}

                  {/* Corrupted Form Card */}
                  {(activeFormTab === "dual" || activeFormTab === "corrupted") && (
                    <div className="p-4 rounded-xl bg-neutral-900/80 border border-rose-500/40 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between gap-2 border-b border-rose-500/20 pb-2">
                        <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Corrupted Imperial Form</span>
                        </span>
                      </div>

                      <div className="flex justify-center py-2">
                        <PantheonSymbolGlyph symbolForm={activeSymbol.corruptedForm} size={110} isCorrupted={true} />
                      </div>

                      <div>
                        <h5 className="font-cinzel text-sm font-bold text-neutral-100">
                          {activeSymbol.corruptedForm.name}
                        </h5>
                        <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">
                          {activeSymbol.corruptedForm.inUniverseMeaning}
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-rose-300/90">
                        <strong>Geometry: </strong> {activeSymbol.corruptedForm.geometry}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Forging Incantation */}
              <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Hammer className="w-3 h-3 text-amber-400" />
                  <span>Anvil Forging Incantation (Spoke 11 Smithing)</span>
                </span>
                <p className="text-xs font-serif italic text-neutral-200">
                  "{activeSymbol.forgingIncantation}"
                </p>
              </div>

              {/* Deterministic Mitigation & Posture Dynamics */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                    Deterministic Combat Mechanics:
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <span className="text-neutral-500">Test Blow:</span>
                    {(["light", "medium", "heavy"] as const).map((strike) => (
                      <button
                        key={strike}
                        onClick={() => {
                          setTestStrikePower(strike);
                          playSfx("shield");
                        }}
                        className={`px-2 py-0.5 rounded capitalize transition-all cursor-pointer ${
                          testStrikePower === strike
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                            : "bg-neutral-900 text-neutral-400"
                        }`}
                      >
                        {strike}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mitigation Result Box */}
                {(() => {
                  const res = calculateMitigationSample(testStrikePower, activeSymbol);
                  return (
                    <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono">
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase block">Raw Impact</span>
                        <span className="text-sm font-bold text-neutral-300">{res.rawDamage} dmg</span>
                      </div>
                      <div className="border-x border-neutral-800">
                        <span className="text-[10px] text-emerald-400 uppercase block">After Mitigation</span>
                        <span className="text-sm font-bold text-emerald-400">{res.mitigated} dmg</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 uppercase block">Posture Loss</span>
                        <span className="text-sm font-bold text-amber-400">{res.postureLoss} poise</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-1 text-xs">
                  <span className="font-mono text-amber-300 font-semibold block">
                    Mitigation Profile:
                  </span>
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    {activeSymbol.postureMitigation}
                  </p>
                  <span className="font-mono text-neutral-400 font-semibold block mt-1.5">
                    Weight Class Synergy:
                  </span>
                  <p className="text-neutral-400 font-sans">
                    {activeSymbol.weightSynergy}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
