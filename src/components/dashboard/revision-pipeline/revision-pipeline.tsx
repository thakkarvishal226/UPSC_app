"use client"

import { useSyllabus } from "@/context/syllabus-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { SyllabusTopic } from "@/types/syllabus";

export function RevisionPipeline() {
  const { syllabus } = useSyllabus();

  const getRevisions = (): { today: SyllabusTopic[], tomorrow: SyllabusTopic[], upcoming: SyllabusTopic[] } => {
    const today: SyllabusTopic[] = [];
    const tomorrow: SyllabusTopic[] = [];
    const upcoming: SyllabusTopic[] = [];

    const now = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(now.getDate() + 1);

    const flatten = (topics: SyllabusTopic[]) => {
      topics.forEach(t => {
        if (t.nextRevisionDate) {
          const revDate = new Date(t.nextRevisionDate);

          if (revDate.toDateString() === now.toDateString()) {
            today.push(t);
          } else if (revDate.toDateString() === tomorrowDate.toDateString()) {
            tomorrow.push(t);
          } else if (revDate > now) {
            upcoming.push(t);
          }
        }
        if (t.subtopics) flatten(t.subtopics);
      });
    };

    flatten(syllabus);
    return { today, tomorrow, upcoming: upcoming.slice(0, 5) };
  };

  const { today, tomorrow, upcoming } = getRevisions();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Revision Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
            {/* Today */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2 text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Due Today ({today.length})
                </h4>
                {today.length > 0 ? (
                    <div className="space-y-1">
                        {today.map(t => (
                            <div key={t.id} className="p-2 bg-green-50 dark:bg-green-900/10 rounded-md border border-green-100 dark:border-green-900/30 flex justify-between items-center">
                                <span className="text-sm font-medium">{t.title}</span>
                                <Badge variant="outline" className="text-[10px] h-5">Now</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground italic">No revisions due today.</p>
                )}
            </div>

            {/* Tomorrow */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Calendar className="h-3 w-3" />
                    Tomorrow ({tomorrow.length})
                </h4>
                {tomorrow.length > 0 ? (
                    <div className="space-y-1">
                        {tomorrow.map(t => (
                            <div key={t.id} className="p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-md border border-yellow-100 dark:border-yellow-900/30 flex justify-between items-center">
                                <span className="text-sm">{t.title}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground italic">No revisions for tomorrow.</p>
                )}
            </div>

            {/* Upcoming */}
            <div className="space-y-2 pt-2 border-t">
                <h4 className="text-sm font-medium text-muted-foreground">Upcoming</h4>
                <div className="flex flex-wrap gap-2">
                    {upcoming.map(t => (
                        <Badge key={t.id} variant="secondary" className="text-[10px] font-normal">
                            {t.title}
                        </Badge>
                    ))}
                    {upcoming.length === 0 && <span className="text-xs text-muted-foreground italic">Pipeline empty</span>}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
