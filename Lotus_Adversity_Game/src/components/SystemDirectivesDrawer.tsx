import React, { useState } from 'react';
import { Terminal, X, ChevronUp, ShieldAlert } from 'lucide-react';

// We duplicate the AGENTS.md content here for the UI so it doesn't rely on raw imports which can break builds.
const SYSTEM_DIRECTIVES_MD = `
# System Architecture & Visual Design Standards

These rules dictate the structural and visual constraints for "The Apparatus" (The Broken RingWheel / Warped Pantheon application). Agents MUST adhere to these rules strictly to avoid disjointed designs or violating the user's established UX.

## 1. Single-Context Focus & Modality
- **No Side-by-Side Deep Inspection Columns:** Never split the screen to show a diagram on one side and a massive dossier on the other side. 
- **In-Place Absolute Overlays (The Big Tooltips):** When a user interacts with a deeply detailed node, the resulting dossier MUST render as an absolute positioned, backdrop-blurred overlay floating directly *on top* of the interactive component. This keeps the user's focus exactly where they clicked.

## 2. Esoteric & "Dark" Visual Identity
- **Color Palette:** The UI relies on a rich, esoteric "dark mode" palette (\`neutral-950\` backgrounds, \`amber-500\` accents for True/Uncorrupted states, \`rose-500\` and \`emerald-500\` for Corrupted states).
- **Typography:** 
  - \`font-cinzel\` MUST be used for titles, ascendant names, and prominent headers to retain the occult/esoteric grimoire aesthetic.
  - \`font-mono\` MUST be used for metadata, weights, numbers, and mechanical systemic tags.
  - Use tracking (letter-spacing) on uppercase labels (\`uppercase tracking-widest\`).
- **Glassmorphism & Orbs:** Overlays and dossiers should use \`backdrop-blur-sm\`, \`bg-neutral-900/80\`, and subtle blurred radial orbs (\`blur-3xl rounded-full opacity-20\`) in the corners mapped to the element's dominion/accent color.

## 3. Interaction & Sound Design
- The application relies heavily on tactile feedback. Every interaction must trigger the \`playSfx\` hook appropriately (\`click\`, \`shield\`, \`anvil\`, or \`scribe\`) to give the UI a physical, mechanical weight.

## 4. Anti-Slop (No Generic AI UI)
- No purple-to-blue gradients.
- No generic SaaS cards.
- Always use high-fidelity, meticulously spaced containers that look like a dark fantasy codex, not a B2B dashboard.
`;

interface SystemDirectivesDrawerProps {
  playSfx: (type: "anvil" | "scribe" | "shield" | "click") => void;
}

export const SystemDirectivesDrawer: React.FC<SystemDirectivesDrawerProps> = ({ playSfx }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    playSfx(isOpen ? 'click' : 'anvil');
  };

  return (
    <>
      {/* Hidden Bottom Tab Trigger */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[60]">
        <button
          onClick={toggleDrawer}
          className="bg-neutral-950 border border-b-0 border-neutral-800 px-6 py-1.5 rounded-t-xl text-[10px] font-mono text-neutral-500 hover:text-amber-400 hover:border-amber-500/30 hover:bg-neutral-900 transition-all flex items-center gap-2 group shadow-2xl"
        >
          <Terminal className="w-3.5 h-3.5 group-hover:animate-pulse" />
          <span className="uppercase tracking-widest font-bold">System Directives</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Drawer Content Overlay */}
      <div 
        className={`fixed inset-0 z-[55] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-neutral-950 border-t border-neutral-800 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '70vh' }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
        
        <div className="h-full flex flex-col p-6 max-w-4xl mx-auto relative">
          <button 
            onClick={toggleDrawer}
            className="absolute top-6 right-6 p-2 rounded-lg bg-neutral-900/50 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-8 border-b border-neutral-800/60 pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            <h2 className="font-cinzel text-2xl font-bold text-neutral-100 tracking-wider">
              System Directives & Rules
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
            <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 mb-6">
              <p className="text-sm font-mono text-neutral-400 leading-relaxed">
                <span className="text-amber-500 font-bold">AGENTS.MD SYNC:</span> These rules dictate the structural and visual constraints for "The Apparatus". Agents MUST adhere to these rules strictly to avoid disjointed designs or violating the user's established UX. They are mirrored from the root AGENTS.md file.
              </p>
            </div>

            <div className="space-y-8">
              {/* Rule 1 */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">
                  1. Single-Context Focus & Modality
                </h3>
                <div className="pl-4 space-y-3 font-sans text-sm text-neutral-300 leading-relaxed">
                  <p><strong className="text-white">No Side-by-Side Deep Inspection Columns:</strong> Never split the screen to show a diagram on one side and a massive dossier on the other side.</p>
                  <p><strong className="text-white">In-Place Absolute Overlays (The Big Tooltips):</strong> When a user interacts with a deeply detailed node, the resulting dossier MUST render as an absolute positioned, backdrop-blurred overlay floating directly <em>on top</em> of the interactive component. This keeps the user's focus exactly where they clicked.</p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest border-l-2 border-amber-500 pl-3">
                  2. Esoteric & "Dark" Visual Identity
                </h3>
                <div className="pl-4 space-y-3 font-sans text-sm text-neutral-300 leading-relaxed">
                  <p><strong className="text-white">Color Palette:</strong> The UI relies on a rich, esoteric "dark mode" palette (neutral-950 backgrounds, amber-500 accents for True/Uncorrupted states, rose-500 and emerald-500 for Corrupted states).</p>
                  <p><strong className="text-white">Typography:</strong> <code className="text-xs bg-neutral-900 px-1 rounded text-amber-200">font-cinzel</code> MUST be used for titles/headers. <code className="text-xs bg-neutral-900 px-1 rounded text-amber-200">font-mono</code> MUST be used for metadata, weights, numbers, and mechanical tags. Use tracking (letter-spacing) on uppercase labels.</p>
                  <p><strong className="text-white">Glassmorphism & Orbs:</strong> Overlays and dossiers should use backdrop blur, bg-neutral-900/80, and subtle blurred radial orbs mapped to the element's dominion color.</p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest border-l-2 border-blue-500 pl-3">
                  3. Interaction & Sound Design
                </h3>
                <div className="pl-4 space-y-3 font-sans text-sm text-neutral-300 leading-relaxed">
                  <p>The application relies heavily on tactile feedback. Every interaction must trigger the <code className="text-xs bg-neutral-900 px-1 rounded text-blue-200">playSfx</code> hook appropriately (click, shield, anvil, or scribe) to give the UI a physical, mechanical weight.</p>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest border-l-2 border-rose-500 pl-3">
                  4. Anti-Slop (No Generic AI UI)
                </h3>
                <div className="pl-4 space-y-3 font-sans text-sm text-neutral-300 leading-relaxed">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>No purple-to-blue gradients.</li>
                    <li>No generic SaaS cards.</li>
                    <li>Always use high-fidelity, meticulously spaced containers that look like a dark fantasy codex, not a B2B dashboard.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="h-12" /> {/* Bottom padding */}
          </div>
        </div>
      </div>
    </>
  );
};
