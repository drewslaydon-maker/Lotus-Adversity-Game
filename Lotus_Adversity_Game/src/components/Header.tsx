import { FC, useState } from "react";
import { 
  Flame, 
  Shield, 
  BookOpen, 
  Compass, 
  Volume2, 
  VolumeX, 
  Tv, 
  Layers, 
  Swords, 
  Cpu,
  Flower2,
  Milestone,
  Menu,
  X,
  ChevronDown,
  Check,
  Database
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { GitHubTruthHolderModal } from "./GitHubTruthHolderModal";

interface HeaderProps {
  // Legacy props kept for compatibility, we use Zustand internally now.
  activeTab: string;
  setActiveTab: (tab: string) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
  apiHealth: any;
}

interface NavGroup {
  category: string;
  items: {
    id: string;
    label: string;
    icon: typeof Flame;
    badge?: string;
  }[];
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  crtEnabled,
  setCrtEnabled,
  soundEnabled,
  setSoundEnabled,
  playSfx,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gitModalOpen, setGitModalOpen] = useState(false);

  const navGroups: NavGroup[] = [
    {
      category: "Engine Playground",
      items: [
        { id: "engine-sandbox", label: "Wheel Engine", icon: Cpu, badge: "Interactive" },
      ]
    },
    {
      category: "Cosmology",
      items: [
        { id: "pantheon", label: "Broken RingWheel", icon: Flame, badge: "Cosmology" },
        { id: "armor-symbols", label: "Armor Symbols", icon: Shield, badge: "Dual Forms" },
      ]
    },
    {
      category: "Systems",
      items: [
        { id: "pillars", label: "The 4 Pillars", icon: Layers, badge: "Pillars I-IV" },
        { id: "spokes", label: "15-Spoke Matrix", icon: Compass, badge: "Symbiosis" },
      ]
    },
    {
      category: "Lore & Lab",
      items: [
        { id: "codex", label: "Story Codex", icon: BookOpen, badge: "Oral Lore" },
        { id: "lab", label: "Combat Engine Lab", icon: Cpu, badge: "Phase 1" },
      ]
    },
    {
      category: "Pipeline & Governance",
      items: [
        { id: "roadmap", label: "Roadmap & Pipeline", icon: Milestone, badge: "Status" },
        { id: "forever-flowers", label: "Forever Flowers", icon: Flower2, badge: "7 Covenants" },
      ]
    }
  ];

  // Flat list to look up the active tab's label
  const allItems = navGroups.flatMap(g => g.items);
  const currentItem = allItems.find(i => i.id === activeTab || (i.id === "lab" && activeTab === "combat")) || allItems[0];
  const CurrentIcon = currentItem.icon;

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    playSfx("click");
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-xl">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Branding & Control Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div 
              onClick={() => handleSelectTab("pantheon")}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-600 via-neutral-900 to-black border border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-950/40 cursor-pointer group hover:border-amber-400 transition-all shrink-0"
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-cinzel text-base sm:text-2xl font-bold tracking-wider text-neutral-100 uppercase">
                  Adversity
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold uppercase">
                  Lab &amp; Frameworks
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 hidden sm:block">
                Canonical OSRS, Morrowind &amp; CRPG Systems Studio
              </p>
            </div>
          </div>

          {/* Quick Status / Environmental Toggles / Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Desktop Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">Architecture</span>
              <span className="text-[10px] text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60 font-bold">
                Airsealed v2.6
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSfx("anvil");
              }}
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-amber-950/40 border-amber-600/50 text-amber-300"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
              title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline text-[11px] font-mono">SFX</span>
            </button>

            {/* CRT Overlay Toggle */}
            <button
              onClick={() => {
                setCrtEnabled(prev => !prev);
                playSfx("click");
              }}
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                crtEnabled
                  ? "bg-amber-950/40 border-amber-600/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
              title="Toggle retro CRT scanline effect"
            >
              <Tv className="w-4 h-4" />
              <span className="hidden md:inline text-[11px] font-mono">CRT</span>
            </button>

            {/* GitHub Truth Holder 1-Click Sync & Mac Integration */}
            <button
              onClick={() => {
                setGitModalOpen(true);
                playSfx("anvil");
              }}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-amber-950/30"
              title="Push directly to GitHub Truth Holder & Sync with Mac"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-[11px]">Git Sync</span>
            </button>

            {/* Mobile All-Views Dropdown Trigger Button (Visible only on mobile/tablet < md) */}
            <button
              onClick={() => {
                setMobileMenuOpen(prev => !prev);
                playSfx("click");
              }}
              className={`md:hidden px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mobileMenuOpen
                  ? "bg-amber-500 text-neutral-950 border-amber-400"
                  : "bg-neutral-900 border-neutral-800 text-amber-300 hover:bg-neutral-850"
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="text-[11px]">Views</span>
            </button>
          </div>
        </div>

        {/* MOBILE PRIMARY 4-ACTION BAR (Eliminates horizontal scrolling / jumping on mobile) */}
        <div className="md:hidden border-t border-neutral-900 py-1.5">
          <div className="grid grid-cols-4 gap-1 w-full">
            <button
              onClick={() => handleSelectTab("pantheon")}
              className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeTab === "pantheon"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                  : "text-neutral-400 hover:text-neutral-200 bg-neutral-900/40 border border-neutral-900/60"
              }`}
            >
              <Flame className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight font-mono">RingWheel</span>
            </button>

            <button
              onClick={() => handleSelectTab("lab")}
              className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeTab === "lab" || activeTab === "combat"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                  : "text-neutral-400 hover:text-neutral-200 bg-neutral-900/40 border border-neutral-900/60"
              }`}
            >
              <Cpu className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight font-mono">Combat Lab</span>
            </button>

            <button
              onClick={() => handleSelectTab("roadmap")}
              className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                  : "text-neutral-400 hover:text-neutral-200 bg-neutral-900/40 border border-neutral-900/60"
              }`}
            >
              <Milestone className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight font-mono">Roadmap</span>
            </button>

            <button
              onClick={() => handleSelectTab("forever-flowers")}
              className={`py-2 px-1 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeTab === "forever-flowers"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                  : "text-neutral-400 hover:text-neutral-200 bg-neutral-900/40 border border-neutral-900/60"
              }`}
            >
              <Flower2 className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] leading-tight font-mono">Flowers</span>
            </button>
          </div>
        </div>

        {/* MOBILE POP-DOWN ALL-VIEWS DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-800 py-3 space-y-4 bg-neutral-950/98 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between px-1 text-xs font-mono text-neutral-400">
              <span>All Design &amp; Architecture Modules:</span>
              <span className="text-amber-400 font-bold">Touch to Switch</span>
            </div>

            <div className="space-y-3">
              {navGroups.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80 font-bold px-1">
                    {group.category}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id || (tab.id === "lab" && activeTab === "combat");
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleSelectTab(tab.id)}
                          className={`min-h-[46px] p-2.5 rounded-xl text-left flex items-center justify-between border transition-all cursor-pointer ${
                            isActive
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold"
                              : "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-850"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-neutral-400"}`} />
                            <span className="text-xs leading-tight">{tab.label}</span>
                          </div>
                          {isActive && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP CATEGORIZED NAVIGATION (Clean, tactile codex keys) */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-neutral-900/90 text-xs">
          <div className="flex items-center flex-wrap gap-2 lg:gap-3 w-full">
            {navGroups.map((group, gIdx) => (
              <div key={group.category} className="flex items-center gap-1.5">
                {gIdx > 0 && <div className="h-6 w-px bg-neutral-800 mx-1 shrink-0" />}
                <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 shadow-inner">
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id || (tab.id === "lab" && activeTab === "combat");
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleSelectTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm border ${
                          isActive
                            ? "bg-neutral-800 text-amber-300 border-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] font-bold"
                            : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border-transparent shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-neutral-500"}`} />
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                            isActive ? "bg-amber-900/40 text-amber-200 border border-amber-500/30" : "bg-neutral-950 text-neutral-600 border border-neutral-800"
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

      </div>

      {/* GitHub Truth Holder Modal */}
      <GitHubTruthHolderModal 
        isOpen={gitModalOpen} 
        onClose={() => setGitModalOpen(false)} 
      />
    </header>
  );
};
