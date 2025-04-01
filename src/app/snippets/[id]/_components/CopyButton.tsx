"use client"
import { Check,Copy } from "lucide-react";
import { useState } from "react";
function CopyBuuton ({code}:{code:string}) {

    const [copied, setCopied] =useState(false);

    const copyToClipboard =async()=>{
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(()=>setCopied(false),2000)
    }
  return (
   <button
   onClick={copyToClipboard}
   type="button"
   className=" p-2 hover:bg-white/10 rounded-bg transition-all duration-200 group relative"
   >
 {copied ?(
    <Check className="size-4 text-green-400"></Check>
 ):(
    <Copy className="size-4 text-gray-400 group-hover:text-gray-300">

    </Copy>
 )

 }
   </button>
  )
}

export default CopyBuuton
