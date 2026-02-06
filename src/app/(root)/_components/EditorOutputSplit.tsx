"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import useMounted from "@/hooks/useMounted";

export default function EditorOutputSplit() {
  const mounted = useMounted();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const { editorWidth, setEditorWidth } = useCodeEditorStore();

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
      <div
        className="grid grid-cols-1 lg:grid-cols-[var(--editor-width)_1fr] gap-4 flex-1 h-full min-h-0"
        style={{ "--editor-width": `${editorWidth}px` } as React.CSSProperties}
      >
        <div className="h-full min-h-0">
          <EditorPanel />
        </div>

        <div className="h-full min-h-0">
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
