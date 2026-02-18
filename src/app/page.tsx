"use client"

import { StreaksCard } from "@/components/dashboard/streaks-card";
import { TodayFocusCard } from "@/components/dashboard/today-focus-card";
import { RevisionsCard } from "@/components/dashboard/revisions-card";
import { QuoteWidget } from "@/components/dashboard/quote-widget";
import { SyllabusPieChart } from "@/components/dashboard/charts/syllabus-pie-chart";
import { UserStats } from "@/components/dashboard/user-stats";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <UserStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-2">
          <QuoteWidget />
        </div>
        <StreaksCard />
        <div className="md:col-span-1 lg:col-span-1">
            <SyllabusPieChart />
        </div>
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
