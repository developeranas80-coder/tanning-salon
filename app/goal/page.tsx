"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";
import TestimonialSection from "../components/TestimonialSection";
import InnerPageCta from "../components/InnerPageCta";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SUITES = [
  { name: "Dubai", room: "Room 1", model: "megaSun K9SL", desc: "Our flagship premium full LED tanning experience." },
  { name: "Maldives", room: "Room 2", model: "megaSun K9SL", desc: "Luxury full LED tanning inspired by paradise." },
  { name: "Mauritius", room: "Room 3", model: "megaSun P9S Copper Rose", desc: "Advanced skincare, collagen features and comfort." },
  { name: "Seychelles", room: "Room 4", model: "megaSun 8000", desc: "Our ultimate high-performance premium tanning." },
  { name: "Thailand", room: "Room 5", model: "Stand-Up Booth", desc: "Powerful, fast and refreshing stand-up tanning." },
  { name: "Dominican Republic", room: "Room 6", model: "Future Expansion", desc: "Coming soon... Reserved for luxury expansion." },
];

const LAYDOWN_PRICING = [
  { mins: "4 Minutes", price: "£5.00" },
  { mins: "6 Minutes", price: "£6.50" },
  { mins: "8 Minutes", price: "£8.00" },
  { mins: "10 Minutes", price: "£9.50" },
  { mins: "12 Minutes", price: "£11.00" },
  { mins: "14 Minutes", price: "£12.00" },
  { mins: "16 Minutes", price: "£13.00" },
  { mins: "18 Minutes", price: "£14.00" },
  { mins: "20 Minutes", price: "£15.00" },
];

const STANDUP_PRICING = [
  { mins: "4 Minutes", price: "£4.50" },
  { mins: "6 Minutes", price: "£5.50" },
  { mins: "8 Minutes", price: "£6.50" },
  { mins: "10 Minutes", price: "£7.50" },
  { mins: "12 Minutes", price: "£8.50" },
  { mins: "14 Minutes", price: "£9.50" },
  { mins: "16 Minutes", price: "£10.50" },
  { mins: "18 Minutes", price: "£11.50" },
  { mins: "20 Minutes", price: "£12.50" },
];

const MEMBERSHIPS = [
  {
    name: "BRONZE",
    minutes: "50",
    price: "£34.99",
    crownColor: "#c88e68", // Bronze gold
    accentColor: "#3d2b1f",
    borderColor: "rgba(180, 139, 120, 0.25)",
    hoverBorderColor: "rgba(200, 142, 104, 0.6)",
    glowColor: "rgba(200, 142, 104, 0.05)",
    features: ["PRIORITY BOOKING"],
    badge: null,
    badgeBg: "",
  },
  {
    name: "SILVER",
    minutes: "100",
    price: "£57.99",
    crownColor: "#9ea4a9", // Silver platinum
    accentColor: "#3d2b1f",
    borderColor: "rgba(180, 139, 120, 0.25)",
    hoverBorderColor: "rgba(158, 164, 169, 0.6)",
    glowColor: "rgba(158, 164, 169, 0.05)",
    features: [
      "PRIORITY BOOKING",
      "10% DISCOUNT ON LOTIONS, DRINKS & COFFEE"
    ],
    badge: "MOST POPULAR",
    badgeBg: "linear-gradient(135deg, #fcf9f6 0%, #e8d5c4 100%)",
  },
  {
    name: "GOLD",
    minutes: "150",
    price: "£74.99",
    crownColor: "#d4af37", // Gold
    accentColor: "#3d2b1f",
    borderColor: "rgba(197, 160, 89, 0.4)",
    hoverBorderColor: "rgba(212, 175, 55, 0.7)",
    glowColor: "rgba(212, 175, 55, 0.08)",
    features: [
      "PRIORITY BOOKING",
      "15% DISCOUNT ON LOTIONS, DRINKS & COFFEE"
    ],
    badge: "BEST VALUE",
    badgeBg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  },
];

export default function GoalPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [stamps, setStamps] = useState<{ [key: string]: boolean }>({
    Dubai: false,
    Maldives: false,
    Mauritius: false,
    Seychelles: false,
    Thailand: false,
  });

  const toggleStamp = (city: string) => {
    setStamps((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal headings
      gsap.utils.toArray<HTMLElement>(".goal-reveal").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      // Reveal items individually on scroll with local sibling stagger
      gsap.utils.toArray<HTMLElement>(".goal-stagger-item").forEach((item) => {
        const parent = item.parentElement;
        const index = parent ? Array.from(parent.children).indexOf(item) : 0;

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            once: true,
          },
          y: 25,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.08, // Subtle local row stagger
          ease: "power3.out",
        });
      });

      // Initial ScrollTrigger refresh
      ScrollTrigger.refresh();
    }, el);

    // Timeout refresh to account for lazy-loaded assets and layout shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Our Tanning Goal"
        subtitle="Embark on a luxury passport journey across our custom suites and discover our lounge purpose."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Goal" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground />

        {/* ─── SECTION 1: TRAVEL THE WORLD INTRODUCTION ─── */}
        <section className="relative overflow-hidden py-20 border-b border-[#b48b78]/15">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">

            {/* Header */}
            <div className="goal-reveal text-center mb-16 relative">
              <h2 className="font-display text-3xl md:text-4.5xl text-[#3d2b1f] tracking-wide mb-3 leading-tight uppercase">
                Travel The World
              </h2>
              <h3 className="font-cursive text-3xl text-[#b48b78] lowercase tracking-wide mb-6">
                with Life's a Beach
              </h3>
              <div className="flex items-center justify-center gap-3 max-w-[280px] mx-auto mb-6">
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
                <span className="font-forum text-[7px] text-[#b48b78]">✦</span>
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
              </div>
              <h4 className="font-sans-premium text-[9px] tracking-[0.35em] text-[#5c4538] uppercase mb-4 font-bold">
                Take a Journey of Tanning Like No Other
              </h4>
            </div>

            {/* Flight Path SVG Map & Compass */}
            <div className="goal-reveal relative flex flex-col md:flex-row items-center justify-center gap-10 bg-[#fcf9f6]/40 border border-[#b48b78]/15 rounded-2xl p-8 md:p-12 mb-16 backdrop-blur-[2px]">

              {/* Left Compass */}
              <div className="flex-shrink-0 flex flex-col items-center select-none">
                <svg className="w-20 h-20 text-[#b48b78] opacity-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  {/* Static Outer Ring */}
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                  <text x="46.5" y="14" fill="#b48b78" style={{ fontFamily: "'Forum', serif", fontSize: '9px', fontWeight: 'bold' }}>N</text>
                  <text x="47" y="94" fill="#b48b78" style={{ fontFamily: "'Forum', serif", fontSize: '9px', fontWeight: 'bold' }}>S</text>

                  {/* Rotating Needle Only */}
                  <g className="animate-[spin_25s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
                    <path d="M50 16 L54 45 L50 50 L46 45 Z" fill="#b48b78" />
                    <path d="M50 84 L54 55 L50 50 L46 55 Z" fill="#e8d5c4" />
                  </g>
                </svg>
                <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] mt-3">CO-ORDINATES</span>
              </div>

              {/* Styled Dash World Map & Path */}
              <div className="flex-1 w-full overflow-x-auto pb-2 scrollbar-none">
                <div className="min-w-[580px] relative aspect-[800/380] rounded-xl overflow-hidden bg-[#faf6f0]/30 border border-[#b48b78]/15 shadow-inner">
                  {/* Gold Watercolor Map Texture Background */}
                  <img
                    src="/gold_world_map.png"
                    alt="Gold World Map Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-multiply pointer-events-none"
                  />

                  {/* Inline CSS animation for flight paths and scrollbar hiding */}
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes map-dash {
                      to {
                        stroke-dashoffset: -20;
                      }
                    }
                    .animate-map-dash {
                      animation: map-dash 1.5s linear infinite;
                    }
                    .scrollbar-none::-webkit-scrollbar {
                      display: none;
                    }
                    .scrollbar-none {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}} />

                  {/* SVG Overlay */}
                  <svg className="absolute inset-0 w-full h-full text-[#b48b78]" viewBox="0 0 800 380" fill="none" stroke="currentColor" strokeWidth="1">
                    {/* Flight Dashed Paths spanning the entire map */}
                    <path
                      d="M 180,190 C 220,130 280,100 360,120 C 400,140 440,150 480,170 C 500,190 530,210 560,230 C 595,210 620,190 650,200"
                      fill="none"
                      stroke="#b48b78"
                      strokeWidth="1.8"
                      strokeDasharray="5 5"
                      className="opacity-90 animate-map-dash"
                    />
                    <path
                      d="M 650,200 C 600,100 400,60 180,190"
                      fill="none"
                      stroke="#b48b78"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      className="opacity-50 animate-map-dash"
                      style={{ animationDirection: 'reverse' }}
                    />

                    {/* Flight airplane symbol */}
                    <g transform="translate(260, 140) rotate(-15) scale(0.8)">
                      <path d="M12 2L2 22l10-6 10 6L12 2z" fill="#b48b78" stroke="#b48b78" strokeWidth="1" />
                    </g>

                    {/* Cities Labels/Hotspots */}

                    {/* DOMINICAN REPUBLIC (Caribbean/Americas - far left) */}
                    <line x1="180" y1="165" x2="180" y2="183" stroke="#b48b78" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="180" cy="190" r="4" fill="none" stroke="#b48b78" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="4;12" dur="2.5s" begin="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.5s" begin="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="180" cy="190" r="4.5" fill="#b48b78" />
                    <rect x="130" y="147" width="100" height="18" rx="4" fill="#faf6f0" stroke="#b48b78" strokeWidth="0.8" opacity="0.95" />
                    <text x="180" y="159" textAnchor="middle" fill="#3d2b1f" style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: '0.08em', fontWeight: 'bold' }} fontSize="8">
                      DOMINICAN REP.
                    </text>

                    {/* SALON */}
                    <line x1="360" y1="95" x2="360" y2="113" stroke="#3d2b1f" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="360" cy="120" r="5" fill="none" stroke="#3d2b1f" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="5;14" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="360" cy="120" r="5" fill="#3d2b1f" />
                    <rect x="325" y="77" width="70" height="18" rx="4" fill="#faf6f0" stroke="#b48b78" strokeWidth="0.8" opacity="0.95" />
                    <text x="360" y="89" textAnchor="middle" fill="#3d2b1f" style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: '0.12em', fontWeight: 'bold' }} fontSize="9">
                      SALON
                    </text>

                    {/* DUBAI */}
                    <line x1="480" y1="145" x2="480" y2="163" stroke="#b48b78" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="480" cy="170" r="4" fill="none" stroke="#b48b78" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="4;12" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="480" cy="170" r="4.5" fill="#b48b78" />
                    <rect x="445" y="127" width="70" height="18" rx="4" fill="#faf6f0" stroke="#b48b78" strokeWidth="0.8" opacity="0.95" />
                    <text x="480" y="139" textAnchor="middle" fill="#3d2b1f" style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: '0.12em', fontWeight: 'bold' }} fontSize="9">
                      DUBAI
                    </text>

                    {/* MALDIVES */}
                    <line x1="560" y1="237" x2="560" y2="255" stroke="#b48b78" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="560" cy="230" r="4" fill="none" stroke="#b48b78" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="4;12" dur="2.5s" begin="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.5s" begin="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="560" cy="230" r="4.5" fill="#b48b78" />
                    <rect x="520" y="255" width="80" height="18" rx="4" fill="#faf6f0" stroke="#b48b78" strokeWidth="0.8" opacity="0.95" />
                    <text x="560" y="267" textAnchor="middle" fill="#3d2b1f" style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: '0.12em', fontWeight: 'bold' }} fontSize="9">
                      MALDIVES
                    </text>

                    {/* THAILAND */}
                    <line x1="650" y1="175" x2="650" y2="193" stroke="#b48b78" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="650" cy="200" r="4" fill="none" stroke="#b48b78" strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="4;12" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="650" cy="200" r="4.5" fill="#b48b78" />
                    <rect x="610" y="157" width="80" height="18" rx="4" fill="#faf6f0" stroke="#b48b78" strokeWidth="0.8" opacity="0.95" />
                    <text x="650" y="169" textAnchor="middle" fill="#3d2b1f" style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: '0.12em', fontWeight: 'bold' }} fontSize="9">
                      THAILAND
                    </text>
                  </svg>
                </div>
              </div>

            </div>

            {/* How It Works Grid */}
            <div className="goal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

              {/* Step 1 */}
              <div className="goal-stagger-item flex flex-col justify-between p-6 bg-[#fcf9f6]/75 border border-[#b48b78]/20 rounded-md text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3.5 bg-white rounded-full border border-[#b48b78]/15 text-[#b48b78] mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="2" y="9" width="20" height="8" rx="2" />
                      <path d="M5 9V7a3 3 0 0 1 6 0v2M19 9V7a3 3 0 0 0-6 0v2" />
                    </svg>
                  </div>
                  <span className="font-forum text-[7px] tracking-[0.35em] text-[#b48b78] uppercase mb-1">Step 1</span>
                  <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] uppercase font-bold mb-2">1. Explore</h4>
                  <p className="font-cormorant text-xs text-[#5c4538]/90 italic leading-relaxed">
                    Try every bed in the salon and experience the difference.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="goal-stagger-item flex flex-col justify-between p-6 bg-[#fcf9f6]/75 border border-[#b48b78]/20 rounded-md text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3.5 bg-white rounded-full border border-[#b48b78]/15 text-[#b48b78] mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <circle cx="12" cy="11" r="3" />
                      <path d="M12 8v6M9 11h6" />
                    </svg>
                  </div>
                  <span className="font-forum text-[7px] tracking-[0.35em] text-[#b48b78] uppercase mb-1">Step 2</span>
                  <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] uppercase font-bold mb-2">2. Collect</h4>
                  <p className="font-cormorant text-xs text-[#5c4538]/90 italic leading-relaxed">
                    We'll stamp your passport each time you try a new bed.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="goal-stagger-item flex flex-col justify-between p-6 bg-[#fcf9f6]/75 border border-[#b48b78]/20 rounded-md text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3.5 bg-white rounded-full border border-[#b48b78]/15 text-[#b48b78] mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 10h18M8 10v10M16 10v10" />
                    </svg>
                  </div>
                  <span className="font-forum text-[7px] tracking-[0.35em] text-[#b48b78] uppercase mb-1">Step 3</span>
                  <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] uppercase font-bold mb-2">3. Complete</h4>
                  <p className="font-cormorant text-xs text-[#5c4538]/90 italic leading-relaxed">
                    Once you've tried them all, you've completed your tanning journey!
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="goal-stagger-item flex flex-col justify-between p-6 bg-[#fcf9f6]/75 border border-[#b48b78]/20 rounded-md text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3.5 bg-white rounded-full border border-[#b48b78]/15 text-[#b48b78] mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="2" y="9" width="20" height="8" rx="2" />
                      <path d="M12 9V7a3 3 0 0 1 3-3M12 17v4" />
                      <path d="m9 12 3-3 3 3" />
                    </svg>
                  </div>
                  <span className="font-forum text-[7px] tracking-[0.35em] text-[#b48b78] uppercase mb-1">Step 4</span>
                  <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] uppercase font-bold mb-2">4. Reward</h4>
                  <p className="font-cormorant text-xs text-[#5c4538]/90 italic leading-relaxed">
                    Enjoy your last bed absolutely FREE!
                  </p>
                </div>
              </div>

            </div>

            {/* Polaroid Wall Showcase Area */}
            <div className="goal-stagger grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Left Box: Text */}
              <div className="goal-stagger-item lg:col-span-4 flex flex-col justify-center p-8 bg-[#fcf9f6]/80 border border-[#b48b78]/20 rounded-md text-center">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20 12V4h-4M4 12V4h4M12 4v16" />
                  <rect x="2" y="12" width="20" height="8" rx="1" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold mb-3">
                  Your Journey.<br />Your Reward.
                </h4>
                <div className="w-8 h-[1px] bg-[#b48b78]/30 mx-auto mb-4" />
                <p className="font-sans text-[11.5px] text-[#5c4538] leading-relaxed mb-4 font-sans-readable font-medium">
                  Complete the journey and
                </p>
                <p className="font-cursive text-3xl text-[#b48b78] mb-4">
                  Your Last Bed is Free!
                </p>
                <p className="font-cormorant text-xs text-[#5c4538]/85 italic">
                  Because every adventure deserves the perfect finish.
                </p>
              </div>

              {/* Middle: Polaroid Photo Mockup */}
              <div className="goal-stagger-item lg:col-span-4 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-4 pb-10 shadow-[0_15px_35px_rgba(42,31,24,0.1)] border border-[#b48b78]/15 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 max-w-[230px] w-full">
                  <div className="aspect-square bg-[#faf6f0] overflow-hidden border border-[#b48b78]/10 mb-4">
                    <img
                      src="/maldives_k9sl.png"
                      alt="Sunset Beach"
                      className="w-full h-full object-cover grayscale-[20%] sepia-[15%]"
                    />
                  </div>
                  <span className="font-cursive text-xl text-[#5c4538] text-center block">
                    Another journey completed ♡
                  </span>
                </div>
              </div>

              {/* Right Box: Wall of Globe Trotters */}
              <div className="goal-stagger-item lg:col-span-4 flex flex-col justify-between p-8 bg-[#fcf9f6]/80 border border-[#b48b78]/20 rounded-md text-center">
                <div>
                  <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="font-sans-readable text-[11px] text-[#5c4538] leading-relaxed mb-4 font-semibold uppercase tracking-wider">
                    We'll take a quick polaroid photo and add you to our
                  </p>
                  <h4 className="font-cursive text-3.5xl text-[#b48b78] leading-none mb-1">
                    Wall of Globe Trotters
                  </h4>
                  <p className="font-cormorant text-[11px] text-[#5c4538]/70 italic">
                    A wall celebrating those who've travelled the world with Life's a Beach.
                  </p>
                </div>

                {/* Hanging Mini Polaroids Mockup */}
                <div className="relative flex justify-center items-center gap-2 mt-6">
                  <div className="absolute top-4 left-0 right-0 h-[1.5px] bg-[#b48b78]/25" />
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-12 h-16 bg-white p-1 pb-4 shadow-md border border-black/5 flex-shrink-0 transition-transform duration-300 ${i % 2 === 0 ? "rotate-[5deg]" : "rotate-[-5deg]"
                        } hover:rotate-0 hover:scale-105`}
                    >
                      <div className="w-10 h-10 bg-[#f7f3ed] overflow-hidden">
                        <img src="/about_salon.png" alt="" className="w-full h-full object-cover grayscale opacity-80" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer phrase */}
            <div className="w-full h-[1px] bg-[#b48b78]/15 my-12" />
            <div className="text-center">
              <span className="font-sans-premium text-[8px] tracking-[0.45em] text-[#b48b78] uppercase">
                Explore. Glow. Complete. Celebrate.
              </span>
              <span className="font-cursive text-4xl text-[#3d2b1f] my-3 block leading-normal">
                The world of tanning awaits you.
              </span>
            </div>

          </div>
        </section>

        {/* ─── SECTION 2: OUR REASON FOR OPENING ─── */}
        <section className="relative overflow-hidden py-20 border-b border-[#b48b78]/15 bg-white/10">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">

            {/* Header */}
            <div className="goal-reveal text-center mb-16">
              <h2 className="font-display text-3xl text-[#3d2b1f] tracking-wide mb-3 uppercase">
                Our Reason For Opening
              </h2>
              <div className="flex items-center justify-center gap-3 max-w-[280px] mx-auto mb-6">
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
                <span className="font-forum text-[7px] text-[#b48b78]">✦</span>
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
              </div>
              <h3 className="font-sans-premium text-[9px] tracking-[0.35em] text-[#5c4538] uppercase mb-2 font-bold">
                To Be Better. Giving Luxury,
              </h3>
              <p className="font-cursive text-3xl text-[#b48b78] mt-1">
                but not at excessive pricing.
              </p>
            </div>

            {/* 4 values grid */}
            <div className="goal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

              {/* Value 1 */}
              <div className="goal-stagger-item p-6 bg-[#fcf9f6]/85 border border-[#b48b78]/25 rounded-md text-center hover:shadow-[0_12px_30px_rgba(180,139,120,0.06)] transition-all duration-300">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold mb-3">Amazing Staff</h4>
                <p className="font-cormorant text-sm text-[#5c4538]/85 italic leading-relaxed">
                  A team that cares and makes every visit special.
                </p>
              </div>

              {/* Value 2 */}
              <div className="goal-stagger-item p-6 bg-[#fcf9f6]/85 border border-[#b48b78]/25 rounded-md text-center hover:shadow-[0_12px_30px_rgba(180,139,120,0.06)] transition-all duration-300">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M9 22h6M12 22V9M12 5V3M10 3h4M7 9h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold mb-3">Fantastic Products</h4>
                <p className="font-cormorant text-sm text-[#5c4538]/85 italic leading-relaxed">
                  Premium products to enhance your tan and care for your skin.
                </p>
              </div>

              {/* Value 3 */}
              <div className="goal-stagger-item p-6 bg-[#fcf9f6]/85 border border-[#b48b78]/25 rounded-md text-center hover:shadow-[0_12px_30px_rgba(180,139,120,0.06)] transition-all duration-300">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="9" width="20" height="8" rx="2" />
                  <path d="M5 9V7a3 3 0 0 1 6 0v2M19 9V7a3 3 0 0 0-6 0v2" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold mb-3">The Best Beds</h4>
                <p className="font-cormorant text-sm text-[#5c4538]/85 italic leading-relaxed">
                  State-of-the-art beds for the ultimate tanning experience.
                </p>
              </div>

              {/* Value 4 */}
              <div className="goal-stagger-item p-6 bg-[#fcf9f6]/85 border border-[#b48b78]/25 rounded-md text-center hover:shadow-[0_12px_30px_rgba(180,139,120,0.06)] transition-all duration-300">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold mb-3">Luxury Experience</h4>
                <p className="font-cormorant text-sm text-[#5c4538]/85 italic leading-relaxed">
                  Luxury without the excessive price tag. That's our promise.
                </p>
              </div>

            </div>

            {/* More than just a tan: lounge details */}
            <div className="goal-stagger grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column: Amenities List */}
              <div className="lg:col-span-7 space-y-6">
                <span className="font-sans-premium text-[9px] tracking-[0.3em] text-[#b48b78] font-bold block mb-4 uppercase">
                  More Than Just A Tan
                </span>

                {/* Amenity 1 */}
                <div className="goal-stagger-item flex items-start gap-4 p-5 bg-[#fcf9f6]/70 border border-[#b48b78]/15 rounded-md">
                  <div className="p-3 bg-white border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">Relax. Connect. Unwind.</h5>
                    <p className="font-cormorant text-sm text-[#5c4538] leading-relaxed my-2">
                      Whether you're on your own or with a friend, your mum, dad, gran, grandpa — anyone — you're always welcome here.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Free Wifi</span>
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Comfy Seating</span>
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Relax & Chill</span>
                    </div>
                  </div>
                </div>

                {/* Amenity 2 */}
                <div className="goal-stagger-item flex items-start gap-4 p-5 bg-[#fcf9f6]/70 border border-[#b48b78]/15 rounded-md">
                  <div className="p-3 bg-white border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M2 8h15v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v4M10 1v4M14 1v4" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">Refresh & Recharge</h5>
                    <p className="font-cormorant text-sm text-[#5c4538] leading-relaxed my-2">
                      Enjoy a delicious iced coffee from our coffee machine waiting for you after your session.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Barista Style Coffee</span>
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">The Perfect Pick Me Up</span>
                    </div>
                  </div>
                </div>

                {/* Amenity 3 */}
                <div className="goal-stagger-item flex items-start gap-4 p-5 bg-[#fcf9f6]/70 border border-[#b48b78]/15 rounded-md">
                  <div className="p-3 bg-white border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">Hydrate & Feel Great</h5>
                    <p className="font-cormorant text-sm text-[#5c4538] leading-relaxed my-2">
                      We stock a range of refreshing drinks to keep you hydrated and feeling your best.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Refreshing Drinks</span>
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Stay Hydrated</span>
                    </div>
                  </div>
                </div>

                {/* Amenity 4 */}
                <div className="goal-stagger-item flex items-start gap-4 p-5 bg-[#fcf9f6]/70 border border-[#b48b78]/15 rounded-md">
                  <div className="p-3 bg-white border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">Fuel Your Body</h5>
                    <p className="font-cormorant text-sm text-[#5c4538] leading-relaxed my-2">
                      Our protein snacks are here to give your body the healthy fuel it needs to stay looking amazing.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Protein Snacks</span>
                      <span className="text-[7px] font-sans-premium border border-[#b48b78]/20 px-2 py-0.5 rounded-full text-[#5c4538] bg-white/40">Healthy Choices</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Arched Mirror Image displaying lounge_mirror_coffee.png */}
              <div className="lg:col-span-5 flex justify-center relative">
                <div className="relative w-full max-w-[340px] border-[3px] border-[#b48b78]/25 rounded-t-full overflow-hidden aspect-[3/4.2] shadow-2xl bg-[#f5ede4]">
                  <img
                    src="/lounge_mirror_coffee.png"
                    alt="Life's a Beach Coffee Lounge Reflection"
                    className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                  />
                  {/* Glowing neon-like script overlay inside mirror */}
                  <div className="absolute right-4 bottom-8 select-none pointer-events-none">
                    <span
                      className="font-cursive text-4xl text-[#fff0e0] rotate-[-10deg] inline-block"
                      style={{ textShadow: "0 0 8px rgba(255,240,224,0.7), 0 0 15px rgba(180,139,120,0.5)" }}
                    >
                      glow all day
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── SECTION 3: PASSPORT DESTINATIONS & STAMP TRACKER ─── */}
        <section className="relative overflow-hidden py-20 border-b border-[#b48b78]/15 bg-white/5">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">

            {/* Header */}
            <div className="goal-reveal text-center mb-16">
              <h2 className="font-display text-2xl md:text-3.5xl text-[#3d2b1f] tracking-wide mb-3 uppercase">
                Your Passport to the Perfect Tan
              </h2>
              <div className="flex items-center justify-center gap-3 max-w-[280px] mx-auto mb-6">
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
                <span className="font-forum text-[7px] text-[#b48b78]">✦</span>
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
              </div>
              <p className="font-cormorant text-md text-[#5c4538] italic max-w-xl mx-auto">
                Collect a stamp from every destination room to complete your tanning journey and unlock your free final session.
              </p>
            </div>

            {/* Travel Passport Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Suitcase and hat display using travel_suitcase_mockup.png */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[360px] rounded-lg overflow-hidden border border-[#b48b78]/20 bg-white shadow-xl">
                  <img
                    src="/travel_suitcase_mockup.png"
                    alt="Luxury Travel Suitcase Tanning Passport Mockup"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute bottom-4 left-0 right-0 text-center select-none pointer-events-none">
                    <span className="font-cursive text-3xl text-white drop-shadow-md">Glow all day</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Destination Catalog List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SUITES.map((suite) => (
                    <div
                      key={suite.name}
                      className={`p-5 rounded-md border bg-white/70 backdrop-blur-sm transition-all duration-300 ${suite.name === "Dominican Republic"
                        ? "border-dashed border-[#b48b78]/30 opacity-75"
                        : "border-[#b48b78]/15 hover:border-[#b48b78]/40 hover:shadow-md"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans-premium text-[7px] tracking-wider text-[#b48b78]">
                          {suite.room}
                        </span>
                        <span className="font-forum text-[8px] text-[#3d2b1f] uppercase tracking-widest font-semibold">
                          {suite.model}
                        </span>
                      </div>
                      <h4 className="font-display text-md text-[#3d2b1f] mb-2">{suite.name}</h4>
                      <p className="font-cormorant text-xs text-[#5c4538] italic leading-normal">
                        {suite.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stamp Stamping Tracker Section */}
                <div className="p-6 bg-[#fcf9f6]/95 border border-[#b48b78]/25 rounded-md shadow-lg mt-8">
                  <div className="text-center mb-6">
                    <span className="font-sans-premium text-[8px] tracking-[0.25em] text-[#b48b78] uppercase block mb-1">
                      Stamp Your Passport
                    </span>
                    <p className="font-cormorant text-xs text-[#5c4538] italic">
                      Click on the circles to check off the destinations you've tried:
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {Object.keys(stamps).map((city) => (
                      <div key={city} className="flex flex-col items-center">
                        <button
                          onClick={() => toggleStamp(city)}
                          className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 shadow-inner ${stamps[city]
                            ? "bg-white border-[#b48b78] scale-105 shadow-[0_0_15px_rgba(180,139,120,0.2)]"
                            : "bg-[#faf6f0] border-dashed border-[#b48b78]/30 hover:border-[#b48b78]/60"
                            }`}
                          aria-label={`Stamp for ${city}`}
                        >
                          {!stamps[city] ? (
                            <span className="font-sans-premium text-[8px] tracking-widest text-[#b48b78]/60 uppercase">
                              {city.slice(0, 3)}
                            </span>
                          ) : (
                            /* Gold tropical passport stamp mark inside circle */
                            <div className="flex flex-col items-center justify-center text-[#b48b78] text-center w-full h-full scale-[0.88] select-none animate-[pulse_0.4s_ease-out_1]">
                              {/* Stamp outer border */}
                              <div className="absolute inset-0.5 rounded-full border border-double border-[#b48b78]" />

                              {/* Palm tree */}
                              <svg className="w-4 h-4 text-[#b48b78] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <path d="M12 22V5M12 5c2 0 4-1.5 5-3M12 7c-2 0-4-1.5-5-3M12 9c3 0 5-1.5 6-3.5M12 11c-3 0-5-1.5-6-3.5" />
                              </svg>

                              {/* City Stamp text */}
                              <span className="font-sans-premium text-[4.5px] tracking-widest font-black leading-none uppercase">
                                {city}
                              </span>
                              <span className="font-forum text-[3px] tracking-wider text-[#b48b78] uppercase mt-0.5 font-bold">
                                PASSED
                              </span>
                            </div>
                          )}
                        </button>
                        <span className="font-sans-premium text-[6.5px] tracking-widest text-[#3d2b1f] font-bold mt-2 uppercase">
                          {city}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stamp Count Reward Tracker Slogan */}
                  <div className="mt-6 text-center border-t border-[#b48b78]/15 pt-4">
                    <span className="font-sans-readable text-[10px] text-[#5c4538] font-semibold">
                      {Object.values(stamps).filter(Boolean).length === 5 ? (
                        <span className="text-[#9e5d3c] flex items-center justify-center gap-1.5 animate-bounce">
                          ✦ CONGRATULATIONS! Journey Complete, claim your last bed FREE! ✦
                        </span>
                      ) : (
                        <span>
                          Tried {Object.values(stamps).filter(Boolean).length} / 5 destination rooms.
                        </span>
                      )}
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── SECTION 4: MINUTES & BLOCK BOOKINGS PRICING ─── */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#fbf8f5] to-[#f5ede4]">
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">

            {/* Header */}
            <div className="goal-reveal text-center mb-16">
              <h2 className="font-display text-3xl text-[#3d2b1f] tracking-wide mb-3 uppercase">
                Minutes & Block Bookings
              </h2>
              <div className="flex items-center justify-center gap-3 max-w-[280px] mx-auto mb-6">
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
                <span className="font-forum text-[7px] text-[#b48b78]">✦</span>
                <div className="h-[1px] bg-[#b48b78]/30 flex-1" />
              </div>
              <h3 className="font-sans-premium text-[9px] tracking-[0.35em] text-[#5c4538] uppercase font-bold">
                Your Tan. Your Time. Your Way.
              </h3>
            </div>

            {/* Side-by-side Pricing Tables */}
            <div className="goal-stagger grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">

              {/* Laydown Beds */}
              <div className="goal-stagger-item bg-white/70 backdrop-blur-md border border-[#b48b78]/20 rounded-lg p-6 sm:p-8 shadow-md">
                <div className="text-center mb-6">
                  <span className="font-cursive text-4xl text-[#b48b78] block mb-1">
                    Laydown Beds
                  </span>
                  <h4 className="font-sans-premium text-[8px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold">
                    Signature Luxury Laydown Beds
                  </h4>
                </div>

                <div className="border border-[#b48b78]/15 rounded-md overflow-hidden bg-white/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#b48b78]/15 bg-[#3d2b1f]/5">
                        <th className="px-6 py-3.5 font-forum text-[9px] tracking-widest text-[#3d2b1f] uppercase font-semibold">Minutes</th>
                        <th className="px-6 py-3.5 font-forum text-[9px] tracking-widest text-[#3d2b1f] uppercase font-semibold text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LAYDOWN_PRICING.map((row) => (
                        <tr key={row.mins} className="border-b border-[#b48b78]/10 last:border-b-0 hover:bg-[#faf6f0]/40 transition-colors">
                          <td className="px-6 py-3.5 font-cormorant text-[1.05rem] text-[#3d2b1f] font-semibold">{row.mins}</td>
                          <td className="px-6 py-3.5 font-display text-[1.05rem] text-[#b48b78] font-bold text-right">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stand Up Beds */}
              <div className="goal-stagger-item bg-white/70 backdrop-blur-md border border-[#b48b78]/20 rounded-lg p-6 sm:p-8 shadow-md">
                <div className="text-center mb-6">
                  <span className="font-cursive text-4xl text-[#b48b78] block mb-1">
                    Stand Up Beds
                  </span>
                  <h4 className="font-sans-premium text-[8px] tracking-[0.25em] text-[#3d2b1f] uppercase font-bold">
                    Signature Luxury Stand Up Beds
                  </h4>
                </div>

                <div className="border border-[#b48b78]/15 rounded-md overflow-hidden bg-white/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#b48b78]/15 bg-[#3d2b1f]/5">
                        <th className="px-6 py-3.5 font-forum text-[9px] tracking-widest text-[#3d2b1f] uppercase font-semibold">Minutes</th>
                        <th className="px-6 py-3.5 font-forum text-[9px] tracking-widest text-[#3d2b1f] uppercase font-semibold text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDUP_PRICING.map((row) => (
                        <tr key={row.mins} className="border-b border-[#b48b78]/10 last:border-b-0 hover:bg-[#faf6f0]/40 transition-colors">
                          <td className="px-6 py-3.5 font-cormorant text-[1.05rem] text-[#3d2b1f] font-semibold">{row.mins}</td>
                          <td className="px-6 py-3.5 font-display text-[1.05rem] text-[#b48b78] font-bold text-right">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Block Bookings Section */}
            <div className="goal-stagger flex flex-col items-center">
              <span className="font-sans-premium text-[9px] tracking-[0.3em] text-[#3d2b1f] font-bold block mb-8 uppercase text-center">
                Block Bookings
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">

                {/* 50 Minutes Block */}
                <div className="goal-stagger-item flex items-center justify-between p-6 bg-[#fcf9f6]/95 border border-[#b48b78]/25 rounded-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#faf6f0] border border-[#b48b78]/15 rounded-full text-[#b48b78]">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-sans-premium text-[8px] tracking-[0.25em] text-[#3d2b1f] font-bold uppercase">50 Minutes</h5>
                      <span className="font-cormorant text-xs text-[#5c4538]/70 italic">Save with bulk minutes</span>
                    </div>
                  </div>
                  <span className="font-display text-xl text-[#b48b78] font-bold">£39.99</span>
                </div>

                {/* 100 Minutes Block */}
                <div className="goal-stagger-item flex items-center justify-between p-6 bg-[#fcf9f6]/95 border border-[#b48b78]/25 rounded-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#faf6f0] border border-[#b48b78]/15 rounded-full text-[#b48b78]">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-sans-premium text-[8px] tracking-[0.25em] text-[#3d2b1f] font-bold uppercase">100 Minutes</h5>
                      <span className="font-cormorant text-xs text-[#5c4538]/70 italic">Best tanning value</span>
                    </div>
                  </div>
                  <span className="font-display text-xl text-[#b48b78] font-bold">£67.99</span>
                </div>

              </div>

              <div className="text-center mt-12">
                <span className="font-sans-premium text-[7px] tracking-[0.25em] text-[#b48b78] uppercase">
                  Premium Tanning. Premium You.
                </span>
              </div>
            </div>

            {/* Footer Slogans / Thank You */}
            <div className="w-full h-[1px] bg-[#b48b78]/15 my-12" />
            <div className="text-center">
              <span className="font-cursive text-5xl text-[#3d2b1f] block mb-2 leading-none">
                Thank You
              </span>
              <h4 className="font-sans-premium text-[8px] tracking-[0.25em] text-[#5c4538] uppercase font-bold mb-4">
                From the Team at Life's a Beach,
              </h4>
              <p className="font-cormorant text-md text-[#5c4538]/90 italic max-w-md mx-auto mb-8">
                We appreciate you as a customer and strive to deliver the absolute finest quality in luxury wellness.
              </p>
              <div className="flex items-center justify-center gap-6">
                <span className="font-forum text-[8px] text-[#b48b78] tracking-[0.4em] uppercase">Relax</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b48b78]/55" />
                <span className="font-forum text-[8px] text-[#b48b78] tracking-[0.4em] uppercase">Refresh</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b48b78]/55" />
                <span className="font-forum text-[8px] text-[#b48b78] tracking-[0.4em] uppercase">Glow</span>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <TestimonialSection />

        {/* ─── Luxury CTA Booking ─── */}
        <InnerPageCta
          title={<>Embark on Your<br /><em>Tanning Odyssey</em></>}
          subtitle="All destination suites are dermatologist-approved and optimized for your skin type."
          buttonText="START YOUR PASSPORT JOURNEY"
          buttonHref="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
        />

      </div>
    </InnerPageLayout>
  );
}
