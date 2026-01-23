import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser"
import { Blocks, Code2, Sparkles } from "lucide-react";
import HeaderProfileBtn from "./HeaderProfileBtn";
import RunButton from "./RunButton";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { api } from "../../../../convex/_generated/api";

async function Header() {

  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });




  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center bg-[#0a0a0f]/80 backdrop-blur-xl p-4 mb-4 rounded-lg">

        {/* Mobile Layout (< 1024px) */}
        <div className="w-full flex flex-col gap-4 lg:hidden">
          {/* Row 1: Logo & Profile/Sign In */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">Codev</span>
                <span className="block text-xs text-blue-400/60 font-medium">Interactive Code Editor</span>
              </div>
            </Link>

            {/* Profile */}
            <HeaderProfileBtn />
          </div>

          {/* Row 2: Theme & Language */}
          <div className="flex items-center justify-center gap-4">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {/* Row 3: Snippets, Pro, Run */}
          <div className="flex items-center justify-center gap-2 md:gap-4 border-t border-gray-800/50 pt-4">
            <Link href="/snippets" className="group flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-gray-300 bg-gray-800/50 border border-gray-800 hover:border-blue-500/50 transition-all">
              <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-3 transition-transform" />
              <span className="text-xs md:text-sm font-medium">Snippets</span>
            </Link>

            {!convexUser?.isPro && (
              <Link href="/pricing" className="flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-lg border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 transition-all">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                <span className="text-xs md:text-sm font-medium text-amber-400">Pro</span>
              </Link>
            )}

            <SignedIn>
              <RunButton />
            </SignedIn>
          </div>
        </div>

        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:flex lg:flex-row items-center justify-between w-full gap-6">
          {/* Logo + Navigation */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="flex flex-col">
                <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  Codev
                </span>
                <span className="block text-xs text-blue-400/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Link
                href="/snippets"
                className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  Snippets
                </span>
              </Link>
            </nav>
          </div>

          {/* Right Side: Theme, Language, Pro, Run, Profile */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            {/* Theme & Language */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {/* Pro Button */}
            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">Pro</span>
              </Link>
            )}

            {/* Run Button */}
            <SignedIn>
              <RunButton />
            </SignedIn>

            {/* Profile */}
            <div className="pl-3 border-l border-gray-800">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
export default Header

