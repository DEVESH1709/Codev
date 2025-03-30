"use client"
import {useUser} from "@clerk/nextjs"
function RunButton (){
   const {user} =useUser()
   const { runCode, language,isRunning, executionResult}= useCodeEditorStore();

   const handleRun =async ()=>{

   }
   return <div>RunButton</div>
}

export default RunButton;