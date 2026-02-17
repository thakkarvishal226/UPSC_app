"use client"

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AnswerUploadProps {
  questionId: string;
  onSubmit: (text: string, images: string[]) => void;
}

export function AnswerUpload({ onSubmit }: AnswerUploadProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages([...images, event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(text, images);
      setText("");
      setImages([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 mt-4">
      <Textarea
        placeholder="Type your answer here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />

      <div className="flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="Uploaded answer" className="h-24 w-24 object-cover rounded-md border" />
            <button
              onClick={() => removeImage(idx)}
              className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <label className="flex flex-col items-center justify-center h-24 w-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent transition-colors">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mt-1">Upload</span>
          <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <Button onClick={handleSubmit} disabled={isSubmitting || (!text && images.length === 0)}>
        {isSubmitting ? "Submitting..." : "Submit Answer"}
      </Button>
    </div>
  );
}
