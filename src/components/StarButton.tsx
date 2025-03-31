import React from 'react'
import {Id} from "../../convex/_genrated/dataModel"
function StarButton({snippet}:{snippetId:Id<"snippets">}) {
      const {isSignedIn} = useAuth();
      
    const isStarred =useQuery(api.snippets.isSnippetsStarred,{snippetId});
    const starCount = usseQuery(api.snippet.getSnippetStarCount, {snippetId})
    return (
    <div>
      
    </div>
  )
}

export default StarButton
