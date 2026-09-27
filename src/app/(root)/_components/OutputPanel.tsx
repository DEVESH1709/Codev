"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
  Code2,
  Play,
  Loader2,
} from "lucide-react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning, stdin, setStdin, mobileTab, setMobileTab, runCode } =
    useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div data-tour="input-output" className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50 h-full flex flex-col">
      {/* Mobile Quick Action Bar (Visible only on mobile < lg) */}
      <div className="flex lg:hidden items-center justify-between pb-3 border-b border-white/5 mb-3">
        <button
          onClick={() => setMobileTab("editor")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-all active:scale-95"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>← Back to Code</span>
        </button>

        <SignedIn>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </SignedIn>
      </div>

      <div className="flex flex-col space-y-4 h-full">
        {/* Input Area (Hidden on mobile if user selected Output tab) */}
        <div className={`relative ${mobileTab === "output" ? "hidden lg:block" : "block"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
                <Terminal className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-300">Custom Input (stdin)</span>
            </div>
            {stdin && (
              <button
                onClick={() => setStdin("")}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[440px] lg:h-[425px] overflow-auto font-mono text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="e.g. 5&#10;hello&#10;world"
              className="w-full h-full bg-transparent text-gray-300 focus:outline-none resize-none placeholder:text-gray-600"
            />
          </div>

          {/* Quick Run with Input Button on Mobile (only when signed in) */}
          <SignedIn>
            <div className="mt-3 flex lg:hidden items-center justify-between">
              <span className="text-xs text-gray-500">Provide input to your program</span>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run with Input
              </button>
            </div>
          </SignedIn>
        </div>

        {/* Output Area (Hidden on mobile if user selected Input tab) */}
        <div className={`relative ${mobileTab === "input" ? "hidden lg:block" : "block"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-gray-300">Output</span>
            </div>
            {hasContent && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e]
                    rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          <div
            className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244]
            rounded-xl p-4 h-[480px] lg:h-[425px] overflow-auto font-mono text-sm"
          >
            {isRunning ? (
              <RunningCodeSkeleton />
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>
                  <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
                </div>
              </div>
            ) : output ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Execution Successful</span>
                </div>
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-center">Run your code to see the output here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;