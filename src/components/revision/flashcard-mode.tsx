"use client"

import { useState } from "react";
import { SyllabusTopic } from "@/types/syllabus";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, RotateCcw } from "lucide-react";
import { useSyllabus } from "@/context/syllabus-context";

interface FlashcardProps {
  topics: SyllabusTopic[];
  onComplete: () => void;
}

export function FlashcardMode({ topics, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { updateStatus } = useSyllabus();

  const currentTopic = topics[currentIndex];

  const handleNext = (result: "retained" | "forgot") => {
    // Logic: If retained, mark Revised. If forgot, maybe reset interval?
    // For now, we just mark Revised to keep it simple.
    if (result === "retained") {
        updateStatus(currentTopic.id, "Revised");
    }

    if (currentIndex < topics.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      onComplete();
    }
  };

  if (!currentTopic) return <div>No topics to revise!</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] max-w-md mx-auto">
      <div
        className="w-full h-64 perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
            {/* Front */}
            <Card className={`absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white`}>
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{currentTopic.title}</h3>
                    <p className="text-sm opacity-80">Tap to see details</p>
                </div>
            </Card>

            {/* Back */}
            <Card className={`absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-white dark:bg-zinc-900 border-2 border-blue-500`}>
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
                    <ul className="text-left list-disc pl-4 space-y-2 text-sm">
                        <li>Definition & Scope</li>
                        <li>Critical Analysis</li>
                        <li>Current Relevance</li>
                    </ul>
                </div>
            </Card>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button variant="destructive" size="lg" className="rounded-full w-16 h-16 p-0" onClick={() => handleNext("forgot")}>
            <X className="h-8 w-8" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full w-16 h-16 p-0" onClick={() => setIsFlipped(!isFlipped)}>
            <RotateCcw className="h-6 w-6" />
        </Button>
        <Button variant="default" size="lg" className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600" onClick={() => handleNext("retained")}>
            <Check className="h-8 w-8" />
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} of {topics.length}
      </p>
    </div>
  );
}
