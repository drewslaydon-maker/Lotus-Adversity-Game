import { FC, useState } from "react";
import { Copy, Check, Download, Share2, FileCode, Database, Sparkles, ShieldCheck, ChevronUp, ChevronDown } from "lucide-react";
import { WarpedGod, ArmorSymbol, LoreChronicle } from "../types";
import { foreverFlowersData } from "../data/foreverFlowersData";
import { spokesData, pillarsData, phaseDossiersData } from "../data/spokesAndPillarsData";

interface ShareProgressSectionProps {
  pantheon: WarpedGod[];
  symbols: ArmorSymbol[];
  chronicles: LoreChronicle[];
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const ShareProgressSection: FC<ShareProgressSectionProps> = ({
  pantheon,
  symbols,
  chronicles,
  playSfx,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Generates standalone complete HTML export
  const generateStandaloneHtml = (): string => {
    const exportTimestamp = new Date().toISOString();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Adversity - Canonical Design Lab & Frameworks</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #080808;
      color: #e5e5e5;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-12">
  <div class="max-w-5xl mx-auto space-y-8">
    <header class="border-b border-neutral-800 pb-6">
      <div class="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs mb-2">
        CANONICAL STANDALONE EXPORT • ${exportTimestamp}
      </div>
      <h1 class="text-3xl sm:text-5xl font-cinzel font-black uppercase text-amber-400">
        Adversity Design Lab &amp; Frameworks
      </h1>
      <p class="text-sm text-neutral-400 mt-2 font-sans">
        The Broken RingWheel • 12-Spoke Matrix • 4 Pillars • Deterministic Combat Engine • Forever Flowers
      </p>
    </header>

    <section class="space-y-4">
      <h2 class="text-xl font-cinzel font-bold text-neutral-200 uppercase border-l-2 border-amber-500 pl-3">
        Phase 0 &amp; Phase 1 Roadmap Status
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-neutral-900 border border-emerald-500/30">
          <div class="text-xs font-mono text-emerald-400 font-bold uppercase">PHASE 0: RATIFIED (Q3 2026)</div>
          <p class="text-xs text-neutral-300 mt-1">12-Spoke Wheel, 4 Pillars, Calibrated Exponential XP Formula, 28-Pair Matrix verified.</p>
        </div>
        <div class="p-4 rounded-xl bg-neutral-900 border border-amber-500/30">
          <div class="text-xs font-mono text-amber-400 font-bold uppercase">PHASE 1: ACTIVE SPRINT (Q4 2026)</div>
          <p class="text-xs text-neutral-300 mt-1">Deterministic Turn-Based Combat, Weight Class Triforce + Sunyata Center, Alderreach Crypt Slice.</p>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-cinzel font-bold text-neutral-200 uppercase border-l-2 border-amber-500 pl-3">
        The 7 Forever Flowers (Living Covenants)
      </h2>
      <div class="space-y-3 font-sans text-xs">
        ${foreverFlowersData.map(f => `
          <div class="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
            <span class="font-mono text-amber-400 font-bold">${f.number}: ${f.title}</span>
            <p class="text-neutral-300 mt-1">${f.corePrinciple}</p>
            <div class="text-neutral-400 italic mt-1 font-serif">"${f.goldenQuote}"</div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-cinzel font-bold text-neutral-200 uppercase border-l-2 border-amber-500 pl-3">
        The 4 Immutable Pillars
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        ${pillarsData.map(p => `
          <div class="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
            <span class="font-mono text-amber-400 font-bold">${p.number}: ${p.title}</span>
            <div class="text-neutral-300 font-semibold">${p.subtitle}</div>
            <p class="text-neutral-400 mt-1">${p.immutableGoldenRule}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-cinzel font-bold text-neutral-200 uppercase border-l-2 border-amber-500 pl-3">
        Complete Architecture Manifest (JSON)
      </h2>
      <pre class="p-4 rounded-xl bg-black border border-neutral-800 text-[11px] font-mono text-amber-300 overflow-x-auto max-h-96">
\${JSON.stringify({
  version: "2.5.0-canonical",
  exportedAt: exportTimestamp,
  phase0: "RATIFIED_COMPLETED",
  phase1: "COMBAT_SLICE_OPERATIONAL",
  spokes: spokesData,
  pillars: pillarsData,
  pantheon: pantheon,
  symbols: symbols,
  foreverFlowers: foreverFlowersData,
}, null, 2)}
      </pre>
    </section>

    <footer class="pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500 flex justify-between">
      <span>Adversity Canonical Suite</span>
      <span>Preserve this HTML to restore state anytime</span>
    </footer>
  </div>
</body>
</html>`;
  };

  const handleCopyHtml = () => {
    const html = generateStandaloneHtml();
    navigator.clipboard.writeText(html);
    setCopiedType("html");
    playSfx("scribe");
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleDownloadHtml = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `adversity-canonical-lab-v2-${new Date().toISOString().slice(0, 10)}.html`;
    link.click();
    URL.revokeObjectURL(url);
    playSfx("anvil");
  };

  const handleCopyJson = () => {
    const data = JSON.stringify({
      version: "2.5.0-canonical",
      exportedAt: new Date().toISOString(),
      phase0: phaseDossiersData[0],
      phase1: phaseDossiersData[1],
      pillars: pillarsData,
      spokes: spokesData,
      foreverFlowers: foreverFlowersData,
      pantheon,
      symbols,
      chronicles
    }, null, 2);

    navigator.clipboard.writeText(data);
    setCopiedType("json");
    playSfx("scribe");
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleCopyPromptRestore = () => {
    const prompt = `Adversity Project State Restoration:
- Phase 0: COMPLETED & RATIFIED (12-Spoke Blueprint, 4 Immutable Pillars, Calibrated Exponential XP Formula Level 1-99).
- Phase 1: ACTIVE SPRINT (Deterministic Combat Engine, 0% RNG, 3 AP Economy, Weight Class Triforce + Sunyata Center, Alderreach Crypt Slice).
- 7 Forever Flowers: Enshrined covenants (Anti-hallucination, 0% RNG, Time-Spent, World Literacy, 12-Spoke Closed Loop, Sunyata Glass Cannon, Airsealing).
- Cosmology: Broken RingWheel (4 Cardinal Dominions + Axis Center Soran), 5 Warped Ascendants, Sacred Dual-Form Armor Heraldry.`;

    navigator.clipboard.writeText(prompt);
    setCopiedType("prompt");
    playSfx("scribe");
    setTimeout(() => setCopiedType(null), 3000);
  };

  // When collapsed: renders a subtle, space-conscious trigger
  if (!isOpen) {
    return (
      <div className="flex items-center justify-between pt-2 pb-1">
        <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
          Adversity v2.5 • Canonical Systems Lab
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
            playSfx("click");
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm group ml-auto"
          title="Open export and dev continuity tools"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Share / Export Progress</span>
          <ChevronUp className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
        </button>
      </div>
    );
  }

  // When expanded: renders the full export and dev continuity dashboard with a collapse button
  return (
    <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-7 space-y-5 shadow-2xl transition-all">
      
      {/* Top Section Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400">
            <Share2 className="w-3 h-3" />
            <span>PORTABLE SNAPSHOT &amp; DEV CONTINUITY</span>
          </div>
          <h2 className="text-lg sm:text-xl font-cinzel font-black text-neutral-100 uppercase tracking-wide">
            Share &amp; Export This Progress
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            Export a self-contained standalone HTML bundle to transition smoothly back to your main dev environment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Phase 0 &amp; 1 Canonically Airsealed</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              playSfx("click");
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            title="Collapse export section to save screen space"
          >
            <span>Hide Section</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Copy Full Standalone HTML */}
        <button
          onClick={handleCopyHtml}
          className="p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-left transition-all cursor-pointer flex flex-col justify-between group shadow"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5" />
                <span>Standalone HTML</span>
              </span>
              {copiedType === "html" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </div>
            <p className="text-[11px] text-neutral-300 font-sans">
              Copy complete standalone HTML package to paste into your main dev app.
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 mt-2 font-bold uppercase">
            {copiedType === "html" ? "✓ Copied to Clipboard!" : "Click to Copy HTML"}
          </span>
        </button>

        {/* Download Standalone HTML */}
        <button
          onClick={handleDownloadHtml}
          className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer flex flex-col justify-between group shadow"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download .HTML</span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Download self-contained offline HTML file to open in any browser or engine.
            </p>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2 font-bold uppercase">
            Download File
          </span>
        </button>

        {/* Copy Architecture JSON */}
        <button
          onClick={handleCopyJson}
          className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer flex flex-col justify-between group shadow"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Full JSON State</span>
              </span>
              {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Complete raw JSON manifest containing spokes, pillars, flowers, and lore.
            </p>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2 font-bold uppercase">
            {copiedType === "json" ? "✓ Copied to Clipboard!" : "Click to Copy JSON"}
          </span>
        </button>

        {/* Copy Prompt Restoration Snippet */}
        <button
          onClick={handleCopyPromptRestore}
          className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-left transition-all cursor-pointer flex flex-col justify-between group shadow"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300 font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Prompt Restore</span>
              </span>
              {copiedType === "prompt" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Concise canonical continuity prompt to resume development in any AI session.
            </p>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2 font-bold uppercase">
            {copiedType === "prompt" ? "✓ Copied to Clipboard!" : "Click to Copy Prompt"}
          </span>
        </button>

      </div>

      {/* Status Bar */}
      <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Verified State: 12 Spokes • 4 Pillars • 7 Forever Flowers • Deterministic Combat Core</span>
        </div>
        <div className="text-neutral-500 text-[11px]">
          Target Architecture: OSRS Mastery + Morrowind Exploration + CRPG Deterministic Combat
        </div>
      </div>

    </div>
  );
};
