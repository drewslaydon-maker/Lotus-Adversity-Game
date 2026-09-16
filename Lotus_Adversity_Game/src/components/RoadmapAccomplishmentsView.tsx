import { FC, useState } from "react";
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Flower2, 
  Shield, 
  Swords, 
  Compass, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { phaseDossiersData } from "../data/spokesAndPillarsData";
import { foreverFlowersData } from "../data/foreverFlowersData";

interface RoadmapAccomplishmentsViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
  onNavigateToTab?: (tab: string) => void;
}

// Map how specific accomplishments directly birthed and feed the Forever Flowers
const ACCOMPLISHMENT_FLOWER_FEEDS = [
  {
    phase: "Phase 0",
    milestone: "12-Spoke Blueprint & Closed Economic Loop",
    status: "RATIFIED",
    fedFlowerNumber: "05",
    flowerTitle: "The 12-Spoke Symbiosis",
    connectionRationale: "Ratified the 12 non-class spokes, ensuring all craft, gathering, and combat are bound in an interdependent loop where no single discipline is an island."
  },
  {
    phase: "Phase 0",
    milestone: "Deterministic Mitigation Pipeline (0% RNG)",
    status: "RATIFIED",
    fedFlowerNumber: "02",
    flowerTitle: "The 0% RNG Covenant",
    connectionRationale: "Codified the net damage formula Net = Max(0, Raw - Flat DR) × Guard Modifier, outlawing arbitrary miss-chances and evasion percentages."
  },
  {
    phase: "Phase 0",
    milestone: "Calibrated Exponential Progression Curve",
    status: "RATIFIED",
    fedFlowerNumber: "03",
    flowerTitle: "The Time-Spent Sanctuary",
    connectionRationale: "Replaced predatory 13M XP grinds with a tight exponential curve (Levels 1-99), preserving prestige and dedication without modern microtransactions."
  },
  {
    phase: "Phase 1",
    milestone: "Sunyata Center & Weight Class Triforce",
    status: "OPERATIONAL",
    fedFlowerNumber: "06",
    flowerTitle: "Sunyata: The Sacred Glass Cannon",
    connectionRationale: "Validated in combat lab: Zero Armor grants +2 AP and 4-tile sprint with 100% unmitigated vulnerability, turning avoidance into pure skillful flow."
  },
  {
    phase: "Phase 1",
    milestone: "Telegraphed Hostile Stances & Reaction Windows",
    status: "OPERATIONAL",
    fedFlowerNumber: "04",
    flowerTitle: "World Literacy Over HUD Clutter",
    connectionRationale: "Enemies broadcast clear telegraphs (Overhand, Cleave, Thrust) so player reactions are informed by world cues rather than floating notification popups."
  },
  {
    phase: "Continuous",
    milestone: "Anti-Hallucination & Airsealed Cadence",
    status: "ENFORCED",
    fedFlowerNumber: "01 & 07",
    flowerTitle: "Truth Over Invention & Airsealing",
    connectionRationale: "Continuous verification gates, zero fabricated filler, and strict state alignment between user intent and agent execution."
  }
];

export const RoadmapAccomplishmentsView: FC<RoadmapAccomplishmentsViewProps> = ({
  playSfx,
  onNavigateToTab,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>("All");
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    "PHASE 0": true,
    "PHASE 1": true,
  });
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const togglePhase = (phaseKey: string) => {
    setExpandedPhases(prev => ({ ...prev, [phaseKey]: !prev[phaseKey] }));
    playSfx("click");
  };

  const filteredDossiers = phaseDossiersData.filter(dossier => {
    if (selectedPhaseFilter === "All") return true;
    if (selectedPhaseFilter === "Completed") return dossier.status === "COMPLETED";
    if (selectedPhaseFilter === "Active") return dossier.status === "ACTIVE SPRINT" || dossier.phase === "PHASE 1";
    return true;
  });

  const handleCopyStatusDossier = () => {
    const text = `=== ADVERSITY ROADMAP & PIPELINE STATUS ===
Phase 0: Infrastructure & Core Design — COMPLETED & RATIFIED (3/3 Deliverables Verified)
Phase 1: Tactical Core & Combat Engine — ACTIVE SPRINT (Combat slice operational in Lab)
Active Forever Flowers: 7 Covenants Ratified
Next Milestone: 3-Player Triad & 75% Tavern Mercenary AI Specification`;
    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    playSfx("scribe");
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-5 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
              <Milestone className="w-3.5 h-3.5" />
              <span>SYSTEM ROADMAP &amp; PIPELINE DOSSIER</span>
            </div>
            
            <button
              onClick={handleCopyStatusDossier}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
            >
              {copiedStatus ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedStatus ? "Status Copied!" : "Copy Status Summary"}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            Roadmap &amp; Accomplishments
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed font-sans">
            Every technical milestone completed in the engine directly reinforces and crystallizes our <strong className="text-amber-300">Forever Flowers</strong>. 
            Track verified achievements, active engineering sprints, and forthcoming world iterations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-emerald-500/30">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 0: Infrastructure</div>
              <div className="text-lg sm:text-xl font-cinzel font-black text-white mt-0.5">3 of 3 (100%)</div>
              <div className="text-[11px] text-neutral-400 font-mono">Ratified &amp; Sealed</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-amber-500/40">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Phase 1: Tactical Core</div>
              <div className="text-lg sm:text-xl font-cinzel font-black text-amber-300 mt-0.5">Active Sprint</div>
              <div className="text-[11px] text-neutral-400 font-mono">Combat Slice in Lab</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Living Covenants</div>
              <div className="text-lg sm:text-xl font-cinzel font-black text-neutral-200 mt-0.5">7 Flowers</div>
              <div className="text-[11px] text-neutral-400 font-mono">Strictly Enforced</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Combat Architecture</div>
              <div className="text-lg sm:text-xl font-cinzel font-black text-neutral-200 mt-0.5">0% RNG</div>
              <div className="text-[11px] text-neutral-400 font-mono">Deterministic Math</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEEDING THE FOREVER FLOWERS: The Core Bridge */}
      <div className="rounded-2xl bg-neutral-900/80 border border-amber-500/30 p-5 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-cinzel font-bold text-neutral-100 uppercase">
                The Living Feedback Loop: Accomplishments Feed the Forever Flowers
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Lessons ratified in code provide the constitutional bedrock for our living development covenants.
              </p>
            </div>
          </div>

          {onNavigateToTab && (
            <button
              onClick={() => {
                onNavigateToTab("forever-flowers");
                playSfx("anvil");
              }}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All 7 Forever Flowers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Milestone to Flower Relationship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ACCOMPLISHMENT_FLOWER_FEEDS.map((feed, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-1.5">
                  <span className="text-neutral-400 font-bold">{feed.phase} Milestone</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    feed.status === "RATIFIED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" :
                    feed.status === "OPERATIONAL" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" :
                    "bg-neutral-800 text-neutral-300 border border-neutral-700"
                  }`}>
                    {feed.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-neutral-200 font-sans">
                  {feed.milestone}
                </div>
                <p className="text-[11px] text-neutral-400 font-sans mt-1.5 leading-relaxed">
                  {feed.connectionRationale}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900 mt-2 flex items-center justify-between text-[11px] font-mono text-amber-400">
                <span className="flex items-center gap-1">
                  <Flower2 className="w-3 h-3 text-amber-400" />
                  <span>Flower {feed.fedFlowerNumber}: {feed.flowerTitle}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE BY PHASE DETAILED DOSSIER */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-cinzel font-bold text-neutral-100 uppercase tracking-wide">
              Engineering Deliverables &amp; Validation Gates
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs font-mono">
            {["All", "Completed", "Active"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedPhaseFilter(filter);
                  playSfx("click");
                }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedPhaseFilter === filter
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {filteredDossiers.map((dossier) => {
            const isExpanded = !!expandedPhases[dossier.phase];
            const isCompleted = dossier.status === "COMPLETED";

            return (
              <div
                key={dossier.phase}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isCompleted 
                    ? "bg-neutral-950/80 border-emerald-500/40" 
                    : "bg-neutral-950/90 border-amber-500/50 shadow-lg shadow-amber-950/20"
                }`}
              >
                {/* Dossier Header */}
                <div 
                  onClick={() => togglePhase(dossier.phase)}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted 
                        ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400" 
                        : "bg-amber-500/10 border border-amber-500/40 text-amber-400"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-neutral-400">
                          {dossier.phase}: {dossier.codename.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isCompleted ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}>
                          {dossier.status} • {dossier.timeframe}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100 mt-0.5">
                        {dossier.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans">
                        {dossier.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono font-bold text-neutral-300">
                        {dossier.deliverablesCompleted} of {dossier.totalDeliverables} complete
                      </div>
                      <div className="w-28 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${isCompleted ? "bg-emerald-400" : "bg-amber-400"}`}
                          style={{ width: `${(dossier.deliverablesCompleted / dossier.totalDeliverables) * 100}%` }}
                        />
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content: Deliverables & Acceptance Criteria */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-neutral-900">
                    
                    {/* Validation Gate */}
                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs font-mono flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-neutral-300">PHASE EXIT VALIDATION GATE: </span>
                        <span className="text-neutral-400 font-sans italic">"{dossier.validationGate}"</span>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                        Engineering Deliverables &amp; Acceptance Criteria:
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {dossier.deliverables.map((del, dIdx) => (
                          <div 
                            key={dIdx}
                            className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 space-y-2"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-bold text-sm text-neutral-200 font-sans flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  del.status === "COMPLETE" ? "bg-emerald-400" : 
                                  del.status === "IN_PROGRESS" ? "bg-amber-400" : "bg-neutral-600"
                                }`} />
                                {del.title}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                del.status === "COMPLETE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" :
                                del.status === "IN_PROGRESS" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" :
                                "bg-neutral-800 text-neutral-400"
                              }`}>
                                {del.status}
                              </span>
                            </div>

                            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                              {del.description}
                            </p>

                            <div className="p-2.5 rounded-lg bg-black/40 border border-neutral-850 text-xs">
                              <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block mb-0.5">
                                Acceptance Criteria:
                              </span>
                              <span className="text-neutral-400 font-sans text-[11px]">
                                {del.acceptanceCriteria}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lab Quick Launch */}
                    {dossier.phase === "PHASE 1" && onNavigateToTab && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            onNavigateToTab("lab");
                            playSfx("anvil");
                          }}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Swords className="w-3.5 h-3.5" />
                          <span>Launch Phase 1 Combat Engine Lab</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
