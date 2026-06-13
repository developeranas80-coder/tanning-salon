"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo3D, { LOGO_IMAGE_SRC } from "../Logo3D";
import LetterReveal from "./LetterReveal";

interface EnterScreenProps {
  onEnter: () => void;
}

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leavingRef = useRef(false);

  useEffect(() => {
    if (!extrasRef.current || !buttonRef.current) return;

    const targetLogo = logoRef.current;

    gsap.set([extrasRef.current, buttonRef.current], { opacity: 0 });
    if (targetLogo) {
      gsap.set(targetLogo, { opacity: 0, y: 28 });
    }

    const tl = gsap.timeline();
    if (targetLogo) {
      tl.to(targetLogo, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
      tl.to(extrasRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
    } else {
      tl.to(extrasRef.current, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 });
    }
    tl.to(buttonRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");

    if (targetLogo) {
      gsap.to(targetLogo, {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const handleEnter = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;

    const finish = () => onEnter();

    if (!uiRef.current || !screenRef.current) {
      finish();
      return;
    }

    gsap
      .timeline({ onComplete: finish })
      .to(uiRef.current, { opacity: 0, scale: 0.96, duration: 0.65, ease: "power2.in" })
      .to(screenRef.current, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.25");
  };

  return (
    <div
      ref={screenRef}
      className="enter-screen fixed inset-0 h-[100dvh] w-full z-[100] flex items-center justify-center overflow-hidden"
    >
      <div className="enter-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="enter-bg-shimmer pointer-events-none absolute inset-0" aria-hidden />
      <div className="silk-drape silk-drape-left pointer-events-none" aria-hidden />
      <div className="silk-drape silk-drape-right pointer-events-none" aria-hidden />
      <div
        className="enter-floor-glow pointer-events-none absolute bottom-0 left-0 right-0 h-[45%]"
        aria-hidden
      />

      <div
        ref={uiRef}
        className="enter-ui relative z-20 flex w-full max-w-lg flex-col items-center px-6 py-10 sm:max-w-xl"
      >
        {/* <div
          ref={logoRef}
          className="enter-logo-wrap pointer-events-none relative mb-4 flex aspect-square w-[300px] items-center justify-center overflow-visible sm:mb-5 sm:w-[360px] md:w-[420px]"
        >
          <Logo3D imageSrc={LOGO_IMAGE_SRC} />
        </div> */}

        <div className="enter-brand-block text-center">
          <LetterReveal
            as="h1"
            text="LIFE'S A BEACH"
            className="font-display text-[clamp(1.2rem,7vw,2rem)] whitespace-nowrap leading-none tracking-[0.14em] text-3d-luxury-gold sm:text-5xl md:text-[3.25rem]"
            delay={0.55}
            stagger={0.05}
          />

          <div ref={extrasRef} className="enter-brand-extras opacity-0">
            <div className="mx-auto my-3 flex items-center justify-center gap-3 sm:my-4">
              <span className="h-px w-10 bg-[#c4a088]/40" />
              <span className="text-[8px] text-[#c4a088]/60">◆</span>
              <span className="h-px w-10 bg-[#c4a088]/40" />
            </div>
            <LetterReveal
              as="p"
              text="LUXURY TANNING SALON"
              className="font-sans-premium text-[clamp(7px,2.2vw,9px)] tracking-[0.55em] sm:tracking-[0.75em] text-[#b8957d] sm:text-[10px] whitespace-nowrap"
              delay={1.35}
              stagger={0.038}
              wordGap="1em"
            />
          </div>
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleEnter}
          className="btn-luxury enter-btn relative z-30 mt-6 cursor-pointer px-16 py-4 sm:mt-8"
          aria-label="Enter site"
        >
          <LetterReveal
            as="span"
            text="ENTER"
            className="text-[9px] tracking-[0.55em]"
            delay={1.75}
            stagger={0.07}
          />
        </button>
      </div>
    </div>
  );
}
