"use client"

import { useEffect, useRef, useState } from "react";
import { Loader2, Play, Pause, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TraceStep {
    id: number;
    line: number;
    action: string;
    variables: Record<string, any>;
    highlightIndices?: number[];
    description: string;
}

interface ComplexityData {
    time: string;
    space: string;
    explanation: string;
}
interface LogicVisualizerProps {
    code: string;
    language:string;
}


export default function LogicVisualizer({code, language}:LogicVisualizerProps){

    const [trace,setTrace] = useState<TraceStep[]>([]);
    const [complexity,setComplexity] = useState<ComplexityData | null>(null);
    const [currentStep,setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState((false));
    const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchTrace = async () => {
            if (!code || code.trim().length === 0) return;

            setIsLoading(true);
            setError(null);
            setTrace([]);
            setComplexity(null);
            setCurrentStep(0);

            try {
                const response = await fetch("/api/visualize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (!response.ok || data.error) throw new Error(data.error || "Failed to generate trace");

                setTrace(data.trace || []);
                setComplexity(data.complexity || null);

            } catch (err) {
                console.error("Visualizer Error:", err);
                setError("Unable to simulate this code.");
            } finally {
                setIsLoading(false);
            }
        };

        const timeout = setTimeout(fetchTrace, 1500); 
        return () => clearTimeout(timeout);
    }, [code]);

     useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev >= trace.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000); // 1 second per step
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isPlaying, trace]);

    const stepData = trace[currentStep];

    const renderVariable = (key: string, value: any) => {
        // Handle Arrays specially for visualization
        if (Array.isArray(value)) {
            return (
                <div key={key} className="mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-mono">{key}:</p>
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                            {value.map((item, idx) => {
                                const isHighlighted = stepData?.highlightIndices?.includes(idx);
                                return (
                                    <motion.div
                                        key={`${key}-${idx}`}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{
                                            scale: isHighlighted ? 1.1 : 1,
                                            backgroundColor: isHighlighted ? "#eab308" : "#3b82f6",
                                            borderColor: isHighlighted ? "#facc15" : "#60a5fa"
                                        }}
                                        className={`min-w-[40px] h-10 flex items-center justify-center rounded border-2 border-white/10 text-white font-bold shadow-lg`}
                                    >
                                        {item}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            );
        }
        return (
            <div key={key} className="flex justify-between border-b border-white/5 py-1 text-sm">
                <span className="text-gray-400 font-mono">{key}</span>
                <span className="text-blue-300 font-mono">{String(value)}</span>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] rounded-xl border border-white/[0.05] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#252526]">
                <h2 className="text-sm font-medium text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Algorithm Animator
                </h2>
                <span className="text-xs text-gray-500">{isLoading ? "Simulating..." : trace.length > 0 ? "Ready" : "Idle"}</span>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                        <p className="text-xs text-blue-300">Analyzing Complexity...</p>
                    </div>
                )}

                {error ? (
                    <div className="text-red-400 text-center text-sm mt-10 p-4 border border-red-500/20 rounded bg-red-500/5">
                        {error}
                    </div>
                ) : (!trace.length && !complexity) ? (
                    <div className="text-gray-600 text-center mt-20 text-sm">
                        Type valid code to see it animate...
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* 1. Complexity Card */}
                        {complexity && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 rounded-lg p-3"
                            >
                                <div className="flex gap-4 mb-2">
                                    <div className="flex-1 bg-black/20 rounded p-2 text-center">
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Time Complexity</div>
                                        <div className="text-lg font-bold text-yellow-500">{complexity.time}</div>
                                    </div>
                                    <div className="flex-1 bg-black/20 rounded p-2 text-center">
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Space Complexity</div>
                                        <div className="text-lg font-bold text-purple-400">{complexity.space}</div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 italic text-center px-2">
                                    "{complexity.explanation}"
                                </p>
                            </motion.div>
                        )}

                        {/* 2. Visualization Canvas */}
                        {trace.length > 0 ? (
                            <div className="min-h-[200px] flex flex-col justify-center">
                                {/* Render Variables */}
                                {stepData?.variables && Object.entries(stepData.variables).map(([k, v]) => renderVariable(k, v))}

                                {/* Step Description */}
                                <div className="mt-4 p-3 bg-blue-500/10 border-l-2 border-blue-500 text-sm text-blue-200">
                                    {stepData?.description || "Initializing..."}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-10 text-sm">
                                <p>Complexity analysis complete.</p>
                                <p className="text-xs mt-1">No detailed animation steps generated for this code.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Playback Controls Footer */}
            <div className="p-3 bg-[#252526] border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Step {currentStep + 1} / {trace.length}</span>
                    <div className="flex gap-2">
                        <button onClick={() => { setIsPlaying(false); setCurrentStep(0); }} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:bg-blue-500 rounded text-white bg-blue-600 transition-colors">
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setCurrentStep(Math.min(trace.length - 1, currentStep + 1))} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        animate={{ width: `${((currentStep + 1) / trace.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

