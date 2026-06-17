"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";
import TestimonialSection from "../components/TestimonialSection";
import InnerPageCta from "../components/InnerPageCta";

gsap.registerPlugin(ScrollTrigger);

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

export default function MembershipsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header section animation on mount (no ScrollTrigger to prevent visibility issues near the fold)
      gsap.from(".memberships-reveal", {
        y: 30,
        opacity: 0,
        duration: 1.0,
        delay: 0.3,
        ease: "power3.out",
      });

      // Features animation on mount
      gsap.from(".membership-feature-anim", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        delay: 0.4,
        ease: "power3.out",
      });

      // Cards animation on mount (no ScrollTrigger so they are guaranteed to reveal and remain visible)
      gsap.from(".membership-card-anim", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.0,
        delay: 0.6,
        ease: "power3.out",
        clearProps: "opacity",
      });

      // Keep ScrollTrigger for benefits row since it is further down the page
      gsap.from(".benefits-row-anim", {
        scrollTrigger: {
          trigger: ".benefits-table-trigger",
          start: "top 85%",
          once: true,
        },
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      });

      // Reveal PAY AS YOU GO and BLOCK BOOKINGS elements on scroll
      gsap.utils.toArray<HTMLElement>(".membership-scroll-reveal").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Refresh ScrollTrigger to ensure all calculations are correct
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Memberships"
        subtitle="Tan more. Save more. Choose a monthly sanctuary plan tailored to your lifestyle."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Memberships" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground rightLeafOnly />

        {/* ─── Tiers Section ─── */}
        <section className="about-page-section relative overflow-hidden py-20 px-6 md:px-12">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1100px] text-center">
            {/* Section Header */}
            <div className="memberships-reveal mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Exclusive Programs</span>
              </div>
              <h2 className="about-page-headline">
                Choose Your
                <br />
                <em>Membership</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[320px] mx-auto mb-5">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
              <p className="font-forum text-[11px] tracking-[0.25em] text-[#b48b78] uppercase mb-4">
                MORE TIME. MORE BENEFITS. MORE YOU.
              </p>
              <p className="font-cormorant text-sm text-[#5c4538]/85 max-w-xl mx-auto italic leading-relaxed">
                Our memberships are designed to give you the perfect tan, exclusive perks and unbeatable value every month.
              </p>
            </div>

            {/* Features Row */}
            <div className="membership-feature-anim grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pt-4">

              {/* Feature 1 */}
              <div className="p-6 bg-white/45 border border-[#b48b78]/15 rounded-md text-center shadow-sm backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="m9 16 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold mt-4 mb-1">Priority Booking</h4>
                <p className="font-cormorant text-xs text-[#5c4538]/80 max-w-[200px] mx-auto italic">
                  Be first in line for the best times.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 bg-white/45 border border-[#b48b78]/15 rounded-md text-center shadow-sm backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M2 17h20M2 13h20M5 13v4M19 13v4M3 9h18a2 2 0 0 1 2 2v2H1a2 2 0 0 1 2-2V9zM6 9V7a3 3 0 0 1 6 0v2M12 9V7a3 3 0 0 1 6 0v2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold mt-4 mb-1">More Time to Glow</h4>
                <p className="font-cormorant text-xs text-[#5c4538]/80 max-w-[200px] mx-auto italic">
                  Monthly minutes to use your way.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 bg-white/45 border border-[#b48b78]/15 rounded-md text-center shadow-sm backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 7h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold mt-4 mb-1">Exclusive Discounts</h4>
                <p className="font-cormorant text-xs text-[#5c4538]/80 max-w-[200px] mx-auto italic">
                  Save on lotions, drinks & coffee.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 bg-white/45 border border-[#b48b78]/15 rounded-md text-center shadow-sm backdrop-blur-[2px]">
                <svg className="w-8 h-8 text-[#b48b78] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold mt-4 mb-1">Member Only Offers</h4>
                <p className="font-cormorant text-xs text-[#5c4538]/80 max-w-[200px] mx-auto italic">
                  Special rewards just for you.
                </p>
              </div>

            </div>

            {/* Tier Cards */}
            <div className="membership-grid-trigger grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch pt-4">
              {MEMBERSHIPS.map((tier) => (
                <div
                  key={tier.name}
                  className="membership-card-anim relative flex flex-col overflow-visible text-center group transition-[border-color,box-shadow] duration-500"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -8,
                      duration: 0.35,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      duration: 0.35,
                      ease: "power2.out",
                    });
                  }}
                  style={{
                    background: "linear-gradient(135deg, rgba(253, 251, 247, 0.9) 0%, rgba(247, 240, 232, 0.8) 100%)",
                    borderRadius: "16px",
                    border: `1px solid ${tier.borderColor}`,
                    boxShadow: "0 20px 40px rgba(42, 31, 24, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {/* Subtle hover glow card overlay */}
                  <div
                    className="absolute inset-0 rounded-[16px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${tier.glowColor} 0%, transparent 70%)`,
                      border: `1px solid ${tier.hoverBorderColor}`,
                      boxShadow: `0 20px 50px ${tier.glowColor}`,
                    }}
                  />

                  {/* Badge pill */}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-4 py-1.5 rounded-full select-none flex items-center gap-1.5"
                        style={{
                          background: tier.badgeBg,
                          boxShadow: "0 4px 15px rgba(180, 139, 120, 0.15)",
                          border: "1px solid rgba(180, 139, 120, 0.2)",
                        }}
                      >
                        <span className="font-sans-premium text-[7px] tracking-[0.08em] font-bold uppercase text-[#3d2b1f] whitespace-nowrap">
                          {tier.badge}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Top accent line */}
                  <div
                    className="mx-auto mt-0 h-[2px] w-20 rounded-b-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.crownColor}, transparent)` }}
                  />

                  {/* Card Inner Content */}
                  <div className="relative px-8 pt-10 pb-10 flex-1 flex flex-col items-center justify-between z-10">

                    {/* Crown Icon & Tier Name */}
                    <div className="flex flex-col items-center mb-6">
                      {/* Stylized Crown */}
                      <svg
                        className="w-10 h-10 mb-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        style={{ color: tier.crownColor }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 4l3 12h14l3-12-5 5-4-5-4 5z" fill={tier.crownColor} />
                        <rect x="4" y="18" width="16" height="2" rx="0.5" fill={tier.crownColor} />
                      </svg>
                      <span
                        className="font-forum text-[14px] tracking-[0.5em] font-bold uppercase"
                        style={{ color: tier.crownColor }}
                      >
                        {tier.name}
                      </span>
                    </div>

                    {/* Minutes */}
                    <div className="mb-6">
                      <div
                        className="font-display leading-[0.85] tracking-tight font-extralight text-[#3d2b1f]"
                        style={{ fontSize: "clamp(3.8rem, 8vw, 5rem)" }}
                      >
                        {tier.minutes}
                      </div>
                      <div className="font-forum text-[9px] tracking-[0.35em] text-[#5c4538] uppercase mt-3">
                        MINUTES
                      </div>
                      <div className="font-sans-premium text-[6px] tracking-[0.2em] text-[#5c4538]/60 uppercase mt-0.5">
                        EVERY MONTH
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="font-display text-[2.2rem] font-semibold tracking-wide text-[#3d2b1f]">
                        {tier.price}
                      </div>
                      <div className="font-sans-premium text-[6px] tracking-[0.25em] text-[#5c4538]/60 uppercase mt-1">
                        PER MONTH
                      </div>
                    </div>

                    {/* Ornamental divider */}
                    <div className="flex items-center justify-center gap-3 mb-6 w-full max-w-[180px]">
                      <div className="flex-1 h-[0.5px]" style={{ background: `linear-gradient(90deg, transparent, ${tier.crownColor}40)` }} />
                      <span className="font-forum text-[7px]" style={{ color: `${tier.crownColor}80` }}>✦</span>
                      <div className="flex-1 h-[0.5px]" style={{ background: `linear-gradient(90deg, ${tier.crownColor}40, transparent)` }} />
                    </div>

                    {/* Features checklist */}
                    <div className="w-full flex-1 flex flex-col justify-start gap-2.5 mb-8">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5 text-left py-0.5 w-full max-w-[210px] mx-auto">
                          <svg className="w-3.5 h-3.5 text-[#b48b78] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          </svg>
                          <span className="font-sans-premium text-[7.5px] tracking-wider text-[#5c4538] uppercase font-bold leading-normal pt-0.5">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Join Button */}
                    <a
                      href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-forum text-[9px] tracking-[0.3em] uppercase px-8 py-3 rounded-full transition-all duration-500 hover:scale-105"
                      style={{
                        color: "#b48b78",
                        border: "1px solid rgba(180, 139, 120, 0.5)",
                        background: "rgba(180, 139, 120, 0.04)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#b48b78";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = "#b48b78";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(180, 139, 120, 0.04)";
                        e.currentTarget.style.color = "#b48b78";
                        e.currentTarget.style.borderColor = "rgba(180, 139, 120, 0.5)";
                      }}
                    >
                      JOIN NOW
                    </a>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="mx-auto mb-0 h-[1px] w-16 rounded-t-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.crownColor}60, transparent)` }}
                  />
                </div>
              ))}
            </div>

            {/* Slogan line under cards */}
            <div className="w-full text-center mt-14">
              <span className="font-sans-premium text-[8px] tracking-[0.35em] text-[#b48b78] uppercase">
                YOUR TAN. YOUR TIME. YOUR BENEFITS.
              </span>
            </div>

            {/* PAY AS YOU GO Section */}
            <div className="membership-scroll-reveal w-full">
              <div className="flex items-center justify-center gap-4 my-16 w-full max-w-[600px] mx-auto">
                <div className="h-[1px] bg-[#b48b78]/25 flex-1" />
                <h3 className="font-display text-xl sm:text-2xl text-[#3d2b1f] tracking-widest uppercase">
                  PAY AS YOU GO
                </h3>
                <div className="h-[1px] bg-[#b48b78]/25 flex-1" />
              </div>

              {/* Side-by-side tables with custom split line and sun icon */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-8 md:gap-4 items-stretch max-w-[960px] mx-auto">

                {/* Laydown Beds Table */}
                <div className="md:col-span-5 bg-white/45 border border-[#b48b78]/15 rounded-lg p-6 sm:p-8 shadow-sm backdrop-blur-[2px]">
                  <div className="text-center mb-6">
                    <span className="font-cursive text-5xl text-[#3d2b1f] block mb-0.5">
                      Laydown Beds
                    </span>
                    <h4 className="font-sans-premium text-[8px] tracking-[0.2em] text-[#b48b78] uppercase font-bold">
                      Signature Luxury Laydown Beds
                    </h4>
                  </div>

                  <div className="space-y-1">
                    {/* Table Headers */}
                    <div className="flex justify-between border-b border-[#b48b78]/15 pb-2 px-2">
                      <span className="font-forum text-[8px] tracking-widest text-[#3d2b1f]/50 uppercase font-semibold">Minutes</span>
                      <span className="font-forum text-[8px] tracking-widest text-[#3d2b1f]/50 uppercase font-semibold text-right">Price</span>
                    </div>
                    {/* Rows */}
                    <div className="space-y-1.5 pt-2">
                      {LAYDOWN_PRICING.map((row) => (
                        <div key={row.mins} className="flex items-baseline justify-between py-1 border-b border-dashed border-[#b48b78]/10 last:border-b-0 hover:bg-[#faf6f0]/60 transition-colors px-2">
                          <span className="font-sans-premium text-[8px] text-[#3d2b1f] uppercase tracking-wider font-bold">{row.mins}</span>
                          <div className="flex-1 border-b border-dotted border-[#b48b78]/25 mx-2" />
                          <span className="font-display text-[11px] text-[#b48b78] font-bold">{row.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vertical split with centered sun logo */}
                <div className="hidden md:flex flex-col items-center justify-center h-full col-span-1 py-4">
                  <div className="w-[1px] bg-[#b48b78]/20 flex-1 min-h-[120px]" />
                  <div className="my-4 p-2 rounded-full border border-[#b48b78]/20 bg-[#faf6f0] text-[#b48b78]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  </div>
                  <div className="w-[1px] bg-[#b48b78]/20 flex-1 min-h-[120px]" />
                </div>

                {/* Stand Up Beds Table */}
                <div className="md:col-span-5 bg-white/45 border border-[#b48b78]/15 rounded-lg p-6 sm:p-8 shadow-sm backdrop-blur-[2px]">
                  <div className="text-center mb-6">
                    <span className="font-cursive text-5xl text-[#3d2b1f] block mb-0.5">
                      Stand Up Beds
                    </span>
                    <h4 className="font-sans-premium text-[8px] tracking-[0.2em] text-[#b48b78] uppercase font-bold">
                      Signature Luxury Stand Up Beds
                    </h4>
                  </div>

                  <div className="space-y-1">
                    {/* Table Headers */}
                    <div className="flex justify-between border-b border-[#b48b78]/15 pb-2 px-2">
                      <span className="font-forum text-[8px] tracking-widest text-[#3d2b1f]/50 uppercase font-semibold">Minutes</span>
                      <span className="font-forum text-[8px] tracking-widest text-[#3d2b1f]/50 uppercase font-semibold text-right">Price</span>
                    </div>
                    {/* Rows */}
                    <div className="space-y-1.5 pt-2">
                      {STANDUP_PRICING.map((row) => (
                        <div key={row.mins} className="flex items-baseline justify-between py-1 border-b border-dashed border-[#b48b78]/10 last:border-b-0 hover:bg-[#faf6f0]/60 transition-colors px-2">
                          <span className="font-sans-premium text-[8px] text-[#3d2b1f] uppercase tracking-wider font-bold">{row.mins}</span>
                          <div className="flex-1 border-b border-dotted border-[#b48b78]/25 mx-2" />
                          <span className="font-display text-[11px] text-[#b48b78] font-bold">{row.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* BLOCK BOOKINGS Section */}
            <div className="membership-scroll-reveal w-full">
              <div className="flex items-center justify-center gap-4 my-16 w-full max-w-[600px] mx-auto">
                <div className="h-[1px] bg-[#b48b78]/25 flex-1" />
                <h3 className="font-display text-xl sm:text-2xl text-[#3d2b1f] tracking-widest uppercase">
                  BLOCK BOOKINGS
                </h3>
                <div className="h-[1px] bg-[#b48b78]/25 flex-1" />
              </div>

              {/* Grid of the 2 booking cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[720px] mx-auto mb-6">

                {/* 50 Minutes Block */}
                <div className="flex items-center justify-between p-6 bg-white/45 border border-[#b48b78]/15 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#faf6f0] border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <circle cx="17" cy="16" r="3" />
                        <path d="M17 14v2.5l1.5 1" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">50 Minutes</h5>
                      <span className="font-cormorant text-xs text-[#5c4538]/70 italic block mt-0.5">Save with bulk minutes</span>
                    </div>
                  </div>
                  <span className="font-display text-xl sm:text-2xl text-[#b48b78] font-bold">£39.99</span>
                </div>

                {/* 100 Minutes Block */}
                <div className="flex items-center justify-between p-6 bg-white/45 border border-[#b48b78]/15 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#faf6f0] border border-[#b48b78]/20 rounded-full text-[#b48b78] flex-shrink-0">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <circle cx="17" cy="16" r="3" />
                        <path d="M17 14v2.5l1.5 1" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h5 className="font-sans-premium text-[9px] tracking-[0.2em] text-[#3d2b1f] font-bold uppercase">100 Minutes</h5>
                      <span className="font-cormorant text-xs text-[#5c4538]/70 italic block mt-0.5">Best tanning value</span>
                    </div>
                  </div>
                  <span className="font-display text-xl sm:text-2xl text-[#b48b78] font-bold">£67.99</span>
                </div>

              </div>
            </div>


          </div>
        </section>

        {/* ─── Benefits Comparison Section ─── */}
        <section className="about-page-section relative overflow-hidden py-16">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1000px] px-6 md:px-12">
            {/* Header */}
            <div className="memberships-reveal mb-14 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">02</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Comparison Directory</span>
              </div>
              <h2 className="about-page-headline">
                Membership
                <br />
                <em>Benefits</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[240px] mx-auto">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
            </div>

            {/* Benefits Matrix — using theme card styling */}
            <div className="benefits-table-trigger about-value-card" style={{ padding: "2rem 1.5rem", borderRadius: "12px" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#b48b78]/15">
                      <th className="py-4 font-forum text-[9px] tracking-widest text-[#3d2b1f]/50 uppercase w-[40%]">
                        Benefit Feature
                      </th>
                      <th className="py-4 text-center w-[20%]">
                        <span className="font-forum text-[10px] tracking-widest uppercase" style={{ color: "#9c522b" }}>Bronze</span>
                      </th>
                      <th className="py-4 text-center w-[20%]">
                        <span className="font-forum text-[10px] tracking-widest uppercase" style={{ color: "#6b7276" }}>Silver</span>
                      </th>
                      <th className="py-4 text-center w-[20%]">
                        <span className="font-forum text-[10px] tracking-widest uppercase" style={{ color: "#b8892e" }}>Gold</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Priority Booking */}
                    <tr className="benefits-row-anim border-b border-[#b48b78]/10">
                      <td className="py-6 pr-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#faf6f0]/60 border border-[#b48b78]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-[#b48b78]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-forum text-xs text-[#3d2b1f] uppercase tracking-wider mb-0.5">Priority Booking</h4>
                            <p className="font-cormorant text-[11px] text-[#8c7a6e] leading-snug">Book your beds, your way.</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px]" style={{ background: "rgba(180,139,120,0.12)", color: "#9c522b" }}>✓</span>
                      </td>
                      <td className="py-6 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px]" style={{ background: "rgba(180,139,120,0.12)", color: "#6b7276" }}>✓</span>
                      </td>
                      <td className="py-6 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px]" style={{ background: "rgba(180,139,120,0.12)", color: "#b8892e" }}>✓</span>
                      </td>
                    </tr>

                    {/* Discounts */}
                    <tr className="benefits-row-anim">
                      <td className="py-6 pr-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#faf6f0]/60 border border-[#b48b78]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-[#b48b78]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.44 1.44 0 002.036 0l4.319-4.319a1.44 1.44 0 000-2.037L10.16 3.659A2.25 2.25 0 009.568 3z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-forum text-xs text-[#3d2b1f] uppercase tracking-wider mb-0.5">Discounts</h4>
                            <p className="font-cormorant text-[11px] text-[#8c7a6e] leading-snug">Enjoy exclusive discounts on lotions, drinks &amp; coffee.</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <span className="font-forum text-[11px] text-[#8c7a6e]/30">—</span>
                      </td>
                      <td className="py-6 text-center">
                        <span
                          className="font-forum text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm"
                          style={{ background: "rgba(107,114,118,0.08)", color: "#6b7276", border: "1px solid rgba(107,114,118,0.15)" }}
                        >
                          10% OFF
                        </span>
                      </td>
                      <td className="py-6 text-center">
                        <span
                          className="font-forum text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm"
                          style={{ background: "rgba(184,137,46,0.08)", color: "#b8892e", border: "1px solid rgba(184,137,46,0.15)" }}
                        >
                          15% OFF
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <TestimonialSection />

        {/* ─── Experience Booking CTA ─── */}
        <InnerPageCta
          title={<>Join Today &amp; Start Saving<br /><em className="font-normal text-[0.85em] font-cormorant italic">Look Good. Feel Great.</em></>}
          subtitle="Ready to unlock exclusive pricing and benefits? Sign up for a membership today."
          buttonText="JOIN A MEMBERSHIP NOW"
          buttonHref="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
        />
      </div>
    </InnerPageLayout>
  );
}
