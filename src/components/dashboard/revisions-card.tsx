"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Repeat, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RevisionsCard() {
  const { getDueRevisions, updateStatus } = useSyllabus();
  const revisions = getDueRevisions();

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-blue-500" />
          Due for Revision
        </CardTitle>
      </CardHeader>
      <CardContent>
        {revisions.length > 0 ? (
          <div className="space-y-4">
            {revisions.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{topic.title}</span>
                  <span className="text-xs text-muted-foreground">Due: {new Date(topic.nextRevisionDate!).toLocaleDateString()}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => updateStatus(topic.id, "Revised")}>
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-1" />
                  Mark Revised
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No revisions due yet. Keep studying!</p>
        )}
      </CardContent>
    </Card>
  );
}
