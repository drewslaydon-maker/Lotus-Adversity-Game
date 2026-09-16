# The Apparatus: Development Roadmap

This document serves as the "Orbiting Truth" of development for The Broken RingWheel / Warped Pantheon application. It tracks past achievements, current focus, and future technical or design milestones.

**Agent Directive:** Read this document to understand the project's current context. Update this document upon completing major milestones, or when the user introduces new long-term ideas that should spur future development.

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

## 🟡 What We're Working On Now (Current Focus / Active Sprint)

- **ACTIVE SPRINT — PHASE 0.5: LAB SEALING & WHEEL VERIFICATION:**
  - **Lab Sealing Inspection Gate:** Rigorously verify that the Wheel and Lab environment pass all inspection criteria.
  - **No Feature Creep:** Game features and combat development are strictly **PAUSED** until the foundational Lab passes full inspection.
  - **In-Place Absolute Overlays (The Big Tooltips):** Ensure clicking any spoke or Dominion god reliably renders the detailed dossier floating directly on top of the interactive wheel without scrolling.
  - **Verification Gate Checklist:**
    1. Alden North Alignment (12, 1, 2) — Verified.
    2. Zero Drag Interference on Click — Verified.
    3. 15-Spoke Immutable Count — Verified.
    4. Uncorrupted Cardinal Gates — Verified.
    5. Lab Pass Inspection Sign-Off — Pending final Architect verification.

---

## ⏸️ What Is Paused (Blocked Pending Lab Seal)

- **PHASE 1: Tactical Core & Combat Engine:**
  - Combat slice prototyping is frozen/paused. No downstream combat refinements or gameplay expansion can occur until Phase 0.5 Lab Sealing is verified and ratified.

---

## 🔴 What We Will Work On Next (Future Work)

*(Architect's Notes for Future Spurning)*

- *Pending direction from the Architect regarding gameplay/lore enhancements or new Pantheon functionality.*
- **To Be Determined:** Await user directives on the next core feature (e.g., combat simulations, new node interactions, advanced animations, or lore expansion) and log them here as they are discussed.
