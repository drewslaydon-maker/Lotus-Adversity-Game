# System Architecture & Visual Design Standards

These rules dictate the structural and visual constraints for "The Apparatus" (The Broken RingWheel / Warped Pantheon application). Agents MUST adhere to these rules strictly to avoid disjointed designs or violating the user's established UX.

## 0. Git is the Absolute Truth Holder
- **No AI Studio Share/Export:** Do NOT rely on AI Studio's native Share or Export features for versioning.
- **Direct GitHub Syncing:** All meaningful progression, codebase changes, and lore milestones MUST be pushed to the established GitHub repository. The repository is the sole "Truth Holder" to prevent AI agent fragmentation and hallucinated codebase divergence.
- **The Active Roadmap:** Agents MUST consult and update `ROADMAP.md` with current focus, completed milestones, and future work. This is the main orbiting truth of development focus. Do not force the user to reiterate future plans if they are already logged there. The **root** `ROADMAP.md` is the single canonical copy — never create a nested duplicate inside the app.

## 1. Single-Context Focus & Modality
- **No Side-by-Side Deep Inspection Columns:** Never split the screen to show a diagram (like the Wheel) on one side and a massive detailed dossier on the other side (or stacked vertically on mobile, which forces the user to scroll down blindly).
- **In-Place Absolute Overlays (The Big Tooltips):** When a user interacts with a deeply detailed node (such as a Spoke or a Dominion God), the resulting detailed dossier MUST render as an absolute positioned, backdrop-blurred overlay floating directly *on top* of the interactive component (i.e. inside a relative container). This keeps the user's focus exactly where they clicked.

## 2. Structural Canon: The 15-Spoke Matrix
- **Immutable Node Count:** The Wheel of Adversity ALWAYS consists of exactly **15 Spokes** and **1 Center Hub** (Soran). Agents are strictly forbidden from resizing, modifying, or shrinking the wheel down to a generic 12-spoke design or generating non-canonical outer rings.

## 3. Esoteric & "Dark" Visual Identity
- **Color Palette:** The UI relies on a rich, esoteric "dark mode" palette (`neutral-950` backgrounds, `amber-500` accents for True/Uncorrupted states, `rose-500` and `emerald-500` for Corrupted states).
- **Typography:**
  - `font-cinzel` (or serif equivalents) MUST be used for titles, ascendant names, and prominent headers to retain the occult/esoteric grimoire aesthetic.
  - `font-mono` MUST be used for metadata, weights, numbers, and mechanical systemic tags (e.g., "Spoke #4", "Iron Dominion").
  - Use tracking (letter-spacing) on uppercase labels (`uppercase tracking-widest`) for an elevated, ancient feel.
- **Glassmorphism & Orbs:** Overlays and dossiers should use `backdrop-blur-sm`, `bg-neutral-900/80`, and subtle blurred radial orbs (`blur-3xl rounded-full opacity-20`) in the corners mapped to the element's dominion/accent color.

## 4. Interaction & Sound Design
- The application relies heavily on tactile feedback. Every interaction must trigger the `useAppStore().playSfx` hook appropriately (`click`, `shield`, `anvil`, or `scribe`) to give the UI a physical, mechanical weight.

## 5. Forever Flowers Protocol
- **What they are:** Forever Flowers are high-prestige, deeply rooted principles and covenants between the Architect and AI Agents. They are not trivial achievements.
- **Agent Rules for Creation:** An AI Agent is strictly forbidden from creating a new Forever Flower via casual generation. A new Flower must ONLY be created when a major, canonical design lesson has been hard-won or a profound systemic vulnerability has been sealed. They must have a strict Category (`Design Doctrine`, `Engineering Practice`, `Agent-User Protocol`, `Cosmological Law`) and follow the exact type schema without string-matching hacks.

## 6. Anti-Slop (No Generic AI UI)
- No purple-to-blue gradients.
- No generic SaaS cards.
- Always use high-fidelity, meticulously spaced containers that look like a dark fantasy codex, not a B2B dashboard.

---

# Developer Reference

## Dev Commands

All commands run from the app directory (`Lotus_Adversity_Game/`).

| Command | What it does |
|---------|-------------|
| `bun install` | Install dependencies (bun.lock present; npm also works) |
| `bun run dev` | Start dev server — `tsx server.ts` on port 3000 (Express + Vite middleware) |
| `bun run build` | Production build — `vite build` + esbuild server bundle → `dist/` |
| `bun run start` | Run production — `node dist/server.cjs` |
| `bun run lint` | Type-check only — `tsc --noEmit` (no ESLint or Prettier configured) |
| `bun run lab:verify` | Run the executable Canon gates — `tsx verify-lab.ts` reads `src/lab/labChecks.ts` and exits non-zero on any failure. A milestone may only be marked *Verified* with this green + a green `lint`. |
| `bun run clean` | Remove `dist/` and `server.js` |

**No test suite exists.** There is no test runner, no test files, and no test script.

## Project Layout

```
Lotus-Adversity-Game/          ← Git repo root
├── Lotus_Adversity_Game/      ← App lives here (nested, not at root)
│   ├── server.ts              ← Express backend (Gemini API proxy, git sync, zip export)
│   ├── src/
│   │   ├── App.tsx            ← Root component, tab-based routing
│   │   ├── main.tsx           ← React entrypoint
│   │   ├── index.css          ← Tailwind v4 import + custom font utilities + CRT overlay
│   │   ├── types.ts           ← All shared TypeScript interfaces
│   │   ├── store/
│   │   │   ├── useAppStore.ts ← UI state, sound, spoke node states (primary store)
│   │   │   └── engineStore.ts ← Game phase, player state, world spoke statuses
│   │   ├── data/              ← Immutable canonical lore data files
│   │   │   ├── warpedPantheonData.ts
│   │   │   ├── armorSymbolsData.ts
│   │   │   ├── spokesAndPillarsData.ts  ← Spokes, Pillars, XP milestones, Phase dossiers
│   │   │   ├── loreChroniclesData.ts
│   │   │   └── foreverFlowersData.ts
│   │   ├── lab/
│   │   │   └── labChecks.ts    ← SINGLE canonical wheel matrices + executable airseal gates
│   │   └── components/        ← 17 view components (incl. SealedLabView chamber)
│   ├── index.html             ← Vite HTML entrypoint
│   ├── vite.config.ts         ← Vite + React + Tailwind v4 + path aliases
│   ├── tsconfig.json          ← TypeScript config (ES2022, JSX, path aliases)
│   └── verify-lab.ts          ← CLI airseal gate (`bun run lab:verify`)
├── ROADMAP.md                 ← THE active sprint tracker at repo root — READ THIS FIRST
├── AGENTS.md                  ← This file
└── repo_temp/                 ← Stale secondary copy — ignore entirely
```

## Key Technical Constraints

- **Tailwind CSS v4** is loaded via `@tailwindcss/vite` plugin, NOT PostCSS. Config lives in `vite.config.ts`.
- **Path alias** `@/*` maps to the app root (`Lotus_Adversity_Game/`). Use `@/components/...` not relative `../components/...`.
- **`DISABLE_HMR=true`** env var disables HMR + file watching. Used in AI Studio environments to prevent flickering during agent edits.
- **Two Zustand stores exist:**
  - `useAppStore` — UI navigation, CRT toggle, sound engine, spoke node states. This is the primary store.
  - `engineStore` — Game phase, player HP/posture, world spoke statuses. Used by EngineSandbox and combat views.
- **`BrokenRingWheelView.tsx`** is the largest component (~1234 lines). It handles SVG generation, drag-to-spin, touch events, and in-place dossier overlays. Its wheel geometry and `statusIdMap` are imported from `src/lab/labChecks.ts` — NEVER inline a parallel matrix, or the airseal gates will drift from the rendered truth.
- **`SealedLabView.tsx`** (route `sealed-lab`) is the Ratification Chamber: Lab Containment, Wheel Verdict, Sealing Gates (re-runs `labChecks` in-browser), and Covenants. It replaced the standalone Combat Lab; `lab`/`combat` routes reroute into it.
- **Verification protocol:** after any code change, run `bun run lint` then `bun run lab:verify`. Both green is the only currency for a *Verified* milestone (see FLOWER 08).
- **Custom fonts** are loaded via Google Fonts in `index.html` and exposed as `font-cinzel`, `font-medieval`, `font-pixel` utilities in `index.css`.
- **Gemini API key** is loaded from `.env` via `dotenv`. The server falls back to procedural generators if no key is present — never assume Gemini is available.
- **SFX system** uses Web Audio API oscillators (no audio files). Four sound types: `anvil`, `shield`, `scribe`, `click`.

## Lore Quick Reference

- **5 Dominions:** Iron (Alden), Ether (Caelen), Frontier (Mera), Earth (Bram), Axis (Soran)
- **Spoke Layout:** 4 quadrants × 3 spokes + 1 inner axis (3 spokes) + 1 center hub = 15 spokes (Alden at True North, clockwise)
  - Iron (North): Spokes 12, 1, 2 @ 330°, 0°, 30° — Alden consumes Bastion, Edge, Stance
  - Ether (East): Spokes 3, 4, 5 @ 60°, 90°, 120° — Caelen consumes Sorcery, Inscription, Alchemy
  - Frontier (South): Spokes 6, 7, 8 @ 150°, 180°, 210° — Mera consumes Trapping, Wayfinding, Forestry
  - Earth (West): Spokes 9, 10, 11 @ 240°, 270°, 300° — Bram consumes Masonry, Quarrying, Smithing
  - Axis (Center): Spokes 13, 14, 15 @ 210°, 330°, 90° — Soran consumes Breath, Vessel, Unarmored Stance
  - Cardinal defining mains: 1 (North), 4 (East), 7 (South), 10 (West)
- **Every symbol has two forms:** True/Healthy (`amber-500`) and Corrupted Imperial (`rose-500`/`emerald-500`). Never render only one.
- **Never assume gameplay/combat is active** — Phase 0.5 was sealed and ratified (Flower 08). Phase 1 (combat) remains paused until the Architect commands its resumption.
- **Consult `ROADMAP.md`** (repo root) before starting any work. It tracks the current sprint state and blocked features.
