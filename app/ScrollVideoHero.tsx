"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshLenisScroll } from "./lib/scroll";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoHeroProps {
  active: boolean;
  onSalonEntered?: () => void;
}

export default function ScrollVideoHero({ active, onSalonEntered }: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const centerLabelRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    const centerLabel = centerLabelRef.current;
    const scrollHint = scrollHintRef.current;
    const vignette = vignetteRef.current;

    if (!section || !pin || !video || !leftDoor || !rightDoor) return;

    let trigger: ScrollTrigger | null = null;
    let hasEnteredSalon = false;

    const setup = () => {
      ScrollTrigger.getById("hero-scroll")?.kill();

      trigger = ScrollTrigger.create({
        id: "hero-scroll",
        trigger: section,
        start: "top top",
        end: "+=450%",
        pin,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          const closeTight = p < 0.12 ? gsap.utils.mapRange(0, 0.12, 0, 1, p) : 0;
          const tightGap = closeTight * 1.5;

          const openStart = 0.12;
          const openEnd = 0.55;
          const openP =
            p <= openStart ? 0 : p >= openEnd ? 1 : (p - openStart) / (openEnd - openStart);

          const leftX = -(openP * 102 + tightGap);
          const rightX = openP * 102 + tightGap;
          const doorRotate = openP * 18;

          gsap.set(leftDoor, {
            xPercent: leftX,
            rotateY: doorRotate,
            transformOrigin: "left center",
          });
          gsap.set(rightDoor, {
            xPercent: rightX,
            rotateY: -doorRotate,
            transformOrigin: "right center",
          });

          if (centerLabel) {
            gsap.set(centerLabel, {
              opacity: 1 - openP * 1.4,
              scale: 1 - openP * 0.08,
              filter: `blur(${openP * 6}px)`,
            });
          }

          const videoStart = 0.35;
          const videoP = p <= videoStart ? 0 : (p - videoStart) / (1 - videoStart);
          if (video.duration && Number.isFinite(video.duration)) {
            video.currentTime = Math.min(
              video.duration - 0.04,
              Math.max(0, videoP * video.duration)
            );
          }

          if (scrollHint) {
            gsap.set(scrollHint, { opacity: p < 0.08 ? 1 - p * 8 : 0 });
          }

          if (vignette) {
            gsap.set(vignette, { opacity: 0.35 + openP * 0.15 - videoP * 0.2 });
          }

          if (p > 0.88 && !hasEnteredSalon) {
            hasEnteredSalon = true;
            onSalonEntered?.();
          }
        },
      });

      requestAnimationFrame(() => refreshLenisScroll());
      setTimeout(() => refreshLenisScroll(), 350);
    };

    const runSetup = () => {
      setup();
    };

    if (video.readyState >= 1) {
      runSetup();
    } else {
      video.addEventListener("loadedmetadata", runSetup, { once: true });
      video.addEventListener("loadeddata", runSetup, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", runSetup);
      video.removeEventListener("loadeddata", runSetup);
      trigger?.kill();
    };
  }, [active, onSalonEntered]);

  if (!active) return null;

  return (
    <div ref={sectionRef} className="scroll-hero-section relative w-full min-h-[100vh]">
      <div ref={pinRef} className="scroll-hero-pin relative h-screen w-full overflow-hidden bg-[#1a120e]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />

        <div ref={vignetteRef} className="scroll-hero-vignette pointer-events-none absolute inset-0 z-[2]" />
        <div className="scroll-hero-light-beam pointer-events-none absolute inset-0 z-[3]" />

        <div
          className="glass-doors-stage pointer-events-none absolute inset-0 z-[20] flex"
          style={{ perspective: "1400px" }}
        >
          <div
            ref={leftDoorRef}
            className="glass-door glass-door-left relative h-full w-1/2 will-change-transform"
          >
            <div className="glass-door-shine" />
            <span className="glass-door-text glass-door-text-left font-cormorant">Luxury</span>
          </div>

          <div
            ref={rightDoorRef}
            className="glass-door glass-door-right relative h-full w-1/2 will-change-transform"
          >
            <div className="glass-door-shine" />
            <span className="glass-door-text glass-door-text-right font-cormorant">
              Tanning Salon
            </span>
          </div>

          <div
            ref={centerLabelRef}
            className="glass-door-center-label pointer-events-none absolute inset-0 z-[25] flex flex-col items-center justify-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md sm:h-20 sm:w-20">
              <span className="font-serif-elegant text-2xl text-white/90 sm:text-3xl">LB</span>
            </div>
            <p className="font-sans-premium text-[9px] tracking-[0.55em] text-white/70 sm:text-[10px]">
              Scroll to enter
            </p>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 z-[30] flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-forum text-[8px] uppercase tracking-[0.45em] text-white/60">
            Scroll
          </span>
          <div className="scroll-hero-chevron h-8 w-[1px] bg-white/40" />
        </div>
      </div>
    </div>
  );
}
