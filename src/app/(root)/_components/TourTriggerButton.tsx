"use client";

import { Compass } from "lucide-react";

export default function TourTriggerButton() {
  const handleStartTour = () => {
    if (typeof window !== "undefined" && (window as any).__startCodevTour) {
      (window as any).__startCodevTour();
    }
  };

  return (
    <button
      onClick={handleStartTour}
      title="Take a quick tour of Codev"
      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-all active:scale-95"
    >
      <Compass className="w-3.5 h-3.5 text-blue-400" />
      <span className="hidden sm:inline">Tour</span>
    </button>
  );
}
