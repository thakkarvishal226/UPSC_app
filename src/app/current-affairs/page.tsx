import { NewsFeed } from "@/components/current-affairs/news-feed";
import { NewsItem } from "@/types/current-affairs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MOCK_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "Supreme Court on Electoral Bonds Scheme",
    source: "The Hindu",
    date: "2024-02-16",
    summary: "The Supreme Court has struck down the Electoral Bonds scheme as unconstitutional.",
    url: "#",
    linkedTopics: []
  },
  {
    id: "n2",
    title: "India-UAE Bilateral Investment Treaty",
    source: "Indian Express",
    date: "2024-02-15",
    summary: "India and UAE sign Bilateral Investment Treaty during PM's visit.",
    url: "#",
    linkedTopics: []
  },
  {
    id: "n3",
    title: "ISRO launches INSAT-3DS",
    source: "PIB",
    date: "2024-02-17",
    summary: "ISRO successfully launches meteorological satellite INSAT-3DS.",
    url: "#",
    linkedTopics: []
  }
];

export default function CurrentAffairsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h1 className="text-3xl font-bold tracking-tight">Current Affairs Tracker</h1>
        <div className="flex gap-2 w-full md:w-auto">
             <Input placeholder="Add News URL..." className="md:w-64" />
             <Button>Add News</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3 space-y-6">
           <NewsFeed initialNews={MOCK_NEWS} />
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Monthly Compilations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                   <span>Vision IAS (Jan)</span>
                   <Button variant="outline" size="sm">Download</Button>
               </div>
               <div className="flex justify-between items-center text-sm">
                   <span>Vision IAS (Feb)</span>
                   <Button variant="outline" size="sm" disabled>Coming Soon</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
