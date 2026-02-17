"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TodayFocusCard() {
  const { getPendingTasks, updateStatus } = useSyllabus();
  const tasks = getPendingTasks(3);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Focus for Today</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${task.status === "In Progress" ? "bg-yellow-500" : "bg-gray-300"}`} />
                  <span className="font-medium text-sm">{task.title}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => updateStatus(task.id, "Completed")}>
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Mark Done
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No pending tasks! Great job.</p>
        )}
      </CardContent>
    </Card>
  );
}
