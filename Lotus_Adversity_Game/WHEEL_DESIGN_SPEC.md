# The Apparatus: Wheel of Adversity Design Specification

## Overview
The Wheel of Adversity is the central physical artifact and progression engine of the game. It is not a flat UI menu; it is a tangible, interactable mechanism (like an astrolabe or codex dial) that the player meditates upon to unlock skills, manage their path, and observe the world's corruption.

## 1. Structural Anatomy (15 Spokes + 1 Hub)
The wheel consists of **4 Outer Quadrants** and **1 Inner Axis**. Quadrants begin with **Alden at True North** and advance clockwise by 30°:
- **Iron (North - Alden):** Spokes 12, 1, 2 (Diplomat, Bastion, Edge) @ 330°, 0°, 30°
- **Ether (East - Caelen):** Spokes 3, 4, 5 (Sorcery, Inscription, Alchemy) @ 60°, 90°, 120°
- **Frontier (South - Mera):** Spokes 6, 7, 8 (Trapping, Wayfinding, Forestry) @ 150°, 180°, 210°
- **Earth (West - Bram):** Spokes 9, 10, 11 (Masonry, Quarrying, Smithing) @ 240°, 270°, 300°
  *The cardinal defining mains are Spokes 1 (North), 4 (East), 7 (South), 10 (West).*
- **Axis (Center - Soran):** Spokes 13, 14, 15 (Breath, Vessel, Unarmored Stance) on an inner concentric ring @ 210°, 330°, 90° around the absolute center hub.
  *This matrix is enforced by `src/lab/labChecks.ts` — the wheel view and `bun run lab:verify` both read the same invariant.*

## 2. Esoteric Color Language & States
The rainbow palette (blue, orange, purple) is discarded in favor of a strict esoteric dialect based on `AGENTS.md`.

*   **Locked / Unknown:** `neutral-800` (Dark, dormant, ash-like).
*   **Corrupted (Default State of the World):** `rose-500` (Violence/Blood) or `emerald-500` (Sickly/Warped Magic). The 5 Corrupters (Gods) stain their spokes with these corrupted hues.
*   **Purified / True (Restored State):** `amber-500` (True Gold/Sunyata). The color of original virtues.

## 3. Physical Interaction
- **Touch & Mobile:** The SVG container MUST have `touch-action: none` to prevent the browser from scrolling the entire page when the user is trying to spin the astrolabe on mobile.
- The wheel must be fully spinnable via dragging.
- Text must perfectly counter-rotate to remain legible.
- When an element is clicked, it summons an absolute-positioned glassmorphic overlay *in-place* over the wheel.

## 4. Game Engine Integration
- **Engine Sandbox:** Used to test node state transitions (`Locked` -> `Corrupted` -> `Purified`).
- The colors of the SVG elements must strictly derive from the *Engine State*, not just hardcoded visual constants.

## 5. Immutable SVG Math
- Agents are STRICTLY FORBIDDEN from arbitrarily modifying the `360 / 15` geometric layout of the spokes. Any SVG alterations must explicitly account for exactly 15 nodes arranged along the perimeter and inner axis. Do not break the circle math.
