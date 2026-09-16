import { create } from 'zustand';

export type GamePhase = 'codex' | 'engine' | 'combat' | 'exploration';
export type SpokeStatus = 'unknown' | 'locked' | 'corrupted' | 'purified';

interface PlayerState {
  health: number;
  maxHealth: number;
  armorClass: number;
  resonance: number; // Mana/Stamina equivalent
}

interface EngineState {
  // Phase Management
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;

  // World State (The Apparatus / Wheel)
  spokeStatuses: Record<number, SpokeStatus>;
  updateSpokeStatus: (spokeId: number, status: SpokeStatus) => void;

  // Player State
  playerState: PlayerState;
  updatePlayerState: (updates: Partial<PlayerState>) => void;
}

export const useEngineStore = create<EngineState>((set) => ({
  phase: 'codex',
  setPhase: (phase) => set({ phase }),

  // Default world state: the wheel is corrupted and locked down initially
  spokeStatuses: {
    1: 'corrupted',
    2: 'locked',
    3: 'locked',
    4: 'locked',
    5: 'locked',
    6: 'locked',
    7: 'locked',
    8: 'locked',
    9: 'locked',
    10: 'locked',
    11: 'locked',
    12: 'locked',
    13: 'locked',
    14: 'locked',
    15: 'locked',
  },
  
  updateSpokeStatus: (spokeId, status) => set((state) => ({
    spokeStatuses: {
      ...state.spokeStatuses,
      [spokeId]: status
    }
  })),

  playerState: {
    health: 100,
    maxHealth: 100,
    armorClass: 10,
    resonance: 50,
  },
  
  updatePlayerState: (updates) => set((state) => ({
    playerState: { ...state.playerState, ...updates }
  })),
}));
