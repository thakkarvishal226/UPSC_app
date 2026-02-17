"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

export function StreaksCard() {
  const streaks = 5; // Placeholder

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Streak
        </CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{streaks} Days</div>
        <p className="text-xs text-muted-foreground">
          Keep it up! Consistency is key.
        </p>
      </CardContent>
    </Card>
  );
}
