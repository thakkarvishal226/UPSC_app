"use client"

import * as React from "react"
import { ChevronRight, ChevronDown, CheckCircle, Circle, Clock } from "lucide-react"
import { SyllabusTopic, TopicStatus } from "@/types/syllabus"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSyllabus } from "@/context/syllabus-context"

interface TopicItemProps {
  topic: SyllabusTopic;
  level?: number;
}

export function TopicItem({ topic, level = 0 }: TopicItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { updateStatus } = useSyllabus();

  const hasChildren = topic.subtopics && topic.subtopics.length > 0;

  const getStatusIcon = (status: TopicStatus) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Revised":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="w-full select-none">
      <div
        className={cn(
          "flex items-center justify-between py-2 px-2 hover:bg-accent/50 rounded-md cursor-pointer",
          level > 0 && "ml-4"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          ) : (
            <div className="w-6" />
          )}
          <span className={cn("font-medium", level === 0 ? "text-base" : "text-sm")}>
            {topic.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
           <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => {
                e.stopPropagation();
                const nextStatus: TopicStatus = topic.status === "Not Started" ? "In Progress" : topic.status === "In Progress" ? "Completed" : topic.status === "Completed" ? "Revised" : "Not Started";
                updateStatus(topic.id, nextStatus);
            }}
          >
            {getStatusIcon(topic.status)}
          </Button>
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className="border-l ml-5 pl-1">
          {topic.subtopics!.map((subtopic) => (
            <TopicItem key={subtopic.id} topic={subtopic} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
