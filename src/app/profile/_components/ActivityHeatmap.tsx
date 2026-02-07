"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleMouseEnter = (date: string, count: number, event: React.MouseEvent) => {
        setHoveredDate({ date, count });
        const rect = event.currentTarget.getBoundingClientRect();
        setMousePos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    };

    if (!activity) return null;

    const years = Array.from(new Set(
        activity.map(a => new Date(a.date).getFullYear())
    )).sort((a, b) => b - a);

    if (!years.includes(new Date().getFullYear())) {
        years.unshift(new Date().getFullYear());
    }

    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);

    // Generate days for the selected year
    const days: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        days.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const activityMap = activity.reduce((acc, curr) => {
        acc[curr.date] = curr.count;
        return acc;
    }, {} as Record<string, number>);

    // Total contributions for selected year
    const totalContributions = activity
        .filter(a => new Date(a.date).getFullYear() === selectedYear)
        .reduce((acc, curr) => acc + curr.count, 0);

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
                    <div className="relative">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="appearance-none bg-[#1e1e2e] border border-gray-800 text-gray-300 text-sm font-medium px-4 py-2 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-[#252535] transition-colors cursor-pointer"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    <div className="text-sm font-medium text-blue-400 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                        {totalContributions} contributions in {selectedYear}
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
                                            onMouseEnter={(e) => handleMouseEnter(date, count, e)}
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

            {/* Tooltip */}
            {hoveredDate && (
                <div
                    className="fixed bg-black/90 px-4 py-2 rounded-xl border border-gray-800 text-xs text-white shadow-2xl z-50 pointer-events-none ring-1 ring-blue-500/20 transform -translate-x-1/2 -translate-y-full"
                    style={{
                        top: mousePos.y - 8,
                        left: mousePos.x,
                    }}
                >
                    <span className="font-bold text-blue-400">
                        {hoveredDate.count} contributions
                    </span>{" "}
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">
                        on {new Date(hoveredDate.date).toLocaleDateString()}
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-gray-800 rotate-45" />
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
