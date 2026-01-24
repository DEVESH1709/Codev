"use client"

import {useEffect, useState,useRef} from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";
import { generateMermaidFromCode } from "@/lib/diagram/diagramUtilis";

interface LogicVisualizerProps {
    code: string;
    language:string;
}

export default function LogicVisualizer({code,language}:LogicVisualizerProps) {

    const [diagramSvg, setDiagramSvg] = useState<string>("");
    const [error,setError] = useState<string|null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOfflineMode, setIsOfflineMode] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    

    useEffect(()=>{
        mermaid.initialize({startOnLoad:false,
            theme:"dark",
            securityLevel:"loose",
            fontFamily : '"Fira Code", monospace',
        })
    },[]);


    useEffect(()=>{
        const fetchAndRender = async()=>{
            if(!code || code.trim().length===0){
                setDiagramSvg("");
                return;
            }
            setIsProcessing(true);
            setError(null);
            setIsOfflineMode(false);

            try{
                const response = await fetch("/api/visualize",{
                    method:"POST",
                    headers:{"Content-type":"application/json"},
                    body :JSON.stringify({code}),
                });

                const data =  await response.json();

                if(data.useFallback || !response.ok){
                   throw new Error(data.error || "Using Offline Mode");
                }
                const mermaidCode = data.chart;

                 const id = `mermaid-${Date.now()}`;
                 try {
                    const { svg } = await mermaid.render(id, mermaidCode);
                    setDiagramSvg(svg);
                } catch (renderError) {
                    // If Mermaid fails to render the AI output, try fallback too
                    console.warn("AI output invalid, trying fallback...");
                    throw new Error("Invalid AI Output");
                }
            }
            catch (err: any) {
                console.warn("AI Visualization Failed, switching to offline mode:", err);
                try {
                    setIsOfflineMode(true); // Mark as offline mode
                    const fallbackDiagram = generateMermaidFromCode(code, language);
                    const id = `mermaid-fallback-${Date.now()}`;
                    const { svg } = await mermaid.render(id, fallbackDiagram);
                    setDiagramSvg(svg);

                    // Optional: You can set a non-blocking error or just null
                    setError(null);
                } catch (fallbackErr) {
                    console.error("Fallback Error:", fallbackErr);
                    setError("Unable to generate visualization (Try simpler code)");
                }
            } finally {
                setIsProcessing(false);
            }
        };
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Only trigger if code has some substance to avoid spamming empty state
        if (code.trim().length > 5) {
            debounceRef.current = setTimeout(fetchAndRender, 1500);
        } else {
            setDiagramSvg("");
        }

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        }
    }, [code]);

     return (
        <div className="h-full flex flex-col bg-[#1e1e1e] rounded-xl border border-white/[0.05] p-4 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isOfflineMode ? 'bg-orange-500' : 'bg-blue-500'} animate-pulse`} />
                    <h2 className="text-sm font-medium text-white">Live Logic Visualizer</h2>
                </div>
                <span className={`text-xs ${isOfflineMode ? 'text-orange-400' : 'text-gray-500'}`}>
                    {isProcessing ? "Syncing..." : isOfflineMode ? "Offline Mode" : "Ready"}
                </span>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center min-h-[400px] relative bg-[#1e1e1e]">
                {isProcessing && (
                    <div className="absolute inset-0 z-10 flex flex-col gap-3 items-center justify-center bg-black/40 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-xs text-blue-300 font-medium animate-pulse">Analyzing Logic...</p>
                    </div>
                )}

                {error ? (
                    <div className="text-center p-4 max-w-xs">
                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-red-400 text-sm mb-1">Visualization Failed</p>
                        <p className="text-gray-500 text-xs">{error}</p>
                    </div>
                ) : diagramSvg ? (
                    <div
                        className="w-full h-full flex items-center justify-center text-white [&_svg]:max-w-full [&_svg]:max-h-full"
                        dangerouslySetInnerHTML={{ __html: diagramSvg }}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-600 gap-2">
                        <svg className="w-12 h-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.45-.898l4.225 2.112 4.225-2.112a1 1 0 01.9 0l4.225 2.112 4.225-2.112A1 1 0 0121 5.618v10.764a1 1 0 01-.553.894L15 20m0 0h.01M15 20L9 20m6 0v-6m-6 6v-6m0 0l-6-3m6 0l6-3m0 0l6 3m-6-3v6m6 0v-6" />
                        </svg>
                        <p className="text-sm font-medium">Start typing to visualize logic...</p>
                    </div>
                )}
            </div>
        </div>
    );
            
}