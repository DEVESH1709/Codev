"use client"
import {useParams} from "next/navigation";
function page() {
    const snippetId =useParams().id;
    console.log ({snippetId});
  return (
    <div>
      snippet detail page
    </div>
  )
}

export default page
