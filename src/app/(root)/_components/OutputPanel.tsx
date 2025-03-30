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
  
}

export default OutputPanel;