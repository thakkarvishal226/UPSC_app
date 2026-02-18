"use client"

import { useState } from "react";
import { PYQ } from "@/types/pyq";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PYQCardProps {
  pyq: PYQ;
}

export function PYQCard({ pyq }: PYQCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (pyq.type === "Prelims") {
    return (
      <Card className="mb-4">
        <CardHeader className="pb-2">
           <div className="flex justify-between items-start">
               <div className="flex gap-2 mb-2">
                   <Badge variant="outline">{pyq.year}</Badge>
                   <Badge variant="secondary">{pyq.subject}</Badge>
               </div>
               <span className="text-xs text-muted-foreground">Prelims</span>
           </div>
           <p className="font-medium text-lg leading-relaxed">{pyq.question}</p>
        </CardHeader>
        <CardContent>
            <div className="space-y-2 mt-2">
                {pyq.options?.map((opt, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            selectedOption === idx
                                ? (opt.startsWith(pyq.answer!) ? "bg-green-100 border-green-500 dark:bg-green-900/20" : "bg-red-100 border-red-500 dark:bg-red-900/20")
                                : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedOption(idx)}
                    >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                    </div>
                ))}
            </div>
            {selectedOption !== null && (
                <div className="mt-4 p-4 bg-muted rounded-md text-sm">
                    <p className="font-bold mb-1">Correct Answer: {pyq.answer}</p>
                    <p>{pyq.explanation}</p>
                </div>
            )}
        </CardContent>
      </Card>
    );
  }

  // Mains
  return (
    <Card className="mb-4">
        <CardHeader>
           <div className="flex justify-between items-start">
               <div className="flex gap-2 mb-2">
                   <Badge variant="outline">{pyq.year}</Badge>
                   <Badge variant="secondary">{pyq.subject}</Badge>
               </div>
               <span className="text-xs text-muted-foreground">Mains</span>
           </div>
           <p className="font-medium text-lg leading-relaxed">{pyq.question}</p>
        </CardHeader>
        <CardContent>
            {showAnswer && (
                <div className="mt-2 p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
                    <p className="font-bold mb-2">Model Answer Structure:</p>
                    {pyq.answer}
                </div>
            )}
        </CardContent>
        <CardFooter>
            <Button variant="ghost" onClick={() => setShowAnswer(!showAnswer)} className="w-full">
                {showAnswer ? <><EyeOff className="mr-2 h-4 w-4" /> Hide Answer</> : <><Eye className="mr-2 h-4 w-4" /> View Model Answer</>}
            </Button>
        </CardFooter>
    </Card>
  );
}
