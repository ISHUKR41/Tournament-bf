"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "../hooks/useWindowSize";

interface SuccessConfettiProps {
  show: boolean;
  duration?: number;
}

export function SuccessConfetti({
  show,
  duration = 5000,
}: SuccessConfettiProps) {
  const [isActive, setIsActive] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (show) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!isActive) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.3}
      colors={["#f97316", "#ea580c", "#ef4444", "#dc2626", "#ec4899"]}
    />
  );
}
