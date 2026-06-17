"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PerfectTanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.from(".tan-reveal", {
        scrollTrigger: {
          trigger: ".tan-header-trigger",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stagger product cards individually
      gsap.utils.toArray<HTMLElement>(".tan-card").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.95,
          delay: (idx % 4) * 0.12,
          ease: "power3.out",
        });
      });

      // Reveal bottom pedestal & benefits card
      gsap.from(".tan-bottom-left", {
        scrollTrigger: {
          trigger: ".tan-bottom-row",
          start: "top 82%",
          once: true,
        },
        x: -50,
        opacity: 0,
        duration: 1.25,
        ease: "power3.out",
      });

      gsap.from(".tan-bottom-right", {
        scrollTrigger: {
          trigger: ".tan-bottom-row",
          start: "top 82%",
          once: true,
        },
        x: 50,
        opacity: 0,
        duration: 1.25,
        ease: "power3.out",
      });
    }, el);

    // Refresh scroll triggers after mount to ensure correct positioning with Lenis
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 px-6 md:px-12 bg-transparent"
    >
      {/* ── Background Palm Shadows (Aesthetic Drift) ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <img
          src="/palm_tree_shadow.png"
          alt=""
          className="absolute left-[-10%] top-[-5%] w-[450px] rotate-[-15deg] blur-sm opacity-[0.08]"
        />
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="absolute right-[-8%] bottom-[10%] w-[320px] rotate-[35deg] scale-x-[-1] opacity-[0.16]"
          style={{ filter: "blur(1.5px) brightness(1.05) sepia(0.25) contrast(0.9)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* ── Headings ── */}
        <div className="tan-header-trigger text-center mb-16 max-w-3xl mx-auto">
          <h2 className="tan-reveal font-display text-2xl md:text-3.5xl text-[#3d2b1f] tracking-wide mb-3 leading-tight uppercase">
            The Perfect Tan
          </h2>
          <h3 className="tan-reveal font-sans-premium text-[10px] md:text-[11px] tracking-[0.45em] text-[#b48b78] uppercase mb-6">
            Starts with the Right Products
          </h3>
          <div className="tan-reveal flex items-center justify-center gap-3 max-w-[280px] mx-auto mb-6">
            <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
            <span className="font-forum text-[7px] text-[#b48b78]">✦</span>
            <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
          </div>
          <p className="tan-reveal font-cormorant text-md md:text-lg text-[#5c4538]/90 italic leading-relaxed">
            Our premium range of lotions, mists, shots and goggles are designed to help you get the most from every session.
          </p>
        </div>

        {/* ── 4-Column Card Grid ── */}
        <div className="tan-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

          {/* Card 1: Lotions */}
          <div className="tan-card flex flex-col justify-between p-8 bg-[#fcf9f6]/85 backdrop-blur-md border border-[#b48b78]/25 hover:border-[#b48b78]/55 rounded-md hover:shadow-[0_15px_35px_rgba(180,139,120,0.08)] transition-all duration-500 group">
            <div className="flex flex-col items-center text-center">
              {/* Gold Outline Pump Bottle SVG */}
              <div className="p-4 bg-[#fbf8f5] rounded-full border border-[#b48b78]/15 mb-5 group-hover:scale-105 transition-transform duration-500">
                <svg
                  className="w-10 h-10 text-[#b48b78]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 22h6M12 22V9M12 5V3M10 3h4M7 9h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
                  <path d="M12 13v4M10 15h4" />
                </svg>
              </div>

              <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] font-semibold mb-3 uppercase">
                Tanning Lotions
              </h4>
              <p className="font-cormorant text-[14.5px] text-[#3d2b1f] leading-relaxed mb-6 italic">
                Nourish your skin and enhance your tan with our premium lotions.
              </p>
            </div>

            <div>
              <div className="w-10 h-[1px] bg-[#b48b78]/30 mx-auto mb-5" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Boosts & accelerates natural tanning</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Deep hydration & skin nourishment</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Longer lasting, darker results</span>
                </li>
              </ul>
              
              <button
                onClick={() => {
                  document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-center py-2.5 px-4 rounded-full border border-[#b48b78]/30 hover:border-[#b48b78] text-[#5c4538] hover:text-white hover:bg-[#b48b78] transition-all duration-300 font-sans-premium text-[7.5px] tracking-[0.2em] uppercase"
              >
                Explore Lotions
              </button>
            </div>
          </div>

          {/* Card 2: Mists */}
          <div className="tan-card flex flex-col justify-between p-8 bg-[#fcf9f6]/85 backdrop-blur-md border border-[#b48b78]/25 hover:border-[#b48b78]/55 rounded-md hover:shadow-[0_15px_35px_rgba(180,139,120,0.08)] transition-all duration-500 group">
            <div className="flex flex-col items-center text-center">
              {/* Gold Outline Spray Mist SVG */}
              <div className="p-4 bg-[#fbf8f5] rounded-full border border-[#b48b78]/15 mb-5 group-hover:scale-105 transition-transform duration-500">
                <svg
                  className="w-10 h-10 text-[#b48b78]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 22h4M12 22V10M8 10h8a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1Z" />
                  <path d="M12 3V1M9 1h6M17 5c1 0 2 .5 2 1.5S18 8 17 8M18 6.5h3" />
                </svg>
              </div>

              <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] font-semibold mb-3 uppercase">
                Tanning Mists
              </h4>
              <p className="font-cormorant text-[14.5px] text-[#3d2b1f] leading-relaxed mb-6 italic">
                Quick, easy and mess-free top up tan on the go.
              </p>
            </div>

            <div>
              <div className="w-10 h-[1px] bg-[#b48b78]/30 mx-auto mb-5" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Instant golden glow</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Dries in seconds</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Perfect for face & body</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Hydrating & refreshing</span>
                </li>
              </ul>
              
              <button
                onClick={() => {
                  document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-center py-2.5 px-4 rounded-full border border-[#b48b78]/30 hover:border-[#b48b78] text-[#5c4538] hover:text-white hover:bg-[#b48b78] transition-all duration-300 font-sans-premium text-[7.5px] tracking-[0.2em] uppercase"
              >
                Explore Mists
              </button>
            </div>
          </div>

          {/* Card 3: Shots */}
          <div className="tan-card flex flex-col justify-between p-8 bg-[#fcf9f6]/85 backdrop-blur-md border border-[#b48b78]/25 hover:border-[#b48b78]/55 rounded-md hover:shadow-[0_15px_35px_rgba(180,139,120,0.08)] transition-all duration-500 group">
            <div className="flex flex-col items-center text-center">
              {/* Gold Outline Shot Dropper Bottle SVG */}
              <div className="p-4 bg-[#fbf8f5] rounded-full border border-[#b48b78]/15 mb-5 group-hover:scale-105 transition-transform duration-500">
                <svg
                  className="w-10 h-10 text-[#b48b78]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 22h8M12 22V9M9 9h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1Z" />
                  <circle cx="12" cy="14.5" r="2.5" />
                  <path d="M12 12v5M10 14.5h4" />
                </svg>
              </div>

              <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] font-semibold mb-3 uppercase">
                Tanning Shots
              </h4>
              <p className="font-cormorant text-[14.5px] text-[#3d2b1f] leading-relaxed mb-6 italic">
                Small but powerful boosts to maximise your tanning results.
              </p>
            </div>

            <div>
              <div className="w-10 h-[1px] bg-[#b48b78]/30 mx-auto mb-5" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Intensifies your tan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Supports melanin production</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Use with every tanning session</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Great value, big results</span>
                </li>
              </ul>
              
              <button
                onClick={() => {
                  document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-center py-2.5 px-4 rounded-full border border-[#b48b78]/30 hover:border-[#b48b78] text-[#5c4538] hover:text-white hover:bg-[#b48b78] transition-all duration-300 font-sans-premium text-[7.5px] tracking-[0.2em] uppercase"
              >
                Explore Shots
              </button>
            </div>
          </div>

          {/* Card 4: Goggles */}
          <div className="tan-card flex flex-col justify-between p-8 bg-[#fcf9f6]/85 backdrop-blur-md border border-[#b48b78]/25 hover:border-[#b48b78]/55 rounded-md hover:shadow-[0_15px_35px_rgba(180,139,120,0.08)] transition-all duration-500 group">
            <div className="flex flex-col items-center text-center">
              {/* Gold Outline Tanning Goggles SVG */}
              <div className="p-4 bg-[#fbf8f5] rounded-full border border-[#b48b78]/15 mb-5 group-hover:scale-105 transition-transform duration-500">
                <svg
                  className="w-10 h-10 text-[#b48b78]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12c1.5 2 4.5 3 7 1.5S12 9 12 9s.5 3 3 4.5 5.5.5 7-1.5M2 12h20" />
                  <circle cx="7.5" cy="11.5" r="2.5" />
                  <circle cx="16.5" cy="11.5" r="2.5" />
                </svg>
              </div>

              <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] font-semibold mb-3 uppercase">
                Tanning Goggles
              </h4>
              <p className="font-cormorant text-[14.5px] text-[#3d2b1f] leading-relaxed mb-6 italic">
                Protect your eyes in style with our comfortable goggles.
              </p>
            </div>

            <div>
              <div className="w-10 h-[1px] bg-[#b48b78]/30 mx-auto mb-5" />
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Protects against UV exposure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Comfortable & lightweight</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-3.5 h-3.5 text-[#b48b78] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans-readable text-[12.5px] text-[#2a1f18] font-medium">Essential for a safe tanning experience</span>
                </li>
              </ul>
              
              <button
                onClick={() => {
                  document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-center py-2.5 px-4 rounded-full border border-[#b48b78]/30 hover:border-[#b48b78] text-[#5c4538] hover:text-white hover:bg-[#b48b78] transition-all duration-300 font-sans-premium text-[7.5px] tracking-[0.2em] uppercase"
              >
                Explore Goggles
              </button>
            </div>
          </div>

        </div>

        {/* ── Bottom Pedestal Display & Benefits Row ── */}
        <div className="tan-bottom-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Product Showcase Pedestal (Borderless) */}
          <div className="tan-bottom-left lg:col-span-6 flex items-center justify-center relative group p-0">
            <div className="relative w-full max-w-[480px] transform hover:scale-[1.03] transition-transform duration-700">
              <img
                src="/tanning_products_mockup.png"
                alt="Life's a Beach Premium Tanning Products Showcase"
                className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(42,31,24,0.15)]"
              />
            </div>
          </div>

          {/* Right: Invest in Your Glow Card (Premium Glassmorphism) */}
          <div className="tan-bottom-right lg:col-span-6 flex flex-col justify-center p-8 md:p-12 bg-[#fcf9f6]/60 backdrop-blur-md border border-[#b48b78]/25 rounded-2xl shadow-[0_20px_50px_rgba(180,139,120,0.08)] relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b48b78]/5 to-transparent pointer-events-none" />

            {/* Decorative leaf shadow */}
            <div className="absolute right-[-10%] bottom-[-5%] pointer-events-none opacity-[0.04] z-0">
              <img src="/hero_palm_leaf.png" alt="" className="w-48 h-auto rotate-12" />
            </div>

            <div className="relative z-10 text-center">
              <span className="font-cursive text-5xl md:text-6xl text-[#b48b78] block mb-2 leading-none">
                Invest in Your Glow
              </span>
              <h4 className="font-sans-premium text-[9px] tracking-[0.3em] text-[#5c4538] mb-12 uppercase font-bold">
                The Right Products = Better Results
              </h4>

              {/* 4-column benefits row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

                {/* Benefit 1: Healthier Skin */}
                <div className="flex flex-col items-center group/item text-center">
                  <div className="w-12 h-12 rounded-full border border-[#b48b78]/25 bg-white/50 flex items-center justify-center text-[#b48b78] mb-3.5 group-hover/item:border-[#b48b78]/50 group-hover/item:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7Z" />
                    </svg>
                  </div>
                  <span className="font-sans-premium text-[7px] tracking-[0.18em] text-[#3d2b1f] uppercase font-bold leading-normal">
                    Healthier<br />Skin
                  </span>
                </div>

                {/* Benefit 2: Faster Results */}
                <div className="flex flex-col items-center group/item text-center">
                  <div className="w-12 h-12 rounded-full border border-[#b48b78]/25 bg-white/50 flex items-center justify-center text-[#b48b78] mb-3.5 group-hover/item:border-[#b48b78]/50 group-hover/item:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="12" cy="12" r="4.5" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M2 12h2M20 12h2M6.34 17.66l-1.06 1.06M17.66 6.34l-1.06 1.06" />
                    </svg>
                  </div>
                  <span className="font-sans-premium text-[7px] tracking-[0.18em] text-[#3d2b1f] uppercase font-bold leading-normal">
                    Faster<br />Results
                  </span>
                </div>

                {/* Benefit 3: Longer Lasting Tan */}
                <div className="flex flex-col items-center group/item text-center">
                  <div className="w-12 h-12 rounded-full border border-[#b48b78]/25 bg-white/50 flex items-center justify-center text-[#b48b78] mb-3.5 group-hover/item:border-[#b48b78]/50 group-hover/item:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="3" y="4" width="18" height="17" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="5" />
                      <line x1="8" y1="2" x2="8" y2="5" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <path d="m9 14.5 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="font-sans-premium text-[7px] tracking-[0.18em] text-[#3d2b1f] uppercase font-bold leading-normal">
                    Longer<br />Lasting Tan
                  </span>
                </div>

                {/* Benefit 4: Confidence That Shines */}
                <div className="flex flex-col items-center group/item text-center">
                  <div className="w-12 h-12 rounded-full border border-[#b48b78]/25 bg-white/50 flex items-center justify-center text-[#b48b78] mb-3.5 group-hover/item:border-[#b48b78]/50 group-hover/item:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <span className="font-sans-premium text-[7px] tracking-[0.18em] text-[#3d2b1f] uppercase font-bold leading-normal">
                    Confidence<br />That Shines
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}
