"use client"

import { useState } from "react";
import { SyllabusTopic, TopicStatus } from "@/types/syllabus";
import { useSyllabus } from "@/context/syllabus-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, MoreVertical, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const COLUMNS: { id: TopicStatus; title: string; color: string }[] = [
  { id: "Not Started", title: "To Do", color: "bg-gray-100 dark:bg-zinc-800" },
  { id: "In Progress", title: "In Progress", color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "Completed", title: "Completed", color: "bg-green-50 dark:bg-green-900/20" },
  { id: "Revised", title: "Mastered", color: "bg-purple-50 dark:bg-purple-900/20" },
];

export function KanbanBoard() {
  const { syllabus } = useSyllabus();

  // Flatten top-level topics or just show GS papers?
  // Let's show the main GS papers and allow drilling down.
  // Actually, a Kanban works best for "Tasks".
  // Let's create a view that shows Sub-topics of a selected GS Paper.

  const [selectedPaperId, setSelectedPaperId] = useState<string>("gs1");
  const selectedPaper = syllabus.find(s => s.id === selectedPaperId);

  // Flatten the direct children (Subjects like History, Geography) to show in Kanban?
  // Or go one level deeper?
  // Let's show "Subjects" (History, Geography etc) as cards.

  const subjects = selectedPaper?.subtopics || [];

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {syllabus.map((paper) => (
          <Button
            key={paper.id}
            variant={selectedPaperId === paper.id ? "default" : "outline"}
            onClick={() => setSelectedPaperId(paper.id)}
            className="rounded-full"
          >
            {paper.title}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 h-full min-w-[1000px]">
          {COLUMNS.map((col) => (
            <div key={col.id} className={`flex-1 flex flex-col rounded-xl p-4 ${col.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{col.title}</h3>
                <Badge variant="secondary" className="rounded-full px-2">
                  {subjects.filter(s => s.status === col.id).length}
                </Badge>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-3">
                  <AnimatePresence>
                    {subjects.filter(s => s.status === col.id).map((subject) => (
                      <KanbanCard key={subject.id} topic={subject} />
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KanbanCard({ topic }: { topic: SyllabusTopic }) {
  const { updateStatus } = useSyllabus();

  // Calculate subtask progress
  const totalSub = topic.subtopics?.length || 0;
  const completedSub = topic.subtopics?.filter(s => s.status === "Completed" || s.status === "Revised").length || 0;
  const progress = totalSub > 0 ? (completedSub / totalSub) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Sheet>
        <SheetTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-primary">
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm leading-snug">{topic.title}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-3 w-3" />
                        </Button>
                    </div>

                    {totalSub > 0 && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                        </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            {topic.status === "Revised" ? <Sparkles className="h-3 w-3 text-purple-500" /> : <Clock className="h-3 w-3" />}
                            <span>{totalSub} Subtopics</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">{topic.title}</SheetTitle>
                <div className="flex gap-2">
                    <Badge variant={topic.status === "Completed" ? "default" : "outline"}>
                        {topic.status}
                    </Badge>
                </div>
            </SheetHeader>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sub-Topics Checklist</h3>
                    <div className="space-y-2">
                        {topic.subtopics?.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateStatus(sub.id, sub.status === "Completed" ? "In Progress" : "Completed")}
                                        className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${sub.status === "Completed" || sub.status === "Revised" ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-primary"}`}
                                    >
                                        {(sub.status === "Completed" || sub.status === "Revised") && <CheckCircle className="h-3 w-3" />}
                                    </button>
                                    <span className={`text-sm ${sub.status === "Completed" || sub.status === "Revised" ? "line-through text-muted-foreground" : ""}`}>
                                        {sub.title}
                                    </span>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* Additional actions like adding notes could go here */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-6 border-t">
                    <Button variant="outline" onClick={() => updateStatus(topic.id, "In Progress")}>Mark In Progress</Button>
                    <Button onClick={() => updateStatus(topic.id, "Completed")}>Mark Complete Section</Button>
                </div>
            </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
