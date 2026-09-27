"use client";

import React, { useEffect, useRef } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import useMounted from "@/hooks/useMounted";
import { Code2, Terminal, FileInput } from "lucide-react";

export default function EditorOutputSplit() {
  const mounted = useMounted();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const { editorWidth, setEditorWidth, mobileTab, setMobileTab, isRunning, output, error, stdin } =
    useCodeEditorStore();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const min = 320;
      const max = Math.max(320, window.innerWidth - 320);
      let newWidth = e.clientX - rect.left;
      newWidth = Math.max(min, Math.min(newWidth, max));
      setEditorWidth(newWidth);
    };

    const onMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [setEditorWidth]);

  const onMouseDown = () => {
    draggingRef.current = true;
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full flex-1 flex flex-col min-h-0">
      {/* Mobile Tab Switcher (Visible only on mobile/tablets < lg) */}
      <div className="flex lg:hidden items-center justify-between p-1.5 mb-3 bg-[#181825]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            mobileTab === "editor"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Code</span>
        </button>

        <button
          onClick={() => setMobileTab("input")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            mobileTab === "input"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileInput className="w-4 h-4" />
          <span>Input</span>
          {stdin?.trim() ? (
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          ) : null}
        </button>

        <button
          onClick={() => setMobileTab("output")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all relative ${
            mobileTab === "output"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Output</span>
          {isRunning ? (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          ) : error ? (
            <span className="w-2 h-2 rounded-full bg-red-400" />
          ) : output ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          ) : null}
        </button>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[var(--editor-width)_1fr] gap-4 flex-1 h-full min-h-0"
        style={{ "--editor-width": `${editorWidth}px` } as React.CSSProperties}
      >
        <div className={`h-full min-h-0 ${mobileTab === "editor" ? "block" : "hidden lg:block"}`}>
          <EditorPanel />
        </div>

        <div className={`h-full min-h-0 ${mobileTab !== "editor" ? "block" : "hidden lg:block"}`}>
          <OutputPanel />
        </div>
      </div>

      <div
        onMouseDown={onMouseDown}
        className="hidden lg:block absolute top-0 bottom-0 z-40 w-3 -translate-x-1/2 cursor-col-resize hover:w-4 transition-all"
        style={{ left: editorWidth }}
        role="separator"
        aria-orientation="vertical"
      >
        <div className="h-full w-1 bg-white/5 hover:bg-blue-500/50 mx-auto rounded-full transition-colors" />
      </div>
    </div>
  );
}
