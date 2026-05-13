"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface Props {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  watchViewport?: boolean;
}

export default function ScrambleText({
  text,
  className,
  tag = "span",
  delay = 0,
  watchViewport = false,
}: Props) {
  const [display, setDisplay] = useState(text);
  const containerRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const started = useRef(false);

  const runScramble = () => {
    if (frameRef.current) clearInterval(frameRef.current);
    let iteration = 0;
    const total = text.length * 3;
    frameRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "'" || char === "—") return char;
            if (i < iteration / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration >= total) {
        clearInterval(frameRef.current!);
        setDisplay(text);
      }
    }, 28);
  };

  useEffect(() => {
    if (watchViewport) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !started.current) {
            started.current = true;
            setTimeout(runScramble, delay);
          }
        },
        { threshold: 0.3 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        if (frameRef.current) clearInterval(frameRef.current);
      };
    } else {
      const timeout = setTimeout(runScramble, delay);
      return () => {
        clearTimeout(timeout);
        if (frameRef.current) clearInterval(frameRef.current);
      };
    }
  }, [text, delay, watchViewport]);

  const setRef = (el: HTMLElement | null) => { containerRef.current = el; };

  if (tag === "h1") return <h1 ref={setRef} className={className}>{display}</h1>;
  if (tag === "h2") return <h2 ref={setRef} className={className}>{display}</h2>;
  if (tag === "h3") return <h3 ref={setRef} className={className}>{display}</h3>;
  if (tag === "p") return <p ref={setRef} className={className}>{display}</p>;
  if (tag === "div") return <div ref={setRef} className={className}>{display}</div>;
  return <span ref={setRef} className={className}>{display}</span>;
}
