"use client"

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Only set initial message if empty to avoid re-renders or hydration mismatch
    if (messages.length === 0) {
        setMessages([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm your UPSC AI Assistant powered by Gemini. Ask me to explain a concept, break down a syllabus topic, or suggest resources.",
            timestamp: Date.now(),
        },
        ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response for MVP (since we don't have a backend/API key setup in this env)
    setTimeout(() => {
      const responses = [
        "That's a great question about the syllabus.",
        "To understand this better, let's break it down into three parts...",
        "I recommend reading NCERT Class 11th for this topic.",
        "This concept is crucial for GS-III Economy.",
        "Would you like me to generate a practice question for this?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `(AI Simulation) ${randomResponse} \n\nI can explain more if you provide a specific topic like 'Fiscal Deficit' or 'Ocean Currents'.`,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-background shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-[10px] opacity-70 block mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
             <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
               <Bot className="h-5 w-5" />
             </div>
             <div className="bg-muted rounded-lg px-4 py-2 text-sm">
               <div className="flex gap-1">
                 <span className="animate-bounce">.</span>
                 <span className="animate-bounce delay-75">.</span>
                 <span className="animate-bounce delay-150">.</span>
               </div>
             </div>
           </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything about UPSC..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
           <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => setInput("Explain 'Basic Structure Doctrine'")}>Basic Structure</Badge>
           <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => setInput("Summarize 'Monetary Policy'")}>Monetary Policy</Badge>
           <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => setInput("Key battles in Modern History?")}>History Battles</Badge>
        </div>
      </div>
    </div>
  );
}
