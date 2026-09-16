import { create } from 'zustand';
import { SpokeId } from '../types';

export type NodeState = "Locked" | "Corrupted" | "Purified" | "Unknown";

interface AppState {
  // UI & Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;

  // Sound Engine
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;

  // Engine State (The Mutable Sandbox)
  spokeStates: Record<SpokeId, NodeState>;
  setSpokeState: (id: SpokeId, state: NodeState) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: "pantheon",
  setActiveTab: (tab) => set({ activeTab: tab }),
  crtEnabled: true,
  setCrtEnabled: (enabled) => set((state) => ({ 
    crtEnabled: typeof enabled === "function" ? enabled(state.crtEnabled) : enabled 
  })),
  soundEnabled: true,
  setSoundEnabled: (enabled) => set((state) => ({ 
    soundEnabled: typeof enabled === "function" ? enabled(state.soundEnabled) : enabled 
  })),

  playSfx: (type) => {
    const { soundEnabled } = get();
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
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "shield") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "scribe") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.linearRampToValueAtTime(1600, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else {
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
  },

  // Engine State
  spokeStates: {
    "spoke-1-bastion": "Corrupted",
    "spoke-2-edge": "Corrupted",
    "spoke-12-stance": "Corrupted",
    "spoke-3-stance": "Corrupted",
    "spoke-3-sorcery": "Corrupted",
    "spoke-4-inscription": "Corrupted",
    "spoke-5-alchemy": "Corrupted",
    "spoke-6-trapping": "Corrupted",
    "spoke-7-wayfinding": "Corrupted",
    "spoke-7-cartography": "Corrupted",
    "spoke-8-forestry": "Corrupted",
    "spoke-9-trapping": "Corrupted",
    "spoke-9-masonry": "Corrupted",
    "spoke-10-quarrying": "Corrupted",
    "spoke-11-smithing": "Corrupted",
    "spoke-12-masonry": "Corrupted",
    "spoke-13-breath": "Corrupted",
    "spoke-14-vessel": "Corrupted",
    "spoke-15-unarmored": "Corrupted",
  },
  setSpokeState: (id, state) => set((s) => ({
    spokeStates: { ...s.spokeStates, [id]: state }
  }))
}));
