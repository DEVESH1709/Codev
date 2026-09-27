"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Play,
  Sparkles,
  Trophy,
  Share2,
  Terminal,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
  Globe2,
  Flame,
  Star,
  Copy,
  Crown,
  Activity,
  Check,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useAuth, SignInButton } from "@clerk/nextjs";

interface Scene {
  id: string;
  number: string;
  label: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  accentGradient: string;
  glowColor: string;
  ctaText: string;
  ctaHref?: string;
  isScrollTarget?: boolean;
  requiresAuth?: boolean;
}

const SCENES: Scene[] = [
  {
    id: "code",
    number: "01",
    label: "Code & Themes",
    tagline: "Full-Featured Multi-Language IDE with 10+ Compilers & Custom Themes",
    badge: "10+ Compilers · Monaco Engine",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    accentGradient: "from-blue-600 via-indigo-600 to-purple-600",
    glowColor: "rgba(59, 130, 246, 0.28)",
    ctaText: "Jump to Editor",
    isScrollTarget: true,
  },
  {
    id: "execute",
    number: "02",
    label: "Cloud Engine",
    tagline: "High-Speed Sandboxed Cloud Execution with Custom Stdin & Stdout",
    badge: "0ms Setup · Sandboxed Isolation",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    accentGradient: "from-emerald-600 via-teal-600 to-blue-600",
    glowColor: "rgba(16, 185, 129, 0.28)",
    ctaText: "Try Cloud Execution",
    isScrollTarget: true,
  },
  {
    id: "visualize",
    number: "03",
    label: "AI Visualizer",
    tagline: "Interactive Flowcharts & Variable Memory Trace Simulator",
    badge: "Step-by-Step AI Breakdown",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    accentGradient: "from-amber-600 via-orange-600 to-red-600",
    glowColor: "rgba(245, 158, 11, 0.28)",
    ctaText: "Explore Visualizer",
    isScrollTarget: true,
  },
  {
    id: "snippets",
    number: "04",
    label: "Snippet Hub",
    tagline: "Publish, Star, Fork & Discuss Code Solutions Globally",
    badge: "Community Hub · 1-Click Fork",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    accentGradient: "from-sky-600 via-cyan-600 to-indigo-600",
    glowColor: "rgba(14, 165, 233, 0.28)",
    ctaText: "Browse Snippets",
    ctaHref: "/snippets",
    requiresAuth: true,
  },
  {
    id: "profile",
    number: "05",
    label: "Profile & Stats",
    tagline: "365-Day Activity Heatmap, Code Run Analytics & Language Breakdown",
    badge: "Activity Heatmap · Analytics",
    badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    accentGradient: "from-teal-600 via-emerald-600 to-cyan-600",
    glowColor: "rgba(20, 184, 166, 0.28)",
    ctaText: "View Profile",
    ctaHref: "/profile",
    requiresAuth: true,
  },
  {
    id: "pro",
    number: "06",
    label: "Pro Benefits",
    tagline: "Lifetime Access at ₹99: Unlimited AI Runs, Priority Execution & Pro Badge",
    badge: "₹99 Lifetime · Unlimited Power",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    accentGradient: "from-yellow-500 via-amber-500 to-purple-600",
    glowColor: "rgba(234, 179, 8, 0.28)",
    ctaText: "Get Pro Access",
    ctaHref: "/pricing",
  },
  {
    id: "practice",
    number: "07",
    label: "Practice & Rank",
    tagline: "Gamified Challenges from Beginner to Advanced with Verified Badges",
    badge: "15 Challenges · Skill Badges",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    accentGradient: "from-purple-600 via-pink-600 to-rose-600",
    glowColor: "rgba(168, 85, 247, 0.28)",
    ctaText: "Start Practice",
    ctaHref: "/?practice=true",
  },
];

const SCENE_DURATION = 3600; // 3.6 seconds per scene (snappy & brisk)

export default function MotionWorkflowOverview() {
  const { isSignedIn } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * SCENE_DURATION;

    const loop = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / SCENE_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= SCENE_DURATION) {
        setProgress(0);
        setCurrentIdx((prev) => (prev + 1) % SCENES.length);
        startTimeRef.current = Date.now();
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isHovered, currentIdx, progress]);

  const handleSelectScene = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setProgress(0);
    setIsPlaying(true);
    startTimeRef.current = Date.now();
  };

  const currentScene = SCENES[currentIdx];

  const handleScrollToEditor = () => {
    const el = document.getElementById("editor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-8 mb-6">
      {/* Outer Glow Wrapper */}
      <div
        className="relative rounded-2xl sm:rounded-3xl p-[1px] transition-all duration-700 shadow-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${currentScene.glowColor}, transparent 75%)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Card Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0f0f17]/95 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col">
          {/* Top Window Bar (macOS style) */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="hidden sm:inline-block text-xs font-mono text-gray-500 ml-3">
                codev-workflow-simulator · v2.0
              </span>
            </div>

            {/* Play/Pause & Reset Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs flex items-center gap-1.5"
                title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current text-blue-400" />}
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Resume"}</span>
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs"
                title="Restart from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Scene Navigation Tabs with Horizontal Scroll & Progress Bars */}
          <div className="flex sm:grid sm:grid-cols-7 overflow-x-auto no-scrollbar border-b border-white/5 bg-black/20 text-xs font-medium divide-x divide-white/5">
            {SCENES.map((scene, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(idx)}
                  className={`relative py-3 px-3 sm:px-2 min-w-[100px] sm:min-w-0 text-center transition-all flex flex-col items-center justify-center gap-1 flex-shrink-0 ${
                    isActive
                      ? "text-white bg-white/[0.05]"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Top Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
                    {isActive ? (
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: `${progress}%` }}
                      />
                    ) : idx < currentIdx ? (
                      <div className="h-full w-full bg-emerald-500/60" />
                    ) : null}
                  </div>

                  <span className="font-mono text-[10px] text-gray-500">{scene.number}</span>
                  <span className="truncate max-w-full font-semibold text-[11px]">
                    {scene.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Scene Stage */}
          <div className="relative min-h-[390px] sm:min-h-[430px] p-4 sm:p-7 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              {currentIdx === 0 && <SceneOneCode key="scene-0" />}
              {currentIdx === 1 && <SceneTwoExecute key="scene-1" />}
              {currentIdx === 2 && <SceneThreeVisualize key="scene-2" />}
              {currentIdx === 3 && <SceneFourSnippets key="scene-3" />}
              {currentIdx === 4 && <SceneFiveProfile key="scene-4" />}
              {currentIdx === 5 && <SceneSixPro key="scene-5" />}
              {currentIdx === 6 && <SceneSevenPractice key="scene-6" />}
            </AnimatePresence>

            {/* Bottom Scene Info Bar */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${currentScene.badgeColor}`}>
                  {currentScene.badge}
                </span>
                <span className="text-gray-300 font-medium hidden sm:inline">
                  {currentScene.tagline}
                </span>
              </div>

              {currentScene.isScrollTarget ? (
                <button
                  onClick={handleScrollToEditor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-xs transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>{currentScene.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-blue-400" />
                </button>
              ) : currentScene.requiresAuth && !isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs transition-all hover:scale-105 active:scale-95 shadow-md group">
                    <span>{currentScene.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </SignInButton>
              ) : (
                <Link
                  href={currentScene.ctaHref || "/"}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs transition-all hover:scale-105 active:scale-95 shadow-md group"
                >
                  <span>{currentScene.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCENE 01: WRITE & STYLE ──────────────────────────────────────────
function SceneOneCode() {
  const codeLines = [
    'fn two_sum(nums: &[i32], target: i32) -> Vec<usize> {',
    '    let mut map = std::collections::HashMap::new();',
    '    for (i, &num) in nums.iter().enumerate() {',
    '        if let Some(&j) = map.get(&(target - num)) {',
    '            return vec![j, i]; // Target pair found!',
    '        }',
    '        map.insert(num, i);',
    '    }',
    '    vec![]',
    '}',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Code Editor Mockup */}
        <div className="md:col-span-7 bg-[#14141f] rounded-xl border border-white/10 p-4 font-mono text-xs sm:text-[13px] leading-relaxed shadow-lg overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/5 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5 text-blue-400">
              <Code2 className="w-3.5 h-3.5" /> main.rs (Rust 1.82)
            </span>
            <span className="text-gray-500">UTF-8 · Tab Size: 4</span>
          </div>

          <div className="space-y-1">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.2 }}
                className="flex items-start gap-3"
              >
                <span className="text-gray-600 select-none text-[11px] w-4 text-right">{i + 1}</span>
                <span className={
                  line.includes("fn") || line.includes("let") || line.includes("return") || line.includes("for")
                    ? "text-purple-400"
                    : line.includes("HashMap") || line.includes("Vec")
                    ? "text-blue-400 font-semibold"
                    : line.includes("//")
                    ? "text-emerald-400/80 italic"
                    : "text-gray-300"
                }>
                  {line}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Floating Feature Cards */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20"
          >
            <h4 className="text-xs font-semibold text-blue-300 flex items-center gap-2 mb-1">
              <Globe2 className="w-4 h-4 text-blue-400" />
              10+ Native Compilers
            </h4>
            <p className="text-[11px] text-gray-400">
              Switch between Rust, Python, Go, C++, Java, JS, and TypeScript with pre-configured templates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20"
          >
            <h4 className="text-xs font-semibold text-purple-300 flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-purple-400" />
              Themes &amp; Font Customization
            </h4>
            <p className="text-[11px] text-gray-400">
              Pick Monokai, Dracula, VS-Dark, or GitHub Dark with smooth ligatures and slider scaling.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 02: INSTANT CLOUD EXECUTION ────────────────────────────────
function SceneTwoExecute() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Animated Trigger Bar */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Cloud Compiler Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Active 🟢
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every keystroke runs inside an isolated sandbox container. No local environment setup or configuration required.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/25"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executed via Wandbox / Piston (142ms)</span>
            </motion.div>
          </div>
        </div>

        {/* Right: Live Terminal Window */}
        <div className="md:col-span-7 bg-[#0d1117] rounded-xl border border-white/10 p-4 font-mono text-xs shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" /> Output Console
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Success (Exit Code: 0)
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 text-gray-300"
          >
            <div className="text-gray-500 text-[11px]">$ rustc main.rs &amp;&amp; ./main</div>
            <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 font-mono">
              [✓] Program Input: target = 9, nums = [2, 7, 11, 15]
              <br />
              [⚡] Result Indices: [0, 1]
              <br />
              [✓] Verification: 2 + 7 == 9 (Match!)
            </div>
            <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
              <span>Memory: 2.1 MB</span>
              <span>CPU Time: 0.08s</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 03: AI LOGIC VISUALIZER ────────────────────────────────────
function SceneThreeVisualize() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Flowchart Simulator */}
        <div className="md:col-span-7 bg-[#14141f] rounded-xl border border-white/10 p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-xs">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Algorithmic Flowchart
            </span>
            <span className="text-[11px] text-gray-400">Step 3 of 4</span>
          </div>

          {/* Interactive Flowchart Nodes */}
          <div className="flex flex-col items-center gap-3 py-1">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-mono font-medium shadow-sm"
            >
              Start: Iterate through Array
            </motion.div>

            <div className="w-0.5 h-3 bg-amber-500/50" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="px-4 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium shadow-sm flex items-center gap-2"
            >
              <span>Check: map.has(target - num)?</span>
            </motion.div>

            <div className="w-0.5 h-3 bg-emerald-500/50" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-4 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-md"
            >
              ✓ Found: Return Pair [0, 1]
            </motion.div>
          </div>
        </div>

        {/* Right: Variable Memory Trace Table */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Live Memory Trace
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between p-1.5 rounded bg-black/30 border border-white/5">
                <span className="text-gray-400">target</span>
                <span className="text-white font-bold">9</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/30 border border-white/5">
                <span className="text-gray-400">current_num</span>
                <span className="text-blue-300 font-bold">7</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-black/30 border border-white/5">
                <span className="text-gray-400">complement</span>
                <span className="text-emerald-300 font-bold">2 (Found at index 0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 04: SNIPPETS HUB & COMMUNITY ────────────────────────────────
function SceneFourSnippets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Snippet Card Mockup */}
        <div className="md:col-span-7 bg-[#14141f] rounded-xl border border-white/10 p-4 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                DK
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="text-xs font-bold text-white">Kadane&apos;s Max Subarray</h5>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">by @devesh · 42 forks</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>128 Stars</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-gray-300 mb-3">
            <span className="text-purple-400">fn</span> max_sub_array(nums: &amp;[i32]) -&gt; i32 &#123;
            <br />
            &nbsp;&nbsp;nums.iter().fold((0, i32::MIN), |(cur, max), &amp;x| ...
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-mono">#rust</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">#algorithms</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-gray-400">
                <MessageSquare className="w-3 h-3" /> 14
              </span>
              <span className="flex items-center gap-1 text-blue-400 font-medium">
                <Copy className="w-3 h-3" /> 1-Click Fork
              </span>
            </div>
          </div>
        </div>

        {/* Right: Snippet Features Breakdown */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <h4 className="text-xs font-bold text-sky-300 mb-1 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" /> 1-Click Instant Share
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Publish your editor solutions directly to the community with syntax tags and description.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
              <Star className="w-4 h-4" /> Star &amp; Bookmark
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Star insightful community algorithms to curate your personal code reference library.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 05: DEVELOPER PROFILE & HEATMAP ────────────────────────────
function SceneFiveProfile() {
  // Mock contribution data (7 columns x 5 rows)
  const heatmapCols = [
    [1, 2, 0, 3, 1],
    [2, 3, 2, 4, 3],
    [0, 1, 3, 2, 0],
    [3, 4, 4, 3, 2],
    [1, 2, 1, 0, 1],
    [4, 3, 4, 4, 3],
    [2, 4, 3, 2, 4],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: User Stats Card */}
        <div className="md:col-span-6 bg-[#14141f] rounded-xl border border-white/10 p-4 sm:p-5 shadow-xl">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-teal-500/30">
                DK
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full text-white shadow-md">
                <Zap className="w-2.5 h-2.5 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">Devesh Kesharwani</h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-gray-400">@devesh · Full Stack &amp; Systems</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 block">Total Runs</span>
              <span className="text-sm font-bold text-teal-400">248</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 block">Starred</span>
              <span className="text-sm font-bold text-amber-400">36</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] text-gray-400 block">Languages</span>
              <span className="text-sm font-bold text-blue-400">7</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-between text-xs">
            <span className="text-gray-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" /> Favorite Language:
            </span>
            <span className="font-mono font-bold text-teal-300">Rust 🦀 (46%)</span>
          </div>
        </div>

        {/* Right: Activity Heatmap Showcase */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#181826] to-[#12121a] rounded-xl border border-teal-500/30 p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> 365-Day Coding Activity
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              🔥 21-Day Streak
            </span>
          </div>

          {/* Heatmap Grid Simulation */}
          <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center gap-1.5 mb-3">
            {heatmapCols.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {col.map((intensity, rowIdx) => {
                  const bg =
                    intensity === 4
                      ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                      : intensity === 3
                      ? "bg-emerald-500/80"
                      : intensity === 2
                      ? "bg-emerald-600/50"
                      : intensity === 1
                      ? "bg-emerald-700/30"
                      : "bg-gray-800/40";
                  return (
                    <div
                      key={rowIdx}
                      className={`w-3.5 h-3.5 rounded-sm ${bg} transition-transform hover:scale-125 cursor-pointer`}
                      title={`${intensity * 3} executions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-400 text-center">
            Tracks every cloud execution, language switch, and solved challenge in real-time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 06: PRO PLAN PRIVILEGES & BENEFITS ─────────────────────────
function SceneSixPro() {
  const benefits = [
    { text: "Unlimited AI Flowchart & Memory Visualizer", highlight: true },
    { text: "Priority Cloud Execution on Dedicated Edge Nodes", highlight: true },
    { text: "Unlimited Snippet Storage & Private Collections", highlight: false },
    { text: "Custom Themes & Editor Appearance Styling", highlight: false },
    { text: "Verified PRO Crown Badge on Profile & Snippets", highlight: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Lifetime Pro Plan Card */}
        <div className="md:col-span-6 relative rounded-2xl bg-gradient-to-b from-[#1c1a2e] to-[#121124] border border-amber-500/30 p-5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-purple-500/20 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Lifetime Pro Access</span>
            </div>
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
              Pay Once · Keep Forever
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl text-gray-400">₹</span>
            <span className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-200 to-white text-transparent bg-clip-text">
              99
            </span>
            <span className="text-xs text-gray-400">one-time payment</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  b.highlight ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={b.highlight ? "text-white font-medium text-[11px]" : "text-gray-300 text-[11px]"}>
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Pro Highlights */}
        <div className="md:col-span-6 flex flex-col gap-2.5">
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">Zero Limits on AI Visualizer</h5>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Generate limitless flowchart diagrams and dynamic execution memory traces without daily quotas.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white mb-0.5">Priority Edge Execution</h5>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Dedicated high-performance cloud runners ensure near-instant compilation even during peak traffic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 07: GAMIFIED PRACTICE & BADGES ─────────────────────────────
function SceneSevenPractice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Skill Tier Cards */}
        <div className="md:col-span-6 flex flex-col gap-2.5">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🌱</span>
              <div>
                <h5 className="text-xs font-bold text-white">Beginner Tier</h5>
                <p className="text-[10px] text-gray-400">Loops, Variables, &amp; Simple Logic</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              5/5 Solved ✓
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🚀</span>
              <div>
                <h5 className="text-xs font-bold text-white">Intermediate Tier</h5>
                <p className="text-[10px] text-gray-400">Arrays, Strings, &amp; HashMaps</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Active Tier
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-purple-400" />
              <div>
                <h5 className="text-xs font-bold text-white">Advanced Tier</h5>
                <p className="text-[10px] text-gray-400">Dynamic Programming &amp; Trees</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Grandmaster
            </span>
          </div>
        </div>

        {/* Right: Celebratory Badge Unlocked */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#181826] to-[#12121a] rounded-xl border border-purple-500/30 p-5 flex flex-col items-center text-center shadow-xl">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 flex items-center justify-center text-amber-400 mb-2.5 shadow-lg shadow-purple-500/20"
          >
            <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
          </motion.div>

          <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1">
            Badge Unlocked 🎉
          </span>
          <h4 className="text-sm font-bold text-white mb-1">Tier Master Verified</h4>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            Solved all tier challenges with 100% test pass rate across supported languages.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
