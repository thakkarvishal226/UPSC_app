"use client"

import { ProgressCard } from "@/components/dashboard/progress-card";
import { StreaksCard } from "@/components/dashboard/streaks-card";
import { TodayFocusCard } from "@/components/dashboard/today-focus-card";
import { RevisionsCard } from "@/components/dashboard/revisions-card";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProgressCard />
        <StreaksCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
           <TodayFocusCard />
        </div>
        <div className="col-span-3">
           <RevisionsCard />
        </div>
      </div>
    </div>
  );
}
