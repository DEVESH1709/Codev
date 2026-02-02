import { action } from "./_generated/server";
import { v } from "convex/values";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export const generateVisualization = action({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        error: "Missing GEMINI_API_KEY",
      };
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const prompt = `
You are an Algorithm Visualizer Engine.
Simulate the execution of the provided code step-by-step.

Return a STRICT VALID JSON object with this structure:
  {
    "complexity": {
      "time": "O(...)",
      "space": "O(...)",
      "explanation": "Brief reason..."
    },
    "svgChart": "<svg ...>...</svg>",
    "trace": [
      {
        "id": 1,
        "line": <line_number>,
        "action": "Init / Compare / Swap / Update",
        "variables": { "varName": value, "arrName": [values...] },
        "highlightIndices": [index1, index2],
        "flowchartNodeId": "NodeID (e.g. node-A, node-B)",
        "description": "Explaining what happened this step"
      }
    ]
  }

Rules:
1. Focus on tracking changes to Arrays/Vectors and key variables.
2. 'highlightIndices' should contain indices being compared or swapped.
3. Generate enough steps to demonstrate the algorithm (at least 5-10 steps).
4. Return ONLY raw JSON. No markdown formatting.
5. CRITICAL: Do NOT return an empty trace. If the code is simple, show initialization steps.
6. Support C++, Python, JavaScript/TS syntax.
7. FLOWCHART GENERATION (SVG):
   - Generate a complete, standalone SVG string for "svgChart".
   - Style: Modern, Sleek, Dark Mode optimized. Use vibrant gradients for nodes.
   - Layout: Vertical flowchart (Top to Bottom).
   - IDs: Every node (<rect>, <path>, <g>) MUST have a unique id attribute matching "flowchartNodeId" in the trace (e.g., id="node-start", id="node-loop-cond").
   - Responsiveness: Use viewBox nicely so it scales.
8. In "trace", "flowchartNodeId" MUST match the ID of the SVG node active at that step.

Code to visualize:
${args.code}
`;

    const generateWithTimeout = async (opts: any, ms = 30000) => {
      return await Promise.race([
        generateText(opts),
        new Promise((_, reject) => setTimeout(() => reject(new Error("AI request timed out")), ms)),
      ]);
    };

    try {
      const res = await generateWithTimeout(
        {
          model: google("gemini-3-flash-preview"),
          prompt,
        },
        30000
      );

      const text = (res as any).text as string;
      const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
      try {
        const data = JSON.parse(clean);
        return data;
      } catch {
        return { error: "Failed to parse visualization data", raw: clean };
      }
    } catch (err: any) {
      const message = err?.message || String(err);
      if (message.includes("timed out")) {
        return { error: "AI request timed out" };
      }
      return { error: "AI Service Failed: " + message };
    }
  },
});
