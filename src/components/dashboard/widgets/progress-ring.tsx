"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { motion } from "framer-motion";

export function ProgressRing() {
  const { getProgress } = useSyllabus();
  const { percentage } = getProgress();

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-40 h-40">
        <circle
          className="text-gray-200 dark:text-gray-800"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        <motion.circle
          className="text-blue-600 dark:text-blue-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
         <span className="text-3xl font-bold">{percentage}%</span>
         <span className="block text-xs text-muted-foreground uppercase tracking-widest">Done</span>
      </div>
    </div>
  );
}
