import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedIn } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-auto flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
              <Link href="/" className="flex items-center gap-3 group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                  <Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="relative">
                  <span className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                    Codev
                  </span>
                  <span className="block text-xs sm:text-sm text-blue-400/60 font-medium">
                    Interactive Code Editor
                  </span>
                </div>
              </Link>

              <Link
                href="/snippets"
                className="relative group flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
                border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  Snippets
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex justify-between items-center w-full sm:w-auto gap-3 sm:gap-4">
              <SignedIn>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-amber-500/20
                   hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                  to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                  duration-300"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                  <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                    Pro
                  </span>
                </Link>
              </SignedIn>

              <div className="ml-auto">
                <HeaderProfileBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
