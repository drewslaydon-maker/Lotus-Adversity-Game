import { useState, useEffect, useCallback } from "react";
import { WarpedGod, ArmorSymbol, LoreChronicle } from "./types";
import { initialWarpedPantheon } from "./data/warpedPantheonData";
import { initialArmorSymbols } from "./data/armorSymbolsData";
import { initialLoreChronicles } from "./data/loreChroniclesData";
import { useAppStore } from "./store/useAppStore";
import { Header } from "./components/Header";
import { WarpedPantheonView } from "./components/WarpedPantheonView";
import { ArmorSymbolsView } from "./components/ArmorSymbolsView";
import { StorytellingCodex } from "./components/StorytellingCodex";
import { SpokesMatrixView } from "./components/SpokesMatrixView";
import { PillarsView } from "./components/PillarsView";
import { ForeverFlowersView } from "./components/ForeverFlowersView";
import { RoadmapAccomplishmentsView } from "./components/RoadmapAccomplishmentsView";
import { ShareProgressSection } from "./components/ShareProgressSection";
import { SystemDirectivesDrawer } from "./components/SystemDirectivesDrawer";
import { EngineSandboxView } from "./components/EngineSandboxView";
import { SealedLabView } from "./components/SealedLabView";
import { Shield } from "lucide-react";

export default function App() {
  // Global Store
  const { activeTab, setActiveTab, crtEnabled, setCrtEnabled, soundEnabled, setSoundEnabled, playSfx } = useAppStore();

  // Persistent Lore & Symbols Data (Immutable Canonical Sources)
  const pantheon = initialWarpedPantheon;
  const symbols = initialArmorSymbols;
  const chronicles = initialLoreChronicles;

  return (
    <div className={`min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 ${crtEnabled ? "crt-overlay" : ""}`}>
      
      {/* Top Atmospheric Header with Subgrouped Categories */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playSfx={playSfx}
        apiHealth={{ hasKey: true, status: "connected", model: "gemini-3.8-flash" }}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
        {activeTab === "pantheon" && (
          <WarpedPantheonView
            pantheon={pantheon}
            playSfx={playSfx}
            onNavigateToArmorSymbols={() => setActiveTab("armor-symbols")}
          />
        )}

        {activeTab === "armor-symbols" && (
          <ArmorSymbolsView
            symbols={symbols}
            playSfx={playSfx}
          />
        )}

        {activeTab === "codex" && (
          <StorytellingCodex
            chronicles={chronicles}
            playSfx={playSfx}
          />
        )}

        {activeTab === "spokes" && (
          <SpokesMatrixView playSfx={playSfx} />
        )}

        {activeTab === "pillars" && (
          <PillarsView />
        )}

        {(activeTab === "sealed-lab" || activeTab === "lab" || activeTab === "combat") && (
          <SealedLabView playSfx={playSfx} />
        )}

        {activeTab === "forever-flowers" && (
          <ForeverFlowersView playSfx={playSfx} />
        )}

        {activeTab === "roadmap" && (
          <RoadmapAccomplishmentsView 
            playSfx={playSfx} 
            onNavigateToTab={setActiveTab} 
          />
        )}

        {activeTab === "engine-sandbox" && (
          <EngineSandboxView playSfx={playSfx} />
        )}

        {/* Global "Share This Progress" (Hidden/Collapsible on demand to preserve screen space) */}
        <section className="pt-2">
          <ShareProgressSection
            pantheon={pantheon}
            symbols={symbols}
            chronicles={chronicles}
            playSfx={playSfx}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-800/80 bg-neutral-950/80 backdrop-blur-sm py-6 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="font-cinzel font-bold text-neutral-200 tracking-wider">
              Adversity
            </span>
            <span>•</span>
            <span>Design Lab &amp; Canonical Frameworks</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-[11px] font-mono">Pillars I–IV</span>
            <span>•</span>
            <span className="text-[11px] font-mono">15-Spoke Matrix</span>
            <span>•</span>
            <span className="text-[11px] font-mono text-amber-400">8 Forever Flowers</span>
          </div>
        </div>
      </footer>

      {/* Developer Rules & AGENTS.md Viewer */}
      <SystemDirectivesDrawer playSfx={playSfx} />
    </div>
  );
}
