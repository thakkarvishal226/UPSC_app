import { Question } from "@/types/answer-writing";
import { DailyQuestion } from "@/components/answer-writing/daily-question";
import { StreakTracker } from "@/components/answer-writing/streak-tracker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Discuss the impact of climate change on Indian agriculture and suggest measures to mitigate it.",
    source: "UPSC CSE 2023",
    gsPaper: "GS3",
    tags: ["Environment", "Agriculture", "Climate Change"],
    date: "2024-02-16",
  },
  {
    id: "q2",
    text: "Critically analyze the role of the Governor in the Indian federal structure.",
    source: "Vision IAS",
    gsPaper: "GS2",
    tags: ["Polity", "Federalism", "Governor"],
    date: "2024-02-15",
  },
];

export default function AnswerWritingPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">Answer Writing Practice</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily">Daily Practice</TabsTrigger>
              <TabsTrigger value="pyq">PYQ Vault</TabsTrigger>
              <TabsTrigger value="submitted">My Answers</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Today&apos;s Questions</h2>
              {MOCK_QUESTIONS.map((q) => (
                <DailyQuestion key={q.id} question={q} />
              ))}
            </TabsContent>
            <TabsContent value="pyq">
              <div className="p-4 text-center text-muted-foreground">PYQ Vault coming soon...</div>
            </TabsContent>
             <TabsContent value="submitted">
              <div className="p-4 text-center text-muted-foreground">No submitted answers yet.</div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1 space-y-6">
          <StreakTracker currentStreak={3} longestStreak={12} />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:underline">How to write good answers?</a>
              <a href="#" className="block hover:underline">Topper&apos;s Answer Copies</a>
              <a href="#" className="block hover:underline">Quote Repository</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
