import { FC, useState } from "react";
import { foreverFlowersData, ForeverFlower } from "../data/foreverFlowersData";
import { Flower2, Shield, Compass, BookOpen, CheckCircle2, Quote, Sparkles, Filter, Copy, Check } from "lucide-react";

interface ForeverFlowersViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const ForeverFlowersView: FC<ForeverFlowersViewProps> = ({ playSfx }) => {
  const [selectedFlower, setSelectedFlower] = useState<ForeverFlower>(foreverFlowersData[0]);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const categories = ["All", "Design Doctrine", "Engineering Practice", "Agent-User Protocol", "Cosmological Law"];

  const filteredFlowers = foreverFlowersData.filter(
    (f) => filterCategory === "All" || f.category === filterCategory
  );

  const handleCopyAll = () => {
    const text = foreverFlowersData.map((f) => {
      return `### ${f.number}: ${f.title} (${f.subtitle})\n` +
        `**Category**: ${f.category}\n` +
        `**Lesson Learned**: ${f.lessonLearned}\n` +
        `**Core Principle**: ${f.corePrinciple}\n` +
        `**User Practice**: ${f.userPractice}\n` +
        `**Agent Practice**: ${f.agentPractice}\n` +
        `> "${f.goldenQuote}"\n`;
    }).join("\n---\n\n");

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    playSfx("scribe");
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Flower2 className="w-3.5 h-3.5 text-amber-400" />
            <span>CANONICAL COVENANTS • LIVING DESIGN GUARDIANS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            The Forever Flowers
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-3xl">
            Guiding principles beyond the foundational pillars. These are the hard-won lessons, 
            immutable boundaries, and mutual covenants between Architect and Agent that protect 
            the truth of Adversity against drift, generic tropes, and artificial bloat.
          </p>

          <div className="pt-2">
            <button
              onClick={handleCopyAll}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono border border-neutral-800 flex items-center gap-2 transition-all cursor-pointer shadow"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">All Forever Flowers Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy All Forever Flowers (Markdown)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider pl-2 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Covenants:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              playSfx("click");
            }}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              filterCategory === cat
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flower Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFlowers.map((flower) => {
          const isSelected = selectedFlower.id === flower.id;
          return (
            <button
              key={flower.id}
              onClick={() => {
                setSelectedFlower(flower);
                playSfx("click");
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-neutral-900 border-amber-500/80 ring-1 ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "bg-neutral-950 hover:bg-neutral-900/60 border-neutral-800"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                    {flower.number}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                    {flower.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-base font-bold text-neutral-100">
                  {flower.title}
                </h3>
              </div>

              <p className="text-xs text-amber-300/80 font-serif italic mt-3 line-clamp-2">
                "{flower.subtitle}"
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Flower Deep Dive Panel */}
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-10 space-y-8 shadow-2xl">
        
        {/* Flower Header */}
        <div className="space-y-3 border-b border-neutral-800/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {selectedFlower.number} • {selectedFlower.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-neutral-500">
              IMMUTABLE DESIGN COVENANT
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-neutral-100">
            {selectedFlower.title}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-amber-300/90">
            "{selectedFlower.subtitle}"
          </p>
        </div>

        {/* Lesson Learned & Core Principle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-400 block">
              LESSON LEARNED (HISTORICAL CONTEXT):
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {selectedFlower.lessonLearned}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/80 border border-amber-500/40 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400 block">
              CORE NON-NEGOTIABLE PRINCIPLE:
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
              {selectedFlower.corePrinciple}
            </p>
          </div>
        </div>

        {/* User Practice vs Agent Practice Covenants */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
            APPROPRIATE PRACTICES &amp; COVENANTS:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900/50 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>USER PRACTICE (ARCHITECT'S GUARDRAIL):</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {selectedFlower.userPractice}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-900/50 border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>AGENT PRACTICE (BUILDER'S COVENANT):</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {selectedFlower.agentPractice}
              </p>
            </div>
          </div>
        </div>

        {/* Golden Quote */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-amber-950/20 via-neutral-900/50 to-neutral-950 border border-amber-500/40 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span>GOLDEN COVENANT:</span>
          </span>
          <blockquote className="font-serif italic text-base sm:text-lg text-neutral-100 border-l-2 border-amber-500 pl-4 py-1">
            "{selectedFlower.goldenQuote}"
          </blockquote>
        </div>

      </div>
    </div>
  );
};
