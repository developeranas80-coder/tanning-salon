"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo3D from "../Logo3D";

gsap.registerPlugin(ScrollTrigger);

interface HomeHeroProps {
  visible: boolean;
}

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/lifes.abeachtanning?igsh=d2ZsbGVja2tjcXM0" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function HomeHero({ visible }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!visible || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-logo-pedestal", {
        scale: 0.85,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.to(".hero-bg-img", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-palm-left", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-palm-right", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="home-hero relative min-h-screen overflow-hidden"
    >
      <div className="hero-bg-wrap absolute inset-0">
        <img
          src="/hero-salon.png"
          alt=""
          className="hero-bg-img parallax-layer h-full w-full object-cover"
          data-speed="0.2"
        />
        <div className="hero-bg-overlay absolute inset-0" />
        <div className="hero-mist absolute bottom-0 left-0 right-0 h-[35%]" />
      </div>

      <div className="parallax-palm-left pointer-events-none absolute -left-[5%] top-0 z-[8] h-[55%] w-[35%] bg-gradient-to-br from-[#2a1f18]/40 to-transparent opacity-60" />
      <div className="parallax-palm-right pointer-events-none absolute -right-[8%] top-0 z-[8] h-[50%] w-[38%] bg-gradient-to-bl from-[#2a1f18]/35 to-transparent opacity-50" />

      <div className="relative z-20 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-28 lg:grid-cols-12 lg:gap-4 lg:px-12 lg:pt-24">
        <div className="hero-copy lg:col-span-4">
          <h2 className="font-display text-5xl leading-[0.95] tracking-[0.06em] text-[#e8d5c4] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            LIFE&apos;S
            <br />
            A BEACH
          </h2>
          <p className="font-cursive hero-script mt-3 text-5xl text-[#d4b896] sm:text-6xl md:text-7xl">
            glow your way
          </p>
          <p className="mt-8 max-w-sm font-cormorant text-base italic leading-relaxed text-[#e8d5c4]/75 md:text-lg">
            Premium tanning experience in a luxury environment with state of the art beds and
            unbeatable vibes.
          </p>
          <a href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach" target="_blank" rel="noopener noreferrer" className="btn-luxury mt-10 inline-flex items-center gap-4 px-10 py-4 text-[9px]">
            <span>BOOK NOW</span>
            <span className="text-lg leading-none">→</span>
          </a>
        </div>

        <div className="hero-logo-pedestal relative flex flex-col items-center justify-center lg:col-span-4">
          <div className="pedestal-glow absolute bottom-[12%] h-6 w-[55%] rounded-full" />
          <div className="pedestal-ring absolute bottom-[10%] h-3 w-[48%] rounded-full border border-white/20" />
          <div className="relative z-10 h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px]">
            <Logo3D />
          </div>
        </div>

        <div className="hidden flex-col items-end justify-between self-stretch py-8 lg:col-span-4 lg:flex">
          <div />
          <div className="social-rail flex flex-col gap-6">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href !== "#" ? "_blank" : undefined}
                rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                className="social-link font-forum"
              >
                <span className="social-dot" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-rail absolute bottom-12 left-6 z-20 hidden flex-col items-center gap-4 md:left-12 lg:flex">
        <span className="font-forum text-[7px] tracking-[0.4em] text-[#e8d5c4]/50 [writing-mode:vertical-lr] rotate-180">
          SCROLL TO EXPLORE
        </span>
        <div className="scroll-rail-line" />
      </div>
    </section>
  );
}
