# The Apparatus: Wheel of Adversity Design Specification

## Overview
The Wheel of Adversity is the central physical artifact and progression engine of the game. It is not a flat UI menu; it is a tangible, interactable mechanism (like an astrolabe or codex dial) that the player meditates upon to unlock skills, manage their path, and observe the world's corruption.

## 1. Structural Anatomy (15 Spokes + 1 Hub)
The wheel consists of **4 Outer Quadrants** and **1 Inner Axis**.
- **Iron (North - Alden):** Spokes 1, 2, 3 (Bastion, Edge, Stance)
- **Ether (East - Caelen):** Spokes 4, 5, 6 (Sorcery, Inscription, Alchemy)
- **Frontier (South - Mera):** Spokes 7, 8, 9 (Wayfinding, Forestry, Trapping)
- **Earth (West - Bram):** Spokes 10, 11, 12 (Quarrying, Smithing, Masonry)
- **Axis (Center - Soran):** Spokes 13, 14, 15 (Breath, Vessel, Unarmored Stance)
  *Soran's spokes reside in an inner concentric ring around the absolute center hub.*

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
