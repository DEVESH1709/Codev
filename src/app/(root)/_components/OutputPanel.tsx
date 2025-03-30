"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";

function OutputPanel(){
  const [output,error,isRunning ]= useCodeEditorStore();
  const [isCopied,setIsCopied]= useState(false)

  const hasContent =error || output

  const handleCopy = async ()=>{
    if(!hasContent()) return 
    await navigator.clipboard.write(error || output)
    setIsCopied(true)

    setTimeout(()=>{
        setIsCopied(false);
    },2000);
  }

  return 
  <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
  {/* Header */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
        <Terminal className="w-4 h-4 text-blue-400" />
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
            <CheckCircle className="w-3.5 h-3.5" />
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

  
  </div>
}

export default OutputPanel;