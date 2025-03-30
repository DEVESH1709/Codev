
import { LANGUAGE_CONFIG } from './../app/(root)/_constants';
import {create} from "zustand"
import { Monaco } from "@monaco-editor/react"
import { Languages } from 'lucide-react';
import { version } from 'os';


   
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
       const savedTheme =localStorage.getItem("editor-theme") || "vs-dark"
        const savedFontSize = localStorage.getItem("editor-font-size") || 16
        return {
            language:savedLanguage,
            theme:savedTheme,
            fontSize:Number(savedFontSize),
        }
  }

export const useCodeEditorStore = craete<CodeEditorState>((set,get)){


   const initialState= getInitialState();
   

    return{
 ...initialState,
 output:"",
 isRunning:false,
 error:null,
 editor:null,
 executionResult:null,

 getCode:()=> get().editor?.getValue()||"",

 setEditor: (editor:Monaco)=>{
    const savedCode= localStorage.getItem(`editor-code-${get().language}`)
    if(savedCode) editor.setValue(savedCode);

    set({editor});
 },

 setTheme: (theme: string) => {
    localStorage.setItem("editor-theme", theme);
    set({ theme });
  },


  setFontSize: (fontSize: number) => {
    localStorage.setItem("editor-font-size", fontSize.toString());
    set({ fontSize });
  },

  setLanguage: (language: string) => {
    // Save current language code before switching
    const currentCode = get().editor?.getValue();
    if (currentCode) {
      localStorage.setItem(`editor-code-${get().language}`, currentCode);
    }

    localStorage.setItem("editor-language", language);

    set({
      language,
      output: "",
      error: null,
    });
    },

    runCode: async () => {
        const [language,getCode] = get();
        const code =getCode();

        if(!code){
            set({error: "Please enter some code"})
            return
        }

        set ({isRunning :true, error :null, ouytput :"" })

        try{
              const runtime =LANGUAGE_CONFIG[language].pistonRuntime;
              const response =await fetch ("https://emkc.org/api/v2/position/execute",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language:runtime.language,
                    version:runtime.version,
                    files:[{content:code}]
              })

              const data =await response.json();

              console.log("data back from piston",data);

              // handling API-level errors

              if(data.message){
                set({error: data.message, executionResult:{code,output:"",error:data.message}})
                return
              }

              // handling compilation error
              if(data.compile && data.compile.code!==0){
                const error =data.compile.stderr || data.compile.output;
                set({
                    error,executionResult:{
                        code,
                        output:"",
                        error
                    }
                })
                return
              }
        } catch(error){

        }
    }
  
};
});