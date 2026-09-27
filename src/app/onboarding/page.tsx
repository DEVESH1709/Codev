"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Rocket, Flame, Loader2 } from "lucide-react";

type SkillLevel = "beginner" | "intermediate" | "advanced";

const CARDS = [
  {
    id: "beginner" as SkillLevel,
    icon: Sprout,
    title: "Beginner",
    description: "I'm new to coding. Start with basics like loops, variables, and simple logic.",
    borderColor: "border-green-500",
    shadowColor: "shadow-green-500/20",
    gradient: "from-green-500/10 to-transparent",
  },
  {
    id: "intermediate" as SkillLevel,
    icon: Rocket,
    title: "Intermediate",
    description: "I know the basics. Give me arrays, strings, recursion, and data structures.",
    borderColor: "border-blue-500",
    shadowColor: "shadow-blue-500/20",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    id: "advanced" as SkillLevel,
    icon: Flame,
    title: "Advanced",
    description: "I want competitive-level problems. Graphs, DP, trees, and optimization.",
    borderColor: "border-purple-500",
    shadowColor: "shadow-purple-500/20",
    gradient: "from-purple-500/10 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const convexUser = useQuery(
    api.users.getUser,
    isSignedIn && clerkUser?.id ? { userId: clerkUser.id } : "skip"
  );
  const setSkillLevel = useMutation(api.users.setSkillLevel);
  const [selected, setSelected] = useState<SkillLevel | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (convexUser !== undefined && convexUser?.skillLevel) {
      router.push("/");
    }
  }, [convexUser, router]);

  const handleSelect = async (level: SkillLevel) => {
    if (isUpdating) return;
    
    setSelected(level);
    setIsUpdating(true);
    
    try {
      await setSkillLevel({ skillLevel: level });
      router.push("/?practice=true");
    } catch (error) {
      console.error("Failed to set skill level:", error);
      setIsUpdating(false);
      setSelected(null);
    }
  };

  if (!isLoaded || convexUser === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Prevent rendering if not signed in or user already has skill level (handling redirect)
  if (!isSignedIn || convexUser?.skillLevel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-gradient bg-300%">
            Welcome to Codev
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Choose your skill level to get started with personalized practice
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = selected === card.id;
            const isLoading = isSelected && isUpdating;

            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover={{ scale: isUpdating ? 1 : 1.02 }}
                whileTap={{ scale: isUpdating ? 1 : 0.98 }}
                onClick={() => handleSelect(card.id)}
                className={`
                  relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                  bg-[#12121a]/80 backdrop-blur-sm border
                  ${isSelected ? card.borderColor : 'border-white/10 hover:border-white/20'}
                  ${isSelected ? card.shadowColor : 'hover:shadow-xl hover:shadow-black/50'}
                  group overflow-hidden
                `}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-100' : ''}`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 ${isSelected ? card.borderColor : ''}`}>
                    {isLoading ? (
                      <Loader2 className="w-7 h-7 animate-spin text-white" />
                    ) : (
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`} />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors">
                    {card.description}
                  </p>
                </div>
                
                {isSelected && (
                  <motion.div
                    layoutId="outline"
                    className={`absolute inset-0 border-2 rounded-2xl ${card.borderColor}`}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
