"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  Palette,
  Code2,
  Sparkles,
  Play,
  Terminal,
  LogIn,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  placement?: "bottom" | "top" | "left" | "right";
}

export default function ProductTour() {
  const { isSignedIn } = useUser();
  const { setMobileTab } = useCodeEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const steps: TourStep[] = useMemo(
    () => [
      {
        targetSelector: '[data-tour="language-selector"]',
        title: "10+ Programming Languages",
        description:
          "Select your preferred language — Python, JavaScript, TypeScript, C++, Java, Rust, Go, and more. Starter code is pre-loaded for you!",
        icon: <Globe2 className="w-5 h-5 text-blue-400" />,
        placement: "bottom",
      },
      {
        targetSelector: '[data-tour="theme-selector"]',
        title: "Editor Themes & Aesthetics",
        description:
          "Switch between gorgeous themes like Monokai, Dracula, VS-Dark, and GitHub Dark to match your vibe.",
        icon: <Palette className="w-5 h-5 text-purple-400" />,
        placement: "bottom",
      },
      {
        targetSelector: '[data-tour="code-editor"]',
        title: "Full-Featured Monaco Editor",
        description:
          "The same editor engine powering VS Code! Enjoy syntax highlighting, bracket matching, error diagnostics, and font-size customization.",
        icon: <Code2 className="w-5 h-5 text-emerald-400" />,
        placement: "bottom",
      },
      {
        targetSelector: '[data-tour="visualizer-btn"]',
        title: "AI Logic Visualizer",
        description:
          "Stuck on algorithmic logic? Click 'Visual' to generate step-by-step flowcharts, variable tables, and logic breakdown.",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        placement: "bottom",
      },
      {
        targetSelector: '[data-tour="run-button"]',
        title: "Instant Cloud Execution",
        description:
          "Hit 'Run' (or press Ctrl/Cmd + Enter) to compile and execute your code safely inside our ultra-fast sandboxed containers.",
        icon: <Play className="w-5 h-5 text-blue-400" />,
        placement: "bottom",
      },
      {
        targetSelector: '[data-tour="input-output"]',
        title: "Custom Input & Live Output",
        description:
          "Provide standard input (stdin) for competitive coding and inspect execution output, execution times, and error traces in real time.",
        icon: <Terminal className="w-5 h-5 text-teal-400" />,
        placement: "top",
      },
      {
        targetSelector: '[data-tour="auth-button"]',
        title: isSignedIn ? "Your Account & Profile" : "Sign In to Save & Level Up",
        description: isSignedIn
          ? "Access your saved snippets, view your solved challenge badges, and manage your account settings."
          : "Create a free account to save code snippets, earn skill badges, and unlock pro developer capabilities!",
        icon: <LogIn className="w-5 h-5 text-pink-400" />,
        placement: "bottom",
      },
    ],
    [isSignedIn]
  );

  // Sync mobile active tab based on tour step so hidden panels become visible & measurable
  useEffect(() => {
    if (!isOpen) return;
    if (currentStep === 5) {
      // Step 6: Input & Output -> switch mobile view to output/input panel
      setMobileTab("output");
    } else {
      // Steps 1-5 & 7 -> switch back to editor view
      setMobileTab("editor");
    }
  }, [isOpen, currentStep, setMobileTab]);

  // Measure active step target element
  const updateTargetRect = useCallback(() => {
    if (!isOpen) return;
    const step = steps[currentStep];
    if (!step) return;

    // Find all matching elements (e.g. mobile vs desktop header) and pick the visible one
    const elements = document.querySelectorAll(step.targetSelector);
    let visibleEl: HTMLElement | null = null;
    for (let i = 0; i < elements.length; i++) {
      const htmlEl = elements[i] as HTMLElement;
      const rect = htmlEl.getBoundingClientRect();
      const style = window.getComputedStyle(htmlEl);
      if (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      ) {
        visibleEl = htmlEl;
        break;
      }
    }

    if (visibleEl) {
      const rect = visibleEl.getBoundingClientRect();
      const inView =
        rect.top >= 20 &&
        rect.bottom <= window.innerHeight - 20;

      if (!inView) {
        visibleEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      setTargetRect((prev) => {
        if (
          prev &&
          Math.abs(prev.top - rect.top) < 1 &&
          Math.abs(prev.left - rect.left) < 1 &&
          Math.abs(prev.width - rect.width) < 1 &&
          Math.abs(prev.height - rect.height) < 1
        ) {
          return prev;
        }
        return rect;
      });
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep, steps]);

  // Check first-time visitor status on mount
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("codev_tour_completed");
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setCurrentStep(0);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  // Update position on step change with a brief delay to allow tab/DOM transition
  useEffect(() => {
    if (!isOpen) return;
    updateTargetRect();
    const tick = setTimeout(() => {
      updateTargetRect();
    }, 120);

    const handleRecalc = () => updateTargetRect();
    window.addEventListener("resize", handleRecalc);
    window.addEventListener("scroll", handleRecalc, true);

    return () => {
      clearTimeout(tick);
      window.removeEventListener("resize", handleRecalc);
      window.removeEventListener("scroll", handleRecalc, true);
    };
  }, [isOpen, currentStep, updateTargetRect]);

  // Global trigger so Header or anywhere can restart the tour
  useEffect(() => {
    (window as any).__startCodevTour = () => {
      setMobileTab("editor");
      setCurrentStep(0);
      setIsOpen(true);
    };
    return () => {
      delete (window as any).__startCodevTour;
    };
  }, [setMobileTab]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("codev_tour_completed", "true");
    setMobileTab("editor");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Calculate tooltip position relative to viewport
  let tooltipTop = 100;
  let tooltipLeft = 16;

  if (targetRect) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardWidth = isMobile ? Math.min(window.innerWidth - 32, 360) : 380;
    const cardHeight = 220;

    if (isMobile) {
      // On mobile, keep horizontally centered on screen with 16px margins
      tooltipLeft = Math.max(16, (window.innerWidth - cardWidth) / 2);

      // Vertical positioning on mobile
      if (targetRect.bottom + cardHeight + 16 < window.innerHeight) {
        tooltipTop = targetRect.bottom + 12;
      } else if (targetRect.top - cardHeight - 16 > 0) {
        tooltipTop = targetRect.top - cardHeight - 12;
      } else {
        // If target occupies most of viewport, place tooltip at the bottom safely
        tooltipTop = Math.max(16, window.innerHeight - cardHeight - 20);
      }
    } else {
      // Desktop: center horizontally on target
      const idealLeft = targetRect.left + targetRect.width / 2 - cardWidth / 2;
      tooltipLeft = Math.max(16, Math.min(idealLeft, window.innerWidth - cardWidth - 16));

      if (targetRect.bottom + cardHeight + 20 < window.innerHeight) {
        tooltipTop = targetRect.bottom + 14;
      } else if (targetRect.top - cardHeight - 20 > 0) {
        tooltipTop = targetRect.top - cardHeight - 14;
      } else {
        tooltipTop = Math.max(20, window.innerHeight / 2 - cardHeight / 2);
      }
    }
  } else {
    // Fallback if target not found
    tooltipTop = typeof window !== "undefined" ? Math.max(40, window.innerHeight / 2 - 120) : 100;
    tooltipLeft = typeof window !== "undefined" ? Math.max(16, (window.innerWidth - 360) / 2) : 16;
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
      {/* Dark backdrop with SVG spotlight cutout */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300">
        <defs>
          <mask id="tour-spotlight-mask">
            {/* White reveals the dark overlay */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cuts out the spotlight hole */}
            {targetRect && (
              <rect
                x={targetRect.left - 6}
                y={targetRect.top - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="14"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(5, 5, 10, 0.78)"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>

      {/* Glowing spotlight ring around the active target */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          className="rounded-2xl border-2 border-blue-500/80 shadow-[0_0_25px_rgba(59,130,246,0.6)] pointer-events-none animate-pulse"
        />
      )}

      {/* Tooltip Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "absolute",
            top: tooltipTop,
            left: tooltipLeft,
            maxWidth: "calc(100vw - 32px)",
            width: 380,
          }}
          className="bg-[#12121a]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl shadow-black/80 flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                {step.icon}
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <button
              onClick={handleComplete}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              title="Skip Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
            {step.title}
          </h3>
          <p className="text-gray-300/90 text-xs sm:text-sm leading-relaxed mb-5">
            {step.description}
          </p>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            {/* Step Indicators */}
            <div className="flex items-center gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-4 bg-blue-500"
                      : i < currentStep
                        ? "w-1.5 bg-emerald-500"
                        : "w-1.5 bg-gray-700"
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 inline mr-0.5" />
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
              >
                <span>{isLastStep ? "Finish Tour 🎉" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
