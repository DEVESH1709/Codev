import { mutation,query } from "./_generated/server";
import {v} from "convex/values"

export const createSnippets =mutation({
args:{
    title:v.string(),
    language :v.string(),
    code:v.string(),
},

handler: async (ctx,args)=>{
    const identity= await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Not authenticated");

    const user = await ctx.db
    .query("users")
    .withIndex("by_user_id")
    .filter((q)=>q.eq(q.field("userId"), identity.subject))
    .first();

    if(!!user){
        throw new Error("User not found");

    }

    const sanippets =await ctx.db.insert("snippets",{
        userId:identity.subject,
       userName:user.name,
       title:args.title,
       language:args.language,
       code:args.code
    })
},
});

export const deleteSnippet =mutation({
    args:{
        snippetId:v.id("snippets"),
    },

    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const snippet =await ctx.db.get(args.snippetId);
        if(!snippet) throw new Error ("Snippet not found");

        if(snippet.userId!==identity.subject){
            throw new Error("You don't have permission to delete this snippet");
        }
        await ctx.db.delete(args.snippetId);

        const comments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();
   

      for (const comment of comments) {
        await ctx.db.delete(comment._id);
      }

      const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  }
})


export const getSnippets= query({
    handler:async(ctx)=>{
        const snippets =await ctx.db.query("snippets").order("desc");
        return snippets;

    }
})

export const isSnippetsStarred = query({
    args:{
        snippetsId:v.id("snippets")
    },
    handler:async(ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity) return false;

        const star = await ctx.db
        .query("stars")
        .withIndex("by_user_id_and_snippets_id")
        .filter(
            (q)=>q.eq(q.field("userId"),identity.subject) && q.eq(q.field("snippetsId"),args.snippetId)).first()
    return !!star;
    
        }
})



export const getSnippetsStarCount= query({

    args:{snippetsId:v.id("snippets")},
    handler:async(ctx,args)=>{
        const star =await ctx.db
        .query("stars")
        .withIndex("by_snippet_id")
        .filter((q)=>q.eq(q.field("snippetId"),args.snippetsId))
       .collect();

       return star.length;
    }
})