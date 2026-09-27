"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";

export default function OnboardingGuard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const convexUser = useQuery(
    api.users.getUser,
    isSignedIn && user?.id ? { userId: user.id } : "skip"
  );

  useEffect(() => {
    // Wait until auth and user data are fully loaded
    if (!isLoaded) return;
    if (!isSignedIn) return;
    if (convexUser === undefined) return; // still loading from Convex

    // If signed in but no skill level → redirect to onboarding
    if (convexUser && !convexUser.skillLevel) {
      router.push("/onboarding");
    }
  }, [isLoaded, isSignedIn, convexUser, router]);

  return null; // Invisible component, only handles redirect logic
}
