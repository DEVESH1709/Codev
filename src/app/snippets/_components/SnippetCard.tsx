
"use client";
import {Snippet} from"@/types"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";

import {motion} from "framer-motion"

function SnippetCard({snippet}:{snippet:Snippet}){
  const {user}=useUser();


   const deleteSnippe =useMutation(api.snippets.deleteSnippet)
  const [isDeleting,setDeleting] =usetate(false);
  
  const handleDelete =async()=>{

  }

  return 

    
}
export default SnippetCard;