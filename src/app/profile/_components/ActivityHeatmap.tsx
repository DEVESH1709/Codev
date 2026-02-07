"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";

interface ActivityHeatmapProps {
    userData: {
        userId: string;
    };
}

function ActivityHeatmap({ userData }: ActivityHeatmapProps) {
    const activity = useQuery(api.codeExecutions.getUserActivity, {
        userId: userData.userId,
    });

    const [hoveredDate, setHoveredDate] = useState<{ date: string; count: number } | null>(null);

    if (!activity) return null;

    // Generate last 365 days
    const today = new Date();
    const days: string[] = [];
    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split("T")[0]);
    }

    const activityMap = activity.reduce((acc, curr) => {
        acc[curr.date] = curr.count;
        return acc;
    }, {} as Record<string, number>);

    const getIntensity = (count: number) => {
        if (count === 0) return "bg-gray-800/50 hover:bg-gray-800";
        if (count < 2) return "bg-blue-900/50 hover:bg-blue-900";
        if (count < 5) return "bg-blue-700/80 hover:bg-blue-700";
        if (count < 10) return "bg-blue-500 hover:bg-blue-400";
        return "bg-cyan-400 hover:bg-cyan-300";
    };

    return (
        <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl p-8 border border-gray-800/50 mb-8 overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Daily Practice</h2>
                    <p className="text-sm text-gray-400">
                        Check your coding consistency over time
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-400">
                        {new Date().getFullYear()}
                    </div>
                    <div className="text-sm font-medium text-blue-400 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                        {activity.reduce((acc, curr) => acc + curr.count, 0)} contributions in last year
                    </div>
                </div>
            </div>

            <div className="flex gap-4">

                <div className="flex flex-col gap-1 mt-[2px]">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                        <div key={i} className="h-3.5 w-8 text-xs text-gray-500 font-medium flex items-center">
                            {day}
                        </div>
                    ))}
                </div>


                <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1">
                    <div className="flex gap-1 min-w-max">

                        {Array.from({ length: 53 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    const dayOfYearIndex = weekIndex * 7 + dayIndex;
                                    if (dayOfYearIndex >= days.length) return null;
                                    const date = days[dayOfYearIndex];
                                    const count = activityMap[date] || 0;

                                    return (
                                        <motion.div
                                            key={date}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: weekIndex * 0.02, duration: 0.5 }}
                                            whileHover={{ scale: 1.3, zIndex: 10 }}
                                            onMouseEnter={() => setHoveredDate({ date, count })}
                                            onMouseLeave={() => setHoveredDate(null)}
                                            className={`w-3.5 h-3.5 rounded-sm ${getIntensity(count)} cursor-pointer transition-all duration-300`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {hoveredDate && (
                <div className="absolute top-2 right-2 bg-black/90 px-4 py-2 rounded-xl border border-gray-800 text-xs text-white shadow-2xl z-20 pointer-events-none ring-1 ring-blue-500/20">
                    <span className="font-bold text-blue-400">
                        {hoveredDate.count} contributions
                    </span>{" "}
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">
                        on {new Date(hoveredDate.date).toLocaleDateString()}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-medium justify-end">
                <span>Less</span>
                <div className="w-3.5 h-3.5 bg-gray-800/50 rounded-sm ring-1 ring-white/5" />
                <div className="w-3.5 h-3.5 bg-blue-900/50 rounded-sm ring-1 ring-white/5" />
                <div className="w-3.5 h-3.5 bg-blue-700/80 rounded-sm ring-1 ring-white/5" />
                <div className="w-3.5 h-3.5 bg-blue-500 rounded-sm ring-1 ring-white/5" />
                <div className="w-3.5 h-3.5 bg-cyan-400 rounded-sm ring-1 ring-white/5" />
                <span>More</span>
            </div>
        </div>
    );
}

export default ActivityHeatmap;
