import React from 'react'

interface CommentProps{
    comment:{
        _id:Id<"snippetComments">;
        _creationTime:number;
        userId:string;
        userName:string;
        snippetId :Id<"snippets">;
        content:string;
    };

    onDelete:(commentId:Id<"snippettComments">)=> void;
        isDeleting :boolean;
        currentUserrId?:string;
    
}

function Comment({comment,currentUserId, isDeleting, onDelete} :CommentProps) {
  return (
    <div>
      
    </div>
  )
}

export default Comment
