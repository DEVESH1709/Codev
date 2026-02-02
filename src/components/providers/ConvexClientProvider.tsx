"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { useEffect } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    // Explicitly set Convex auth to use Clerk JWT template 'convex'
    convex.setAuth(async () => {
      try {
        if (!isSignedIn) return undefined;
        const token = await getToken({ template: "convex" });
        return token ?? undefined;
      } catch {
        // If token retrieval fails, return undefined to avoid bad tokens
        return undefined;
      }
    });
  }, [getToken, isSignedIn]);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;