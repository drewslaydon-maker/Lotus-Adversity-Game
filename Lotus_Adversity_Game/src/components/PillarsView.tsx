import { FC, useState } from "react";
import { pillarsData, phaseDossiersData, xpMilestonesData } from "../data/spokesAndPillarsData";
import { Pillar, PhaseDossier } from "../types";
import { Layers, ShieldCheck, CheckCircle2, Award, Clock, Compass, Swords, Compass as CompassIcon, Milestone, Target, Check, ChevronRight } from "lucide-react";

export const PillarsView: FC = () => {
  const [activeSection, setActiveSection] = useState<"pillars" | "roadmap" | "progression">("pillars");
  const [selectedPillarId, setSelectedPillarId] = useState<string>(pillarsData[0].id);

  const selectedPillar = pillarsData.find((p) => p.id === selectedPillarId) || pillarsData[0];

  return (
    <div className="space-y-8">
      {/* Doctrine Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>FOUNDATIONAL DOCTRINE • ARCHITECTURAL SPECIFICATION</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            The 4 Immutable Pillars of Adversity
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-3xl">
            The non-negotiable architectural anchors. Every combat calculation, economy loop, and 
            zone encounter is held accountable to these four tenets.
          </p>

          {/* Subview Selector */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => setActiveSection("pillars")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === "pillars"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>The 4 Pillars Doctrine</span>
            </button>

            <button
              onClick={() => setActiveSection("roadmap")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === "roadmap"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
              }`}
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Actionable Roadmap (Phase 0 &amp; 1)</span>
            </button>

            <button
              onClick={() => setActiveSection("progression")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === "progression"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
              }`}
            >
              <Milestone className="w-4 h-4 text-amber-400" />
              <span>Time-Spent Progression Formula</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: THE 4 PILLARS DOCTRINE */}
      {activeSection === "pillars" && (
        <div className="space-y-8">
          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillarsData.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-neutral-900 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/50"
                      : "bg-neutral-950 hover:bg-neutral-900/60 border-neutral-800"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black text-amber-400 uppercase tracking-widest">
                        {pillar.number}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {pillar.designOrigin.split("&")[0].trim()}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-neutral-100">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs text-amber-300/80 font-serif italic mt-3 line-clamp-2">
                    "{pillar.subtitle}"
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Pillar Deep Dive Panel */}
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-10 space-y-8 shadow-2xl">
            {/* Header / Sub-origin */}
            <div className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  DESIGN ORIGIN: {selectedPillar.designOrigin.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {selectedPillar.number} ARCHITECTURAL RATIFICATION
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-cinzel font-black text-neutral-100">
                {selectedPillar.title}
              </h2>
              <p className="text-sm sm:text-base font-serif italic text-amber-300/90">
                {selectedPillar.subtitle}
              </p>
            </div>

            {/* Core Rule & Reference Point */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-neutral-900/80 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400 block">
                  CORE RULE:
                </span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                  {selectedPillar.coreRule}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-400 block">
                  DEVELOPMENT REFERENCE POINT:
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {selectedPillar.developmentReferencePoint}
                </p>
              </div>
            </div>

            {/* Immutable Golden Rule */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-amber-950/20 via-neutral-900/50 to-neutral-950 border border-amber-500/40 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                IMMUTABLE GOLDEN RULE:
              </span>
              <blockquote className="font-serif italic text-base sm:text-lg text-neutral-100 border-l-2 border-amber-500 pl-4 py-1">
                "{selectedPillar.immutableGoldenRule}"
              </blockquote>
            </div>

            {/* Concrete Gameplay Expressions */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Concrete Gameplay Expressions:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedPillar.concreteGameplayExpressions.map((expr, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2">
                    <h5 className="font-cinzel text-sm font-bold text-neutral-100 flex items-center gap-2">
                      <span className="text-amber-500 font-mono text-xs">0{idx + 1}.</span>
                      <span>{expr.title}</span>
                    </h5>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {expr.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Codebase & Design Compliance Checklist */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Codebase &amp; Design Compliance Checklist (Engineering Guardrails):</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                  Enforced
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedPillar.codebaseComplianceChecklist.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-200 font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ACTIONABLE ROADMAP (PHASE 0 & PHASE 1 DOSSIERS) */}
      {activeSection === "roadmap" && (
        <div className="space-y-8">
          {phaseDossiersData.map((dossier) => {
            const isComplete = dossier.status === "COMPLETED" || dossier.status === "SEALED";
            return (
              <div
                key={dossier.phase}
                className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-6 shadow-2xl"
              >
                {/* Dossier Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        {dossier.phase} DOSSIER
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {dossier.timeframe}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                          isComplete
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse"
                        }`}
                      >
                        {dossier.status}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-neutral-100">
                      {dossier.title}
                    </h2>
                    <p className="text-sm font-serif italic text-amber-300">
                      {dossier.subtitle}
                    </p>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs text-neutral-400 block">Deliverables Progress</span>
                    <span className="text-lg font-bold text-neutral-100">
                      {dossier.deliverablesCompleted} of {dossier.totalDeliverables} Complete
                    </span>
                  </div>
                </div>

                {/* Validation Gate */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                    PHASE EXIT VALIDATION GATE:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-200 font-serif italic">
                    "{dossier.validationGate}"
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block">
                    ENGINEERING DELIVERABLES &amp; ACCEPTANCE CRITERIA:
                  </span>

                  <div className="space-y-3">
                    {dossier.deliverables.map((del, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-cinzel text-sm sm:text-base font-bold text-neutral-100 flex items-center gap-2">
                            {del.status === "COMPLETE" ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : del.status === "IN_PROGRESS" ? (
                              <Clock className="w-4 h-4 text-amber-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-neutral-600" />
                            )}
                            <span>{del.title}</span>
                          </h4>

                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              del.status === "COMPLETE"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : del.status === "IN_PROGRESS"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                            }`}
                          >
                            {del.status}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-300 font-sans">
                          {del.description}
                        </p>

                        <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            ACCEPTANCE CRITERIA:
                          </span>
                          <p className="text-xs text-neutral-300 font-mono">
                            {del.acceptanceCriteria}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 3: TIME-SPENT PROGRESSION FORMULA */}
      {activeSection === "progression" && (
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="space-y-3 border-b border-neutral-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
              <Milestone className="w-3.5 h-3.5 text-amber-400" />
              <span>PILLAR 01 SPECIFICATION • EXPONENTIAL CURVE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-neutral-100">
              Time-Spent Progression Formula (Levels 1–99)
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans max-w-3xl">
              Monotonic exponential curve calibrated for deliberate, rewarding progress across all 15 spokes. 
              Designed without artificial multi-million XP bloat, prioritizing distinct milestone mastery tiers 
              at Levels 25, 50, 75, and 99.
            </p>
          </div>

          {/* Milestone Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Mastery Tier</th>
                  <th className="py-3 px-4">Total XP Required</th>
                  <th className="py-3 px-4">XP To Next Milestone</th>
                  <th className="py-3 px-4">Milestone Unlocks &amp; Field Utility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {xpMilestonesData.map((mile) => {
                  const isCap = mile.level === 99;
                  const isMajorTier = [25, 50, 75, 99].includes(mile.level);
                  return (
                    <tr 
                      key={mile.level}
                      className={isCap ? "bg-amber-950/20 font-semibold" : isMajorTier ? "bg-neutral-900/30" : ""}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        Lvl {mile.level}
                      </td>
                      <td className="py-3.5 px-4 font-cinzel font-bold text-neutral-100">
                        {mile.tierName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-200">
                        {mile.totalXp.toLocaleString()} XP
                      </td>
                      <td className="py-3.5 px-4 font-mono text-neutral-400">
                        {mile.xpToNext > 0 ? `+${mile.xpToNext.toLocaleString()} XP` : "MAX"}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 leading-relaxed">
                        {mile.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Progression Ethos Banner */}
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              1:1 DIRECT CORRELATION GUARANTEE:
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              No daily login streak bonuses. Zero cash-shop boosters or pay-to-accelerate tokens. 
              Progression reflects uninterrupted player labor, trial mastery, and craft dedication.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
