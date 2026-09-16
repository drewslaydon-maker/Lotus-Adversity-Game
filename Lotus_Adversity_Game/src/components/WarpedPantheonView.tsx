import { FC, useState } from "react";
import { WarpedGod, ArmorWeightClass, DominionType } from "../types";
import { BrokenRingWheelView } from "./BrokenRingWheelView";
import { PantheonSymbolGlyph } from "./PantheonSymbolGlyph";
import { 
  Flame, 
  Shield, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Copy, 
  Check, 
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight
} from "lucide-react";

interface WarpedPantheonViewProps {
  pantheon: WarpedGod[];
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
  onNavigateToArmorSymbols?: () => void;
}

export const WarpedPantheonView: FC<WarpedPantheonViewProps> = ({
  pantheon,
  playSfx,
  onNavigateToArmorSymbols,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"wheel" | "dossiers">("wheel");
  const [selectedGod, setSelectedGod] = useState<WarpedGod | null>(null);
  const [selectedDominion, setSelectedDominion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterDominions: ("All" | DominionType)[] = ["All", "Iron", "Ether", "Frontier", "Earth", "Axis"];

  const filteredGods = pantheon.filter((god) => {
    if (!god) return false;
    const matchesDominion = selectedDominion === "All" || god.dominion === selectedDominion;
    const matchesQuery = 
      (god.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (god.mortalName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (god.folkWhisper || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (god.dominionTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (god.trueSymbol?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (god.corruptedSymbol?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDominion && matchesQuery;
  });

  const handleCopyLore = (god: WarpedGod) => {
    if (!god) return;
    const text = `=== ${god.name} (${god.publicTitle}) ===\nFolk Whisper: "${god.folkWhisper}"\nDominion: ${god.dominionTitle}\nMortal Virtue: ${god.mortalVirtue}\nFractured Corruption: ${god.fracturedCorruption}\nWarped Form: ${god.warpedPhysiology}\nConsumed Spokes: ${(god.consumedSpokes || []).join(", ")}\nTrue Symbol: ${god.trueSymbol?.name || "N/A"} - ${god.trueSymbol?.inUniverseMeaning || ""}\nCorrupted Symbol: ${god.corruptedSymbol?.name || "N/A"} - ${god.corruptedSymbol?.inUniverseMeaning || ""}\nDivine Decree: "${god.divineDecree}"\nRelic: ${god.relic?.name || "N/A"} - ${god.relic?.description || ""}\nTactical Blessing: ${god.tacticalBlessing?.name || "N/A"} (${god.tacticalBlessing?.mechanic || ""})\nChronicle: ${god.chronicleExcerpt}`;
    navigator.clipboard.writeText(text);
    setCopiedId(god.id);
    playSfx("scribe");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getDominionColor = (dom: DominionType) => {
    switch (dom) {
      case "Iron":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Ether":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "Frontier":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Earth":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "Axis":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero / Cosmology Introduction */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>The Broken RingWheel Cosmology</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            The Pantheon of Warped God-People
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            The Original 12-Spoke Wheel of Adversity was the balanced, healthy wheel of human capability and trial. 
            2,000 years ago, <strong className="text-neutral-100 font-semibold">The Broken RingWheel</strong>—the 
            4 Cardinal Dominions (Alden, Caelen, Mera, Bram) plus The Axis Center (Soran)—seized, fractured, and consumed the spokes, 
            bending those natural practices into their own warped imperial obsessions.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveSubTab("wheel");
                playSfx("anvil");
              }}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Inspect The Broken RingWheel</span>
            </button>
            <button
              onClick={() => {
                setActiveSubTab("dossiers");
                playSfx("click");
              }}
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>View the 5 Ascendant Dossiers</span>
            </button>
            {onNavigateToArmorSymbols && (
              <button
                onClick={() => {
                  onNavigateToArmorSymbols();
                  playSfx("shield");
                }}
                className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Sacred Armor Symbols</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation: Visual RingWheel vs Dossiers */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveSubTab("wheel");
              playSfx("anvil");
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === "wheel"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>The Ring with Spikes View Model</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("dossiers");
              playSfx("click");
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === "dossiers"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>The 5 Ascendant Dossiers</span>
          </button>
        </div>

        <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
          5 Canonical Ascendants • 12 Consumed Spokes
        </span>
      </div>

      {/* 1. THE RING WITH SPIKES VIEW MODEL */}
      {activeSubTab === "wheel" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <BrokenRingWheelView
            pantheon={pantheon}
            onSelectGod={(god) => setSelectedGod(god)}
            playSfx={playSfx}
          />
        </div>
      )}

      {/* 2. THE 5 ASCENDANT DOSSIERS */}
      {activeSubTab === "dossiers" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter and Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pl-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Dominion:</span>
              </span>
              {filterDominions.map((dom) => (
                <button
                  key={dom}
                  onClick={() => {
                    setSelectedDominion(dom);
                    playSfx("click");
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedDominion === dom
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                      : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ascendants, spokes, symbols..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid of Canonical Warped Ascendants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGods.map((god) => {
              const badgeColor = getDominionColor(god.dominion);
              return (
                <div
                  key={god.id}
                  className="group relative rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all shadow-xl hover:shadow-amber-950/20"
                >
                  <div className="space-y-4">
                    {/* Header: Dominion & Armor Affinity */}
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badgeColor}`}>
                        {god.dominionTitle}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {god.armorWeightAffinity} • {god.armorSlotAffinity}
                      </span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                        Mortal: {god.mortalName}
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                        {god.name}
                      </h3>
                      <p className="text-xs font-serif italic text-amber-400/90">
                        "{god.folkWhisper}"
                      </p>
                    </div>

                    {/* True vs Corrupted Symbols Mini Bar */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                        Dual Heraldic Symbols:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-1.5 rounded bg-neutral-900 border border-amber-500/30">
                          <PantheonSymbolGlyph symbolForm={god.trueSymbol} size={30} isCorrupted={false} />
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono text-amber-400 block uppercase">True Form</span>
                            <span className="text-[11px] text-neutral-200 truncate block">{god.trueSymbol.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded bg-neutral-900 border border-rose-500/30">
                          <PantheonSymbolGlyph symbolForm={god.corruptedSymbol} size={30} isCorrupted={true} />
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono text-rose-400 block uppercase">Corrupted Mark</span>
                            <span className="text-[11px] text-neutral-200 truncate block">{god.corruptedSymbol.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mortal Virtue Snippet */}
                    <div className="p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 uppercase font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        <span>Mortal Virtue:</span>
                      </div>
                      <p className="line-clamp-2 leading-relaxed text-[11px]">
                        {god.mortalVirtue}
                      </p>
                    </div>

                    {/* Consumed Spokes Pills */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                        Consumed Spokes:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {god.consumedSpokes.map((spoke, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800"
                          >
                            {spoke}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedGod(god);
                        playSfx("shield");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Deep Dossier</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyLore(god)}
                        className="p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 border border-neutral-800 transition-all cursor-pointer"
                        title="Copy mythic lore"
                      >
                        {copiedId === god.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => {
                          setActiveSubTab("wheel");
                          playSfx("anvil");
                        }}
                        className="p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 border border-neutral-800 transition-all cursor-pointer"
                        title="Inspect on Broken RingWheel"
                      >
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed God Modal */}
      {selectedGod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-950 border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedGod(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 border border-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-10">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${getDominionColor(selectedGod.dominion)}`}>
                  {selectedGod.dominionTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {selectedGod.armorWeightAffinity} Weight • {selectedGod.armorSlotAffinity} Affinity
                </span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-100">
                {selectedGod.name}
              </h2>
              <p className="text-sm font-serif italic text-amber-400/90">
                "{selectedGod.folkWhisper}" — Original Mortal: <strong className="text-neutral-200">{selectedGod.mortalName}</strong>
              </p>
            </div>

            {/* Moral Contrast: Virtue vs Corruption */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Original Mortal Virtue (Uncorrupted):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                  {selectedGod.mortalVirtue}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-rose-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Fractured Corruption (The Godman's Mark):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                  {selectedGod.fracturedCorruption}
                </p>
              </div>
            </div>

            {/* Dual Symbols Side-by-Side Visualizer */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold block">
                The Dual Heraldry of {selectedGod.mortalName}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* True Symbol */}
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold border-b border-amber-500/20 pb-1.5">
                    <span>True Form: {selectedGod.trueSymbol.name}</span>
                  </div>
                  <div className="flex justify-center py-2">
                    <PantheonSymbolGlyph symbolForm={selectedGod.trueSymbol} size={100} isCorrupted={false} />
                  </div>
                  <p className="text-xs text-neutral-300 font-sans">
                    {selectedGod.trueSymbol.inUniverseMeaning}
                  </p>
                  <p className="text-[11px] font-mono text-amber-300/80">
                    Geometry: {selectedGod.trueSymbol.geometry}
                  </p>
                </div>

                {/* Corrupted Symbol */}
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-rose-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold border-b border-rose-500/20 pb-1.5">
                    <span>Imperial Mark: {selectedGod.corruptedSymbol.name}</span>
                  </div>
                  <div className="flex justify-center py-2">
                    <PantheonSymbolGlyph symbolForm={selectedGod.corruptedSymbol} size={100} isCorrupted={true} />
                  </div>
                  <p className="text-xs text-neutral-300 font-sans">
                    {selectedGod.corruptedSymbol.inUniverseMeaning}
                  </p>
                  <p className="text-[11px] font-mono text-rose-300/80">
                    Geometry: {selectedGod.corruptedSymbol.geometry}
                  </p>
                </div>

              </div>
            </div>

            {/* Warped Physiology */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Warped Physical Anatomy</span>
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedGod.warpedPhysiology}
              </p>
            </div>

            {/* Consumed Spokes & Relic & Blessing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                  Consumed Spokes
                </span>
                <ul className="text-xs text-neutral-200 space-y-1">
                  {selectedGod.consumedSpokes.map((s, idx) => (
                    <li key={idx} className="font-mono text-[11px]">• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                  Sacred Relic
                </span>
                <h5 className="font-cinzel text-xs font-bold text-neutral-100">{selectedGod.relic.name}</h5>
                <p className="text-[11px] text-neutral-300 leading-relaxed">{selectedGod.relic.description}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                  Deterministic Blessing
                </span>
                <h5 className="font-cinzel text-xs font-bold text-amber-400">{selectedGod.tacticalBlessing.name}</h5>
                <p className="text-[11px] text-neutral-300 leading-relaxed">{selectedGod.tacticalBlessing.mechanic}</p>
              </div>
            </div>

            {/* Decree and Chronicle */}
            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Divine Decree:
                </span>
                <p className="text-xs font-serif italic text-amber-300/90 mt-0.5">
                  "{selectedGod.divineDecree}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-serif italic">
                {selectedGod.chronicleExcerpt}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
