export interface Question {
  id: string;
  text: string;
  source: string; // e.g., "UPSC CSE 2023", "Vision IAS"
  gsPaper: "GS1" | "GS2" | "GS3" | "GS4";
  tags: string[];
  date: string; // ISO date string
}

export interface Answer {
  id: string;
  questionId: string;
  text?: string;
  imageUrls?: string[]; // For uploaded handwritten answers
  date: string;
  status: "Draft" | "Submitted" | "Reviewed";
  feedback?: string;
  score?: number;
}
