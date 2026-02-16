"use client"

import { useState } from "react";
import { NewsItem } from "@/types/current-affairs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSyllabus } from "@/context/syllabus-context";
import { SyllabusTopic } from "@/types/syllabus";

interface SyllabusTaggerProps {
  onTag: (topics: SyllabusTopic[]) => void;
}

export function SyllabusTagger({ onTag }: SyllabusTaggerProps) {
  const { syllabus } = useSyllabus();
  const [selectedTopics, setSelectedTopics] = useState<SyllabusTopic[]>([]);
  const [search, setSearch] = useState("");

  const flattenSyllabus = (topics: SyllabusTopic[]): SyllabusTopic[] => {
    let flat: SyllabusTopic[] = [];
    topics.forEach(t => {
      flat.push(t);
      if (t.subtopics) {
        flat = flat.concat(flattenSyllabus(t.subtopics));
      }
    });
    return flat;
  };

  const allTopics = flattenSyllabus(syllabus);
  const filteredTopics = allTopics.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).slice(0, 5);

  const toggleTopic = (topic: SyllabusTopic) => {
    if (selectedTopics.find(t => t.id === topic.id)) {
      setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <div className="space-y-4">
      <Input placeholder="Search syllabus topics..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {filteredTopics.map(topic => (
          <Badge
            key={topic.id}
            variant={selectedTopics.find(t => t.id === topic.id) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTopic(topic)}
          >
            {topic.title}
          </Badge>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onTag(selectedTopics)}>Link Selected Topics</Button>
      </div>
    </div>
  );
}

export function NewsFeed({ initialNews }: { initialNews: NewsItem[] }) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  const handleLinkTopics = (newsId: string, topics: SyllabusTopic[]) => {
    setNews(news.map(n => n.id === newsId ? { ...n, linkedTopics: topics } : n));
  };

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium hover:text-blue-600 cursor-pointer">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">{item.source}</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{item.summary}</p>
            <div className="flex flex-wrap gap-2 items-center">
              {item.linkedTopics &&
                item.linkedTopics.map((t) => (
                  <Badge key={t.id} variant="secondary">
                    {t.title}
                  </Badge>
                ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6">
                    <Link2 className="h-3 w-3 mr-1" /> Link Syllabus
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Link Syllabus Topics</DialogTitle>
                  </DialogHeader>
                  <SyllabusTagger
                    onTag={(topics) => handleLinkTopics(item.id, topics)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
