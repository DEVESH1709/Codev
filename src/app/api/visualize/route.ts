import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Missing `code` in request body" }, { status: 400 });
    }
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const google = createGoogleGenerativeAI({
      apiKey,
    });


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
                  "highlightIndices": [index1, index2] (if working on array),
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
          5. **CRITICAL:** Do NOT return an empty trace. If the code is simple, show initialization steps.
          6. Support C++, Python, JavaScript/TS syntax.
          
          7. **FLOWCHART GENERATION (SVG):**
             - Generate a complete, standalone SVG string for "svgChart".
             - **Style:** Modern, Sleek, Dark Mode optimized. Use vibrant gradients or distinct colors for nodes.
               - Start/End: Green/Emerald Gradients.
               - Process: Blue/Indigo Gradients.
               - Decision: Purple/Violet Gradients.
               - Arrows: Gray/White lines with smooth curves.
             - **Layout:** Vertical flowchart (Top to Bottom).
             - **IDs:** CRITICAL! Every node (<rect>, <path>, <g>) MUST have a unique ID attribute matching "flowchartNodeId" in the trace (e.g., id="node-start", id="node-loop-cond").
             - **Responsiveness:** Use viewBox nicely so it scales.

          8. In "trace", "flowchartNodeId" MUST match the ID of the SVG node active at that step.
             - e.g. If specific line is running, find the corresponding SVG node ID.
             - Use the SAME IDs as in the SVG.

          Code to visualize:
          ${code}
        `;


    const { text } = await generateText({
      model: google("gemini-3-flash-preview"),
      prompt: prompt,
    });

    // Clean up markdown code blocks if any (model might still output them)
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let data;
    try {
      data = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse AI JSON:", cleanText);
      const debug = process.env.NODE_ENV !== "production";
      const body: any = { error: "Failed to parse visualization data" };
      if (debug) body.raw = cleanText;
      return NextResponse.json(body, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    // Log detailed error for debugging
    console.warn("⚠️  Gemini API Failed - Using Offline Mode");
    console.warn("Error Details:", error.message || error);
    console.warn("Tip: Check your API key and ensure the Generative Language API is enabled");

    // Return error to frontend
    return NextResponse.json({ error: "AI Service Failed: " + (error.message || "Unknown error") }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method GET not allowed. Use POST with JSON body { code }" }, { status: 405 });
}
