import { FC, useState } from "react";
import { 
  Copy, 
  Check, 
  Download, 
  Share2, 
  FileCode, 
  Database, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  ChevronUp, 
  ChevronDown,
  GitBranch,
  FolderDown,
  Laptop
} from "lucide-react";
import { WarpedGod, ArmorSymbol, LoreChronicle } from "../types";
import { foreverFlowersData } from "../data/foreverFlowersData";
import { spokesData, pillarsData, phaseDossiersData } from "../data/spokesAndPillarsData";
import { GitHubTruthHolderModal } from "./GitHubTruthHolderModal";

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
  const [gitModalOpen, setGitModalOpen] = useState<boolean>(false);

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
        The Broken RingWheel • 15-Spoke Matrix • 4 Pillars • Deterministic Combat Engine • Forever Flowers
      </p>
    </header>

    <section class="space-y-4">
      <h2 class="text-xl font-cinzel font-bold text-neutral-200 uppercase border-l-2 border-amber-500 pl-3">
        Phase Roadmap Status
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl bg-neutral-900 border border-emerald-500/30">
          <div class="text-[10px] font-mono text-emerald-400 font-bold uppercase">PHASE 0: RATIFIED (Q3 2026)</div>
          <p class="text-[10px] text-neutral-300 mt-1">15-Spoke Wheel, 4 Pillars, Calibrated Exponential XP Formula, 28-Pair Matrix verified.</p>
        </div>
        <div class="p-4 rounded-xl bg-neutral-900 border border-amber-500/50">
          <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">PHASE 0.5: LAB SEALING (ACTIVE SPRINT)</div>
          <p class="text-[10px] text-neutral-300 mt-1">Alden North Matrix (12, 1, 2) Sealed, Drag Event Decoupled, 15-Spoke Loop Verified.</p>
        </div>
        <div class="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <div class="text-[10px] font-mono text-neutral-400 font-bold uppercase">PHASE 1: TACTICAL CORE (PAUSED)</div>
          <p class="text-[10px] text-neutral-300 mt-1">Combat slice frozen in working order pending final Lab inspection sign-off.</p>
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
          title="Open Git sync tools"
        >
          <Database className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Sync to Truth Holder (Git)</span>
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
            <FileCode className="w-3 h-3" />
            <span>DEV CONTINUITY</span>
          </div>
          <h2 className="text-lg sm:text-xl font-cinzel font-black text-neutral-100 uppercase tracking-wide">
            Push to Git (Truth Holder)
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            AI Studio's native export is disabled to prevent fragmentation. Push all milestones directly to the GitHub repository.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 0.5 Active Sprint • Phase 1 Paused</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              playSfx("click");
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            title="Collapse section"
          >
            <span>Hide Section</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Git Truth Holder Hero Sync (Option 1 & Option 2) */}
      <div className="space-y-3">
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border border-amber-500/50 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-neutral-100 uppercase tracking-wide">
                  GitHub Truth Holder (In-App Push &amp; Mac Sync)
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Push directly to your GitHub repository with a single click. Sync automatically to your Mac via GitHub Desktop with zero terminal commands.
              </p>
            </div>

            <button
              onClick={() => {
                setGitModalOpen(true);
                playSfx("anvil");
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-950/40 shrink-0"
            >
              <GitBranch className="w-4 h-4" />
              <span>Open 1-Click Push Modal</span>
            </button>
          </div>
        </div>

        {/* Mac Quick Actions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1-Click Project ZIP Download */}
          <a
            href="/api/export-project-zip"
            onClick={() => playSfx("scribe")}
            className="p-3.5 rounded-xl border border-amber-500/30 bg-neutral-900/80 hover:bg-neutral-850 hover:border-amber-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <FolderDown className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Download Source ZIP</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-sans mt-0.5">Instant complete project archive for Mac</div>
            </div>
            <Download className="w-4 h-4 text-amber-400" />
          </a>

          {/* Standalone HTML Copy */}
          <button
            onClick={handleCopyHtml}
            className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-neutral-700 text-left transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono font-bold text-neutral-200">Copy Standalone HTML</div>
              <div className="text-[10px] text-neutral-400 font-sans mt-0.5">Self-contained browser backup</div>
            </div>
            {copiedType === "html" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Standalone HTML Download */}
          <button
            onClick={handleDownloadHtml}
            className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-neutral-700 text-left transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-mono font-bold text-neutral-200">Download Single HTML</div>
              <div className="text-[10px] text-neutral-400 font-sans mt-0.5">Save standalone lab file to disk</div>
            </div>
            <Download className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Fallback CLI Command Box (For Reference) */}
        <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span>ALTERNATIVE: MANUAL TERMINAL SYNC (OPTIONAL)</span>
            </div>
            <button
              onClick={() => {
                const cmd = `git add . && git commit -m "feat(phase-0.5): Alden North wheel matrix & roadmap flow verified" && git push origin main`;
                navigator.clipboard.writeText(cmd);
                setCopiedType("cmd");
                playSfx("scribe");
                setTimeout(() => setCopiedType(null), 3000);
              }}
              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer"
            >
              {copiedType === "cmd" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedType === "cmd" ? "Copied" : "Copy Command"}</span>
            </button>
          </div>

          <div className="p-2 rounded bg-black/60 border border-neutral-850 font-mono text-[11px] text-neutral-400 overflow-x-auto select-all">
            <code>git add . && git commit -m "feat(phase-0.5): Alden North wheel matrix &amp; roadmap flow verified" && git push origin main</code>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Verified State: Alden North Matrix • 15 Spokes + 1 Hub • Phase 0.5 Active • Combat Paused</span>
        </div>
        <div className="text-neutral-500 text-[11px]">
          Target Architecture: OSRS Mastery + Morrowind Exploration + CRPG Deterministic Combat
        </div>
      </div>

      {/* GitHub Truth Holder Modal */}
      <GitHubTruthHolderModal 
        isOpen={gitModalOpen} 
        onClose={() => setGitModalOpen(false)} 
      />

    </div>
  );
};
