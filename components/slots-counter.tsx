"use client";

import { motion } from "framer-motion";
import { Users, AlertCircle } from "lucide-react";
import { useStats } from "../hooks/useStats";
import { cn } from "../lib/utils";

interface SlotsCounterProps {
  game: "pubg" | "freefire";
  variant?: "default" | "compact";
}

export function SlotsCounter({ game, variant = "default" }: SlotsCounterProps) {
  const { data: stats, isLoading } = useStats();

  if (isLoading || !stats) {
    return (
      <div className="animate-pulse bg-white/10 rounded-2xl p-6">
        <div className="h-8 bg-white/20 rounded w-32 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-24"></div>
      </div>
    );
  }

  const filled = game === "pubg" ? stats.pubgTeams : stats.freeFireTeams;
  const total = game === "pubg" ? stats.pubgSlots : stats.freeFireSlots;
  const remaining = total - filled;
  const percentage = (filled / total) * 100;
  const isFull = remaining <= 0;
  const isAlmostFull = remaining <= 3 && remaining > 0;

  const colors = {
    pubg: {
      gradient: "from-orange-600/20 to-red-600/20",
      border: "border-orange-500/50",
      text: "text-orange-500",
      progress: "from-orange-500 to-red-500",
    },
    freefire: {
      gradient: "from-red-600/20 to-pink-600/20",
      border: "border-red-500/50",
      text: "text-red-500",
      progress: "from-red-500 to-pink-500",
    },
  };

  const color = colors[game];

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm",
          `bg-gradient-to-r ${color.gradient} ${color.border}`
        )}
      >
        <Users className={cn("w-4 h-4", color.text)} />
        <span className="text-white font-semibold">
          {remaining} / {total}
        </span>
        <span className="text-gray-300 text-sm">slots left</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-gradient-to-br backdrop-blur-sm border rounded-2xl p-6",
        `${color.gradient} ${color.border}`
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className={cn("w-6 h-6", color.text)} />
          <span className="text-gray-300 font-medium">Registration Status</span>
        </div>
        {isAlmostFull && !isFull && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1 text-yellow-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Hurry!</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-3">
        {/* Numbers */}
        <div className="flex items-baseline gap-2">
          <motion.div
            key={remaining}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {remaining}
          </motion.div>
          <span className="text-2xl text-gray-400">/ {total}</span>
        </div>

        <div className="text-sm text-gray-300">
          {isFull ? (
            <span className="text-red-400 font-semibold">
              ❌ Registration Closed
            </span>
          ) : isAlmostFull ? (
            <span className="text-yellow-400 font-semibold">
              ⚡ Only {remaining} slots remaining!
            </span>
          ) : (
            <span>Slots Available</span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("absolute h-full bg-gradient-to-r", color.progress)}
          />
        </div>

        {/* Stats */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>{filled} teams registered</span>
          <span>{percentage.toFixed(0)}% filled</span>
        </div>
      </div>

      {isFull && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <p className="text-sm text-gray-300 text-center">
            All slots are filled. Thank you for your interest!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
