"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Zap, Users, Code2, Sparkles, Play, LogIn, ChevronDown, CheckCircle2, ShieldCheck, Flame, Compass } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

import MotionWorkflowOverview from "./MotionWorkflowOverview";

const ROTATING_WORDS = ["Write.", "Debug.", "Visualize.", "Share.", "Execute."];

const FEATURE_CHIPS = [
  { label: "Cloud Execution", word: "Execute.", icon: Zap, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { label: "AI Visualizer", word: "Visualize.", icon: Sparkles, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { label: "10+ Compilers", word: "Write.", icon: Code2, color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  { label: "Global Snippets", word: "Share.", icon: Users, color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
];

const LANGUAGE_LOGOS = [
  { name: "JavaScript", logo: "/javascript.png" },
  { name: "TypeScript", logo: "/typescript.png" },
  { name: "Python", logo: "/python.png" },
  { name: "Java", logo: "/java.png" },
  { name: "C++", logo: "/cpp.png" },
  { name: "Go", logo: "/go.png" },
  { name: "Rust", logo: "/rust.png" },
  { name: "C#", logo: "/csharp.png" },
  { name: "Swift", logo: "/swift.png" },
  { name: "Ruby", logo: "/ruby.png" },
];

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);

  // Mouse spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Query Convex user to check if they have a skillLevel
  const convexUser = useQuery(
    api.users.getUser,
    isSignedIn && user?.id ? { userId: user.id } : "skip"
  );

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), 90);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length - 1)), 50);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  const handleChipClick = (word: string, label: string) => {
    setActiveChip(label);
    const targetIdx = ROTATING_WORDS.indexOf(word);
    if (targetIdx !== -1) {
      setWordIndex(targetIdx);
      setDisplayed(word);
      setIsDeleting(false);
    }
  };

  const handleStartCoding = () => {
    if (convexUser && !convexUser.skillLevel) {
      router.push("/onboarding");
      return;
    }
    const el = document.getElementById("editor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById("platform-simulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative w-full overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow Blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute -top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-8 flex flex-col items-center text-center gap-6">

        {/* Live Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-xs font-medium tracking-wide shadow-lg shadow-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block flex-shrink-0" />
          <span className="font-semibold text-white whitespace-nowrap">Cloud IDE v2.5</span>
          <span className="text-gray-400">·</span>
          <span className="whitespace-nowrap">10+ Compilers &amp; AI Logic Visualizer</span>
        </motion.div>

        {/* Floating Code Badges (Desktop) */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Floating Chip */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="hidden lg:flex absolute -left-6 top-2 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#12121a]/85 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-300 shadow-xl cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>fn solve() -&gt; Vec&lt;i32&gt;</span>
          </motion.div>

          {/* Center Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight select-none"
          >
            Code Smarter.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 text-transparent bg-clip-text">
              {displayed}
              <span className="text-blue-400 animate-pulse">|</span>
            </span>
          </motion.h1>

          {/* Right Floating Chip */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="hidden lg:flex absolute -right-6 top-2 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#12121a]/85 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono text-purple-300 shadow-xl cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>AI Flowchart: Step 3/4</span>
          </motion.div>
        </div>

        {/* Interactive Feature Pills (Clickable) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-xl"
        >
          {FEATURE_CHIPS.map((chip) => {
            const Icon = chip.icon;
            const isCurrent = activeChip === chip.label || displayed.startsWith(chip.word.slice(0, 3));
            return (
              <button
                key={chip.label}
                onClick={() => handleChipClick(chip.word, chip.label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isCurrent
                    ? `${chip.color} shadow-md shadow-blue-500/10 ring-1 ring-white/20`
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed"
        >
          A next-generation browser IDE with instant multi-language execution, step-by-step AI logic visualization, and a growing community snippet library.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          {isSignedIn ? (
            <button
              onClick={handleStartCoding}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Start Coding in Browser</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Sign In to Start Coding</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>
          )}

          {isSignedIn ? (
            <Link
              href="/snippets"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
            >
              <Code2 className="w-4 h-4 text-sky-400" />
              <span>Browse Snippets</span>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-gray-200 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Browse Snippets</span>
              </button>
            </SignInButton>
          )}

          {/* Quick Scroll To Interactive Simulator Button */}
          <button
            onClick={handleScrollToSimulator}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/15 text-blue-300 hover:text-blue-200 font-medium text-xs transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>Interactive Simulator</span>
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </button>
        </motion.div>

        {/* Free Tag for signed-out users */}
        {!isSignedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-2 text-xs text-gray-500 -mt-2"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free to use · Instant cloud execution · No credit card required</span>
          </motion.div>
        )}

        {/* Interactive Stats Cards with Glass Hover */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-1"
        >
          {/* Stat 1: Compilers */}
          <div className="group/stat relative p-3.5 rounded-2xl bg-[#12121a]/60 hover:bg-[#181826]/90 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg flex flex-col items-center text-center cursor-default">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover/stat:bg-blue-500/20 transition-colors">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">10+ Compilers</span>
            </div>
            <p className="text-[11px] text-gray-400 group-hover/stat:text-blue-300 transition-colors">
              Rust, Python, Go, C++, Java, JS &amp; TS
            </p>
          </div>

          {/* Stat 2: Snippets */}
          {isSignedIn ? (
            <Link
              href="/snippets"
              className="group/stat relative p-3.5 rounded-2xl bg-[#12121a]/60 hover:bg-[#181826]/90 border border-white/10 hover:border-sky-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg flex flex-col items-center text-center cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover/stat:bg-sky-500/20 transition-colors">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">500+ Snippets</span>
              </div>
              <p className="text-[11px] text-gray-400 group-hover/stat:text-sky-300 transition-colors">
                Star, Fork &amp; Discuss code globally
              </p>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full group/stat relative p-3.5 rounded-2xl bg-[#12121a]/60 hover:bg-[#181826]/90 border border-white/10 hover:border-sky-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg flex flex-col items-center text-center cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover/stat:bg-sky-500/20 transition-colors">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">500+ Snippets</span>
                </div>
                <p className="text-[11px] text-gray-400 group-hover/stat:text-sky-300 transition-colors">
                  Star, Fork &amp; Discuss code globally
                </p>
              </button>
            </SignInButton>
          )}

          {/* Stat 3: Community */}
          <div className="group/stat relative p-3.5 rounded-2xl bg-[#12121a]/60 hover:bg-[#181826]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.03] shadow-lg flex flex-col items-center text-center cursor-default">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover/stat:bg-purple-500/20 transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">1K+ Developers</span>
            </div>
            <p className="text-[11px] text-gray-400 group-hover/stat:text-purple-300 transition-colors">
              Coding across 40+ countries
            </p>
          </div>
        </motion.div>

        {/* Motion Intro Workflow Overview Simulator Anchor */}
        <div id="platform-simulator" className="w-full scroll-mt-20">
          <MotionWorkflowOverview />
        </div>

        {/* Language Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="w-full max-w-2xl overflow-hidden mt-1"
        >
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Supports 10+ languages</p>
          <div className="flex gap-5 animate-marquee whitespace-nowrap">
            {[...LANGUAGE_LOGOS, ...LANGUAGE_LOGOS].map((lang, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-200">
                  <img src={lang.logo} alt={lang.name} className="w-5 h-5 object-contain" />
                </div>
                <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">{lang.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Divider into editor */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" />
    </div>
  );
}
