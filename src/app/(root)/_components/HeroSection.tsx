"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Users, Code2, Sparkles, Play, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";

const ROTATING_WORDS = ["Write.", "Debug.", "Visualize.", "Share.", "Execute."];

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

const STATS = [
  { icon: Zap, label: "Languages", value: "10+" },
  { icon: Code2, label: "Community Snippets", value: "500+" },
  { icon: Users, label: "Developers", value: "1K+" },
];

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), 90);
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length - 1)), 50);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  const handleScrollToEditor = () => {
    const el = document.getElementById("editor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -top-20 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-8 flex flex-col items-center text-center gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          AI-Powered Code Editor — Run, Visualize &amp; Share
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          Code Smarter.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.h1>

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
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {isSignedIn ? (
            // Signed in → scroll to editor
            <button
              onClick={handleScrollToEditor}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Start Coding
            </button>
          ) : (
            // Signed out → open Clerk sign-in modal
            <SignInButton mode="modal">
              <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105">
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Sign In to Start Coding
              </button>
            </SignInButton>
          )}

          {isSignedIn ? (
            // Signed in → go to snippets page
            <Link
              href="/snippets"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
            >
              Browse Snippets
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            // Signed out → open sign-in modal
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105">
                Browse Snippets
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          )}
        </motion.div>

        {/* Auth hint for signed-out users */}
        {!isSignedIn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-xs text-gray-600 -mt-2"
          >
            Free to use · Sign in to save &amp; run code
          </motion.p>
        )}

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center gap-6 sm:gap-10 mt-2"
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 text-gray-400">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-white font-bold text-base">{value}</span>
              <span className="text-xs text-gray-500 hidden sm:inline">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Language Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="w-full max-w-2xl overflow-hidden mt-2"
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
