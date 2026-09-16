import { FC } from "react";
import { BrokenRingWheelView } from "./BrokenRingWheelView";
import { useEngineStore } from "../store/engineStore";
import { initialWarpedPantheon } from "../data/warpedPantheonData";
import { Shield, Sparkles, Lock, ShieldAlert } from "lucide-react";

interface EngineSandboxViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const EngineSandboxView: FC<EngineSandboxViewProps> = ({ playSfx }) => {
  const { spokeStatuses, updateSpokeStatus, phase } = useEngineStore();

  const handleSpokeInteract = (spokeId: number) => {
    playSfx("anvil");
    const currentStatus = spokeStatuses[spokeId];
    
    // Simple state machine for testing the Engine flex behavior
    let nextStatus: 'locked' | 'corrupted' | 'purified' = 'locked';
    if (currentStatus === 'locked') nextStatus = 'corrupted';
    else if (currentStatus === 'corrupted') nextStatus = 'purified';
    else if (currentStatus === 'purified') nextStatus = 'locked';
    else nextStatus = 'locked';

    updateSpokeStatus(spokeId, nextStatus);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-xl">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-500 tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            Interactive Engine Sandbox
          </h2>
          <p className="text-sm font-sans text-neutral-400 mt-1">
            Testing the Decoupled Wheel. Click a spoke to cycle its Engine State: <span className="text-neutral-500">Locked</span> → <span className="text-rose-500">Corrupted</span> → <span className="text-amber-500">Purified</span>.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-400">
          Global Phase: <span className="text-emerald-400 font-bold uppercase">{phase}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <BrokenRingWheelView 
            pantheon={initialWarpedPantheon}
            playSfx={playSfx}
            interactionMode="engine"
            spokeStatuses={spokeStatuses}
            onSpokeInteract={handleSpokeInteract}
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-neutral-200 border-b border-neutral-800 pb-2">
              World State Tracker
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => {
                const status = spokeStatuses[id];
                return (
                  <div key={id} className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800/60">
                    <span className="font-mono text-xs text-neutral-400">Spoke #{id}</span>
                    <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      status === 'purified' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      status === 'corrupted' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      'bg-neutral-800 text-neutral-500'
                    }`}>
                      {status === 'locked' && <Lock className="w-3 h-3 inline mr-1" />}
                      {status === 'purified' && <Sparkles className="w-3 h-3 inline mr-1" />}
                      {status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
