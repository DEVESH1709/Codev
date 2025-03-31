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