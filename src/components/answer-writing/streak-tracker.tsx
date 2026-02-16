import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakTracker({ currentStreak, longestStreak }: StreakTrackerProps) {
  return (
    <Card className="col-span-1 md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Writing Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Current Streak</span>
            <span className="text-2xl font-bold">{currentStreak} Days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Longest Streak</span>
            <span className="text-xl font-medium">{longestStreak} Days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
