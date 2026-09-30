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
  ChevronLeft,
  ChevronRight,
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

const SCENE_DURATION = 3600; // 3.6 seconds base duration

export default function MotionWorkflowOverview() {
  const { isSignedIn } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const effectiveDuration = SCENE_DURATION / speed;

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * effectiveDuration;

    const loop = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / effectiveDuration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= effectiveDuration) {
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
  }, [isPlaying, isHovered, currentIdx, progress, speed, effectiveDuration]);

  const handleSelectScene = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handlePrevScene = () => {
    setCurrentIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleNextScene = () => {
    setCurrentIdx((prev) => (prev + 1) % SCENES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleToggleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
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
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="hidden sm:inline-block text-xs font-mono text-gray-500 ml-3">
                codev-workflow-simulator · v2.0
              </span>
            </div>

            {/* Window Navigation & Playback Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handlePrevScene}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs"
                title="Previous Scene (←)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextScene}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs"
                title="Next Scene (→)"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-3.5 bg-white/10 mx-0.5" />
              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs flex items-center gap-1.5"
                title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current text-blue-400" />}
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                onClick={handleToggleSpeed}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-blue-300 hover:text-blue-200 border border-white/5 transition-all"
                title="Change Tour Speed (1x, 1.5x, 2x)"
              >
                {speed}x
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs"
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

          {/* Animated Scene Stage with Constant Fixed Height */}
          <div className="relative h-[620px] sm:h-[530px] md:h-[455px] p-4 sm:px-6 sm:py-4 flex flex-col justify-between overflow-hidden">
            {/* Viewport for Scene Content */}
            <div className="w-full flex-1 relative flex flex-col justify-center overflow-hidden min-h-0">
              <AnimatePresence mode="wait" initial={false}>
                {currentIdx === 0 && <SceneOneCode key="scene-0" />}
                {currentIdx === 1 && <SceneTwoExecute key="scene-1" />}
                {currentIdx === 2 && <SceneThreeVisualize key="scene-2" />}
                {currentIdx === 3 && <SceneFourSnippets key="scene-3" />}
                {currentIdx === 4 && <SceneFiveProfile key="scene-4" />}
                {currentIdx === 5 && <SceneSixPro key="scene-5" />}
                {currentIdx === 6 && <SceneSevenPractice key="scene-6" />}
              </AnimatePresence>
            </div>

            {/* Bottom Scene Info Bar */}
            <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs flex-shrink-0">
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
  const [selectedLang, setSelectedLang] = useState<"rust" | "python" | "typescript">("rust");
  const [selectedTheme, setSelectedTheme] = useState<"dracula" | "monokai" | "vsdark">("dracula");

  const CODE_SNIPPETS = {
    rust: {
      file: "main.rs",
      version: "Rust 1.82",
      lines: [
        'fn two_sum(nums: &[i32], target: i32) -> Vec<usize> {',
        '    let mut map = std::collections::HashMap::new();',
        '    for (i, &num) in nums.iter().enumerate() {',
        '        if let Some(&j) = map.get(&(target - num)) {',
        '            return vec![j, i]; // Pair found in O(N)!',
        '        }',
        '        map.insert(num, i);',
        '    }',
        '    vec![]',
        '}',
      ],
    },
    python: {
      file: "solution.py",
      version: "Python 3.12",
      lines: [
        'def two_sum(nums: list[int], target: int) -> list[int]:',
        '    lookup = {}',
        '    for i, num in enumerate(nums):',
        '        diff = target - num',
        '        if diff in lookup:',
        '            return [lookup[diff], i]  # Match found!',
        '        lookup[num] = i',
        '    return []',
      ],
    },
    typescript: {
      file: "twoSum.ts",
      version: "TypeScript 5.6",
      lines: [
        'function twoSum(nums: number[], target: number): number[] {',
        '    const map = new Map<number, number>();',
        '    for (let i = 0; i < nums.length; i++) {',
        '        const complement = target - nums[i];',
        '        if (map.has(complement)) return [map.get(complement)!, i];',
        '        map.set(nums[i], i);',
        '    }',
        '    return [];',
        '}',
      ],
    },
  };

  const THEMES = {
    dracula: {
      name: "Dracula",
      editorBg: "bg-[#1e1f29] border-purple-500/30",
      headerBg: "bg-[#181920]",
      keywordColor: "text-pink-400",
      accentColor: "text-purple-300",
    },
    monokai: {
      name: "Monokai",
      editorBg: "bg-[#272822] border-amber-500/30",
      headerBg: "bg-[#1e1f1c]",
      keywordColor: "text-rose-400",
      accentColor: "text-amber-300",
    },
    vsdark: {
      name: "VS Dark",
      editorBg: "bg-[#181824] border-blue-500/30",
      headerBg: "bg-[#10101a]",
      keywordColor: "text-blue-400",
      accentColor: "text-sky-300",
    },
  };

  const currentCode = CODE_SNIPPETS[selectedLang];
  const activeTheme = THEMES[selectedTheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Code Editor Mockup */}
        <div className={`md:col-span-7 rounded-xl border p-4 font-mono text-xs sm:text-[13px] leading-relaxed shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${activeTheme.editorBg}`}>
          <div>
            {/* Editor Header with Interactive Language Tabs */}
            <div className={`flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-[11px] ${activeTheme.headerBg} -mx-4 -mt-4 px-4 pt-3`}>
              <div className="flex items-center gap-1">
                {(["rust", "python", "typescript"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all flex items-center gap-1 ${
                      selectedLang === lang
                        ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    <span>{lang === "rust" ? "🦀" : lang === "python" ? "🐍" : "⚡"}</span>
                    <span className="capitalize">{lang}</span>
                  </button>
                ))}
              </div>
              <span className="text-gray-400 font-mono text-[10px] hidden sm:inline">
                {currentCode.file} · {currentCode.version}
              </span>
            </div>

            {/* Code Lines with Syntax Coloring */}
            <div className="space-y-1">
              {currentCode.lines.map((line, i) => (
                <motion.div
                  key={`${selectedLang}-${i}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.15 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-gray-500 select-none text-[11px] w-4 text-right flex-shrink-0">
                    {i + 1}
                  </span>
                  <span
                    className={
                      line.includes("fn") || line.includes("def") || line.includes("function") || line.includes("return") || line.includes("for")
                        ? `${activeTheme.keywordColor} font-semibold`
                        : line.includes("HashMap") || line.includes("Map") || line.includes("Vec")
                        ? "text-blue-400 font-medium"
                        : line.includes("//") || line.includes("#")
                        ? "text-emerald-400/80 italic"
                        : "text-gray-200"
                    }
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3 h-3" /> Syntax Verified
            </span>
            <span className="text-gray-400">UTF-8 · Tab Size: 4</span>
          </div>
        </div>

        {/* Right: Interactive Feature & Theme Pickers */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          {/* Interactive Theme Switcher */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Select Live Theme:
              </h4>
              <span className="text-[10px] text-purple-300 font-mono">Click to preview</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(["dracula", "monokai", "vsdark"] as const).map((thm) => (
                <button
                  key={thm}
                  onClick={() => setSelectedTheme(thm)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all text-center ${
                    selectedTheme === thm
                      ? "border-purple-400 bg-purple-500/30 text-white shadow-md shadow-purple-500/20 ring-1 ring-purple-400/40"
                      : "border-white/10 bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {THEMES[thm].name}
                </button>
              ))}
            </div>
          </div>

          {/* Compiler Showcase Card */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              10+ High-Performance Compilers
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Native Rust 1.82, Python 3.12, Go 1.23, C++23, Java 21, and TypeScript 5 with Monaco code intelligence.
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              {["Rust", "Python", "TypeScript", "C++", "Java", "Go"].map((l) => (
                <span
                  key={l}
                  className="px-2 py-0.5 rounded-md text-[10px] bg-blue-500/20 text-blue-300 font-mono"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 02: INSTANT CLOUD EXECUTION ────────────────────────────────
function SceneTwoExecute() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionStats, setExecutionStats] = useState({
    time: "78ms",
    memory: "1.9 MB",
    cpuTime: "0.04s",
  });

  const PRESETS = [
    {
      label: "Input #1 (target = 9)",
      target: 9,
      nums: "[2, 7, 11, 15]",
      result: "[0, 1]",
      proof: "nums[0] + nums[1] = 2 + 7 == 9",
    },
    {
      label: "Input #2 (target = 26)",
      target: 26,
      nums: "[2, 7, 11, 15]",
      result: "[2, 3]",
      proof: "nums[2] + nums[3] = 11 + 15 == 26",
    },
    {
      label: "Input #3 (target = 100)",
      target: 100,
      nums: "[15, 30, 70, 85]",
      result: "[1, 2]",
      proof: "nums[1] + nums[2] = 30 + 70 == 100",
    },
  ];

  const currentPreset = PRESETS[selectedPreset];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionStats({
        time: `${Math.floor(65 + Math.random() * 30)}ms`,
        memory: `${(1.7 + Math.random() * 0.4).toFixed(1)} MB`,
        cpuTime: `0.0${Math.floor(3 + Math.random() * 4)}s`,
      });
    }, 380);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Engine Config & Trigger Bar */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Cloud Compiler Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Active Sandbox
              </span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Every keystroke runs inside an isolated Wandbox sandbox container with zero host environment dependencies.
            </p>

            {/* Input Presets Switcher */}
            <div className="mt-1">
              <span className="text-[10px] font-semibold text-gray-400 mb-1.5 block">
                Select Test Stdin Preset:
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPreset(idx);
                      handleExecute();
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-left border transition-all flex items-center justify-between ${
                      selectedPreset === idx
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm"
                        : "bg-black/30 border-white/5 text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="text-[10px] text-gray-500">{p.result}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Run Button */}
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="mt-1 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
            >
              {isExecuting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sandboxing &amp; Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>⚡ Click to Run Code ({executionStats.time})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Live Terminal Window */}
        <div className="md:col-span-7 bg-[#0d1117] rounded-xl border border-white/10 p-4 font-mono text-xs shadow-xl flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" /> Output Console
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Success (Exit Code: 0)
              </span>
            </div>

            <motion.div
              key={`${selectedPreset}-${executionStats.time}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 text-gray-300"
            >
              <div className="text-gray-500 text-[11px]">
                $ cargo run --release (Wandbox v1.82.0)
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-emerald-300 font-mono text-[11px] leading-relaxed">
                <div>[✓] Stdin: nums = {currentPreset.nums}, target = {currentPreset.target}</div>
                <div className="text-white font-bold my-0.5">
                  [⚡] Result Indices: <span className="text-amber-400">{currentPreset.result}</span>
                </div>
                <div className="text-gray-400">[✓] Assertion: {currentPreset.proof} (Match!)</div>
              </div>
            </motion.div>
          </div>

          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-3 border-t border-white/5 mt-3">
            <span>Memory: {executionStats.memory}</span>
            <span>Execution Time: {executionStats.time}</span>
            <span>CPU Time: {executionStats.cpuTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 03: AI LOGIC VISUALIZER ────────────────────────────────────
function SceneThreeVisualize() {
  const [activeStep, setActiveStep] = useState<number>(2); // 0 to 3

  const STEPS = [
    {
      title: "1. Init Hash Map",
      badge: "Allocation",
      flowDesc: "Initialize lookup table map = {} to record visited elements.",
      vars: [
        { key: "target", val: "9", color: "text-white" },
        { key: "i", val: "0", color: "text-blue-300" },
        { key: "nums[0]", val: "2", color: "text-blue-300" },
        { key: "map", val: "{}", color: "text-gray-400" },
      ],
      activeNodeIdx: 0,
    },
    {
      title: "2. Lookup Complement",
      badge: "Search",
      flowDesc: "Compute diff = 9 - 7 = 2. Check if 2 already exists in map.",
      vars: [
        { key: "target", val: "9", color: "text-white" },
        { key: "i", val: "1", color: "text-blue-300" },
        { key: "current_num", val: "7", color: "text-purple-300" },
        { key: "complement", val: "2 (Looking in map)", color: "text-amber-300" },
      ],
      activeNodeIdx: 1,
    },
    {
      title: "3. Pair Found!",
      badge: "Match",
      flowDesc: "map contains 2 at index 0! Return [0, 1] in O(1) time.",
      vars: [
        { key: "target", val: "9", color: "text-white" },
        { key: "match_idx_1", val: "0 (for num 2)", color: "text-emerald-300" },
        { key: "match_idx_2", val: "1 (for num 7)", color: "text-emerald-300" },
        { key: "verification", val: "2 + 7 == 9 ✓", color: "text-emerald-400" },
      ],
      activeNodeIdx: 2,
    },
    {
      title: "4. Return Result",
      badge: "Termination",
      flowDesc: "Function exits cleanly returning vector [0, 1]. Space O(N), Time O(N).",
      vars: [
        { key: "status", val: "COMPLETED", color: "text-emerald-400" },
        { key: "result", val: "[0, 1]", color: "text-white font-bold" },
        { key: "time_complexity", val: "O(N) Single-Pass", color: "text-teal-300" },
        { key: "space_complexity", val: "O(N) Hash Table", color: "text-teal-300" },
      ],
      activeNodeIdx: 3,
    },
  ];

  const currentStepData = STEPS[activeStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Flowchart Simulator */}
        <div className="md:col-span-7 bg-[#14141f] rounded-xl border border-white/10 p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-xs">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Algorithmic Flowchart
              </span>
              <span className="text-[11px] text-gray-400 font-mono">
                Step {activeStep + 1} of 4
              </span>
            </div>

            {/* Interactive Step Navigator Bar */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {STEPS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`py-1 px-1.5 rounded-lg text-[10px] font-mono font-medium transition-all truncate border text-center ${
                    activeStep === idx
                      ? "bg-amber-500/25 border-amber-500/60 text-amber-300 shadow-sm ring-1 ring-amber-500/40"
                      : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>

            {/* Flowchart Diagram Nodes */}
            <div className="flex flex-col items-center gap-2 py-1">
              <div
                onClick={() => setActiveStep(0)}
                className={`w-full max-w-xs text-center px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  activeStep === 0
                    ? "bg-blue-500/30 border-blue-400 text-blue-200 ring-2 ring-blue-500/40 scale-105"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-300/80"
                }`}
              >
                1. Start: Iterate Array with HashMap
              </div>

              <div className="w-0.5 h-2 bg-amber-500/40" />

              <div
                onClick={() => setActiveStep(1)}
                className={`w-full max-w-xs text-center px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  activeStep === 1
                    ? "bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-500/40 scale-105"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300/80"
                }`}
              >
                2. Check: map.has(target - num)?
              </div>

              <div className="w-0.5 h-2 bg-emerald-500/40" />

              <div
                onClick={() => setActiveStep(2)}
                className={`w-full max-w-xs text-center px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  activeStep === 2
                    ? "bg-emerald-500/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40 scale-105"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300/80"
                }`}
              >
                3. Match Found: Fetch indices [0, 1]
              </div>

              <div className="w-0.5 h-2 bg-purple-500/40" />

              <div
                onClick={() => setActiveStep(3)}
                className={`w-full max-w-xs text-center px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  activeStep === 3
                    ? "bg-purple-500/30 border-purple-400 text-purple-200 ring-2 ring-purple-500/40 scale-105"
                    : "bg-purple-500/10 border-purple-500/30 text-purple-300/80"
                }`}
              >
                4. Return Solution &amp; Exit
              </div>
            </div>
          </div>

          <div className="pt-2.5 mt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-gray-400 truncate max-w-[200px]">
              {currentStepData.flowDesc}
            </span>
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
              className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-[11px] transition-all flex items-center gap-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Variable Memory Trace Table */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Live Memory Trace
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                  {currentStepData.badge}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mb-2.5">
                AI inspects and computes runtime stack frames and variables step-by-step.
              </p>

              {/* Memory Key-Value Pairs */}
              <div className="space-y-1.5 text-xs font-mono">
                {currentStepData.vars.map((v, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg bg-black/40 border border-white/5"
                  >
                    <span className="text-gray-400 font-mono text-[11px]">{v.key}</span>
                    <span className={`text-[11px] font-semibold ${v.color}`}>{v.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-amber-500/20 flex items-center justify-between text-[10px] text-amber-300/80">
              <span>Stack Frame: #0 (main)</span>
              <span>Zero-lag Animation</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 04: SNIPPETS HUB & COMMUNITY ────────────────────────────────
function SceneFourSnippets() {
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState<number>(0);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [forkToast, setForkToast] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const SNIPPETS = [
    {
      title: "Kadane's Max Subarray",
      lang: "rust",
      tag: "#algorithms",
      author: "@devesh",
      stars: 128,
      forks: 42,
      code: "fn max_sub_array(nums: &[i32]) -> i32 {\n  nums.iter().fold((0, i32::MIN), |(cur, max), &x| {\n    let next = (cur + x).max(x);\n    (next, max.max(next))\n  }).1\n}",
    },
    {
      title: "LRU Cache O(1)",
      lang: "python",
      tag: "#data-structures",
      author: "@alex_coder",
      stars: 94,
      forks: 29,
      code: "class LRUCache:\n  def __init__(self, capacity: int):\n    self.cap = capacity\n    self.cache = collections.OrderedDict()\n  def get(self, key: int) -> int:\n    return self.cache.get(key, -1)",
    },
    {
      title: "Trie Autocomplete",
      lang: "typescript",
      tag: "#tree-search",
      author: "@sarah_ts",
      stars: 112,
      forks: 37,
      code: "class TrieNode {\n  children: Map<string, TrieNode> = new Map();\n  isWord: boolean = false;\n  insert(word: string) { ... }\n}",
    },
  ];

  const currentSnippet = SNIPPETS[selectedSnippetIdx];
  const starCount = currentSnippet.stars + (isStarred ? 1 : 0);

  const handleFork = () => {
    setForkToast(true);
    setTimeout(() => setForkToast(false), 2400);
  };

  const handleCopy = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Snippet Card Mockup */}
        <div className="md:col-span-7 bg-[#14141f] rounded-xl border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Floating Fork Notification */}
          <AnimatePresence>
            {forkToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Forked to your personal workspace!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-sky-500/30">
                  {currentSnippet.author.substring(1, 3).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-white">{currentSnippet.title}</h5>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      PRO
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    by {currentSnippet.author} · {currentSnippet.forks} forks
                  </p>
                </div>
              </div>

              {/* Clickable Star Button */}
              <button
                onClick={() => setIsStarred((prev) => !prev)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all active:scale-95 ${
                  isStarred
                    ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/30 font-bold"
                    : "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20"
                }`}
                title="Click to Star this solution"
              >
                <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-current" : ""}`} />
                <span>{starCount} Stars</span>
              </button>
            </div>

            {/* Code Box */}
            <div className="relative p-3 rounded-lg bg-black/50 border border-white/5 font-mono text-[11px] text-gray-300 mb-3 group">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] flex items-center gap-1 transition-all"
                title="Copy snippet code"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="text-[9px]">{copiedCode ? "Copied" : "Copy"}</span>
              </button>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-gray-300">
                {currentSnippet.code}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-mono">
                #{currentSnippet.lang}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">
                {currentSnippet.tag}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                onClick={handleFork}
                className="px-2.5 py-1 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium text-[11px] border border-blue-500/30 transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
              >
                <Copy className="w-3 h-3" />
                <span>1-Click Fork</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Snippet Selector & Feature Highlights */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          {/* Snippet Switcher Tabs */}
          <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                Explore Community Snippets:
              </h4>
              <span className="text-[10px] text-sky-300 font-mono">Click to preview</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SNIPPETS.map((snip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSnippetIdx(idx);
                    setIsStarred(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-medium text-left border transition-all flex items-center justify-between ${
                    selectedSnippetIdx === idx
                      ? "bg-sky-500/20 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/40"
                      : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="truncate">{snip.title}</span>
                  <span className="text-[10px] font-mono text-sky-300/80">#{snip.lang}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-1.5">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Instant Forking &amp; Bookmarking
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Fork any public snippet into your own editor in 1 click, test modifications with sandbox compilers, or bookmark for quick interview prep.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 05: DEVELOPER PROFILE & HEATMAP ────────────────────────────
function SceneFiveProfile() {
  const [selectedStat, setSelectedStat] = useState<"runs" | "starred" | "langs">("langs");
  const [hoveredDay, setHoveredDay] = useState<{ day: number; runs: number; lang: string } | null>({
    day: 24,
    runs: 9,
    lang: "Rust 🦀 & Python 🐍",
  });

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

  const STATS_DETAILS = {
    runs: {
      label: "Run Distribution",
      bar1: { name: "Passed", pct: "86%", color: "bg-emerald-400 text-emerald-300" },
      bar2: { name: "Failed", pct: "10%", color: "bg-rose-400 text-rose-300" },
      bar3: { name: "Timeout", pct: "4%", color: "bg-amber-400 text-amber-300" },
      note: "248 Cloud Runs recorded via Wandbox sandbox runner.",
    },
    starred: {
      label: "Star Collections",
      bar1: { name: "Algorithms", pct: "52%", color: "bg-amber-400 text-amber-300" },
      bar2: { name: "Data Structures", pct: "30%", color: "bg-sky-400 text-sky-300" },
      bar3: { name: "System Code", pct: "18%", color: "bg-purple-400 text-purple-300" },
      note: "36 Bookmarked snippets saved to private reference library.",
    },
    langs: {
      label: "Language Breakdown",
      bar1: { name: "Rust", pct: "46%", color: "bg-teal-400 text-teal-300" },
      bar2: { name: "Python", pct: "32%", color: "bg-blue-400 text-blue-300" },
      bar3: { name: "TypeScript", pct: "22%", color: "bg-purple-400 text-purple-300" },
      note: "Favorite language: Rust 🦀 (46% of all cloud executions).",
    },
  };

  const currentStatDetail = STATS_DETAILS[selectedStat];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: User Stats Card */}
        <div className="md:col-span-6 bg-[#14141f] rounded-xl border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
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

            {/* Interactive Stats Grid (Clickable Pills) */}
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <button
                onClick={() => setSelectedStat("runs")}
                className={`p-2 rounded-lg border transition-all ${
                  selectedStat === "runs"
                    ? "bg-teal-500/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/30"
                    : "bg-black/40 border-white/5 hover:border-white/20 text-gray-400"
                }`}
              >
                <span className="text-[10px] text-gray-400 block">Total Runs</span>
                <span className="text-sm font-bold text-teal-400">248</span>
              </button>

              <button
                onClick={() => setSelectedStat("starred")}
                className={`p-2 rounded-lg border transition-all ${
                  selectedStat === "starred"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/30"
                    : "bg-black/40 border-white/5 hover:border-white/20 text-gray-400"
                }`}
              >
                <span className="text-[10px] text-gray-400 block">Starred</span>
                <span className="text-sm font-bold text-amber-400">36</span>
              </button>

              <button
                onClick={() => setSelectedStat("langs")}
                className={`p-2 rounded-lg border transition-all ${
                  selectedStat === "langs"
                    ? "bg-blue-500/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/30"
                    : "bg-black/40 border-white/5 hover:border-white/20 text-gray-400"
                }`}
              >
                <span className="text-[10px] text-gray-400 block">Languages</span>
                <span className="text-sm font-bold text-blue-400">7</span>
              </button>
            </div>

            {/* Dynamic Stat Breakdown Box */}
            <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs">
              <span className="text-gray-300 flex items-center justify-between font-semibold mb-1.5">
                <span>{currentStatDetail.label}:</span>
                <span className="text-[10px] text-teal-400 font-mono">Live Sync</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={`px-2 py-0.5 rounded ${currentStatDetail.bar1.color}`}>
                  {currentStatDetail.bar1.name} {currentStatDetail.bar1.pct}
                </span>
                <span className={`px-2 py-0.5 rounded ${currentStatDetail.bar2.color}`}>
                  {currentStatDetail.bar2.name} {currentStatDetail.bar2.pct}
                </span>
                <span className={`px-2 py-0.5 rounded ${currentStatDetail.bar3.color}`}>
                  {currentStatDetail.bar3.name} {currentStatDetail.bar3.pct}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-2.5 pt-2 border-t border-white/5">
            {currentStatDetail.note}
          </p>
        </div>

        {/* Right: Activity Heatmap Showcase with Live Day Inspector */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#181826] to-[#12121a] rounded-xl border border-teal-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> 365-Day Coding Activity
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                🔥 21-Day Streak
              </span>
            </div>

            {/* Heatmap Grid Simulation (Hoverable & Clickable) */}
            <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center gap-1.5 mb-2.5">
              {heatmapCols.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1.5">
                  {col.map((intensity, rowIdx) => {
                    const dayNum = colIdx * 5 + rowIdx + 1;
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
                        onMouseEnter={() =>
                          setHoveredDay({
                            day: dayNum,
                            runs: intensity * 3,
                            lang: intensity > 2 ? "Rust 🦀 & Python 🐍" : "JavaScript ⚡",
                          })
                        }
                        onClick={() =>
                          setHoveredDay({
                            day: dayNum,
                            runs: intensity * 3,
                            lang: intensity > 2 ? "Rust 🦀 & Python 🐍" : "JavaScript ⚡",
                          })
                        }
                        className={`w-3.5 h-3.5 rounded-sm ${bg} transition-all hover:scale-130 hover:ring-2 hover:ring-white cursor-pointer`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Live Inspection Chip */}
            {hoveredDay && (
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center justify-between">
                <span>Day {hoveredDay.day}: {hoveredDay.runs} executions</span>
                <span className="text-[10px] text-gray-300">{hoveredDay.lang}</span>
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-2">
            Hover or tap any square above to inspect daily executions in real-time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 06: PRO PLAN PRIVILEGES & BENEFITS ─────────────────────────
function SceneSixPro() {
  const [selectedPerk, setSelectedPerk] = useState<number>(0);
  const [pricingPlan, setPricingPlan] = useState<"lifetime" | "monthly">("lifetime");

  const PERKS = [
    {
      title: "Unlimited AI Visualizer",
      tagline: "Generate infinite algorithmic flowcharts and memory stack traces without any daily limits.",
      preview: {
        title: "AI Flowchart Engine",
        badge: "Infinite Quota",
        metric: "∞ Runs / Day",
        color: "text-amber-300 bg-amber-500/10 border-amber-500/30",
        details: "Free tier capped at 5 runs/day. Pro gives unrestricted algorithmic decomposition.",
      },
    },
    {
      title: "Priority Edge Sandboxing",
      tagline: "Dedicated cloud runners with zero wait queue and instant compilation times.",
      preview: {
        title: "Edge Compilation Speed",
        badge: "0.04s Execution",
        metric: "10x Faster",
        color: "text-purple-300 bg-purple-500/10 border-purple-500/30",
        details: "Dedicated Wandbox containers guarantee under 100ms cold start latency.",
      },
    },
    {
      title: "Verified Crown Badge",
      tagline: "Golden crown badge displayed across your snippets, comments, and developer profile.",
      preview: {
        title: "VIP Community Status",
        badge: "Verified Coder",
        metric: "Crown Emblem 👑",
        color: "text-yellow-300 bg-yellow-500/10 border-yellow-500/30",
        details: "Showcase verified skill status and unlock exclusive custom dark IDE themes.",
      },
    },
  ];

  const currentPerk = PERKS[selectedPerk];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left: Lifetime Pro Plan Card with Interactive Pricing Toggle */}
        <div className="md:col-span-6 relative rounded-2xl bg-gradient-to-b from-[#1c1a2e] to-[#121124] border border-amber-500/30 p-4 sm:p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-500/10 to-purple-500/20 blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Codev Pro Membership</span>
              </div>

              {/* Pricing Plan Selector */}
              <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 text-[10px]">
                <button
                  onClick={() => setPricingPlan("lifetime")}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                    pricingPlan === "lifetime"
                      ? "bg-amber-500 text-black shadow-sm font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Lifetime (₹99)
                </button>
                <button
                  onClick={() => setPricingPlan("monthly")}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                    pricingPlan === "monthly"
                      ? "bg-amber-500 text-black shadow-sm font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Monthly (₹49)
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl text-gray-400">₹</span>
              <span className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-200 to-white text-transparent bg-clip-text">
                {pricingPlan === "lifetime" ? "99" : "49"}
              </span>
              <span className="text-xs text-gray-400">
                {pricingPlan === "lifetime" ? "one-time payment · keep forever" : "per month · cancel anytime"}
              </span>
            </div>

            {/* Clickable Perk Selection Buttons */}
            <div className="space-y-1.5 text-xs">
              {PERKS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPerk(idx)}
                  className={`w-full p-2 rounded-xl text-left border transition-all flex items-center justify-between ${
                    selectedPerk === idx
                      ? "bg-amber-500/15 border-amber-500/60 text-white shadow-sm ring-1 ring-amber-500/30"
                      : "bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedPerk === idx ? "bg-amber-500 text-black font-bold" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[11px] font-medium">{p.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-300/80 font-mono">Preview ➔</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 pt-2 border-t border-white/5 mt-2">
            Instant activation with Razorpay UPI, cards &amp; net banking.
          </p>
        </div>

        {/* Right: Live Interactive Perk Preview Card */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#181826] to-[#12121a] rounded-xl border border-amber-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Perk Simulation
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currentPerk.preview.color}`}>
                {currentPerk.preview.badge}
              </span>
            </div>

            <motion.div
              key={selectedPerk}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-white">{currentPerk.preview.title}</h5>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {currentPerk.preview.metric}
                </span>
              </div>

              <p className="text-[11px] text-gray-300 leading-relaxed">
                {currentPerk.tagline}
              </p>

              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-gray-400 font-mono">
                {currentPerk.preview.details}
              </div>
            </motion.div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>Unlocked immediately upon upgrade</span>
            <span className="text-amber-400 font-bold">100% Satisfaction</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCENE 07: GAMIFIED PRACTICE & BADGES ─────────────────────────────
function SceneSevenPractice() {
  const [selectedTier, setSelectedTier] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [testState, setTestState] = useState<"idle" | "running" | "passed">("idle");
  const [trophyClicks, setTrophyClicks] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);

  const TIER_DATA = {
    beginner: {
      title: "Beginner Tier",
      icon: "🌱",
      badge: "Grassroots Coder",
      color: "emerald",
      borderActive: "border-emerald-500/60 bg-emerald-500/15 shadow-emerald-500/20",
      challenges: [
        { name: "Sum of Two Numbers", diff: "Easy", time: "0ms", desc: "add(3, 5) -> 8" },
        { name: "Reverse a String", diff: "Easy", time: "1ms", desc: "'hello' -> 'olleh'" },
        { name: "Count Vowels in String", diff: "Easy", time: "0ms", desc: "count('codev') -> 2" },
      ],
      tests: [
        { name: "test_basic_add(3, 5)", expected: "8", time: "4ms" },
        { name: "test_negative_add(-2, 7)", expected: "5", time: "6ms" },
        { name: "test_zero_identity(0, 0)", expected: "0", time: "2ms" },
      ],
    },
    intermediate: {
      title: "Intermediate Tier",
      icon: "🚀",
      badge: "Logic Architect",
      color: "blue",
      borderActive: "border-blue-500/60 bg-blue-500/15 shadow-blue-500/20",
      challenges: [
        { name: "Two Sum (Hash Map)", diff: "Medium", time: "12ms", desc: "[2,7,11,15], 9 -> [0, 1]" },
        { name: "Palindrome Check", diff: "Medium", time: "4ms", desc: "'racecar' -> true" },
        { name: "FizzBuzz (1 to 20)", diff: "Medium", time: "8ms", desc: "Prints 1 to 20 rules" },
      ],
      tests: [
        { name: "test_two_sum_indices([2,7,11,15], 9)", expected: "[0, 1]", time: "12ms" },
        { name: "test_palindrome_word('racecar')", expected: "true", time: "8ms" },
        { name: "test_target_pair([3,2,4], 6)", expected: "[1, 2]", time: "9ms" },
      ],
    },
    advanced: {
      title: "Advanced Tier",
      icon: "🔥",
      badge: "Grandmaster Champion",
      color: "purple",
      borderActive: "border-purple-500/60 bg-purple-500/15 shadow-purple-500/20",
      challenges: [
        { name: "Longest Increasing Subseq", diff: "Hard", time: "18ms", desc: "O(N log N) Dynamic Prog" },
        { name: "Valid Parentheses Stack", diff: "Hard", time: "10ms", desc: "'({[]})' -> balanced" },
        { name: "Kadane's Max Subarray", diff: "Hard", time: "14ms", desc: "[-2,1,-3,4] -> 6" },
      ],
      tests: [
        { name: "test_lis_sequence([10,9,2,5,3,7,101])", expected: "4", time: "18ms" },
        { name: "test_balanced_brackets('({[]})')", expected: "true", time: "11ms" },
        { name: "test_kadane_max([-2,1,-3,4,-1,2,1])", expected: "6", time: "14ms" },
      ],
    },
  };

  const currentTierData = TIER_DATA[selectedTier];

  const handleRunTests = () => {
    setTestState("running");
    setTimeout(() => {
      setTestState("passed");
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Interactive Tier Selector & Challenges */}
        <div className="md:col-span-6 flex flex-col justify-between gap-3">
          {/* Tier Switcher Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-0.5">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                Select Skill Tier to Test:
              </span>
              <span className="text-[11px] text-purple-300 font-mono">Click to explore</span>
            </div>

            {/* Beginner Button */}
            <button
              onClick={() => {
                setSelectedTier("beginner");
                setTestState("idle");
                setActiveChallengeIdx(0);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                selectedTier === "beginner"
                  ? "border-emerald-500 bg-emerald-500/20 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500/40"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🌱</span>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">Beginner Tier</h5>
                  <p className="text-[10px] text-gray-400">Loops, Variables, &amp; Simple Logic</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                5/5 Solved ✓
              </span>
            </button>

            {/* Intermediate Button */}
            <button
              onClick={() => {
                setSelectedTier("intermediate");
                setTestState("idle");
                setActiveChallengeIdx(0);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                selectedTier === "intermediate"
                  ? "border-blue-500 bg-blue-500/20 shadow-md shadow-blue-500/20 ring-1 ring-blue-500/40"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🚀</span>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">Intermediate Tier</h5>
                  <p className="text-[10px] text-gray-400">Arrays, Strings, &amp; HashMaps</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Active Tier
              </span>
            </button>

            {/* Advanced Button */}
            <button
              onClick={() => {
                setSelectedTier("advanced");
                setTestState("idle");
                setActiveChallengeIdx(0);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                selectedTier === "advanced"
                  ? "border-purple-500 bg-purple-500/20 shadow-md shadow-purple-500/20 ring-1 ring-purple-500/40"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-purple-400" />
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Advanced Tier</h5>
                  <p className="text-[10px] text-gray-400">Dynamic Programming &amp; Trees</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Grandmaster
              </span>
            </button>
          </div>

          {/* Active Tier Challenges Drawer */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[11px] font-semibold text-gray-300 mb-1.5 block">
              {currentTierData.icon} {currentTierData.title} Challenges:
            </span>
            <div className="space-y-1.5">
              {currentTierData.challenges.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveChallengeIdx(i);
                    setTestState("idle");
                  }}
                  className={`w-full p-2 rounded-lg text-left text-xs font-mono flex items-center justify-between border transition-all ${
                    activeChallengeIdx === i
                      ? "bg-white/10 border-blue-400/50 text-white"
                      : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-500/20 text-blue-300">
                      {c.diff}
                    </span>
                    <span className="text-[10px] text-gray-500">{c.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Test Runner & Unlocked Trophy Badge */}
        <div className="md:col-span-6 bg-[#13131e] rounded-xl border border-purple-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            {/* Test Suite Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                Live Test Runner
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                testState === "passed"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : testState === "running"
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse"
                  : "bg-blue-500/10 text-blue-300 border-blue-500/20"
              }`}>
                {testState === "passed" ? "3/3 Tests Passed ✓" : testState === "running" ? "Running Test Suite..." : "3 Tests Pending"}
              </span>
            </div>

            {/* Test Assertions List */}
            <div className="space-y-1.5 font-mono text-[11px] mb-3">
              {currentTierData.tests.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border transition-all flex items-center justify-between ${
                    testState === "passed"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : testState === "running"
                      ? "bg-amber-500/5 border-amber-500/20 text-amber-200"
                      : "bg-black/30 border-white/5 text-gray-400"
                  }`}
                >
                  <span className="truncate">{t.name} == {t.expected}</span>
                  <span className="text-[10px] flex-shrink-0 font-bold ml-2">
                    {testState === "passed" ? `✓ ${t.time}` : testState === "running" ? "⏳" : "Ready"}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive "Run Test Suite" Button */}
            <button
              onClick={handleRunTests}
              disabled={testState === "running"}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{testState === "passed" ? "✓ Re-Run Test Suite" : "⚡ Click to Run Test Suite"}</span>
            </button>
          </div>

          {/* Celebratory Badge Unlocked Box */}
          <div
            onClick={() => setTrophyClicks((prev) => prev + 1)}
            className="mt-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-amber-500/10 border border-purple-500/30 flex items-center gap-3 cursor-pointer hover:border-amber-400/50 transition-all group"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              key={trophyClicks}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform"
            >
              <Trophy className="w-5 h-5 text-amber-400" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h6 className="text-xs font-bold text-white truncate">{currentTierData.badge}</h6>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                  +{50 + trophyClicks * 25} XP
                </span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">
                Click trophy to claim verified rank badges &amp; stars
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
