// import { v } from "convex/values"
// import { mutation, query } from "./_generated/server"

// export const syncUser = mutation({
//     args: {
//         userId: v.string(),
//         email: v.string(),
//         name: v.string(),
//     },

//     handler: async (ctx, args) => {
//         const existingUser = await ctx.db
//             .query("users")
//             .filter((q) => q.eq(q.field("userId"), args.userId))
//             .first();

//         if (!existingUser) {
//             await ctx.db.insert("users", {
//                 userId: args.userId,
//                 email: args.email,
//                 name: args.name,
//                 isPro: false,
//             })
//         }

//     }
// })

// export const getUser = query({
//     args: { userId: v.string() },

//     handler: async (ctx, args) => {
//         if (!args.userId) return null;

//         const user = await ctx.db
//             .query("users")
//             .withIndex("by_user_id")
//             .filter((q) => q.eq(q.field("userId"), args.userId))
//             .first();

//         if (!user) return null;
//         return user;
//     },
// });


// export const upgradeToPro = mutation({
//     args: {
//         email: v.string(),
//         lemonSqueezyCustomerId: v.string(),
//         lemonSqueezyOrderId: v.string(),
//         amount: v.string(),
//         userId: v.optional(v.string()),
//     },

//     handler: async (ctx, args) => {
//         const user = await ctx.db
//             .query("users")
//             .filter(q => q.eq(q.field("email"), args.email))
//             .first();

//         if (!user) throw new Error("User not found")

//         await ctx.db.patch(user._id, {
//             isPro: true,
//             proSince: Date.now(),
//             lemonSqueezyCustomerId: args.lemonSqueezyCustomerId,
//             lemonSqueezyOrderId: args.lemonSqueezyOrderId,

//         })

//         return { success: true }

//     },
// });

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },
});

export const getUser = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    if (!args.userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return null;

    return user;
  },
});

export const upgradeToPro = mutation({
  args: {
    email: v.string(),
    lemonSqueezyCustomerId: v.string(),
    lemonSqueezyOrderId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    // Normalize email for comparison
    const normalizedEmail = args.email?.toLowerCase().trim();

    // Try to find user by LemonSqueezy customer id first (if provided),
    // then fall back to email match.
    let user = null;
    if (args.lemonSqueezyCustomerId) {
      user = await ctx.db
        .query("users")
        .filter((q) =>
          q.eq(q.field("lemonSqueezyCustomerId"), args.lemonSqueezyCustomerId)
        )
        .first();
    }

    if (!user && normalizedEmail) {
      user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), normalizedEmail))
        .first();
    }

    if (!user) {
      console.log("upgradeToPro: user not found", {
        email: normalizedEmail,
        lemonSqueezyCustomerId: args.lemonSqueezyCustomerId,
      });
      return { success: false, error: "User not found", email: normalizedEmail };
    }

    await ctx.db.patch(user._id, {
      isPro: true,
      proSince: Date.now(),
      lemonSqueezyCustomerId: args.lemonSqueezyCustomerId,
      lemonSqueezyOrderId: args.lemonSqueezyOrderId,
    });

    return { success: true };
  },
});