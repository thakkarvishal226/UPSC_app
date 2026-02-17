import { ChatBot } from "@/components/ai-assistant/chat-bot";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          AI Assistant
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3 h-[600px]">
           <ChatBot />
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
               <ul className="list-disc pl-4 space-y-2">
                 <li>Explain complex concepts (e.g., Fiscal Drag, Coriolis Force).</li>
                 <li>Break down syllabus topics into micro-tasks.</li>
                 <li>Suggest standard resources for topics.</li>
                 <li>Generate practice questions.</li>
               </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Direct integration with Google Gemini Pro API for real-time, context-aware answers.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
