"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroPalmShadows from "./HeroPalmShadows";

gsap.registerPlugin(ScrollTrigger);

interface LandingHeroProps {
  active: boolean;
  heroRef?: React.RefObject<HTMLElement | null>;
}

const MARQUEE_TEXT = "Where every day is a beach day";
// Repeat enough times to fill the screen seamlessly
const MARQUEE_ITEMS = Array.from({ length: 8 }, (_, i) => i);

export default function LandingHero({ active, heroRef }: LandingHeroProps) {
  const fallbackRef = useRef<HTMLElement>(null);
  const sectionRef = heroRef ?? fallbackRef;

  useEffect(() => {
    const el = sectionRef.current;
    if (!active || !el) return;

    const ctx = gsap.context(() => {
      // Fade in marquee
      gsap.from(".hero-marquee-track", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.4,
      });

      // ─── Entry Animations for Products & Leaves ───
      gsap.from(".hero-el-gold-bottle-wrap", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".hero-el-bronze-spray-wrap", {
        y: 70,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.75,
      });
      gsap.from(".hero-el-cream-tube-wrap", {
        y: 90,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(".hero-el-lotion-jar-wrap", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.7,
      });
      gsap.from(".hero-el-palm-leaf-wrap", {
        x: -60,
        opacity: 0,
        duration: 1.7,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.from(".hero-el-monstera-leaf-wrap", {
        x: 60,
        opacity: 0,
        duration: 1.7,
        ease: "power2.out",
        delay: 0.85,
      });
      gsap.from(".hero-el-center-serum-wrap", {
        y: 100,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
        delay: 1.05,
      });


      // ─── Infinite Gentle Float Loops (Dreamlike Random Multidirectional Sweeping Orbit) ───
      // 1. Gold Bottle Float (X & Y animated independently with coprime durations to prevent repetition)
      gsap.to(".hero-el-gold-bottle-img", {
        x: 22,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-gold-bottle-img", {
        y: 28,
        rotation: 6,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 2. Bronze Spray Float
      gsap.to(".hero-el-bronze-spray-img", {
        x: -24,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-bronze-spray-img", {
        y: 30,
        rotation: -7,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 3. Cream Tube Float
      gsap.to(".hero-el-cream-tube-img", {
        x: 20,
        duration: 4.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-cream-tube-img", {
        y: -26,
        rotation: 7,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 4. Lotion Jar Float
      gsap.to(".hero-el-lotion-jar-img", {
        x: -22,
        duration: 5.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-lotion-jar-img", {
        y: -28,
        rotation: -6,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 5. Palm Leaf Float
      gsap.to(".hero-el-palm-leaf-img", {
        x: 24,
        duration: 5.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-palm-leaf-img", {
        y: 30,
        rotation: 7,
        duration: 4.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 6. Monstera Leaf Float
      gsap.to(".hero-el-monstera-leaf-img", {
        x: -24,
        duration: 5.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-el-monstera-leaf-img", {
        y: 32,
        rotation: -8,
        duration: 4.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // 7. Center Serum Float (Pure vertical-only drift to maintain absolute horizontal dead-center)
      gsap.to(".hero-el-center-serum-img", {
        y: -24,
        rotation: 5,
        duration: 3.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });



      // ─── Scroll Trigger Parallax Effects ───
      gsap.to(".hero-el-gold-bottle-wrap", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-bronze-spray-wrap", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-cream-tube-wrap", {
        yPercent: 45,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-lotion-jar-wrap", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-palm-leaf-wrap", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-monstera-leaf-wrap", {
        yPercent: 60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-el-center-serum-wrap", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });


      // Parallax on palm trees during scroll
      gsap.to(".hero-palm-tree", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll indicator fade
      gsap.to(".scroll-hint", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [active, sectionRef]);

  if (!active) return null;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="home"
      className="landing-hero relative flex min-h-[100svh] flex-col overflow-visible pt-[calc(5.25rem+10px)]"
    >
      {/* Local Shifting Gradient Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="hero-local-bg-gradient w-full h-full" />
        {/* Seamless blend overlay to match the body gradient top color #E3DAC9 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E3DAC9]/20 to-[#E3DAC9]" />
      </div>

      {/* Palm Tree Shadows — top-left & top-right, gently swaying */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <HeroPalmShadows />
      </div>

      {/* Background Palm Shadow texture (CTA style) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[1]" aria-hidden="true">
        <img
          src="/cta_luxury_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.16] scale-[1.03] will-change-transform transform-gpu"
          style={{ filter: "brightness(1.02) contrast(1.02)" }}
        />
        {/* Soft elegant gradient mask to blend with page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E3DAC9]/30 to-[#E3DAC9]" />
      </div>

      {/* Luxury Floating Product Elements — Real Client Products (2 Sprays, 2 Creams, 1 Sachet) */}
      <div className="pointer-events-none absolute inset-0 z-10 select-none">

        {/* 1. Decorative Palm Leaf (Far left edge, mid-height, blurred) */}
        <div className="hero-el-palm-leaf-wrap absolute left-[-6%] top-[25%] sm:left-[-2%] sm:top-[26%] w-[65px] sm:w-[min(15vw,120px)] z-[3]">
          <img
            src="/hero_palm_leaf.png?v=3"
            alt=""
            className="hero-el-palm-leaf-img w-full object-contain"
            style={{ filter: "blur(3.8px)" }}
          />
        </div>

        {/* 2. SPRAY — Watermelon Salt Spray (Top-left corner, tilted -12°) */}
        <div className="hero-el-gold-bottle-wrap absolute left-[1%] top-[10%] sm:left-[2%] sm:top-[6%] w-[75px] sm:w-[min(15vw,120px)] z-[6]">
          <div style={{ transform: "rotate(-12deg)" }} className="w-full h-full">
            <img
              src="/In_sarey_prodycts_ko_spray_202606111005.png"
              alt="Bronzed A.F Watermelon Salt Spray"
              className="hero-el-gold-bottle-img w-full object-contain"
            />
          </div>
        </div>

        {/* 3. SPRAY — Vanilla & Coconut Salt Spray (Top-right corner, tilted 12°) */}
        <div className="hero-el-bronze-spray-wrap absolute right-[1%] top-[9%] sm:right-[2%] sm:top-[6%] w-[75px] sm:w-[min(15vw,120px)] z-[4]">
          <div style={{ transform: "rotate(12deg)" }} className="w-full h-full">
            <img
              src="/In_sarey_prodycts_ko_spray_202606111005 (1).png"
              alt="Bronzed A.F Vanilla & Coconut Salt Spray"
              className="hero-el-bronze-spray-img w-full object-contain"
            />
          </div>
        </div>

        {/* 4. CREAM — Peach Tanning Cream (Bottom-left, tilted 20°) */}
        <div className="hero-el-cream-tube-wrap absolute left-[4%] bottom-[5%] sm:left-[13%] sm:bottom-[6%] w-[80px] sm:w-[min(17vw,135px)] z-[6]">
          <div style={{ transform: "rotate(20deg)" }} className="w-full h-full">
            <img
              src="/coconut-cream.png"
              alt="Bronzed A.F Coconut & Vanilla Tanning Cream"
              className="hero-el-cream-tube-img w-full object-contain"
            />
          </div>
        </div>

        {/* 5. CREAM — Mango Tanning Cream (Bottom-right, tilted -15°) */}
        <div className="hero-el-lotion-jar-wrap absolute right-[3%] bottom-[4%] sm:right-[10%] sm:bottom-[5%] w-[80px] sm:w-[min(17vw,135px)] z-[4]">
          <div style={{ transform: "rotate(-15deg)" }} className="w-full h-full">
            <img
              src="/mango-cream.png"
              alt="Bronzed A.F Mango Tanning Cream"
              className="hero-el-lotion-jar-img w-full object-contain"
            />
          </div>
        </div>

        {/* 6. Decorative Monstera Leaf (Far right edge, mid-height, blurred) */}
        <div className="hero-el-monstera-leaf-wrap absolute right-[-4%] top-[32%] sm:right-[-1%] sm:top-[30%] w-[65px] sm:w-[min(15vw,120px)] z-[7]">
          <img
            src="/hero_monstera_leaf.png?v=3"
            alt=""
            className="hero-el-monstera-leaf-img w-full object-contain"
            style={{ filter: "blur(4.5px)" }}
          />
        </div>

        {/* 7. SACHET — Strawberry (Bottom-center, tilted 5°) */}
        <div className="absolute left-1/2 bottom-[-10px] sm:bottom-[-20px] w-[75px] sm:w-[min(14vw,110px)] z-[6] -translate-x-1/2">
          <div className="hero-el-center-serum-wrap w-full">
            <div style={{ transform: "rotate(5deg)" }} className="w-full h-full">
              <img
                src="/background_black_kardo_2K_202606111031.png"
                alt="Bronzed A.F Strawberry Sachet"
                className="hero-el-center-serum-img w-full object-contain"
              />
            </div>
          </div>
        </div>


      </div>

      {/* Marquee scrolling text — elegant, placed between the two side sprays */}
      <div className="hero-marquee-track absolute top-[54%] sm:top-1/2 -translate-y-1/2 left-0 z-[12] w-full overflow-hidden">
        <div className="hero-marquee-scroll flex w-max items-center">
          {MARQUEE_ITEMS.map((i) => (
            <span
              key={i}
              className="hero-marquee-item font-display whitespace-nowrap pr-[8vw] text-[clamp(2rem,5vw,5rem)] leading-none tracking-[0.06em] text-[#B48B78]"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>


      {/* Scroll indicator */}
      <div className="scroll-hint absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-forum text-[7px] tracking-[0.4em] text-[#B48B78]/50">Scroll</span>
        <div className="scroll-rail-line h-12" />
      </div>
    </section>
  );
}
