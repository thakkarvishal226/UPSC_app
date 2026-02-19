"use client"

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

export function Celebration({ trigger }: { trigger: boolean }) {
  const { width, height } = useWindowSize();
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Using timeout to avoid synchronous state update warning
      const startTimer = setTimeout(() => setIsExploding(true), 0);
      const endTimer = setTimeout(() => setIsExploding(false), 5000);
      return () => {
          clearTimeout(startTimer);
          clearTimeout(endTimer);
      };
    }
  }, [trigger]);

  if (!isExploding) return null;

  return <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />;
}
