export interface PYQ {
  id: string;
  year: number;
  type: "Prelims" | "Mains";
  subject: string;
  question: string;
  options?: string[]; // For Prelims
  answer?: string; // Correct option for Prelims, Model answer for Mains
  explanation?: string;
  topic?: string;
}
