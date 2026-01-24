"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState, useEffect } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import { Editor } from "@monaco-editor/react";
import LogicVisualizer from "./LogicVisualiser";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const [currentCode,setCurrentCode] = useState("");
  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
    setCurrentCode(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
    setCurrentCode(defaultCode);
  };

  const handleEditorChange = (value: string | undefined) => {
    // if (value) localStorage.setItem(`editor-code-${language}`, value);
   if(typeof value =="string"){
    localStorage.setItem(`editor-code ${language}`, value);
    setCurrentCode(value);
   }
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500 hidden md:block">Write and execute your code</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

           { clerk.user&&<motion.button
             whileHover = {{scale :1.02}}
             whileTap={{ scale: 0.98 }}
              onClick={() => setIsDiagramOpen(!isDiagramOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden transition-all
                ${isDiagramOpen
                  ? "bg-blue-500/20 ring-1 ring-blue-500/50 text-blue-400"
                  : "bg-[#1e1e2e] hover:bg-[#2a2a3a] ring-1 ring-white/5 text-gray-400"
                }`}
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm font-medium">Visual</span>
            </motion.button>}

            {/* Share Button */}
            {clerk.user && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
              from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
              >
                <ShareIcon className="size-4 text-white" />
                <span className="text-sm font-medium text-white hidden md:block">Share</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Editor */}
          <div className={`grid gap-4 ${isDiagramOpen ? "grid-cols-2" : "grid-cols-1"}`}>
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          )
        }
         {!clerk.loaded && <EditorPanelSkeleton />}
          </div>

          {/* Logic Visualizer Panel */}
          {isDiagramOpen && (
            <LogicVisualizer
              language={language}
              code={currentCode}
            />
          )}
        </div>
      </div>


      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </div>
  );
}

export default EditorPanel;
