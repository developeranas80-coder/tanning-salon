"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import LetterReveal from "./LetterReveal";

interface PasswordGuardProps {
  children: React.ReactNode;
}

export default function PasswordGuard({ children }: PasswordGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const screenRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const leavingRef = useRef(false);

  useEffect(() => {
    // Check local storage for previous session auth
    const isAuth = localStorage.getItem("site-authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
    setHasChecked(true);
  }, []);

  useEffect(() => {
    if (!hasChecked || isAuthenticated) return;
    if (!extrasRef.current || !buttonRef.current) return;

    // Set initial states for elements
    gsap.set([extrasRef.current, buttonRef.current], { opacity: 0 });

    const tl = gsap.timeline();
    tl.to(extrasRef.current, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
    tl.to(buttonRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
  }, [hasChecked, isAuthenticated]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (leavingRef.current) return;

    if (password === "Relister80") {
      leavingRef.current = true;
      setError(false);
      localStorage.setItem("site-authenticated", "true");

      if (!uiRef.current || !screenRef.current) {
        setIsAuthenticated(true);
        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            setIsAuthenticated(true);
          },
        })
        .to(uiRef.current, { opacity: 0, scale: 0.96, duration: 0.65, ease: "power2.in" })
        .to(screenRef.current, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.25");
    } else {
      setError(true);
      setPassword("");
      // Shake animation on the form
      if (uiRef.current) {
        gsap.to(uiRef.current, {
          x: 10,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(uiRef.current, { x: 0 });
          },
        });
      }
    }
  };

  // Prevent flash of content during checking
  if (!hasChecked) {
    return <div className="fixed inset-0 bg-[#2b1f18] z-[999999]" />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div
      ref={screenRef}
      className="enter-screen fixed inset-0 h-[100svh] w-full z-[999999] flex items-center justify-center overflow-hidden bg-[#2b1f18]"
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
        className="enter-ui relative z-20 flex w-full max-w-lg flex-col items-center px-6 py-10 sm:max-w-xl text-center"
      >
        <div className="enter-brand-block text-center mb-6">
          <LetterReveal
            as="h1"
            text="LIFE'S A BEACH"
            className="font-display text-[clamp(1.2rem,7vw,2rem)] whitespace-nowrap leading-none tracking-[0.14em] text-3d-luxury-gold sm:text-5xl md:text-[3.25rem]"
            delay={0.3}
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
              className="font-sans-premium text-[clamp(7px,2.2vw,9px)] tracking-[0.55em] sm:tracking-[0.75em] text-[#b8957d] sm:text-[10px] whitespace-nowrap mb-6"
              delay={0.8}
              stagger={0.038}
              wordGap="1em"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center max-w-xs z-30">
          <div className="relative w-full mb-4">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSCODE"
              className="w-full bg-[#1e1510]/60 border border-[#c4a088]/30 focus:border-[#c4a088] rounded-full px-6 py-3.5 text-center text-white placeholder-[#c4a088]/45 tracking-[0.3em] font-sans-premium outline-none transition-all duration-300 focus:ring-1 focus:ring-[#c4a088]/35 text-[10px] backdrop-blur-[4px]"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-[#d88a75] font-sans-premium text-[9px] tracking-[0.2em] mb-4 animate-fade-in uppercase">
              INCORRECT PASSWORD. TRY AGAIN.
            </div>
          )}

          <button
            ref={buttonRef}
            type="submit"
            className="btn-luxury w-full cursor-pointer py-3.5 text-[9px] tracking-[0.45em] font-bold uppercase transition-all duration-300"
            aria-label="Unlock Website"
          >
            UNLOCK
          </button>
        </form>
      </div>
    </div>
  );
}
