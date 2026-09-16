import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK lazily to prevent crashing if GEMINI_API_KEY is not immediately present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
  res.json({
    status: "ok",
    hasGeminiKey: hasKey,
    model: "gemini-3.8-flash",
    service: "Adversity - Warped Pantheon & Armor Lore Engine",
  });
});

// Helper for clean JSON extraction from Gemini
function extractJsonFromText(text: string): any {
  try {
    const trimmed = text.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      return JSON.parse(trimmed);
    }
    const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(trimmed.substring(firstBrace, lastBrace + 1));
    }
    throw new Error("No valid JSON structure found in output");
  } catch (err) {
    console.warn("Failed to parse JSON, returning raw text wrap", err);
    return null;
  }
}

// 1. Inscribe Warped God Endpoint
app.post("/api/gemini/inscribe-god", async (req, res) => {
  const { prompt, dominion, armorWeight, tone } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    const fallbackGod = generateFallbackWarpedGod(prompt, dominion, armorWeight);
    return res.json({
      success: true,
      data: fallbackGod,
      source: "procedural-lexicon",
      message: "Inscribed using the Ancient Wheel Lexicon (Gemini API key not active).",
    });
  }

  try {
    const systemInstruction = `You are the High Archivist of "Adversity", a grim, tactile classic RPG.
Cosmology rules:
- 2,000 years ago, the Original 12-Spoke Wheel of Adversity (representing healthy human trial, restraint, and mortal craft) was fractured by the 5 Ascendants into the Broken RingWheel:
  1. Iron Dominion (War): Alden (The Weeping Bull / The Burst Sheath) — from diplomat-poet to berserk iron-fused butcher. Consumes Bastion, Edge, Stance spokes.
  2. Ether Dominion (Mind): Caelen (The Salt-Tongue) — from universal empathy to dead algorithmic salt calculation. Consumes Sorcery, Inscription, Alchemy spokes.
  3. Frontier Dominion (Wild): Mera (The Silent Orchard) — from wild communion to pinned museum-terrarium cages. Consumes Cartography, Forestry, Trapping spokes.
  4. Earth Dominion (Labor): Bram (The Slag-King) — from sacred stone reciprocity to molten strip-mine exhaustion. Consumes Quarrying, Smithing, Masonry spokes.
  5. Axis / Center Hub: Soran (The Blind Stone) — from egoless stillness (Sunyata) to catatonic paralysis, holding back the apocalypse in petrified silence. Consumes Breath, Soul, Unarmored Stance.
- Every symbol in this world is an ideological battleground with TWO forms:
  1. "True / Healthy Form": The ancient, balanced geometry of that mortal virtue before ascension.
  2. "Corrupted Imperial Form (Godman's Mark)": How the Ascendant warped it into an emblem of their trauma and obsession.

Generate a detailed new Ascendant or Demigod conforming strictly to this JSON format:
{
  "id": "unique-slug-string",
  "mortalName": "Their original mortal name",
  "name": "Full Mythic Ascended Name (e.g. Alden, The Weeping Bull)",
  "publicTitle": "The imperial or priestly title",
  "folkWhisper": "What common folk whisper in fear (e.g. The Slag-King, The Blind Stone)",
  "dominion": "Iron" | "Ether" | "Frontier" | "Earth" | "Axis",
  "dominionTitle": "Title of their pillar",
  "mortalVirtue": "Their genuine noble virtue in mortal life before the cataclysm",
  "fracturedCorruption": "How their trauma fractured their mind and mutated their divinity",
  "warpedPhysiology": "Visceral physical description of how their body fused with metal, salt, stone, or obsidian",
  "consumedSpokes": ["Spoke 1", "Spoke 2", "Spoke 3"],
  "armorWeightAffinity": "Heavy" | "Medium" | "Light" | "Zero",
  "armorSlotAffinity": "Cuirass" | "Helm" | "Pauldrons" | "Gauntlets" | "Greaves" | "Shield",
  "divineDecree": "A grim decree spoken by or etched into their shrines",
  "relic": {
    "name": "Name of their legendary artifact or sundered tool",
    "description": "Tactical and narrative lore of this relic."
  },
  "trueSymbol": {
    "name": "Name of the healthy symbol",
    "designation": "True / Healthy Form",
    "geometry": "Clean balanced geometry description",
    "visualDescription": "Visual description",
    "inUniverseMeaning": "What it meant to mortals in the original wheel",
    "svgShapeType": "trapezoid" | "diamond" | "crescents" | "horned-calyx" | "wedge" | "lotus" | "circle" | "caliper",
    "accentColor": "#f59e0b"
  },
  "corruptedSymbol": {
    "name": "Name of the corrupted mark",
    "designation": "Corrupted Imperial Form (Godman's Mark)",
    "geometry": "Jagged corrupted geometry description",
    "visualDescription": "Visual description of the trauma",
    "inUniverseMeaning": "How the ascendant distorted it",
    "svgShapeType": "trapezoid" | "diamond" | "crescents" | "horned-calyx" | "wedge" | "lotus" | "circle" | "caliper",
    "accentColor": "#ef4444"
  },
  "tacticalBlessing": {
    "name": "Mechanic name",
    "mechanic": "Deterministic combat effect (flat mitigation, posture reduction, AP refund)"
  },
  "chronicleExcerpt": "A 3-4 sentence atmospheric myth or poem recounting their tragedy."
}`;

    const userPrompt = `Inscribe an authentic Ascendant or Champion for Adversity:
Concept: ${prompt || "An ascendant born of broken diplomacy and fused plate"}
Dominion: ${dominion || "Iron"}
Armor Weight Affinity: ${armorWeight || "Heavy"}
Atmospheric Tone: ${tone || "Dark, solemn, visceral, high-fantasy grit"}

Return ONLY valid JSON matching the schema.`;

    let response: any = null;
    let modelUsed = "gemini-3.8-flash";
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.85,
        },
      });
    } catch (primaryErr: any) {
      console.warn("gemini-3.8-flash busy/failed, trying gemini-3.1-flash-lite fallback:", primaryErr?.message);
      modelUsed = "gemini-3.1-flash-lite";
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.85,
        },
      });
    }

    const parsed = extractJsonFromText(response?.text || "");
    if (parsed) {
      return res.json({
        success: true,
        data: parsed,
        source: modelUsed,
      });
    } else {
      throw new Error("Failed to parse structured response from Gemini");
    }
  } catch (error: any) {
    console.error("Gemini inscribe-god error:", error);
    // Return resilient fallback rather than letting client fail
    const fallback = generateFallbackWarpedGod(prompt, dominion, armorWeight);
    return res.json({
      success: true,
      data: fallback,
      source: "procedural-fallback",
      message: `Gemini API encountered an error (${error?.message || "rate limit/timeout"}). Procedural archivist provided lore to ensure uninterrupted design.`,
    });
  }
});

// 2. Inscribe Armor Symbol Endpoint
app.post("/api/gemini/inscribe-armor-symbol", async (req, res) => {
  const { prompt, weightClass, armorPiece, godAffinity } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    const fallbackSymbol = generateFallbackArmorSymbol(prompt, weightClass, armorPiece, godAffinity);
    return res.json({
      success: true,
      data: fallbackSymbol,
      source: "procedural-lexicon",
      message: "Armor symbol inscribed via Master Smith Runic Index.",
    });
  }

  try {
    const systemInstruction = `You are the Master Runic Engraver of Alderreach in the RPG "Adversity".
In Alderreach, armor symbols are an ideological battleground between:
1. "True / Healthy Form": The ancient balanced geometry of human discipline before the ascension.
2. "Corrupted Imperial Form (Godman's Mark)": The distorted mark reflecting the Ascendant's trauma.

The core Armor Trinity reflects the chronological death of Alden's humanity:
- Heavy: The Anvil of the Envoy (Diplomat prime, broad grounded trapezoid, balanced seed)
- Medium: The Sheathed Verge (Tension era, blade half-drawn, diamond with offset tension line)
- Light/Skirmisher: The Severed Scabbard (Breaking point, discarded shield, naked edge, dynamic crescent arcs)
- Full Seal: The Horned Calyx (Ring burst by bone spikes)
Other Dominions:
- Earth (Bram): The Crucible Wedge / Cracked Kiln
- Axis (Soran): The Pierced Lotus / Void Ouroboros (Zero-weight Sunyata)

Generate an Armor Symbol in this strict JSON format:
{
  "id": "symbol-slug",
  "name": "Full Symbol Name",
  "chronologicalEra": "The First Era (The Anvil)" | "The Tension Era (The Sheathed Verge)" | "The Breaking Point (The Severed Scabbard)" | "The Ascended Corruption (The Horned Calyx)" | "The Axis Stance (The Pierced Lotus)" | "The Sacred Smelt (The Crucible Wedge)",
  "weightClass": "Heavy" | "Medium" | "Light" | "Zero",
  "slot": "Helm" | "Cuirass" | "Pauldrons" | "Gauntlets" | "Greaves" | "Shield",
  "godAffinity": "Associated Ascendant (Alden, Caelen, Mera, Bram, Soran)",
  "dominion": "Iron" | "Ether" | "Frontier" | "Earth" | "Axis",
  "trueForm": {
    "name": "Name of the healthy symbol",
    "designation": "True / Healthy Form",
    "geometry": "Detailed geometry description",
    "visualDescription": "Visual description",
    "inUniverseMeaning": "Mortal virtue meaning",
    "svgShapeType": "trapezoid" | "diamond" | "crescents" | "horned-calyx" | "wedge" | "lotus" | "circle" | "caliper",
    "accentColor": "#f59e0b"
  },
  "corruptedForm": {
    "name": "Name of the corrupted mark",
    "designation": "Corrupted Imperial Form (Godman's Mark)",
    "geometry": "Corrupted geometry description",
    "visualDescription": "Visual description of trauma",
    "inUniverseMeaning": "Imperial corruption meaning",
    "svgShapeType": "trapezoid" | "diamond" | "crescents" | "horned-calyx" | "wedge" | "lotus" | "circle" | "caliper",
    "accentColor": "#ef4444"
  },
  "forgingIncantation": "The rhythmic chant spoken by the smith on the anvil.",
  "postureMitigation": "Exact mechanical deterministic benefit (e.g. -35% Posture buildup against heavy bludgeoning).",
  "weightSynergy": "How this symbol enhances the specific weight class."
}`;

    let response: any = null;
    let modelUsed = "gemini-3.8-flash";
    const contents = `Design an authentic sacred Armor Symbol for Adversity:
Concept: ${prompt || "A symbol of diplomatic patience before violence"}
Weight Class: ${weightClass || "Heavy"}
Armor Piece: ${armorPiece || "Cuirass"}
God Affinity: ${godAffinity || "Alden, The Weeping Bull"}`;

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });
    } catch (primaryErr: any) {
      console.warn("gemini-3.8-flash failed for symbol, falling back to gemini-3.1-flash-lite:", primaryErr?.message);
      modelUsed = "gemini-3.1-flash-lite";
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });
    }

    const parsed = extractJsonFromText(response?.text || "");
    if (parsed) {
      return res.json({
        success: true,
        data: parsed,
        source: modelUsed,
      });
    } else {
      throw new Error("Failed to parse armor symbol JSON");
    }
  } catch (error: any) {
    console.error("Gemini inscribe-armor-symbol error:", error);
    const fallback = generateFallbackArmorSymbol(prompt, weightClass, armorPiece, godAffinity);
    return res.json({
      success: true,
      data: fallback,
      source: "procedural-fallback",
      message: `Gemini API notice (${error?.message || "connection"}). Loaded procedural masterwork heraldry.`,
    });
  }
});

// 3. Generate Lore / Story Vignette Endpoint
app.post("/api/gemini/generate-lore", async (req, res) => {
  const { topic, category, godsInvolved, length } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      success: true,
      data: {
        title: `Chronicles of the Warped Age: ${topic || "The Iron Covenant"}`,
        category: category || "Mythology",
        content: `Before the Great Sundering cracked the granite spires of Alderreach, the First Mortals swore fealty not to distant constellations, but to the flesh-and-iron titans who walked among them. When Marrow-King Vaerok plunged his hands into the molten heart of Mount Cinder-Grave, his skin did not burn; it calcified into the first breastplate of masterwork iron. To this day, no smith strikes an anvil without whispering the First Inscription: 'What is forged in suffering shall never shatter under stone.'`,
        historicalContext: "Transcribed from the third stone tablet of the Anvil-Lords in the High Crags of Alderreach.",
      },
      source: "procedural-lexicon",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Write a high-caliber grim dark-fantasy lore chronicle for Adversity RPG:
Topic: ${topic}
Category: ${category || "Chronicle"}
Gods / Figures Mentioned: ${godsInvolved || "The Warped Pantheon"}
Desired Length: ${length || "Medium (3-4 paragraphs)"}

Include:
- Evocative worldbuilding rooted in OSRS/Morrowind tone (grounded, gritty, tactile, mysterious).
- Direct references to armor, forging, posture, and the suffering of the Warped God-People.
- A concluding fragment of oral verse or oath.`,
      config: {
        systemInstruction: "You are the Lore Master of Alderreach. Write in a rich, rhythmic, literary dark-fantasy prose.",
        temperature: 0.9,
      },
    });

    return res.json({
      success: true,
      data: {
        title: topic || "Apocrypha of the Warped God-People",
        category: category || "Chronicle",
        content: response.text,
        historicalContext: "Inscribed directly via the Gemini Inscription Sanctum.",
      },
      source: "gemini-3.8-flash",
    });
  } catch (error: any) {
    console.error("Gemini generate-lore error:", error);
    return res.json({
      success: true,
      data: {
        title: `The Sundered Tablets: ${topic || "The Warped Ascendants"}`,
        category: category || "Mythology",
        content: `In the silent gorges of Alderreach, the heraldic carvings remain untouched by rain. When the Warped Gods accepted their divine transfiguration, each mortal virtue became an agonizing physical shell. Marrow-King Vaerok took upon himself the absolute weight of mortal dread, and his spine fused with the black granite of the earth. Vaelith took every broken oath, weaving them into links of biting iron mail that pierce her flesh with every heartbeat. Thus armor was born: not merely to turn aside blades, but to wear the memory of divine endurance.`,
        historicalContext: "Recovered from the Wayfinder's Archive.",
      },
      source: "procedural-fallback",
      message: `Gemini API fallback applied (${error?.message || "rate limit"}).`,
    });
  }
});

// 4. Consult Oracle of the Warped Gods
app.post("/api/gemini/oracle", async (req, res) => {
  const { question } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      success: true,
      answer: `The Oracle gazes into the smoldering forge: "You speak of '${question}'. In Alderreach, no answer is granted without toll. The Warped Gods teach that strength is not granted by heavens, but hammered into posture through adversity. Wear your armor true, honor the 8 Spokes, and your footing shall not crumble."`,
      source: "procedural-lexicon",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `A traveler at the shrine of the Warped Gods asks: "${question}"
Answer as the Blind Oracle of the Iron Spire. Keep your reply atmospheric, cryptic yet insightful, grounded in the lore of Alderreach, the Warped God-People, sacred armor symbols, and tactical posture. 2-3 paragraphs.`,
      config: {
        systemInstruction: "You are the Blind Oracle of the Warped Pantheon in Alderreach.",
        temperature: 0.85,
      },
    });

    return res.json({
      success: true,
      answer: response.text,
      source: "gemini-3.8-flash",
    });
  } catch (error: any) {
    console.error("Gemini oracle error:", error);
    return res.json({
      success: true,
      answer: `The embers whisper through the soot: "Thy inquiry regarding '${question}' echoes across the quarry crags. The Warped Pantheon knows the weight of every strike. Guard thy posture, inscribe thy armor with resolve, and seek mastery through patient labor."`,
      source: "procedural-fallback",
    });
  }
});

// --- Procedural Fallback Generators ---
function generateFallbackWarpedGod(prompt?: string, dominion?: string, armorWeight?: string) {
  const timestamp = Date.now();
  const archetypes = [
    {
      mortalName: "Alden",
      name: "Alden, The Weeping Bull",
      publicTitle: "The Sovereign of the Iron Pillar",
      folkWhisper: "The Weeping Bull / The Monster Unsheathed",
      dominion: "Iron" as const,
      dominionTitle: "The War Pillar (The Iron Triad)",
      mortalVirtue: "Diplomat-poet in his youth; a paragon of supreme restraint, bearing the crushing weight of warring nations without breaking.",
      fracturedCorruption: "When his peaceful words finally failed and his family was slaughtered at the treaty altar, he cast off his armor and drew the naked edge. In ascension, his plate fused into his bone; his skull ruptured into bone horns.",
      warpedPhysiology: "Towering 9-foot frame of blackened pig-iron plate grafted seamlessly into calcified bone. His ribcage acts as an exposed portcullis; weeping tear ducts leak boiling furnace-tar.",
      consumedSpokes: ["The Bastion Spoke (Armor & Absorption)", "The Edge Spoke (Blades & Impact)", "The Stance Spoke (Poise & Discipline)"],
      armorWeightAffinity: (armorWeight as any) || "Heavy",
      armorSlotAffinity: "Cuirass" as const,
      divineDecree: "Every sheath is a lie. Every shield is a prayer spoken by cowards. Bleed the iron dry until only the bone edge remains.",
      relic: {
        name: "The Envoy's Sundered Quill-Blade",
        description: "A ceremonial diplomatic longsword re-sharpened into a jagged executioner's edge.",
      },
      trueSymbol: {
        name: "The Anvil of the Envoy",
        designation: "True / Healthy Form" as const,
        geometry: "Broad grounded trapezoid with unmarred symmetry, housing a golden balanced seed inside.",
        visualDescription: "An unyielding, harmonious sanctuary of patience.",
        inUniverseMeaning: "Represents Alden's prime as the diplomat-poet who bore the suffering of entire realms.",
        svgShapeType: "trapezoid" as const,
        accentColor: "#f59e0b",
      },
      corruptedSymbol: {
        name: "The Horned Calyx / The Weeping Bull",
        designation: "Corrupted Imperial Form (Godman's Mark)" as const,
        geometry: "A burst martial ring shattered by two jagged upward-thrusting bone spikes, with tears of molten lead.",
        visualDescription: "The circular perimeter of martial discipline violently torn apart from within.",
        inUniverseMeaning: "Restraint shattered, mercy discarded, the monster permanently unsheathed.",
        svgShapeType: "horned-calyx" as const,
        accentColor: "#ef4444",
      },
      tacticalBlessing: {
        name: "Anvil's Blood-Tithes",
        mechanic: "Absorb 40% of incoming physical damage as flat posture mitigation; gain +30% posture-breaking force below 25% posture.",
      },
      chronicleExcerpt: "He who wrote the thirty songs of peace now speaks only through the percussion of iron cracking against skull.",
    },
    {
      mortalName: "Bram",
      name: "Bram, The Slag-King",
      publicTitle: "The Grand Mason / The Hearth-Father",
      folkWhisper: "The Slag-King / The Open Kiln",
      dominion: "Earth" as const,
      dominionTitle: "The Labor Pillar (The Earth Triad)",
      mortalVirtue: "The Reverent Shaper. Revering stone and ore as sacred debt to the mountain.",
      fracturedCorruption: "Threw his body into the blast furnace to spare mortals the agony of labor, becoming an unending engine of industrial strip-mining.",
      warpedPhysiology: "Walking kiln of basalt granite bound by glowing copper bands, spilling boiling slag through torso fissures.",
      consumedSpokes: ["Geological Quarrying", "Artisan Smithing", "Masonry & Construction"],
      armorWeightAffinity: (armorWeight as any) || "Heavy",
      armorSlotAffinity: "Gauntlets" as const,
      divineDecree: "The kiln must never go cold! Melt the marrow, crush the mountain!",
      relic: {
        name: "The Crucible of the First Slag",
        description: "A bottomless iron crucible radiating 1,000°C heat.",
      },
      trueSymbol: {
        name: "The Reverent Chisel & Bedrock",
        designation: "True / Healthy Form" as const,
        geometry: "Level horizontal base supporting an upright equilateral prism with gentle ventilation curves.",
        visualDescription: "Sacred stonework rooted in reciprocity.",
        inUniverseMeaning: "Mortal craftsmanship honoring the earth with zero waste.",
        svgShapeType: "wedge" as const,
        accentColor: "#fb923c",
      },
      corruptedSymbol: {
        name: "The Crucible Wedge / Cracked Kiln",
        designation: "Corrupted Imperial Form (Godman's Mark)" as const,
        geometry: "Crushing triangle splitting an anvil base with molten fissures.",
        visualDescription: "Crushing structural mass and unyielding industrial heat.",
        inUniverseMeaning: "Unmitigated extraction and perpetual smelting.",
        svgShapeType: "wedge" as const,
        accentColor: "#ea580c",
      },
      tacticalBlessing: {
        name: "Molten Quench Resiliency",
        mechanic: "Suffering a critical blow coats weapons in molten slag for +15 fire-posture damage.",
      },
      chronicleExcerpt: "Bram once wept when an apprentice chipped a pillar. Now he strips mountains bare.",
    }
  ];

  const chosen = archetypes[timestamp % archetypes.length];
  return {
    ...chosen,
    id: `god-${timestamp}`,
    name: prompt ? `${chosen.name} (${prompt.slice(0, 20)})` : chosen.name,
  };
}

function generateFallbackArmorSymbol(prompt?: string, weightClass?: string, armorPiece?: string, godAffinity?: string) {
  const timestamp = Date.now();
  return {
    id: `symbol-${timestamp}`,
    name: prompt ? `Symbol of ${prompt}` : "The Anvil of the Envoy",
    chronologicalEra: "The First Era (The Anvil)" as const,
    weightClass: (weightClass as any) || "Heavy",
    slot: (armorPiece as any) || "Cuirass",
    godAffinity: godAffinity || "Alden, The Weeping Bull",
    dominion: "Iron" as const,
    trueForm: {
      name: "The Anvil of the Envoy",
      designation: "True / Healthy Form" as const,
      geometry: "Broad grounded trapezoid with unmarred symmetry, housing a golden balanced seed inside.",
      visualDescription: "An unyielding, harmonious sanctuary of patience.",
      inUniverseMeaning: "Alden's prime as the diplomat-poet bearing the weight of nations.",
      svgShapeType: "trapezoid" as const,
      accentColor: "#f59e0b",
    },
    corruptedForm: {
      name: "The Slag-Welded Carapace",
      designation: "Corrupted Imperial Form (Godman's Mark)" as const,
      geometry: "Trapezoid distorted by iron barbs and inward-biting rivets that fuse into skin.",
      visualDescription: "Armor transformed into an agonizing iron maiden.",
      inUniverseMeaning: "Plate riveted directly into bone so it can never be removed in peace.",
      svgShapeType: "trapezoid" as const,
      accentColor: "#b45309",
    },
    forgingIncantation: "Let the hammer strike seven times cold, three times quenched in tears of statecraft.",
    postureMitigation: "-45% Posture buildup against heavy blunt blows; +30 Flat Physical Absorption.",
    weightSynergy: "Heavy Plate Core: Grants 'Unyielding Bulk' — incoming impacts under 15 damage cause zero posture stagger.",
  };
}

// Vite middleware for development vs static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Adversity Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
