import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";


function Comments({snippetId}:{anippetsId:Id<"snippets">}){
    const user =useUser();
    const {isSubmitting, setIsSubmitting} = useState(false);
    const [deleteCommentId,setDeleteCommentId] =useState<string |null>(null);
    
    const comments =useQuery(api.snippets.getComments,(snippetId));
    const addComment = useMutation (api.snippets.addComment);
    const deleteComment = useMutation(api.snippets.deleteComment);
  
const handleSubmitComment =async(content:string)=>{
 setIsSubmitting(true);

 try{
await addComment({snippetId,content})
 }catch(error){
    console.log("Error adding comment:",error);
    toast.error("Something went wrong ")
 } finally{
    setIsSubmitting(false);
 }
}
const handleDeleteComment =async(commentId:Id <"snippetComments">)=>{
  setDeleteCommentId(commentId);

  try{
await deleteComment({commentId});
  }catch(error){
    console.log("Error deleting comment:",error);
   toast.error("Something went wrong");

  }finally{
    setDeleteCommentId(null);
  }
}

    return <div>Comments</div>

}
export default Comments;