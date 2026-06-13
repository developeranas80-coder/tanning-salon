"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo3D from "../Logo3D";

gsap.registerPlugin(ScrollTrigger);

interface PersistentLogoProps {
  active: boolean;
}

export default function PersistentLogo({ active }: PersistentLogoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.15 }
      );

      gsap.to(wrapRef.current, {
        scale: 0.42,
        y: 8,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=800",
          scrub: 1.2,
        },
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.35 + 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "max",
            scrub: true,
            onUpdate: (self) => {
              if (glowRef.current) {
                glowRef.current.style.opacity = String(0.35 + self.progress * 0.4);
              }
            },
          },
        });
      }
    });

    return () => ctx.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div className="persistent-logo pointer-events-none fixed left-1/2 top-6 z-[85] -translate-x-1/2 md:top-8">
      <div
        ref={wrapRef}
        className="relative flex h-[140px] w-[140px] items-center justify-center sm:h-[170px] sm:w-[170px] md:h-[200px] md:w-[200px]"
      >
        <div
          ref={glowRef}
          className="logo-scroll-glow absolute inset-[-20%] rounded-full opacity-50"
          aria-hidden
        />
        <Logo3D scrollDriven hideSubtitle />
      </div>
    </div>
  );
}
