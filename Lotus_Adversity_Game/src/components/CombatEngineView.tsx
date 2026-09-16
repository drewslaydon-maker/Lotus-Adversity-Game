import { FC, useState, useEffect } from "react";
import { ArmorWeightClass } from "../types";
import { 
  Swords, 
  Shield, 
  RotateCcw, 
  Zap, 
  Activity, 
  Sparkles,
  AlertTriangle,
  Flame,
  Crosshair,
  Skull,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface EnemyIntent {
  name: string;
  stance: string;
  rawDamage: number;
  postureDamage: number;
  armorPiercing: number; // ignores this much flat armor
  telegraphDescription: string;
  counterHint: string;
}

const ENEMY_INTENTS: EnemyIntent[] = [
  {
    name: "Heavy Overhand",
    stance: "High Executioner Guard",
    rawDamage: 44,
    postureDamage: 55,
    armorPiercing: 0,
    telegraphDescription: "The Grave Knight raises his blackened greatsword high with two hands, preparing a glacial, bone-splitting vertical crush.",
    counterHint: "Counter with Tactical Parry to deflect and shatter his guard, or absorb with Heavy Guard.",
  },
  {
    name: "Sweeping Cleave",
    stance: "Horizontal Arc",
    rawDamage: 30,
    postureDamage: 35,
    armorPiercing: 0,
    telegraphDescription: "The Knight steps into a wide stance, angling the claymore to sweep across the catacomb pillars in an unavoidable arc.",
    counterHint: "Absorb with Bulwark Guard or absorb through Heavy Armor mitigation.",
  },
  {
    name: "Catacomb Thrust",
    stance: "Coiled Point",
    rawDamage: 26,
    postureDamage: 25,
    armorPiercing: 6,
    telegraphDescription: "The Knight lowers his shoulder, thrusting the sword's tempered tip directly toward your armor seams.",
    counterHint: "Parry for devastating counter-posture stagger, or dodge with Sunyata Sprint.",
  },
  {
    name: "Black-Iron Shield Slam",
    stance: "Defensive Fortress",
    rawDamage: 18,
    postureDamage: 45,
    armorPiercing: 0,
    telegraphDescription: "The Knight crashes his spiked tower shield forward while steadying his breath, recovering his own posture.",
    counterHint: "Sunder his guard before he recovers his balance.",
  }
];

interface CombatEngineViewProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const CombatEngineView: FC<CombatEngineViewProps> = ({ playSfx }) => {
  const [weightClass, setWeightClass] = useState<ArmorWeightClass>("Heavy");
  
  // Weight class profiles
  const getWeightProfile = (weight: ArmorWeightClass) => {
    switch (weight) {
      case "Heavy":
        return { ap: 3, flatDr: 16, poiseBuffer: 0.50, moveTiles: 1, label: "Heavy Plate", desc: "+16 Flat DR, 50% Poise Buffer, 3 AP" };
      case "Medium":
        return { ap: 3, flatDr: 10, poiseBuffer: 0.30, moveTiles: 2, label: "Medium Mail", desc: "+10 Flat DR, 30% Poise Buffer, 3 AP" };
      case "Light":
        return { ap: 3, flatDr: 4, poiseBuffer: 0.15, moveTiles: 3, label: "Light Leather", desc: "+4 Flat DR, 15% Poise Buffer, 3 AP" };
      case "Zero":
        return { ap: 5, flatDr: 0, poiseBuffer: 0.0, moveTiles: 4, label: "Zero Armor (Sunyata)", desc: "+2 Bonus AP (5 Total), 4-Tile Sprint, 100% Unmitigated Damage" };
    }
  };

  const currentProfile = getWeightProfile(weightClass);

  // Combat State
  const [round, setRound] = useState<number>(1);
  const [playerHp, setPlayerHp] = useState<number>(120);
  const maxPlayerHp = 120;
  const [playerPosture, setPlayerPosture] = useState<number>(100);
  const maxPlayerPosture = 100;
  const [playerAp, setPlayerAp] = useState<number>(currentProfile.ap);

  // Active round planned stances
  const [isParrying, setIsParrying] = useState<boolean>(false);
  const [isGuarding, setIsGuarding] = useState<boolean>(false);
  const [isDodging, setIsDodging] = useState<boolean>(false);

  // Enemy State: Alderreach Grave Knight
  const [enemyHp, setEnemyHp] = useState<number>(150);
  const maxEnemyHp = 150;
  const [enemyPosture, setEnemyPosture] = useState<number>(110);
  const maxEnemyPosture = 110;
  const [intentIndex, setIntentIndex] = useState<number>(0);
  const currentIntent = ENEMY_INTENTS[intentIndex % ENEMY_INTENTS.length];

  // Logs and Status
  const [combatLogs, setCombatLogs] = useState<string[]>([
    "Alderreach Crypt Vault Unsealed: The Grave Knight awakens, dragging his execution claymore over the cobblestone.",
    `Equipped: ${currentProfile.label} (${currentProfile.desc}). Deterministic 0% RNG mitigation active.`,
    `Round 1 Telegraph: ${currentIntent.name} (${currentIntent.stance}).`
  ]);
  const [combatStatus, setCombatStatus] = useState<"active" | "victory" | "defeat">("active");

  const isEnemyPostureBroken = enemyPosture <= 0;
  const isPlayerPostureBroken = playerPosture <= 0;

  // Reset encounter
  const resetDuel = (chosenWeight: ArmorWeightClass = weightClass) => {
    const prof = getWeightProfile(chosenWeight);
    setWeightClass(chosenWeight);
    setRound(1);
    setPlayerHp(120);
    setPlayerPosture(100);
    setPlayerAp(prof.ap);
    setIsParrying(false);
    setIsGuarding(false);
    setIsDodging(false);
    setEnemyHp(150);
    setEnemyPosture(110);
    setIntentIndex(0);
    setCombatStatus("active");
    setCombatLogs([
      "Alderreach Crypt Vault Unsealed: The Grave Knight awakens, dragging his execution claymore over the cobblestone.",
      `Equipped: ${prof.label} (${prof.desc}). Deterministic 0% RNG mitigation active.`,
      `Round 1 Telegraph: ${ENEMY_INTENTS[0].name} (${ENEMY_INTENTS[0].stance}).`
    ]);
    playSfx("anvil");
  };

  // Switch weight class
  const handleWeightSelect = (w: ArmorWeightClass) => {
    resetDuel(w);
  };

  // Player action: Disciplined Strike (1 AP)
  const handleStrike = () => {
    if (playerAp < 1 || combatStatus !== "active") return;
    playSfx("shield");
    setPlayerAp((prev) => prev - 1);

    const dmg = isEnemyPostureBroken ? 40 : 24;
    const postDmg = 25;
    const newEnemyHp = Math.max(0, enemyHp - dmg);
    const newEnemyPosture = Math.max(0, enemyPosture - postDmg);

    setEnemyHp(newEnemyHp);
    setEnemyPosture(newEnemyPosture);

    const logEntry = isEnemyPostureBroken
      ? `• Disciplined Strike connects for ${dmg} unmitigated damage on broken posture!`
      : `• Disciplined Strike connects for ${dmg} slashing damage (-${postDmg} enemy posture).`;

    setCombatLogs((prev) => [...prev, logEntry]);

    if (newEnemyHp <= 0) {
      handleVictory();
    }
  };

  // Player action: Heavy Sunder (2 AP)
  const handleSunder = () => {
    if (playerAp < 2 || combatStatus !== "active") return;
    playSfx("anvil");
    setPlayerAp((prev) => prev - 2);

    const dmg = isEnemyPostureBroken ? 65 : 38;
    const postDmg = 55;
    const newEnemyHp = Math.max(0, enemyHp - dmg);
    const newEnemyPosture = Math.max(0, enemyPosture - postDmg);

    setEnemyHp(newEnemyHp);
    setEnemyPosture(newEnemyPosture);

    const logEntry = isEnemyPostureBroken
      ? `• Heavy Sunder crushes broken guard for ${dmg} devastating damage!`
      : `• Heavy Sunder smashes into armor for ${dmg} damage! (-${postDmg} enemy posture).`;

    setCombatLogs((prev) => [...prev, logEntry]);

    if (newEnemyPosture <= 0 && enemyPosture > 0) {
      setCombatLogs((prev) => [...prev, "⚔️ POSTURE SHATTERED! The Grave Knight is staggered! Execution Cleave unlocked!"]);
    }

    if (newEnemyHp <= 0) {
      handleVictory();
    }
  };

  // Player action: Tactical Parry (1 AP)
  const handleParry = () => {
    if (playerAp < 1 || combatStatus !== "active" || isParrying) return;
    playSfx("shield");
    setPlayerAp((prev) => prev - 1);
    setIsParrying(true);
    setCombatLogs((prev) => [...prev, "• Tactical Parry Stance readied: Anticipating enemy strike angle."]);
  };

  // Player action: Bulwark Guard (1 AP)
  const handleGuard = () => {
    if (playerAp < 1 || combatStatus !== "active" || isGuarding) return;
    playSfx("shield");
    setPlayerAp((prev) => prev - 1);
    setIsGuarding(true);
    setPlayerPosture((prev) => Math.min(maxPlayerPosture, prev + 30));
    setCombatLogs((prev) => [...prev, "• Bulwark Guard activated: +30 Posture recovered, incoming damage mitigated by 70%."]);
  };

  // Player action: Sunyata Sprint (1 AP - Zero Armor only)
  const handleSprint = () => {
    if (playerAp < 1 || combatStatus !== "active" || weightClass !== "Zero" || isDodging) return;
    playSfx("click");
    setPlayerAp((prev) => prev - 1);
    setIsDodging(true);
    setCombatLogs((prev) => [...prev, "• Sunyata Sprint: Zero-weight displacement! Dodging out of claymore reach."]);
  };

  // Player action: Execution Cleave (2 AP - only when posture broken)
  const handleExecution = () => {
    if (playerAp < 2 || combatStatus !== "active" || !isEnemyPostureBroken) return;
    playSfx("anvil");
    setPlayerAp((prev) => prev - 2);

    const dmg = 80;
    const newEnemyHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(newEnemyHp);

    setCombatLogs((prev) => [
      ...prev,
      `⚡ EXECUTION CLEAVE! You drive through the shattered guard for ${dmg} fatal damage!`
    ]);

    if (newEnemyHp <= 0) {
      handleVictory();
    }
  };

  const handleVictory = () => {
    setCombatStatus("victory");
    setCombatLogs((prev) => [
      ...prev,
      "🏆 VICTORY: The Alderreach Grave Knight crumbles into ancient iron mail and soot! 0% RNG deterministic mastery proven."
    ]);
    playSfx("anvil");
  };

  // Commit Cadence / Resolve Round
  const resolveRound = () => {
    if (combatStatus !== "active") return;
    playSfx("shield");

    let nextLogs: string[] = [];
    let nextPlayerHp = playerHp;
    let nextPlayerPosture = playerPosture;
    let nextEnemyPosture = enemyPosture;

    // Check if enemy was staggered or defeated
    if (enemyHp <= 0) {
      return;
    }

    nextLogs.push(`--- RESOLUTION CADENCE (Round ${round}) ---`);

    // Enemy action resolves deterministically
    if (isEnemyPostureBroken) {
      nextLogs.push(`>> The Grave Knight is recovering from Posture Break and cannot complete his ${currentIntent.name}.`);
      // Regain partial posture
      nextEnemyPosture = 50;
      nextLogs.push(`>> Grave Knight resets footing: Posture restored to ${nextEnemyPosture}.`);
    } else if (isDodging) {
      nextLogs.push(`>> ${currentIntent.name} cleaves through empty air! Your Sunyata Sprint completely evaded the blow.`);
    } else if (isParrying) {
      if (currentIntent.name === "Heavy Overhand" || currentIntent.name === "Catacomb Thrust") {
        nextLogs.push(`>> PERFECT PARRY! You catch the Grave Knight's ${currentIntent.name} on your cross-guard!`);
        nextEnemyPosture = Math.max(0, nextEnemyPosture - 45);
        nextLogs.push(`>> Deflection recoil shatters enemy poise: -45 Enemy Posture!`);
        if (nextEnemyPosture <= 0) {
          nextLogs.push("⚔️ ENEMY POSTURE SHATTERED BY PARRY!");
        }
      } else {
        // Partial deflection
        const raw = currentIntent.rawDamage;
        const mitigated = Math.max(4, Math.round(raw * 0.4) - currentProfile.flatDr);
        nextPlayerHp = Math.max(0, nextPlayerHp - mitigated);
        nextPlayerPosture = Math.max(0, nextPlayerPosture - 15);
        nextLogs.push(`>> Partial Parry against ${currentIntent.name}: Absorbed ${mitigated} net damage (-15 posture).`);
      }
    } else {
      // Standard incoming hit with deterministic armor mitigation
      const effectiveFlatDr = Math.max(0, currentProfile.flatDr - currentIntent.armorPiercing);
      let incomingDmg = Math.max(0, currentIntent.rawDamage - effectiveFlatDr);
      let incomingPosture = currentIntent.postureDamage;

      if (isGuarding) {
        incomingDmg = Math.round(incomingDmg * 0.30);
        incomingPosture = Math.round(incomingPosture * 0.40);
        nextLogs.push(`>> Bulwark Guard absorbs impact! ${currentIntent.name} mitigated by 70%.`);
      }

      // Poise buffer reduces posture loss for heavy armor
      incomingPosture = Math.round(incomingPosture * (1 - currentProfile.poiseBuffer));

      nextPlayerHp = Math.max(0, nextPlayerHp - incomingDmg);
      nextPlayerPosture = Math.max(0, nextPlayerPosture - incomingPosture);

      nextLogs.push(
        `>> Grave Knight executes ${currentIntent.name}: Raw ${currentIntent.rawDamage} - Flat DR ${effectiveFlatDr} = ${incomingDmg} net dmg taken (-${incomingPosture} posture).`
      );
    }

    // Check player defeat
    if (nextPlayerHp <= 0) {
      nextLogs.push("💀 DEFEAT: Your armor collapsed under the Grave Knight's relentless blows.");
      setPlayerHp(0);
      setCombatStatus("defeat");
      setCombatLogs((prev) => [...prev, ...nextLogs]);
      return;
    }

    // Reset for next round
    const nextRound = round + 1;
    const nextIntentIdx = (intentIndex + 1) % ENEMY_INTENTS.length;
    const nextIntent = ENEMY_INTENTS[nextIntentIdx];

    setPlayerHp(nextPlayerHp);
    setPlayerPosture(nextPlayerPosture);
    setEnemyPosture(nextEnemyPosture);
    setPlayerAp(currentProfile.ap);
    setIsParrying(false);
    setIsGuarding(false);
    setIsDodging(false);
    setRound(nextRound);
    setIntentIndex(nextIntentIdx);

    nextLogs.push(`Round ${nextRound} Begun: ${currentProfile.ap} AP refreshed.`);
    nextLogs.push(`Round ${nextRound} Telegraph: ${nextIntent.name} (${nextIntent.stance}).`);
    setCombatLogs((prev) => [...prev, ...nextLogs]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>PHASE 1 SPRINT • PLAYABLE TACTICAL COMBAT ENGINE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-neutral-100 uppercase">
            Alderreach Crypt Slice: Deterministic Combat
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            Adversity's combat runs on <strong>100% deterministic mitigation (0% RNG, zero random misses)</strong>, 
            a strict <strong>3 Action Point economy</strong>, telegraphed enemy stances, and the 
            <strong> Weight Class Triforce + Zero Armor Center</strong>. Decisive, hand-crafted skirmishes 
            resolved in 30 seconds of pure tactical discipline.
          </p>
        </div>
      </div>

      {/* Weight Class Triforce Selector */}
      <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
            Weight Class Triforce + Sunyata Center:
          </span>
          <button
            onClick={() => resetDuel()}
            className="px-3 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono flex items-center gap-1.5 border border-neutral-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Encounter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(["Heavy", "Medium", "Light", "Zero"] as const).map((w) => {
            const prof = getWeightProfile(w);
            const isSelected = weightClass === w;
            return (
              <button
                key={w}
                onClick={() => handleWeightSelect(w)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-950/20 border-amber-500/80 ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold text-neutral-100">
                      {prof.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {prof.ap} AP
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 font-sans">
                    {prof.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Duel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Arena: Duelists & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Enemy Card: Alderreach Grave Knight */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-rose-900/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Skull className="w-4 h-4 text-rose-500" />
                  <span className="font-cinzel text-base font-bold text-neutral-100">
                    Alderreach Grave Knight
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Crypt Warden • Blackened Mail &amp; Claymore
                </span>
              </div>

              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                isEnemyPostureBroken 
                  ? "bg-rose-500 text-neutral-950 animate-pulse font-black" 
                  : "bg-neutral-900 text-amber-400 border border-neutral-800"
              }`}>
                {isEnemyPostureBroken ? "POSTURE SHATTERED!" : "Poise Solid"}
              </span>
            </div>

            {/* Telegraphed Enemy Intent Banner */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                  <span>Telegraphed Stance: {currentIntent.name}</span>
                </span>
                <span className="text-[10px] font-mono text-rose-300/80">
                  {currentIntent.rawDamage} Raw Dmg • {currentIntent.postureDamage} Posture Dmg
                </span>
              </div>
              <p className="text-xs text-neutral-200 font-sans italic">
                "{currentIntent.telegraphDescription}"
              </p>
              <div className="text-[11px] font-mono text-amber-400/90 pt-1 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-400" />
                <span>Tactical Hint: {currentIntent.counterHint}</span>
              </div>
            </div>

            {/* Vitality & Posture Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">Vitality (HP)</span>
                  <span className="text-neutral-200 font-bold">{enemyHp} / {maxEnemyHp}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-700 to-rose-500 transition-all duration-300"
                    style={{ width: `${(enemyHp / maxEnemyHp) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400">Guard Posture</span>
                  <span className="text-amber-300 font-bold">{enemyPosture} / {maxEnemyPosture}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isEnemyPostureBroken ? "bg-red-500 animate-pulse" : "bg-amber-500"
                    }`}
                    style={{ width: `${(enemyPosture / maxEnemyPosture) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Player Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-amber-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="font-cinzel text-base font-bold text-neutral-100">
                    Vanguard Wayfarer
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-400/90">
                  Equipped: {currentProfile.label} (Flat DR: -{currentProfile.flatDr})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300">
                  {playerAp} / {currentProfile.ap} AP Available
                </span>
              </div>
            </div>

            {/* Vitality & Posture Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">Vitality (HP)</span>
                  <span className="text-neutral-200 font-bold">{playerHp} / {maxPlayerHp}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
                    style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400">Player Posture</span>
                  <span className="text-amber-300 font-bold">{playerPosture} / {maxPlayerPosture}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${(playerPosture / maxPlayerPosture) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Stance Indicators for Current Round */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span className="text-neutral-500">Planned Round Stance:</span>
              {isParrying && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/50">
                  Tactical Parry Active
                </span>
              )}
              {isGuarding && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                  Bulwark Guard Active
                </span>
              )}
              {isDodging && (
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/50">
                  Sunyata Sprint Active
                </span>
              )}
              {!isParrying && !isGuarding && !isDodging && (
                <span className="text-neutral-400 italic">None (Offensive Cadence)</span>
              )}
            </div>
          </div>

          {/* Action Command Bar */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block">
              Combat Actions (Spend Action Points):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Disciplined Strike */}
              <button
                onClick={handleStrike}
                disabled={playerAp < 1 || combatStatus !== "active"}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 disabled:opacity-40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-300">
                  <span className="font-bold">Strike</span>
                  <span className="font-bold text-amber-400">1 AP</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                  24 dmg • 25 posture
                </p>
              </button>

              {/* Heavy Sunder */}
              <button
                onClick={handleSunder}
                disabled={playerAp < 2 || combatStatus !== "active"}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 disabled:opacity-40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-300">
                  <span className="font-bold">Heavy Sunder</span>
                  <span className="font-bold text-amber-400">2 AP</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                  38 dmg • 55 posture shatter
                </p>
              </button>

              {/* Tactical Parry */}
              <button
                onClick={handleParry}
                disabled={playerAp < 1 || combatStatus !== "active" || isParrying}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 disabled:opacity-40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-300">
                  <span className="font-bold">Tactical Parry</span>
                  <span className="font-bold text-amber-400">1 AP</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                  Deflects &amp; deals 45 counter posture
                </p>
              </button>

              {/* Bulwark Guard */}
              <button
                onClick={handleGuard}
                disabled={playerAp < 1 || combatStatus !== "active" || isGuarding}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 disabled:opacity-40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-amber-300">
                  <span className="font-bold">Bulwark Guard</span>
                  <span className="font-bold text-amber-400">1 AP</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                  -70% dmg • +30 posture recovery
                </p>
              </button>

              {/* Execution Cleave (unlocked only on broken posture) */}
              <button
                onClick={handleExecution}
                disabled={playerAp < 2 || combatStatus !== "active" || !isEnemyPostureBroken}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isEnemyPostureBroken && playerAp >= 2
                    ? "bg-rose-950/40 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse"
                    : "bg-neutral-900/40 border-neutral-800 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-rose-400 font-bold">
                  <span>Execution Cleave</span>
                  <span>2 AP</span>
                </div>
                <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                  80 fatal unmitigated damage
                </p>
              </button>

              {/* Sunyata Sprint (Zero Armor only) */}
              {weightClass === "Zero" ? (
                <button
                  onClick={handleSprint}
                  disabled={playerAp < 1 || combatStatus !== "active" || isDodging}
                  className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 disabled:opacity-40 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                    <span className="font-bold">Sunyata Sprint</span>
                    <span>1 AP</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 mt-1 font-sans">
                    Dodge 100% melee reach
                  </p>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-900 flex flex-col justify-center text-neutral-600 text-xs font-mono">
                  <span>Sunyata Sprint locked</span>
                  <span className="text-[10px] text-neutral-700">(Zero Armor Only)</span>
                </div>
              )}
            </div>

            {/* Commit Cadence Button */}
            <div className="pt-2">
              <button
                onClick={resolveRound}
                disabled={combatStatus !== "active"}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-cinzel font-black text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-950/40 cursor-pointer disabled:opacity-40"
              >
                Commit Cadence • Resolve Round {round}
              </button>
            </div>
          </div>

        </div>

        {/* Right Arena: Deterministic Combat Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Deterministic Combat Terminal</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                0% RNG • Round {round}
              </span>
            </div>

            {/* Combat Log Stream */}
            <div className="h-80 overflow-y-auto space-y-2 text-xs font-mono text-neutral-300 scrollbar-thin pr-1">
              {combatLogs.map((log, idx) => {
                const isVic = log.includes("VICTORY");
                const isDef = log.includes("DEFEAT");
                const isEnemyAction = log.startsWith(">>");
                const isBreak = log.includes("POSTURE SHATTERED") || log.includes("EXECUTION CLEAVE");
                const isRoundHead = log.includes("RESOLUTION CADENCE") || log.includes("Round");

                return (
                  <div
                    key={idx}
                    className={`p-2 rounded leading-relaxed ${
                      isVic
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800 font-bold"
                        : isDef
                        ? "bg-rose-950/60 text-rose-300 border border-rose-800 font-bold"
                        : isBreak
                        ? "bg-amber-950/60 text-amber-300 border border-amber-800 font-bold"
                        : isEnemyAction
                        ? "bg-rose-950/20 text-rose-300 border border-rose-900/30"
                        : isRoundHead
                        ? "bg-neutral-900/80 text-amber-400 font-semibold"
                        : "bg-neutral-900/40 text-neutral-300"
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Encounter Status Banner */}
            {combatStatus !== "active" && (
              <div className="pt-2">
                <button
                  onClick={() => resetDuel()}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Fight Again (New Skirmish)
                </button>
              </div>
            )}
          </div>

          {/* Mathematical Proof Box */}
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2 text-xs font-mono">
            <span className="text-amber-400 font-bold uppercase tracking-wider block">
              Deterministic Mitigation Formula:
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Net Damage = Max(0, Raw Incoming - Flat Armor DR) × (Guard Modifier)
            </p>
            <div className="pt-1 text-[10px] text-neutral-400 space-y-1">
              <div>• Heavy Plate: Flat DR 16, 50% Poise Buffer</div>
              <div>• Medium Mail: Flat DR 10, 30% Poise Buffer</div>
              <div>• Light Leather: Flat DR 4, 15% Poise Buffer</div>
              <div>• Zero Armor: Flat DR 0, +2 AP, 100% Unmitigated Peril</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
