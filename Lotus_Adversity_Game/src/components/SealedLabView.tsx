import { FC, useState } from "react";
import {
  Cpu,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Terminal,
  FlaskConical,
  Flower2,
  Crosshair,
  Lock,
  ScrollText,
} from "lucide-react";
import { FrameworksLabView } from "./FrameworksLabView";
import { EngineSandboxView } from "./EngineSandboxView";
import { ForeverFlowersView } from "./ForeverFlowersView";
import { phaseDossiersData } from "../data/spokesAndPillarsData";
import { runLabVerification, LabVerification } from "../lab/labChecks";

interface SealedLabViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

type ChamberSegment = "containment" | "verdict" | "gates" | "covenants";

const SEGMENTS: { id: ChamberSegment; label: string; icon: typeof Cpu; hint: string }[] = [
  { id: "containment", label: "Lab Containment", icon: FlaskConical, hint: "Frameworks, math specs & the shelved duel" },
  { id: "verdict", label: "Wheel Verdict", icon: Crosshair, hint: "Interactive corruption ↔ purity sandbox" },
  { id: "gates", label: "Sealing Gates", icon: ShieldAlert, hint: "Run live Airseal verification" },
  { id: "covenants", label: "Covenants", icon: Flower2, hint: "The 8 Forever Flowers archive" },
];

const STATUS_CHIP: Record<string, string> = {
  "COMPLETED": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "SEALED": "bg-amber-500/10 text-amber-400 border-amber-500/40",
  "PAUSED": "bg-rose-500/10 text-rose-400 border-rose-500/30",
  "ACTIVE SPRINT": "bg-amber-500/10 text-amber-400 border-amber-500/40",
};

export const SealedLabView: FC<SealedLabViewProps> = ({ playSfx }) => {
  const [segment, setSegment] = useState<ChamberSegment>("containment");
  const [verification, setVerification] = useState<LabVerification | null>(null);

  const phase05 = phaseDossiersData.find((d) => d.phase === "PHASE 0.5");

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
              One absolute console for the sealed region of the Apparatus. Inspect the wheel's live verdict,
              re-run the airseal gates on demand, revisit the containment protocol, and read the ratified covenants.
              No visual "verified" claim is trusted — only passing exit codes.
            </p>
          </div>

          {/* Legislative Segment Switch */}
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

      {/* Segment Content */}
      {segment === "containment" && (
        <FrameworksLabView playSfx={playSfx} />
      )}

      {segment === "verdict" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
            <Crosshair className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Interactive Wheel Verdict
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                This live sandbox renders the wheel from the exact canonical matrix enforced by the airseal gates —
                flip spokes between Locked, Corrupted, and Purified to watch True (<span className="text-amber-400 font-semibold">amber-500</span>)
                versus Corrupted (<span className="text-rose-400 font-semibold">rose</span>/<span className="text-emerald-400 font-semibold">emerald</span>) states.
              </p>
            </div>
          </div>
          <EngineSandboxView playSfx={playSfx} />
        </div>
      )}

      {segment === "gates" && (
        <div className="space-y-6">
          {/* Sprint Ledger */}
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Sprint Ledger
              </span>
            </div>
            <div className="space-y-3">
              {phaseDossiersData.map((dossier) => (
                <div
                  key={dossier.phase}
                  className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-neutral-100">{dossier.phase}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                        STATUS_CHIP[dossier.status] ?? "bg-neutral-800 text-neutral-300 border-neutral-700"
                      }`}>
                        {dossier.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans mt-1">{dossier.title}</p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                    {dossier.deliverablesCompleted}/{dossier.totalDeliverables} deliverables · {dossier.timeframe}
                  </span>
                </div>
              ))}
            </div>

            {phase05 && (
              <div className="pt-2 border-t border-neutral-800">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-bold mb-2">
                  Phase 0.5 Sealing Deliverables
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase05.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs ${
                        item.status === "COMPLETE"
                          ? "bg-emerald-950/20 border-emerald-500/30"
                          : "bg-amber-950/20 border-amber-500/40"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {item.status === "COMPLETE" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-neutral-100 font-semibold font-sans leading-snug">{item.title}</p>
                          <p className="text-neutral-400 mt-1 font-sans leading-snug">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

      {segment === "covenants" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
            <Flower2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Forever Flowers Archive — 8 Ratified Covenants
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                Forever Flowers are high-prestige, deeply rooted principles. Flower 08 was ratified with the Lab
                Seal: a gate that cannot fail is a prayer.
              </p>
            </div>
          </div>
          <ForeverFlowersView playSfx={playSfx} />
        </div>
      )}
    </div>
  );
};