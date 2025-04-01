"use client"
import {useParams} from "next/navigation";
function page() {
    const snippetId =useParams().id;
 cosnt snippet =useQuery(api.snippets.getSnippetById,{snippetId: snippetId a Id<"snippets">});

if(snippet === undefined ) return <SnippetLoadingSkeleton></SnippetLoadingSkeleton>


  return (
    <div>
      snippet detail page
    </div>
  )
}

export default page
