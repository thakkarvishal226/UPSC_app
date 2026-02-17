"use client"

import * as React from "react"
import { TopicItem } from "@/components/syllabus/topic-item"
import { useSyllabus } from "@/context/syllabus-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function SyllabusTree() {
  const { syllabus } = useSyllabus();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Syllabus Tracker</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {syllabus.map((topic) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </CardContent>
    </Card>
  );
}
