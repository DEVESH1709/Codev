import { LANGUAGE_CONFIG } from './../app/(root)/_constants';
import {create} from "zustand"
import { Monaco } from "@monaco-editor/react"
import { Languages } from 'lucide-react';

export const useCodeEditorStore =create <CodeEditorState>((set,get)=>{
    
   
   // initialy kuch values set hongi
   
  const getInitialState=()=>{
        if(typeof window==="undefined"){
            return {
              language  :"javascript",
              fontsize:16,
              theme:"vs-dark",
            }
        }
        const savedLanguage= localStorage.getItem("editor-language")|| "javascript";

        return {
            language:savedLanguage,
            theme:
        }
  }


   const initialState= getInitialState();
    return{

    }
})