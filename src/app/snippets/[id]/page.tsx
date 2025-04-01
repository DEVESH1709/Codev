"use client"
import {useParams} from "next/navigation";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
function page() {
    const snippetId =useParams().id;
 cosnt snippet =useQuery(api.snippets.getSnippetById,{snippetId: snippetId a Id<"snippets">});

if(snippet === undefined ) return <SnippetLoadingSkeleton></SnippetLoadingSkeleton>


  return (
    <div>

        
    </div>
  )
}

export default page
