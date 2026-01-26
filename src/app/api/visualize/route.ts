import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
        }


        const google =  createGoogleGenerativeAI({apiKey});
      

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
            "trace": [
              {
                "id": 1,
                "line": <line_number>,
                "action": "Init / Compare / Swap / Update",
                "variables": { "varName": value, "arrName": [values...] },
                "highlightIndices": [index1, index2] (if working on array),
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

          Code to visualize:
          ${code}
        `;
        const { text } = await generateText({
      model: google("gemini-3-flash-preview"),
      prompt: prompt,
    });
          
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

     let data;
    try {
      data = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse AI JSON:", cleanText);
      return NextResponse.json({ error: "Failed to parse visualization data" }, { status: 500 });
    }
        
        return NextResponse.json(data);
      
}catch (error: any) {
        // Log detailed error for debugging
        console.warn("⚠️  Gemini API Failed - Using Offline Mode");
        console.warn("Error Details:", error.message || error);
        console.warn("Tip: Check your API key and ensure the Generative Language API is enabled");

        // Return success with fallback flag (allows offline mode to work)
        return NextResponse.json({ chart: null, useFallback: true });
    }
}
