"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

// Mock data for resources
const RESOURCES = [
  { id: "r1", title: "NCERT History Class 11", type: "pdf", topic: "Ancient History", url: "#" },
  { id: "r2", title: "Laxmikant Polity", type: "book", topic: "Polity", url: "#" },
  { id: "r3", title: "Mrunal Economics Videos", type: "video", topic: "Economy", url: "#" },
  { id: "r4", title: "Environment by Shankar IAS", type: "book", topic: "Environment", url: "#" },
  { id: "r5", title: "The Hindu Analysis", type: "video", topic: "Current Affairs", url: "#" },
];

export default function ResourcesPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4 text-red-500" />;
      case "pdf": return <FileText className="h-4 w-4 text-orange-500" />;
      default: return <BookOpen className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">Resource Library</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                 {resource.title}
              </CardTitle>
              {getIcon(resource.type)}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mt-4">
                 <Badge variant="secondary">{resource.topic}</Badge>
                 <a href={resource.url} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                   Open <ExternalLink className="h-3 w-3" />
                 </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
