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

  const isLarge = typeof window !== "undefined" ? window.innerWidth >= 1024 : false;

  return (
    <div ref={containerRef} className="relative max-w-[1800px] mx-auto p-4">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        style={isLarge ? { gridTemplateColumns: `${editorWidth}px 1fr` } : undefined}
      >
        <div>
          <EditorPanel />
        </div>

        <div>
          <OutputPanel />
        </div>
      </div>

      {isLarge && (
        <div
          onMouseDown={onMouseDown}
          className="absolute top-0 bottom-0 z-40 w-3 -translate-x-1/2 cursor-col-resize"
          style={{ left: editorWidth }}
          role="separator"
          aria-orientation="vertical"
        >
          <div className="h-full w-1 bg-transparent hover:bg-white/5 mx-auto" />
        </div>
      )}
    </div>
  );
}
