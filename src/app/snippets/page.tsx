"use client"

import { useState } from "react";


function SnippetsPage(){
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery,setSearchQuery]= useState("");
  const [selectedLanguage, setSelectedLanguage] =useState<string|| null>(null);
const [view,setView] = useState <"grid" | "list">("grid");
  

if(snippets==undefined){


return (
<div className="min-h-screen">

    <NavigationHeader></NavigationHeader>
    <SnippetsPageSkeleton></SnippetsPageSkeleton>
</div>
  )
}
}

export default SnippetsPage;
