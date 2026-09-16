# System Architecture & Visual Design Standards

These rules dictate the structural and visual constraints for "The Apparatus" (The Broken RingWheel / Warped Pantheon application). Agents MUST adhere to these rules strictly to avoid disjointed designs or violating the user's established UX.

## 1. Single-Context Focus & Modality
- **No Side-by-Side Deep Inspection Columns:** Never split the screen to show a diagram (like the Wheel) on one side and a massive detailed dossier on the other side (or stacked vertically on mobile, which forces the user to scroll down blindly). 
- **In-Place Absolute Overlays (The Big Tooltips):** When a user interacts with a deeply detailed node (such as a Spoke or a Dominion God), the resulting detailed dossier MUST render as an absolute positioned, backdrop-blurred overlay floating directly *on top* of the interactive component (i.e. inside a relative container). This keeps the user's focus exactly where they clicked.

## 2. Esoteric & "Dark" Visual Identity
- **Color Palette:** The UI relies on a rich, esoteric "dark mode" palette (`neutral-950` backgrounds, `amber-500` accents for True/Uncorrupted states, `rose-500` and `emerald-500` for Corrupted states).
- **Typography:** 
  - `font-cinzel` (or serif equivalents) MUST be used for titles, ascendant names, and prominent headers to retain the occult/esoteric grimoire aesthetic.
  - `font-mono` MUST be used for metadata, weights, numbers, and mechanical systemic tags (e.g., "Spoke #4", "Iron Dominion").
  - Use tracking (letter-spacing) on uppercase labels (`uppercase tracking-widest`) for an elevated, ancient feel.
- **Glassmorphism & Orbs:** Overlays and dossiers should use `backdrop-blur-sm`, `bg-neutral-900/80`, and subtle blurred radial orbs (`blur-3xl rounded-full opacity-20`) in the corners mapped to the element's dominion/accent color.

## 3. Interaction & Sound Design
- The application relies heavily on tactile feedback. Every interaction must trigger the `playSfx` hook appropriately (`click`, `shield`, `anvil`, or `scribe`) to give the UI a physical, mechanical weight.

## 4. Anti-Slop (No Generic AI UI)
- No purple-to-blue gradients.
- No generic SaaS cards.
- Always use high-fidelity, meticulously spaced containers that look like a dark fantasy codex, not a B2B dashboard.
