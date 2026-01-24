import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
        }


        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a Logic Visualizer. Convert the user's code into a Mermaid.js 'graph TD' (flowchart). Focus on Control Flow (If/Else/Loops). Return ONLY the raw mermaid string. Do not use markdown blocks. \n\nCode:\n${code}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if any (model might still output them)
        const cleanText = text.replace(/```mermaid/g, "").replace(/```/g, "").trim();

        return NextResponse.json({ chart: cleanText });
    } catch (error: any) {
        // Log detailed error for debugging
        console.warn("⚠️  Gemini API Failed - Using Offline Mode");
        console.warn("Error Details:", error.message || error);
        console.warn("Tip: Check your API key and ensure the Generative Language API is enabled");

        // Return success with fallback flag (allows offline mode to work)
        return NextResponse.json({ chart: null, useFallback: true });
    }
}
