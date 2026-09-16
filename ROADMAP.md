# The Apparatus: Development Roadmap

This document serves as the "Orbiting Truth" of development for The Broken RingWheel / Warped Pantheon application. It tracks past achievements, current focus, and future technical or design milestones. **It lives at the repository root** — the app never reads it; humans and agents do.

**Agent Directive:** Read this document to understand the project's current context. Update this document upon completing major milestones, or when the user introduces new long-term ideas that should spur future development. Only mark a milestone *Verified* when an exit code proves it (`bun run lint`, `bun run lab:verify`).

---

## 🟢 What We've Worked On (Completed Milestones)

- **Engine State Centralization:** Migrated state management from fragmented prop-drilling in `App.tsx` to a global Zustand store (`useAppStore.ts`).
- **Data Hydration Lockdown:** Eliminated volatile local storage caching for Pantheon lore, Symbols, and Chronicles. Immutable lore now hydrates purely from static data files.
- **Architectural Rules (AGENTS.md):** Formalized the Git "Truth Holder" workflow, 15-Spoke geometric law, and the strict Forever Flowers creation protocol.
- **Wheel Physics & Touch Controls:** Applied CSS `touch-action: none` to the Broken RingWheel SVG, resolving mobile browser scroll issues during dragging.
- **Desktop Nav Parity:** Upgraded the mobile ribbon menu into tactile, codex-like buttons for desktop viewing, without sacrificing the mobile experience.
- **Dev Continuity Re-routing:** Replaced the legacy AI Studio "Export HTML" functions with explicit "Sync to Truth Holder (Git)" terminal command copy systems to enforce repository synchronization.
- **Alden North Matrix Canonical Geometry:** Re-anchored Alden at True North with spoke #1 as the defining center, flanked by #12 (Diplomat/Poise) and #2 (Warrior/Edge), propagating clockwise to Caelen (3,4,5), Mera (6,7,8), Bram (9,10,11), and Soran Axis (13,14,15).
- **SVG Interaction Event Decoupling:** Added `onPointerDown` with `e.stopPropagation()` to all spokes, spikes, and central hub nodes, eliminating drag-event conflicts so clicks reliably open dossiers without false wheel-spin triggers.
- **In-App 1-Click Git Push & Mac Workflow (Options 1 & 2):** Implemented in-app Git push via authenticated backend proxy (`/api/git-sync`), instant project source zip exporter (`/api/export-project-zip`), and full zero-terminal Mac GitHub Desktop workflow inside `GitHubTruthHolderModal.tsx`. Integrated seamlessly across Header, Share Progress Section, and System Directives Drawer.

---

## 🟡 What We're Working On Now (Current Focus)

- **PHASE 0.5: LAB SEALING & WHEEL VERIFICATION — SEALED v1.0** (status in `spokesAndPillarsData.ts` set to `SEALED`):
  - **Ratification Chamber** (`SealedLabView.tsx`, route `sealed-lab`) replaces the standalone Combat Lab and combat routes. Four legislative segments: Lab Containment, Wheel Verdict, Sealing Gates, Covenants.
  - **`bun run lab:verify`** (`verify-lab.ts` + `src/lab/labChecks.ts`): The single executable invariant — 15-spoke census, numeric 1–15 uniqueness, Alden-North geometry, canonical SpokeId registry, spoke data completeness. The wheel view and the CLI share the same matrices; the chamber re-runs the identical gates in-browser.
  - **Sealing Gates with exit codes (proven):**
    1. Alden North Alignment (12, 1, 2) with the 3-spoke Axis — Verified (geometry gate).
    2. Zero Drag Interference on Click — Verified.
    3. 15-Spoke Immutable Count & canonical SpokeId registry — Verified (census + ids gates).
    4. Uncorrupted Cardinal Gates + wheel-mode-aware color truth — Verified.
    5. Lab Pass Inspection — **PASSED** by Architect decree; Phase 0.5 ratified with **Forever Flower 08: The Self-Proving Gate**.
  - **Combat containment:** The Alderreach Duel is archived inside Lab Containment behind an explicit toggle; default view is the State Machine & Math Specs. No feature creep, no active-sprint claims.
  - **Ghost purges:** 19-entry `SpokeId` union reduced to canonical 15; "12-Spoke"/"8 Spokes"/"Breath, Soul"/"Cartography" copy purged from `server.ts`, `metadata.json`, `index.html`, `WHEEL_DESIGN_SPEC.md`, `SpokesMatrixView`, and lore data; `SpokesMatrixView` phantom `consumedBy`/`philosophy` derefs fixed (compiler green).

---

## ⏸️ What Is Paused (Blocked Pending Architect Command)

- **PHASE 1: Tactical Core & Combat Engine:**
  - Combat slice prototyping is frozen/shelved. No downstream combat refinements or gameplay expansion occurs until the Architect explicitly resumes Phase 1. The Chamber and roadmap both surface this shelf honestly.

---

## 🔴 What We Will Work On Next (Future Work)

*(Architect's Notes for Future Spurning)*

- *Pending direction from the Architect regarding gameplay/lore enhancements or new Pantheon functionality.*
- *Phase 1 (Tactical Core) waits on Architect command.*
- **To Be Determined:** Await user directives on the next core feature (e.g., combat simulations, new node interactions, advanced animations, or lore expansion) and log them here as they are discussed.