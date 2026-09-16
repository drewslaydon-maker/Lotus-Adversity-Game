import { useState, useEffect, useCallback } from "react";
import { WarpedGod, ArmorSymbol, LoreChronicle } from "./types";
import { initialWarpedPantheon } from "./data/warpedPantheonData";
import { initialArmorSymbols } from "./data/armorSymbolsData";
import { initialLoreChronicles } from "./data/loreChroniclesData";
import { Header } from "./components/Header";
import { WarpedPantheonView } from "./components/WarpedPantheonView";
import { ArmorSymbolsView } from "./components/ArmorSymbolsView";
import { StorytellingCodex } from "./components/StorytellingCodex";
import { FrameworksLabView } from "./components/FrameworksLabView";
import { SpokesMatrixView } from "./components/SpokesMatrixView";
import { PillarsView } from "./components/PillarsView";
import { ForeverFlowersView } from "./components/ForeverFlowersView";
import { RoadmapAccomplishmentsView } from "./components/RoadmapAccomplishmentsView";
import { ShareProgressSection } from "./components/ShareProgressSection";
import { SystemDirectivesDrawer } from "./components/SystemDirectivesDrawer";
import { EngineSandboxView } from "./components/EngineSandboxView";
import { Shield } from "lucide-react";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>("pantheon");
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Persistent Lore & Symbols Data (initialized from canonical cosmology data)
  const [pantheon] = useState<WarpedGod[]>(() => {
    try {
      const saved = localStorage.getItem("adversity_v2_pantheon");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.dominion && parsed[0]?.trueSymbol) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Pantheon cache parse skipped:", e);
    }
    return initialWarpedPantheon;
  });

  const [symbols] = useState<ArmorSymbol[]>(() => {
    try {
      const saved = localStorage.getItem("adversity_v2_symbols");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.trueForm && parsed[0]?.corruptedForm) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Symbols cache parse skipped:", e);
    }
    return initialArmorSymbols;
  });

  const [chronicles] = useState<LoreChronicle[]>(() => {
    try {
      const saved = localStorage.getItem("adversity_v2_chronicles");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Chronicles cache parse skipped:", e);
    }
    return initialLoreChronicles;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("adversity_v2_pantheon", JSON.stringify(pantheon));
    } catch (e) {
      console.warn("localStorage write failed:", e);
    }
  }, [pantheon]);

  useEffect(() => {
    try {
      localStorage.setItem("adversity_v2_symbols", JSON.stringify(symbols));
    } catch (e) {
      console.warn("localStorage write failed:", e);
    }
  }, [symbols]);

  useEffect(() => {
    try {
      localStorage.setItem("adversity_v2_chronicles", JSON.stringify(chronicles));
    } catch (e) {
      console.warn("localStorage write failed:", e);
    }
  }, [chronicles]);

  // Web Audio Synthesizer for thematic dark-fantasy audio feedback
  const playSfx = useCallback((type: "anvil" | "scribe" | "shield" | "click") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "anvil") {
        // Metallic resonant hammer ping
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "shield") {
        // Heavy low-end impact guard
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "scribe") {
        // High quill scratch
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.linearRampToValueAtTime(1600, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else {
        // Subtle interface tap
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled]);

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

        {(activeTab === "lab" || activeTab === "combat") && (
          <FrameworksLabView playSfx={playSfx} />
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
            <span className="text-[11px] font-mono">12-Spoke Matrix</span>
            <span>•</span>
            <span className="text-[11px] font-mono text-amber-400">7 Forever Flowers</span>
          </div>
        </div>
      </footer>

      {/* Developer Rules & AGENTS.md Viewer */}
      <SystemDirectivesDrawer playSfx={playSfx} />
    </div>
  );
}
