"use client"

import { StreaksCard } from "@/components/dashboard/streaks-card";
import { TodayFocusCard } from "@/components/dashboard/today-focus-card";
import { RevisionPipeline } from "@/components/dashboard/revision-pipeline/revision-pipeline";
import { QuoteWidget } from "@/components/dashboard/quote-widget";
import { UserStats } from "@/components/dashboard/user-stats";
import { ProgressRing } from "@/components/dashboard/widgets/progress-ring";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Your Command Center
        </h2>
      </div>

      <UserStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-2 h-full">
          <QuoteWidget />
        </div>

        <Card className="flex flex-col items-center justify-center p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all">
            <ProgressRing />
            <h3 className="mt-4 font-semibold text-muted-foreground">Syllabus Covered</h3>
        </Card>

        <StreaksCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-6">
           <TodayFocusCard />
        </div>
        <div className="col-span-3 space-y-6">
           <RevisionPipeline />
        </div>
      </div>
    </div>
  );
}
