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

const MEMBERSHIPS = [
  {
    name: "BRONZE",
    minutes: "50",
    price: "£33.49",
    cardGradient: "linear-gradient(165deg, #5c3520 0%, #8b5a34 45%, #a06938 70%, #6e3f22 100%)",
    accentColor: "#d4a574",
    badge: null,
    badgeBg: "",
  },
  {
    name: "SILVER",
    minutes: "100",
    price: "£54.99",
    cardGradient: "linear-gradient(165deg, #3d4348 0%, #5e666d 45%, #7a858c 70%, #4a5259 100%)",
    accentColor: "#c8d0d6",
    badge: "MOST POPULAR",
    badgeBg: "linear-gradient(145deg, #e8eef2 0%, #b8c5cc 100%)",
  },
  {
    name: "GOLD",
    minutes: "150",
    price: "£69.99",
    cardGradient: "linear-gradient(165deg, #5c4410 0%, #8b6e1e 45%, #b8922c 70%, #6e5215 100%)",
    accentColor: "#f0d78c",
    badge: "BEST VALUE",
    badgeBg: "linear-gradient(145deg, #fef3c7 0%, #f59e0b 100%)",
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

      // Cards animation on mount (no ScrollTrigger so they are guaranteed to reveal and remain visible)
      gsap.from(".membership-card-anim", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1.0,
        delay: 0.5,
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

      // Refresh ScrollTrigger to ensure all calculations are correct
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
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
              <p className="font-forum text-[11px] tracking-[0.25em] text-[#b48b78] uppercase">
                TAN MORE. SAVE MORE.
              </p>
            </div>

            {/* Tier Cards */}
            <div className="membership-grid-trigger grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch pt-8">
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
                    background: tier.cardGradient,
                    borderRadius: "16px",
                    border: `1px solid ${tier.accentColor}30`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 ${tier.accentColor}15`,
                  }}
                >
                  {/* Subtle metallic sheen overlay */}
                  <div
                    className="absolute inset-0 rounded-[16px] pointer-events-none opacity-[0.04]"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${tier.accentColor} 0%, transparent 60%)` }}
                  />

                  {/* Badge pill */}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-4 py-1.5 rounded-full select-none flex items-center gap-1.5"
                        style={{
                          background: tier.badgeBg,
                          boxShadow: `0 4px 15px ${tier.accentColor}40`,
                          border: `1px solid ${tier.accentColor}30`,
                        }}
                      >
                        <span className="font-sans-premium text-[7px] tracking-[0.08em] font-bold uppercase text-[#19120e] whitespace-nowrap">
                          {tier.badge}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Top accent line */}
                  <div
                    className="mx-auto mt-0 h-[2px] w-20 rounded-b-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.accentColor}, transparent)` }}
                  />

                  {/* Card Inner Content */}
                  <div className="relative px-8 pt-10 pb-10 flex-1 flex flex-col items-center justify-between">

                    {/* Tier Name */}
                    <div className="mb-8">
                      <span
                        className="font-forum text-[13px] tracking-[0.5em] font-medium uppercase"
                        style={{ color: tier.accentColor }}
                      >
                        {tier.name}
                      </span>
                    </div>

                    {/* Minutes */}
                    <div className="mb-8">
                      <div
                        className="font-display leading-[0.85] tracking-tight font-extralight text-[#fcf9f6]"
                        style={{ fontSize: "clamp(4.5rem, 9vw, 6.5rem)" }}
                      >
                        {tier.minutes}
                      </div>
                      <div className="font-forum text-[10px] tracking-[0.35em] text-[#fcf9f6]/70 uppercase mt-4">
                        MINUTES
                      </div>
                      <div className="font-sans-premium text-[6px] tracking-[0.2em] text-[#fcf9f6]/35 uppercase mt-1">
                        EVERY MONTH
                      </div>
                    </div>

                    {/* Ornamental divider */}
                    <div className="flex items-center justify-center gap-3 mb-8 w-full max-w-[180px]">
                      <div className="flex-1 h-[0.5px]" style={{ background: `linear-gradient(90deg, transparent, ${tier.accentColor}50)` }} />
                      <span className="font-forum text-[7px]" style={{ color: `${tier.accentColor}80` }}>✦</span>
                      <div className="flex-1 h-[0.5px]" style={{ background: `linear-gradient(90deg, ${tier.accentColor}50, transparent)` }} />
                    </div>

                    {/* Price */}
                    <div>
                      <div
                        className="font-display text-[2rem] sm:text-[2.5rem] font-light tracking-wide"
                        style={{ color: tier.accentColor }}
                      >
                        {tier.price}
                      </div>
                      <div className="font-sans-premium text-[6px] tracking-[0.25em] text-[#fcf9f6]/40 uppercase mt-2">
                        PER MONTH
                      </div>
                    </div>

                    {/* Join Button */}
                    <a
                      href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-block font-forum text-[9px] tracking-[0.3em] uppercase px-8 py-3 rounded-full transition-all duration-500 hover:scale-105"
                      style={{
                        color: tier.accentColor,
                        border: `1px solid ${tier.accentColor}50`,
                        background: `${tier.accentColor}08`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = tier.accentColor;
                        e.currentTarget.style.color = "#1a1310";
                        e.currentTarget.style.borderColor = tier.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${tier.accentColor}08`;
                        e.currentTarget.style.color = tier.accentColor;
                        e.currentTarget.style.borderColor = `${tier.accentColor}50`;
                      }}
                    >
                      JOIN NOW
                    </a>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="mx-auto mb-0 h-[1px] w-16 rounded-t-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.accentColor}60, transparent)` }}
                  />
                </div>
              ))}
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
