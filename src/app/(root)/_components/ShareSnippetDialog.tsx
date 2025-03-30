import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import React from 'react'
import { useState } from 'react';
function ShareSnippetDialog({onClose}:{onClose:()=>void }) {
  const [title, setTitle] =useState("");
  const [isSharing,setIsSharing] =useState(false);
  const [language,getCode ]= useCodeEditorStore();

 
    return (
    <div>
      
    </div>
  )
}

export default ShareSnippetDialog
