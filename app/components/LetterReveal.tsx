"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LetterRevealProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  wordGap?: string;
}

export default function LetterReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.042,
  wordGap = "0.28em",
}: LetterRevealProps) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars.length) return;

    gsap.set(chars, { opacity: 0, y: 18, filter: "blur(6px)" });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.55,
      stagger,
      delay,
      ease: "power3.out",
    });
  }, [text, delay, stagger]);

  const letters = text.split("");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {letters.map((char, i) => (
        <span
          key={`${i}-${char}`}
          data-char
          className="inline-block will-change-transform"
          style={char === " " ? { width: wordGap } : undefined}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
