"use client"

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const QUOTES = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "You have to dream before your dreams can come true.", author: "A. P. J. Abdul Kalam" },
];

export function QuoteWidget() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Pick a random quote on mount (or could be daily based on date)
    // Using a timeout to avoid synchronous state update warning, though not strictly necessary for this use case
    // it helps clear the linter warning.
    const timer = setTimeout(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
      <CardContent className="p-6 flex flex-col justify-center h-full relative">
        <Quote className="absolute top-4 left-4 h-8 w-8 opacity-20" />
        <figure className="text-center z-10">
          <blockquote className="text-lg font-medium italic mb-2">
            &quot;{quote.text}&quot;
          </blockquote>
          <figcaption className="text-sm opacity-80">
            — {quote.author}
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
}
