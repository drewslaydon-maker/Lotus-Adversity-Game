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
    milestone: "15-Spoke Blueprint & Closed Economic Loop",
    status: "RATIFIED",
    fedFlowerNumber: "05",
    flowerTitle: "The 15-Spoke Symbiosis",
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
    "PHASE 0.5": true,
    "PHASE 0": false,
    "PHASE 1": true,
  });
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [isFlowersBridgeExpanded, setIsFlowersBridgeExpanded] = useState<boolean>(false);

  const togglePhase = (phaseKey: string) => {
    setExpandedPhases(prev => ({ ...prev, [phaseKey]: !prev[phaseKey] }));
    playSfx("click");
  };

  const filteredDossiers = phaseDossiersData.filter(dossier => {
    if (selectedPhaseFilter === "All") return true;
    if (selectedPhaseFilter === "Completed") return dossier.status === "COMPLETED";
    if (selectedPhaseFilter === "Active") return dossier.status === "ACTIVE SPRINT" || dossier.status === "SEALED";
    if (selectedPhaseFilter === "Paused") return dossier.status.includes("PAUSED");
    return true;
  });

  const handleCopyStatusDossier = () => {
    const text = `=== ADVERSITY ROADMAP & PIPELINE STATUS ===
Phase 0: Infrastructure & Core Design — COMPLETED & RATIFIED (3/3 Deliverables Verified)
Phase 0.5: Lab Sealing & Wheel Verification — SEALED (5/5 Deliverables Verified + Flower 08 Ratified)
Phase 1: Tactical Core & Combat Engine — PAUSED PENDING LAB SEALING
Wheel Matrix: Alden North (12, 1, 2) Verified & Immutable 15-Spoke Geometry Sealed
Active Forever Flowers: 8 Covenants Ratified`;
    navigator.clipboard.writeText(text);
    setCopiedStatus(true);
    playSfx("scribe");
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const activeSprintDossier = phaseDossiersData.find(d => d.status === "ACTIVE SPRINT" || d.status === "SEALED") || phaseDossiersData[1];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-5 sm:p-7 shadow-2xl">
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

          <div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
              Roadmap &amp; Active Verification
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed font-sans mt-1">
              Active engineering gates must pass strict inspection before downstream phases unlock. 
              Combat engine development is paused until <strong className="text-amber-300">Phase 0.5: Lab Sealing</strong> is complete and verified.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-emerald-500/30">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Phase 0: Infrastructure</div>
              <div className="text-base sm:text-lg font-cinzel font-black text-white mt-0.5">3 of 3 (100%)</div>
              <div className="text-[10px] text-neutral-400 font-mono">Ratified &amp; Sealed</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/60 ring-1 ring-amber-500/30">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                Active Sprint (Phase 0.5)
              </div>
              <div className="text-base sm:text-lg font-cinzel font-black text-amber-300 mt-0.5">4 of 5 (80%)</div>
              <div className="text-[10px] text-amber-200/80 font-mono">Lab Sealing &amp; Wheel</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Phase 1: Combat Core</div>
              <div className="text-base sm:text-lg font-cinzel font-black text-neutral-400 mt-0.5">PAUSED</div>
              <div className="text-[10px] text-neutral-500 font-mono">Pending Lab Seal</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Wheel Geometry</div>
              <div className="text-base sm:text-lg font-cinzel font-black text-amber-400 mt-0.5">Alden North</div>
              <div className="text-[10px] text-neutral-400 font-mono">12, 1, 2 Matrix Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT ACTIVE SPRINT FOCUS CARD (First item on scroll) */}
      {activeSprintDossier && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 border-2 border-amber-500/60 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500 text-neutral-950">
                    {activeSprintDossier.status === "SEALED" ? "SEALED CONTAINMENT" : "CURRENT ACTIVE SPRINT"}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300/80">
                    {activeSprintDossier.phase}: {activeSprintDossier.codename}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-cinzel font-black text-neutral-100 uppercase tracking-wide mt-0.5">
                  {activeSprintDossier.title}
                </h2>
              </div>
            </div>

            {onNavigateToTab && (
              <button
                onClick={() => {
                  onNavigateToTab("sealed-lab");
                  playSfx("shield");
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Inspect Wheel in Lab</span>
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            {activeSprintDossier.subtitle}. We do not advance to Phase 1 gameplay features until all sealing gates pass inspection:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {activeSprintDossier.deliverables.map((item, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-xs ${
                  item.status === "COMPLETE"
                    ? "bg-emerald-950/20 border-emerald-500/30 text-neutral-200"
                    : "bg-amber-950/20 border-amber-500/40 text-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold flex items-center gap-1.5">
                    {item.status === "COMPLETE" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" />
                    )}
                    <span>{item.title}</span>
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                    item.status === "COMPLETE" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono flex items-start gap-2 text-neutral-400">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-amber-400 font-bold uppercase">Mandatory Sealing Rule: </span>
              <span>"{activeSprintDossier.validationGate}"</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE BY PHASE DETAILED DOSSIER */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-cinzel font-bold text-neutral-100 uppercase tracking-wide">
              All Engineering Phases &amp; Deliverables
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs font-mono">
            {["All", "Active", "Completed", "Paused"].map((filter) => (
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
            const isActive = dossier.status === "ACTIVE SPRINT" || dossier.status === "SEALED";

            return (
              <div
                key={dossier.phase}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isActive
                    ? "bg-neutral-950/90 border-amber-500/60 ring-1 ring-amber-500/30"
                    : isCompleted 
                    ? "bg-neutral-950/80 border-emerald-500/40" 
                    : "bg-neutral-950/60 border-neutral-800 opacity-90"
                }`}
              >
                {/* Dossier Header */}
                <div 
                  onClick={() => togglePhase(dossier.phase)}
                  className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-amber-500/10 border border-amber-500/50 text-amber-400"
                        : isCompleted 
                        ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400" 
                        : "bg-neutral-900 border border-neutral-800 text-neutral-500"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isActive ? <Clock className="w-5 h-5 animate-pulse" /> : <AlertCircle className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold tracking-wider text-neutral-400">
                          {dossier.phase}: {dossier.codename.toUpperCase()}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isActive
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : isCompleted 
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800" 
                            : "bg-neutral-900 text-neutral-400 border border-neutral-700"
                        }`}>
                          {dossier.status} • {dossier.timeframe}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-neutral-100 mt-0.5">
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
                          className={`h-full ${isCompleted ? "bg-emerald-400" : isActive ? "bg-amber-400" : "bg-neutral-600"}`}
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
                    {dossier.phase === "PHASE 0.5" && onNavigateToTab && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            onNavigateToTab("sealed-lab");
                            playSfx("shield");
                          }}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Inspect 15-Spoke Wheel Geometry</span>
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

      {/* COLLAPSIBLE FOREVER FLOWERS COVENANT BRIDGE (Moved to bottom so it doesn't obstruct roadmap flow) */}
      <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-4 sm:p-5 space-y-3">
        <div 
          onClick={() => {
            setIsFlowersBridgeExpanded(prev => !prev);
            playSfx("click");
          }}
          className="flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Flower2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-cinzel font-bold text-neutral-200 uppercase">
                Living Covenants Bridge: Accomplishments &rarr; Forever Flowers
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans">
                Review how technical breakthroughs directly codified our 8 Forever Flowers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateToTab && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTab("forever-flowers");
                  playSfx("anvil");
                }}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Dedicated Flowers Codex</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isFlowersBridgeExpanded ? "rotate-180" : ""}`} />
          </div>
        </div>

        {isFlowersBridgeExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-neutral-800/80 animate-in fade-in">
            {ACCOMPLISHMENT_FLOWER_FEEDS.map((feed, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-1">
                    <span className="text-neutral-400 font-bold">{feed.phase} Milestone</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {feed.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-neutral-200 font-sans">
                    {feed.milestone}
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans mt-1 leading-relaxed">
                    {feed.connectionRationale}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-900 mt-1 flex items-center justify-between text-[10px] font-mono text-amber-400">
                  <span className="flex items-center gap-1">
                    <Flower2 className="w-3 h-3 text-amber-400" />
                    <span>Flower {feed.fedFlowerNumber}: {feed.flowerTitle}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

