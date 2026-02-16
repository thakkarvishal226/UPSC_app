"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressCard() {
  const { getProgress } = useSyllabus();
  const { total, completed, percentage } = getProgress();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Syllabus Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{percentage}%</div>
        <Progress value={percentage} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completed} of {total} topics completed
        </p>
      </CardContent>
    </Card>
  );
}
