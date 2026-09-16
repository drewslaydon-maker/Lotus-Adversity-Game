import { FC, useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  Terminal,
  FlaskConical,
  Flower2,
  Crosshair,
  Lock,
  ScrollText,
  Ghost,
  Trash2,
  Eye,
} from "lucide-react";
import { spokesData } from "../data/spokesAndPillarsData";
import { foreverFlowersData } from "../data/foreverFlowersData";
import { runLabVerification, LabVerification } from "../lab/labChecks";

interface SealedLabViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

type ChamberSegment = "containment" | "verdict" | "gates" | "covenants";

const SEGMENTS: { id: ChamberSegment; label: string; icon: typeof FlaskConical; hint: string }[] = [
  { id: "containment", label: "Lab Containment", icon: FlaskConical, hint: "What was sealed and why" },
  { id: "verdict", label: "Wheel Verdict", icon: Crosshair, hint: "Canonical 15-spoke truth" },
  { id: "gates", label: "Sealing Gates", icon: ShieldAlert, hint: "Run live airseal verification" },
  { id: "covenants", label: "Covenants", icon: Flower2, hint: "The 8 Forever Flowers archive" },
];

const GHOST_ENTRIES = [
  { id: "12-spoke", label: "12-Spoke Geometry", detail: "Replaced by immutable 15-spoke canon in Gate 1." },
  { id: "8-spoke", label: "8-Spoke Matrix", detail: "Stripped from spokesAndPillarsData, loreChroniclesData, and BrokenRingWheelView." },
  { id: "phantom-reads", label: "Phantom Spoke Reads", detail: "Ghost keys (spoke-3-stance, spoke-7-cartography, spoke-9-trapping, spoke-12-masonry) removed from useAppStore." },
  { id: "stale-combat", label: "Stale Combat Lab Views", detail: "FrameworksLabView and EngineSandboxView detached from the Ratification Chamber." },
  { id: "stale-version", label: "Stale Version Strings", detail: "v0.5-combat tag and Airsealed v2.6 badge purged from metadata.json, index.html, and Header." },
  { id: "export-ghost", label: "AI Studio Export Surfaces", detail: "ShareThisProgressSection streamlined; export-project-zip guarded behind git-first protocol." },
];

export const SealedLabView: FC<SealedLabViewProps> = ({ playSfx }) => {
  const [segment, setSegment] = useState<ChamberSegment>("containment");
  const [verification, setVerification] = useState<LabVerification | null>(null);

  const runVerification = () => {
    playSfx("anvil");
    setVerification(runLabVerification());
  };

  const selectSegment = (id: ChamberSegment) => {
    setSegment(id);
    playSfx("click");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Chamber Header */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-7 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
              <Lock className="w-3.5 h-3.5" />
              <span>THE RATIFICATION CHAMBER · SEALED CONTAINMENT</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300">
              v0.5.0-sealed
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
              The Ratification Chamber
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed font-sans mt-1">
              One absolute console for the sealed region of the Apparatus. Inspect what was sealed,
              review the wheel's canonical truth, re-run the airseal gates, and read the ratified covenants.
              No visual "verified" claim is trusted — only passing exit codes.
            </p>
          </div>

          {/* Segment Switch */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SEGMENTS.map((seg) => {
              const Icon = seg.icon;
              const isActive = segment === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => selectSegment(seg.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-500/15 border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.15)]"
                      : "bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-neutral-500"}`} />
                    <span className={`text-xs font-mono font-bold ${isActive ? "text-amber-300" : "text-neutral-300"}`}>
                      {seg.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-sans mt-1.5 leading-snug">{seg.hint}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEGMENT: Containment — What was sealed and why */}
      {segment === "containment" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Ghost className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Sealed Containment Dossier
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Phase 0.5 sealed the lab by purging stale ghosts, enforcing the 15-spoke canon,
              shelving combat, and establishing executable verification gates. Below is every artifact
              that was removed or detached from the active codebase.
            </p>
          </div>

          {/* Ghost Purge Manifest */}
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                Ghost Purge Manifest
              </span>
            </div>
            <div className="space-y-2">
              {GHOST_ENTRIES.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-start gap-3"
                >
                  <Ghost className="w-4 h-4 text-rose-400/70 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-neutral-200">{entry.label}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans mt-1 leading-relaxed">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shelving Rationale */}
          <div className="rounded-2xl bg-neutral-950 border border-amber-500/30 p-5 sm:p-6 space-y-3 shadow-2xl">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Shelving Rationale
              </span>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                Combat engine development is <strong className="text-amber-300">paused</strong> — not abandoned.
                Phase 0.5 sealed the lab first so that no gameplay code could ship on an unstable canon foundation.
                The combat sandbox, engine playground, and frameworks lab remain accessible through the secondary
                "More" drawer for inspection, but they are <strong className="text-amber-300">detached from the Ratification Chamber</strong>.
                They resume when the Architect commands Phase 1.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT: Verdict — Canonical 15-spoke truth */}
      {segment === "verdict" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Canonical Wheel Verdict
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              The 15-spoke geometry enforced by the airseal gates. Every record is canonical,
              fully covered, and carries dual-form lore. No ghost spokes remain.
            </p>
          </div>

          {/* Geometry Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-amber-500/30">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Total Spokes</div>
              <div className="text-lg font-cinzel font-black text-white mt-0.5">15</div>
              <div className="text-[10px] text-neutral-400 font-mono">12 outer + 3 axis</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-emerald-500/30">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Geometry</div>
              <div className="text-lg font-cinzel font-black text-white mt-0.5">Alden North</div>
              <div className="text-[10px] text-neutral-400 font-mono">12, 1, 2 @ North</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Axis Inner</div>
              <div className="text-lg font-cinzel font-black text-amber-400 mt-0.5">13, 14, 15</div>
              <div className="text-[10px] text-neutral-400 font-mono">@ 210/330/90</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Cardinals</div>
              <div className="text-lg font-cinzel font-black text-amber-400 mt-0.5">1, 4, 7, 10</div>
              <div className="text-[10px] text-neutral-400 font-mono">Defining mains</div>
            </div>
          </div>

          {/* Spoke Ledger */}
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Spoke Ledger
              </span>
            </div>
            <div className="space-y-1.5">
              {spokesData.map((spoke) => (
                <div
                  key={spoke.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800/50"
                >
                  <span className="text-[10px] font-mono font-bold text-amber-400 w-6 text-right shrink-0">
                    #{spoke.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: spoke.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-sans font-semibold text-neutral-200 block truncate">{spoke.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{spoke.dominion} · {spoke.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT: Gates — Airseal Verification Console (the unique surface) */}
      {segment === "gates" && (
        <div className="space-y-6">
          {/* Airseal Verification Console */}
          <div className="rounded-2xl bg-black border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-neutral-200 uppercase tracking-wider">
                  Airseal Verification Console
                </span>
              </div>
              <button
                onClick={runVerification}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono transition-all cursor-pointer shadow-md"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Run Airseal Verification</span>
              </button>
            </div>

            <div className="p-4 sm:p-5 font-mono text-xs space-y-3 max-h-[480px] overflow-y-auto">
              <div className="text-neutral-500">
                <span className="text-amber-400">soran@apparatus</span>:~$ bun run lab:verify
              </div>

              {verification ? (
                <>
                  <div className="text-neutral-400">=== LAB AIRSEAL VERIFICATION ===</div>
                  {verification.gates.map((gate) => (
                    <div key={gate.id} className="space-y-1">
                      <div className={gate.pass ? "text-emerald-400" : "text-rose-400"}>
                        {gate.pass ? "PASS" : "FAIL"}  {gate.title}
                      </div>
                      {gate.details.map((detail, i) => (
                        <div key={i} className="text-neutral-500 pl-4">
                          {gate.pass ? "·" : "!"} {detail}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div
                    className={`pt-2 border-t border-neutral-800 font-bold ${
                      verification.overall ? "text-amber-400" : "text-rose-400"
                    }`}
                  >
                    {verification.overall
                      ? "AIRSEALED · All gates green. No milestone may mark Verified without this exit code."
                      : "LAB LEAK · One or more gates failed. Verification cannot be claimed."}
                  </div>
                </>
              ) : (
                <div className="text-neutral-600 leading-relaxed">
                  <span className="text-neutral-400"># Awaiting verification.</span> Press the button above to rerun
                  the exact same checks the CLI gate executes — census, numeric integrity, Alden-North geometry,
                  canonical id registry, and spoke data completeness.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT: Covenants — Compact summary, not the full view */}
      {segment === "covenants" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 space-y-3 shadow-2xl">
            <div className="flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                8 Ratified Covenants
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Forever Flowers are high-prestige, deeply rooted principles — not trivial achievements.
              Each was born from a hard-won design lesson. Flower 08 ("The Self-Proving Gate") was
              ratified with the Lab Seal itself: <em className="text-amber-300">a gate that cannot fail is a prayer.</em>
            </p>
          </div>

          {/* Flower Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {foreverFlowersData.map((flower) => (
              <div
                key={flower.id}
                className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                    {flower.number}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                    {flower.category}
                  </span>
                </div>
                <h3 className="font-cinzel text-sm font-bold text-neutral-100">
                  {flower.title}
                </h3>
                <p className="text-[11px] text-amber-300/70 font-serif italic line-clamp-2">
                  "{flower.subtitle}"
                </p>
              </div>
            ))}
          </div>

          {/* View Full Codex link */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
            <p className="text-xs font-mono text-amber-400">
              Full covenant details — lesson learned, core principle, user/agent practices, and golden quotes —
              are in the <strong>Forever Flowers</strong> tab.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
