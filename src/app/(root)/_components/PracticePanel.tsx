"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  SkipForward,
  CheckCircle2,
  Trophy,
  X,
  Target,
  AlertCircle,
  Crown,
  ArrowRight,
  RotateCcw,
  Loader2,
  Sparkles,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { CHALLENGES, Challenge } from "../_constants/challenges";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

export default function PracticePanel() {
  const { user, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const isPracticeMode = searchParams.get("practice") === "true";

  const convexUser = useQuery(
    api.users.getUser,
    isSignedIn && user?.id ? { userId: user.id } : "skip"
  );

  const [active, setActive] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const setSkillLevel = useMutation(api.users.setSkillLevel);

  const { executionResult, editor, language } = useCodeEditorStore();

  const currentChallenge = challenges[challengeIndex];
  const isCurrentSolved = Boolean(currentChallenge && solvedChallengeIds.includes(currentChallenge.id));
  const allTierSolved =
    challenges.length > 0 && challenges.every((c) => solvedChallengeIds.includes(c.id));

  // Initialize practice mode when coming from onboarding
  useEffect(() => {
    if (isPracticeMode && convexUser?.skillLevel && challenges.length === 0) {
      const level = convexUser.skillLevel as "beginner" | "intermediate" | "advanced";
      const levelChallenges = CHALLENGES.filter((c) => c.difficulty === level);
      setChallenges(levelChallenges);
      setActive(true);
      setChallengeIndex(0);
      setSolvedChallengeIds([]);
    }
  }, [isPracticeMode, convexUser, challenges.length]);

  // Load starter code into editor when challenge or language changes
  useEffect(() => {
    if (active && challenges.length > 0 && editor) {
      const challenge = challenges[challengeIndex];
      if (!challenge) return;

      // Get the template for current language
      const template = challenge.templates[language];
      if (template) {
        setTimeout(() => {
          editor.setValue(template.starterCode);
        }, 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, challengeIndex, challenges, editor, language]);

  // Check if output matches expected for current language
  useEffect(() => {
    if (!active || !executionResult || challenges.length === 0) return;
    const challenge = challenges[challengeIndex];
    if (!challenge) return;

    // Get expected output for current language
    const template = challenge.templates[language];
    if (!template) return;

    const output = (executionResult.output || "").trim();
    const expected = template.expectedOutput.trim();

    if (output === expected) {
      setSolvedChallengeIds((prev) =>
        prev.includes(challenge.id) ? prev : [...prev, challenge.id]
      );
    }
  }, [executionResult, active, challengeIndex, challenges, language]);

  const goToChallenge = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= challenges.length) return;
    setChallengeIndex(targetIdx);
    setShowHints(false);
    setHintIndex(0);
  };

  const handleNext = () => {
    if (allTierSolved) {
      // All challenges in this tier genuinely solved! Show celebratory Level Up modal
      setLevelCompleted(true);
      return;
    }

    if (challengeIndex < challenges.length - 1) {
      goToChallenge(challengeIndex + 1);
    } else {
      // On the last challenge, but some earlier challenges were skipped/unsolved
      const firstUnsolvedIdx = challenges.findIndex((c) => !solvedChallengeIds.includes(c.id));
      if (firstUnsolvedIdx !== -1) {
        goToChallenge(firstUnsolvedIdx);
      }
    }
  };

  const handleSkip = () => {
    // Skipping NEVER completes the tier or marks the problem as solved
    if (challengeIndex < challenges.length - 1) {
      goToChallenge(challengeIndex + 1);
    } else {
      // If at the end, jump to first unsolved problem
      const firstUnsolvedIdx = challenges.findIndex((c) => !solvedChallengeIds.includes(c.id));
      if (firstUnsolvedIdx !== -1) {
        goToChallenge(firstUnsolvedIdx);
      }
    }
  };

  const handleLevelUp = async (nextLevel: "beginner" | "intermediate" | "advanced") => {
    setIsLevelingUp(true);
    try {
      await setSkillLevel({ skillLevel: nextLevel });
      const nextChallenges = CHALLENGES.filter((c) => c.difficulty === nextLevel);
      setChallenges(nextChallenges);
      setChallengeIndex(0);
      setSolvedChallengeIds([]);
      setShowHints(false);
      setHintIndex(0);
      setLevelCompleted(false);
      setActive(true);

      const firstChallenge = nextChallenges[0];
      if (firstChallenge && editor) {
        const template = firstChallenge.templates[language];
        if (template) {
          setTimeout(() => {
            editor.setValue(template.starterCode);
          }, 50);
        }
      }
    } catch (err) {
      console.error("Failed to level up skill level:", err);
    } finally {
      setIsLevelingUp(false);
    }
  };

  const handleClose = () => {
    setActive(false);
    setLevelCompleted(false);
  };

  const handleRevealHint = () => {
    if (!showHints) {
      setShowHints(true);
      setHintIndex(0);
    } else if (currentChallenge && hintIndex < currentChallenge.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  // Manual activation for returning users
  const handleStartPractice = () => {
    if (convexUser?.skillLevel) {
      const level = convexUser.skillLevel as "beginner" | "intermediate" | "advanced";
      const levelChallenges = CHALLENGES.filter((c) => c.difficulty === level);
      setChallenges(levelChallenges);
      setActive(true);
      setChallengeIndex(0);
      setShowHints(false);
      setHintIndex(0);
      setLevelCompleted(false);
    }
  };

  if (!isSignedIn || !convexUser?.skillLevel) return null;

  // Show a minimal "Practice" button when not active
  if (!active) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleStartPractice}
        className="mb-3 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl
          bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20
          hover:border-emerald-500/40 text-emerald-400 text-sm font-medium
          transition-all hover:scale-[1.02]"
      >
        <Target className="w-4 h-4" />
        Practice ({convexUser.skillLevel})
      </motion.button>
    );
  }

  // Show Level Up celebratory screen when all challenges in current level are completed
  if (levelCompleted) {
    const currentLevel = (convexUser?.skillLevel || "beginner") as "beginner" | "intermediate" | "advanced";
    const nextLevel = currentLevel === "beginner" ? "intermediate" : currentLevel === "intermediate" ? "advanced" : null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="mb-3 rounded-2xl bg-gradient-to-b from-[#181826] to-[#12121a] border border-emerald-500/30 overflow-hidden shadow-2xl p-6"
        >
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            {/* Celebration Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 shadow-lg shadow-emerald-500/20">
              {currentLevel === "advanced" ? (
                <Crown className="w-7 h-7 text-amber-400 animate-bounce" />
              ) : (
                <Trophy className="w-7 h-7 text-emerald-400 animate-bounce" />
              )}
            </div>

            {/* Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-2 uppercase tracking-wider">
              {currentLevel} Completed (5/5)
            </span>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {currentLevel === "beginner"
                ? "🎉 Beginner Tier Conquered!"
                : currentLevel === "intermediate"
                ? "🔥 Intermediate Tier Mastered!"
                : "👑 Codev Grandmaster Status!"}
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              {currentLevel === "beginner"
                ? "You've successfully solved all 5 beginner coding challenges. Your fundamentals are strong! Ready to step up and tackle Intermediate data structures and algorithms?"
                : currentLevel === "intermediate"
                ? "Outstanding work! You've mastered arrays, string manipulation, and hash maps. Ready for Advanced algorithms like Dynamic Programming and Binary Search?"
                : "Incredible accomplishment! You have conquered all 15 challenges across Beginner, Intermediate, and Advanced tiers. You are ready for technical interviews!"}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap justify-center w-full">
              {nextLevel ? (
                <button
                  onClick={() => handleLevelUp(nextLevel)}
                  disabled={isLevelingUp}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isLevelingUp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Leveling Up...
                    </>
                  ) : (
                    <>
                      Level Up to {nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleLevelUp("beginner")}
                  disabled={isLevelingUp}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart from Beginner
                </button>
              )}

              <button
                onClick={() => {
                  setLevelCompleted(false);
                  setActive(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-all"
              >
                Continue in Free Editor
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!currentChallenge) return null;

  const difficultyColors = {
    beginner: "text-green-400 bg-green-500/10 border-green-500/30",
    intermediate: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    advanced: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-3 rounded-2xl bg-[#12121a]/90 border border-white/10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[currentChallenge.difficulty]}`}
            >
              {currentChallenge.difficulty}
            </span>
            <span className="text-white font-semibold text-sm sm:text-base">
              {currentChallenge.title}
            </span>
            <span className="text-gray-500 text-xs">
              {challengeIndex + 1} / {challenges.length}
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Solved: {solvedChallengeIds.length}/{challenges.length}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-5 py-3">
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            {currentChallenge.description}
          </p>

          {!currentChallenge.templates[language] && (
            <div className="mb-3 flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>
                Starter code for this challenge is available in <strong className="text-white">JavaScript, TypeScript, Python, Java, C++, Go, and Rust</strong>. Switch to any of these languages to auto-load the challenge template.
              </span>
            </div>
          )}

          {/* Hints */}
          <AnimatePresence>
            {showHints && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 space-y-1.5"
              >
                {currentChallenge.hints.slice(0, hintIndex + 1).map((hint, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-300/80 text-xs">{hint}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success state */}
          <AnimatePresence>
            {isCurrentSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-3 flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium">
                    🎉 Correct! Challenge solved!
                  </span>
                </div>
                {!allTierSolved && (
                  <span className="text-xs text-gray-400">
                    {challenges.length - solvedChallengeIds.length} remaining to unlock badge
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isCurrentSolved && (
              <button
                onClick={handleRevealHint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium
                  hover:bg-amber-500/20 transition-all"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {!showHints
                  ? "Hint"
                  : hintIndex < currentChallenge.hints.length - 1
                    ? "Next Hint"
                    : "No more hints"}
              </button>
            )}

            {!isCurrentSolved && (
              <button
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-gray-800/50 border border-gray-700 text-gray-400 text-xs font-medium
                  hover:bg-gray-700/50 hover:text-gray-300 transition-all"
                title="Skip this question (doesn't count as solved)"
              >
                <SkipForward className="w-3.5 h-3.5" />
                {challengeIndex === challenges.length - 1 ? "Next Unsolved" : "Skip"}
              </button>
            )}

            {isCurrentSolved && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
                  bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-semibold
                  hover:from-emerald-500 hover:to-blue-500 transition-all shadow-lg shadow-emerald-500/20"
              >
                {allTierSolved ? (
                  <>
                    <Trophy className="w-4 h-4 text-amber-300" />
                    Claim Level Badge 🎉
                  </>
                ) : challengeIndex < challenges.length - 1 ? (
                  <>
                    Next Challenge
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next Unsolved Challenge
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {/* Interactive Progress dots */}
            <div className="flex items-center gap-1.5 ml-auto">
              {challenges.map((c, i) => {
                const isSolved = solvedChallengeIds.includes(c.id);
                const isCurrent = i === challengeIndex;
                return (
                  <button
                    key={c.id || i}
                    onClick={() => goToChallenge(i)}
                    title={`Question ${i + 1}: ${c.title} (${isSolved ? "Solved" : "Unsolved"})`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? "w-6 bg-blue-500 shadow-sm shadow-blue-500/50"
                        : isSolved
                          ? "w-2.5 bg-emerald-500 hover:bg-emerald-400"
                          : "w-2 bg-gray-700 hover:bg-gray-600"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
