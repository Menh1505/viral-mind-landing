import { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // milliseconds before starting
  duration?: number; // total animation duration in ms
  speed?: number; // ms per scramble frame
  characters?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}

const DEFAULT_CHARS = "ABCDEF0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~";

export default function ScrambleText({
  text,
  className = "",
  delay = 100,
  duration = 1200,
  speed = 35,
  characters = DEFAULT_CHARS,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDone, setIsDone] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let timeoutId: NodeJS.Timeout;

    // Initially scramble the characters
    const generateScrambled = (progress: number) => {
      const length = text.length;
      const revealCount = Math.floor(progress * length);

      return text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "\n" || char === "\t") return char;
          if (index < revealCount) {
            return text[index];
          }
          // Scramble characters ahead of the reveal front
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          return randomChar;
        })
        .join("");
    };

    timeoutId = setTimeout(() => {
      let lastFrameTime = performance.now();

      const animate = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Throttle frame updates by `speed`
        if (now - lastFrameTime >= speed) {
          lastFrameTime = now;
          setDisplayText(generateScrambled(progress));
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsDone(true);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, delay, duration, speed, characters]);

  return (
    <Component className={className}>
      {isDone ? text : displayText}
    </Component>
  );
}
