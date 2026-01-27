"use client"

import { useRef, useState, useEffect } from "react";
import { Loader2, Play, Pause, ChevronRight, ChevronLeft, RotateCcw, Network, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TraceStep {
    id: number;
    line: number;
    action: string;
    variables: Record<string, any>;
    highlightIndices?: number[];
    flowchartNodeId?: string;
    description: string;
}

interface ComplexityData {
    time: string;
    space: string;
    explanation: string;
}
interface LogicVisualizerProps {
    code: string;
    language: string;
}


export default function LogicVisualizer({ code, language }: LogicVisualizerProps) {

    const [trace, setTrace] = useState<TraceStep[]>([]);
    const [complexity, setComplexity] = useState<ComplexityData | null>(null);
    const [svgChart, setSvgChart] = useState("");
    const [activeTab, setActiveTab] = useState<"trace" | "flowchart">("trace");
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState((false));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [pointerPosition, setPointerPosition] = useState<{ top: number; left: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Handle Active Node Highlighting for SVG
    useEffect(() => {
        if (activeTab === "flowchart") {
            // Reset all active nodes
            document.querySelectorAll('.active-node').forEach(el => el.classList.remove('active-node'));
            setPointerPosition(null);

            const activeNodeId = trace[currentStep]?.flowchartNodeId;
            if (activeNodeId) {
                // Try to find the node by ID directly (e.g. #node-A)
                const node = document.getElementById(activeNodeId);
                const container = containerRef.current;

                if (node && container) {
                    node.classList.add("active-node");

                    // Allow time for transition or layout stability
                    requestAnimationFrame(() => {
                        const nodeRect = node.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();

                        // Calculate position relative to container
                        // Position arrow to the left of the node, centered vertically
                        const relativeTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);
                        const relativeLeft = nodeRect.left - containerRect.left;

                        setPointerPosition({ top: relativeTop, left: relativeLeft });

                        // Optional: Scroll to view
                        node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                    });
                }
            }
        }
    }, [currentStep, activeTab, trace]);



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
                setSvgChart(data.svgChart || "");

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
        <div className="h-full flex flex-col bg-[#1e1e1e] rounded-xl border border-white/[0.05] overflow-hidden shadow-2xl relative">
            <style jsx global>{`
                .active-node rect, 
                .active-node circle, 
                .active-node polygon, 
                .active-node path {
                    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
                    stroke: white !important;
                    stroke-width: 2px !important;
                    transition: all 0.3s ease;
                }
                .active-node {
                    filter: brightness(1.3);
                    transform: scale(1.02);
                    transition: all 0.3s ease;
                    transform-origin: center;
                }
                .svg-container svg {
                    width: 100%;
                    height: 100%;
                    max-height: 100%;
                }
            `}</style>
            {/* Header */}
            {/* Header with Tabs */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#252526]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setActiveTab("trace")}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === "trace" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${activeTab === "trace" ? "bg-green-500 animate-pulse" : "bg-transparent"}`} />
                        Trace
                    </button>

                    <button
                        onClick={() => setActiveTab("flowchart")}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${activeTab === "flowchart" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        <Network className="w-4 h-4" />
                        Flowchart
                    </button>
                </div>
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
                        {activeTab === "trace" ? (
                            <>
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
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[300px] overflow-auto relative" ref={containerRef}>
                                {svgChart ? (
                                    <>
                                        <div
                                            className="w-full h-full flex justify-center p-4 svg-container"
                                            dangerouslySetInnerHTML={{ __html: svgChart }}
                                        />

                                        {/* Animated Pointer Arrow */}
                                        <AnimatePresence>
                                            {pointerPosition && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0, top: pointerPosition.top, left: pointerPosition.left }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    className="absolute z-50 pointer-events-none"
                                                    style={{ transform: 'translate(-100%, -50%)' }} // Center vertically, offset to left
                                                >
                                                    <div className="flex items-center">
                                                        <ArrowRight className="w-6 h-6 text-yellow-500 fill-yellow-500 drop-shadow-md" strokeWidth={2.5} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-sm">No flowchart generated.</p>
                                )}
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

