"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Play } from "lucide-react";

/**
 * Shown in the Header ONLY for signed-out users.
 * Renders a "Run Code" button that opens the Clerk sign-in modal instead of executing code.
 * Once signed in, Clerk refreshes the page and the real <RunButton /> appears via <SignedIn>.
 */
export default function SignInToRunButton() {
  const { isSignedIn } = useAuth();

  // Don't render anything for signed-in users — <RunButton> via <SignedIn> handles that
  if (isSignedIn) return null;

  return (
    <SignInButton mode="modal">
      <button
        className="group relative inline-flex items-center gap-2.5 px-4 py-2 md:px-5 md:py-2.5 focus:outline-none"
        title="Sign in to run code"
      >
        {/* Same gradient background as real RunButton */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

        <div className="relative flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4">
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
          </div>
          <span className="text-xs md:text-sm font-medium text-white/90 group-hover:text-white">
            <span className="lg:hidden">Run</span>
            <span className="hidden lg:inline">Run Code</span>
          </span>
        </div>
      </button>
    </SignInButton>
  );
}
