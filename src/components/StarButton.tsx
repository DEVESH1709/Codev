import React from 'react'
import {Id} from "../../convex/_genrated/dataModel"
function StarButton({snippet}:{snippetId:Id<"snippets">}) {
      const {isSignedIn} = useAuth();

    const isStarred =useQuery(api.snippets.isSnippetsStarred,{snippetId});
    const starCount = usseQuery(api.snippet.getSnippetStarCount, {snippetId})
    const star = useMutation(api.snippets.starSnippet)

    const handleStar = async()=>{
        if(!isSignedIn) return ;
        await star({snippetId});
    }
    
    
    return (
        <button
        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
      transition-all duration-200 ${
        isStarred
          ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
      }`}
        onClick={handleStar}
      >

<Star
        className={`w-4 h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
      />
      <span className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}>
        {starCount}
      </span>
      </button>
  )
}

export default StarButton
