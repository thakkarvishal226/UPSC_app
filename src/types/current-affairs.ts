import { SyllabusTopic } from "./syllabus";

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string; // ISO date string
  summary?: string;
  url?: string;
  linkedTopics?: SyllabusTopic[];
}
