"use client"

import { useState } from "react";
import { Question } from "@/types/answer-writing";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnswerUpload } from "@/components/answer-writing/answer-upload";

interface DailyQuestionProps {
  question: Question;
}

export function DailyQuestion({ question }: DailyQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (text: string, images: string[]) => {
    console.log("Submitted Answer:", { questionId: question.id, text, images });
    setSubmitted(true);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">{question.gsPaper}</Badge>
            <CardTitle className="text-lg leading-relaxed">{question.text}</CardTitle>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{question.source}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          {question.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        {submitted ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-center">
            <h3 className="text-green-600 font-semibold">Answer Submitted Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">Keep up the consistency.</p>
          </div>
        ) : (
          isOpen && <AnswerUpload questionId={question.id} onSubmit={handleSubmit} />
        )}
      </CardContent>
      {!submitted && (
        <CardFooter>
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="w-full">
            {isOpen ? <><ChevronUp className="mr-2 h-4 w-4" /> Hide Answer Area</> : <><ChevronDown className="mr-2 h-4 w-4" /> Write Answer</>}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
