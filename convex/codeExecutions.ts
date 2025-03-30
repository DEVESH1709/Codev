
import {mutation} from "./_generated/server"
import {ConvexError,v} from "convex/values";

export const saveExecution= mutation({
    args:{
        language:v.string(),
        code:v.string(),
        
        output:v.optional(v.string()),
        error:v.optional(v.string()),
    },
    handler: async (ctx,args)=>{
        const identity =await ctx.auth.getUserIdentity()
        if(!identity) throw new ConvexError("Not autthentication")
    
            const user= await ctx.db
            .query("users")
            .withIndex("by_user_id")
            .filter((q)=> q.eq(q.field("userId"),identity.subject))
            .first();

            if(!user?.isPro && args.language!=="javascript"){
                throw new ConvexError("Only pro users can use this feature")
            }
           await ctx.db.insert("codeExecutions",{
            ...args,
            userId:identity.subject,
           })



    }
})