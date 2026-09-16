import { FC, useState } from "react";
import { LoreChronicle } from "../types";
import { 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Filter, 
  Feather, 
  Scroll
} from "lucide-react";

interface StorytellingCodexProps {
  chronicles: LoreChronicle[];
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const StorytellingCodex: FC<StorytellingCodexProps> = ({
  chronicles,
  playSfx,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportedAll, setExportedAll] = useState(false);

  const categories = ["All", "Mythology", "Forging Rite", "War Chronicle", "Oral Tradition", "Apocrypha"];

  const filteredChronicles = chronicles.filter((c) => {
    return selectedCategory === "All" || c.category === selectedCategory;
  });

  const handleCopyChronicle = (chronicle: LoreChronicle) => {
    const text = `# ${chronicle.title}\nCategory: ${chronicle.category}\nContext: ${chronicle.historicalContext}\n\n${chronicle.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(chronicle.id);
    playSfx("scribe");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleExportAllMarkdown = () => {
    const fullText = chronicles.map((c) => {
      return `## ${c.title}\n*Category: ${c.category}*\n*Context: ${c.historicalContext}*\n\n${c.content}\n\n---\n`;
    }).join("\n");

    const blob = new Blob([`# ADVERSITY: THE SUNDERED CODEX\n\n${fullText}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Adversity-Sundered-Codex.md";
    a.click();
    URL.revokeObjectURL(url);
    setExportedAll(true);
    playSfx("scribe");
    setTimeout(() => setExportedAll(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Alderreach Lore Archives</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            Storytelling Codex &amp; Oral Tales
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            Here lie the transcribed parchment scrolls, oral tavern songs, and forging liturgies 
            defining the mythos of Adversity. These chronicles provide the narrative backbone 
            for quests, dungeon inscriptions, and the dark theology of the Warped Pantheon.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExportAllMarkdown}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{exportedAll ? "Downloaded Markdown!" : "Export Full Codex (.md)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 pl-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              playSfx("click");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-semibold"
                : "bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chronicle Cards */}
      <div className="space-y-6">
        {filteredChronicles.map((chronicle) => (
          <article
            key={chronicle.id}
            className="rounded-2xl bg-neutral-950/80 border border-neutral-800/90 hover:border-neutral-700 p-6 sm:p-8 space-y-4 shadow-xl relative transition-all group"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  {chronicle.category}
                </span>
                {chronicle.isCustom && (
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                    Scribe Inscribed
                  </span>
                )}
              </div>

              <button
                onClick={() => handleCopyChronicle(chronicle)}
                className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy chronicle text"
              >
                {copiedId === chronicle.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Title */}
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
              {chronicle.title}
            </h2>

            {/* Historical context / subtitle */}
            <p className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{chronicle.historicalContext}</span>
            </p>

            {/* Content body with literary styling */}
            <div className="text-sm sm:text-base text-neutral-300 leading-relaxed font-serif space-y-3 pt-2 whitespace-pre-line border-t border-neutral-900">
              {chronicle.content}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
