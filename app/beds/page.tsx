"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import Link from "next/link";
import AboutBackground from "../components/AboutBackground";
import TestimonialSection from "../components/TestimonialSection";
import InnerPageCta from "../components/InnerPageCta";

gsap.registerPlugin(ScrollTrigger);

const BEDS = [
  {
    suite: "Room 1 - Dubai",
    name: "Dubai",
    model: "megaSun K9SL",
    type: "Premium LED Flagship Bed",
    status: "Active",
    notes: "Silver & Gold Members Only",
    desc: "Experience our premium LED flagship tanning bed in the Dubai suite. Engineered for high-efficiency tanning with intelligent SunSphere LED face & shoulder lamps for a flawless, custom-tailored luxury glow.",
    specs: ["SunSphere Pro Facials", "Active Air Cooling", "Bluetooth Sound System", "Intelligent Control Display"],
    image: "/dubai_k9sl.png?v=5",
  },
  {
    suite: "Room 2 - Maldives",
    name: "Maldives",
    model: "megaSun K9SL",
    type: "Premium LED Flagship Bed",
    status: "Active",
    notes: "Silver & Gold Members Only",
    desc: "Elevate your tanning ritual in the Maldives suite. Replicating natural sunshine spectrums using advanced megasun LED tanning systems, providing deep hydration and rapid bronze results.",
    specs: ["SunSphere Pro Facials", "Aqua Fresh Mist", "AromaTherapy Infusions", "Ergonomic Contour Glass"],
    image: "/maldives_k9sl.png?v=5",
  },
  {
    suite: "Room 3 - Mauritius",
    name: "Mauritius",
    model: "megaSun P9S Copper Rose",
    type: "Luxury Premium Tanning Bed",
    status: "Active",
    notes: "Silver & Gold Members Only",
    desc: "Indulge in absolute luxury in the Mauritius suite. Our stunning Copper Rose premium bed combines aesthetic excellence by Studio F. A. Porsche with high-end tanning power and red-light skin rejuvenation.",
    specs: ["Porsche Design Exterior", "Beauty Light Collagen Booster", "Climatronic Temperature Control", "Wireless Smartphone Charging"],
    image: "/mauritius_p9s.png?v=5",
  },
  {
    suite: "Room 4 - Seychelles",
    name: "Seychelles",
    model: "megaSun 8000",
    type: "High-Performance Tanning Bed",
    status: "Active",
    notes: "Silver & Gold Members Only",
    desc: "A high-performance tanning bed located in the Seychelles suite. Equipped with 50 high-pressure tubes and hyper-focused glass facial reflectors to create a deep, beautiful, and long-lasting golden tan.",
    specs: ["High-Pressure Reflector System", "Intelligent Ventilation", "Smart Touch Screen", "Surround Sound Acoustics"],
    image: "/seychelles_8000.png?v=5",
  },
  {
    suite: "Room 5 - Thailand",
    name: "Thailand",
    model: "Stand-Up Booth",
    type: "Stand-Up Tanning Unit",
    status: "Active",
    notes: "Silver & Gold Members Only",
    desc: "For flawless, all-over coverage without pressure points, step into the Thailand suite's stand-up booth. Integrated vertical ventilation and intense surround lamps offer rapid, even results in premium comfort.",
    specs: ["360° Zero-Pressure Tanning", "Body-Curve Exhaust System", "High-Efficiency Turbo Tubes", "Touch Control Panel"],
    image: "/thailand_standup.png?v=5",
  },
  {
    suite: "Room 6 - Dominican Republic",
    name: "Dominican Republic",
    model: "Future Bed",
    type: "Reserved for Sanctuary Expansion",
    status: "Planned",
    notes: "Reserved for expansion",
    desc: "The future of tanning. Our conceptual sanctuary suite is reserved for upcoming luxury expansion, featuring next-generation UV/red-light hybrid technology and holographic wellness controls.",
    specs: ["Holographic Wellness UI", "Hyper-Customizable Spectrum", "Full Sensory Integration", "Coming Soon in Late 2026"],
    image: "/dominican_future.png?v=5",
  },
];

export default function BedsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate headers on scroll
      gsap.utils.toArray<HTMLElement>(".beds-reveal").forEach((item) => {
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

      // Animate bed showcase cards dynamically
      gsap.utils.toArray<HTMLElement>(".beds-card").forEach((card) => {
        const title = card.querySelector(".beds-card-title");
        const details = card.querySelectorAll(".beds-card-detail-item");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        });

        tl.from(card, {
          y: 45,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out"
        })
        .from(title, {
          y: 12,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out"
        }, "-=0.45")
        .from(details, {
          y: 10,
          opacity: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: "power2.out"
        }, "-=0.3");
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Our Beds"
        subtitle="Step into our private sanctuaries equipped with the world's most advanced tanning technology."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Beds" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground />

        {/* ─── Main Beds Showcase ─── */}
        <section className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          {/* Header wrapper centered */}
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="beds-reveal mb-20 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">The Tanning Suites</span>
              </div>
              <h2 className="about-page-headline">
                Bespoke Performance
                <br />
                <em>Meets Uncompromised Luxury</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto mb-6">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
              <p className="about-page-body font-cormorant max-w-[620px] mx-auto text-[1.12rem] text-center text-[#5c4538]/85 italic">
                Each suite is individually climate-controlled and fully private, designed as a custom relaxation sanctuary tailored entirely to your rejuvenation.
              </p>
            </div>
          </div>

          {/* Full-width container for edge-bleeding layout */}
          <div className="relative z-10 flex flex-col gap-32 lg:gap-40 w-full overflow-hidden mb-32">
            {BEDS.map((bed, idx) => (
              <div 
                key={bed.name} 
                className={`beds-card relative w-full flex flex-col lg:flex-row items-center min-h-[460px] py-10 lg:py-0 ${
                  bed.status === "Planned" ? "border-b border-dashed border-[#b48b78]/25 pb-14" : ""
                }`}
              >
                {/* Widescreen Edge-Bleeding Image with Gradient Mask */}
                <div className={`w-full lg:absolute lg:top-0 lg:bottom-0 lg:w-[48vw] z-0 overflow-hidden ${
                  idx % 2 === 0 
                    ? "lg:left-0 bed-mask-left" 
                    : "lg:right-0 bed-mask-right"
                }`}>
                  <img
                    src={bed.image}
                    alt={bed.name}
                    className="w-full h-[360px] lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className={`absolute top-6 font-forum text-[9px] tracking-widest text-white border border-white/30 px-4 py-1.5 rounded-full bg-[#19120e]/60 backdrop-blur-md z-10 shadow-sm ${
                    idx % 2 === 0 ? "left-6" : "right-6"
                  }`}>
                    {bed.suite}
                  </div>
                  <div className="about-story-img-shine absolute inset-0 pointer-events-none" />
                </div>

                {/* Content Container aligned to max-w-[1280px] */}
                <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {/* Empty placeholder on the image side to keep spacing */}
                  <div className={idx % 2 === 0 ? "order-1 hidden lg:block" : "order-2 hidden lg:block"} />

                  {/* Text Details side */}
                  <div className={`space-y-6 bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-8 lg:p-0 rounded-sm border border-[#b48b78]/10 lg:border-none ${
                    idx % 2 === 0 ? "order-2 lg:pl-10" : "order-1 lg:pr-10"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="font-sans-premium text-[8px] tracking-[0.25em] text-[#b48b78]">
                        {bed.type}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[6px] tracking-widest uppercase font-sans-premium border ${
                        bed.status === "Active" 
                          ? "bg-[#faf6f0] border-[#b48b78]/30 text-[#b48b78]" 
                          : "bg-[#19120e]/5 border-[#19120e]/15 text-[#19120e]/50"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${bed.status === "Active" ? "bg-[#b48b78] animate-pulse" : "bg-[#19120e]/30"}`} />
                        {bed.status}
                      </span>
                    </div>
                    <h3 className="beds-card-title font-display text-3xl text-[#3d2b1f] tracking-wide">
                      {bed.name}
                    </h3>
                    {bed.status === "Active" && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FAF1EC] border border-[#d39e82]/40 text-[#9e5d3c] font-sans-premium text-[8px] font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9e5d3c] animate-pulse" />
                          Silver & Gold Members Only
                        </span>
                      </div>
                    )}
                    <div className="about-ornament-divider flex items-center gap-4">
                      <div className="about-ornament-div-line flex-1" />
                      <span className="about-ornament-div-glyph font-forum">✦</span>
                      <div className="about-ornament-div-line flex-1" />
                    </div>
                    <p className="font-cormorant text-[1.15rem] leading-relaxed text-[#5c4538]/85 italic">
                      {bed.desc}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {bed.specs.map((spec) => (
                        <div key={spec} className="beds-card-detail-item flex items-center gap-3 bg-white/25 border border-[#b48b78]/10 rounded-sm px-4 py-3">
                          <span className="text-[#b48b78] text-[8px]">✦</span>
                          <span className="font-cormorant text-[1rem] font-semibold text-[#3d2b1f]/90">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      {bed.status === "Active" ? (
                        <a href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach" target="_blank" rel="noopener noreferrer" className="btn-luxury inline-block px-10 py-4 text-[10px] tracking-wider font-semibold">
                          RESERVE THIS SUITE
                        </a>
                      ) : (
                        <Link href="/contact" className="btn-luxury inline-block px-10 py-4 text-[10px] tracking-wider font-semibold opacity-75 hover:opacity-100">
                          INQUIRE ABOUT LAUNCH
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New max-w wrapper for Comparative Table */}
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            {/* ─── Room Status Table Section ─── */}
            <div className="beds-reveal mt-16">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="about-section-index font-forum">02</span>
                  <div className="about-section-index-line" />
                  <span className="section-label mb-0">Sanctuary Directory</span>
                </div>
                <h2 className="about-page-headline">
                  Suite Availability &
                  <br />
                  <em>Tanning Technology Matrix</em>
                </h2>
                <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto">
                  <div className="about-ornament-div-line flex-1" />
                  <span className="about-ornament-div-glyph font-forum">✦</span>
                  <div className="about-ornament-div-line flex-1" />
                </div>
              </div>

              {/* Table Wrapper with champagne-sand luxury styling */}
              <div className="overflow-x-auto rounded-sm border border-[#b48b78]/15 bg-[#faf6f0]/30 backdrop-blur-md shadow-lg">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#b48b78]/15 bg-[#3d2b1f]/5">
                      <th className="px-8 py-5 font-forum text-[11px] tracking-[0.15em] text-[#3d2b1f] uppercase font-semibold">Location / Room</th>
                      <th className="px-8 py-5 font-forum text-[11px] tracking-[0.15em] text-[#3d2b1f] uppercase font-semibold">Sunbed Name</th>
                      <th className="px-8 py-5 font-forum text-[11px] tracking-[0.15em] text-[#3d2b1f] uppercase font-semibold">Model</th>
                      <th className="px-8 py-5 font-forum text-[11px] tracking-[0.15em] text-[#3d2b1f] uppercase font-semibold">Status</th>
                      <th className="px-8 py-5 font-forum text-[11px] tracking-[0.15em] text-[#3d2b1f] uppercase font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BEDS.map((bed) => (
                      <tr 
                        key={bed.name} 
                        className="border-b border-[#b48b78]/10 last:border-b-0 hover:bg-[#faf6f0]/50 transition-colors duration-300"
                      >
                        <td className="px-8 py-5 font-cormorant text-[1.1rem] text-[#3d2b1f] font-semibold">
                          {bed.suite}
                        </td>
                        <td className="px-8 py-5 font-display text-[1.05rem] text-[#3d2b1f] font-bold">
                          {bed.name}
                        </td>
                        <td className="px-8 py-5 font-forum text-[0.95rem] text-[#b48b78]">
                          {bed.model}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[7px] tracking-widest uppercase font-sans-premium border ${
                            bed.status === "Active" 
                              ? "bg-[#faf6f0] border-[#b48b78]/30 text-[#b48b78]" 
                              : "bg-[#19120e]/5 border-[#19120e]/15 text-[#19120e]/50"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${bed.status === "Active" ? "bg-[#b48b78] animate-pulse" : "bg-[#19120e]/30"}`} />
                            {bed.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 font-cormorant text-[1.05rem] italic text-[#5c4538]/85">
                          {bed.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <TestimonialSection />

        {/* ─── Luxury Booking CTA ─── */}
        <InnerPageCta 
          title={<>Select Your Ideal<br /><em>Suntan Suite Today</em></>}
          subtitle="Our team is on standby to help customize your individual tanning schedule."
          buttonText="BOOK YOUR TANNING SESSION"
          buttonHref="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
        />
      </div>
    </InnerPageLayout>
  );
}
