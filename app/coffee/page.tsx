"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";
import Link from "next/link";
import TestimonialSection from "../components/TestimonialSection";
import InnerPageCta from "../components/InnerPageCta";

gsap.registerPlugin(ScrollTrigger);

const BEVERAGES = [
  {
    name: "Golden Glow Macchiato",
    notes: "Double ristretto, velvet-textured almond froth, infused with local raw orange-blossom honey and a dust of real golden cinnamon.",
    category: "Signature Tanning Booster",
  },
  {
    name: "Resort Gold Cold Brew",
    notes: "24-hour slow-drip single-origin organic Ethiopian beans, poured over a crystal sphere of purified spring water. Light, citrusy, and refreshing.",
    category: "Sanctuary Classic",
  },
  {
    name: "Rosemary Sea-Salt Latte",
    notes: "Espresso pulled over organic brown sugar syrup, sea-salt wash, textured milk, and topped with a fresh, flamed rosemary sprig.",
    category: "Coastal Infusion",
  },
  {
    name: "Antioxidant Tanning Elixir",
    notes: "Fresh white peach nectar, premium ceremonial matcha tea, raw organic agave syrup, and carbonated alkaline water. Pure pre-tan focus.",
    category: "Hydration & Energy",
  },
];

export default function CoffeePage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate reveals
      gsap.utils.toArray<HTMLElement>(".coffee-reveal").forEach((item) => {
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

      // Animate menu list
      gsap.utils.toArray<HTMLElement>(".coffee-menu-item").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 35,
          opacity: 0,
          duration: 0.85,
          delay: (idx % 2) * 0.15,
          ease: "power3.out"
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Artisanal Bar"
        subtitle="Slow down, step into serenity, and treat yourself to our signature pre-tanning espresso bar."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Coffee Rituals" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground />

        {/* ─── Story behind Coffee Bar ─── */}
        <section className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
            {/* Custom Image Box */}
            <div className="about-story-image-wrap relative">
              <div className="about-story-frame relative overflow-hidden rounded-sm bg-[#faf6f0]/40 backdrop-blur-md p-10 flex items-center justify-center border border-[#b48b78]/15">
                <img
                  src="/hero_lotion_jar.png" // Reusing abstract premium lotion jar as elegant resort centerpiece
                  alt="Espresso bar details"
                  className="h-[280px] w-auto object-contain transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-6 left-6 font-forum text-[9px] tracking-widest text-[#b48b78]/70 border border-[#b48b78]/20 px-3 py-1 rounded-full bg-white/40">
                  EST 2026
                </div>
                <div className="about-story-img-shine absolute inset-0 pointer-events-none" />
              </div>
            </div>

            {/* Coffee Bar Intro Copy */}
            <div className="coffee-reveal space-y-8">
              <div className="flex items-center gap-4">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Pre-Tan Ceremony</span>
              </div>

              <h2 className="about-page-headline">
                The Connection of
                <br />
                <em>Warmth & Taste</em>
              </h2>

              <div className="about-ornament-divider flex items-center gap-4">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>

              <p className="about-page-body font-cormorant">
                Why coffee at a luxury tanning salon? We believe that a true tanning sanctuary should relax all your senses. Our espresso bar serves as the ultimate transitional threshold. It is a quiet moment to sit back, sip a custom flamed rosemary latte, and let your body's stress drift away before your session.
              </p>
              <p className="about-page-body font-cormorant">
                Our single-origin organic coffees are packed with rich antioxidants, promoting deep hydration and natural skin wellness from the inside out. Enjoy your complimentary signature beverage with every single suite reservation.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Curated Menu Section ─── */}
        <section className="about-page-section relative overflow-hidden py-16 bg-[#faf6f0]/20">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="coffee-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">02</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Sanctuary Menu</span>
              </div>
              <h2 className="about-page-headline">
                Liquid Antioxidants
                <br />
                <em>& Botanical Infusions</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto mb-6">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BEVERAGES.map((bev) => (
                <article key={bev.name} className="coffee-menu-item about-value-card group">
                  <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] block mb-2">
                    {bev.category}
                  </span>
                  <h3 className="about-value-title font-display text-lg text-[#3d2b1f] mb-3">
                    {bev.name}
                  </h3>
                  <p className="about-value-desc font-cormorant leading-relaxed text-[#5c4538]/85">
                    {bev.notes}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <TestimonialSection />

        {/* ─── Experience Booking CTA ─── */}
        <InnerPageCta 
          title={<>Sip, Relax, & Glow<br /><em>At Our Sanctuary</em></>}
          subtitle="Every reservation includes our complimentary signature espresso experience."
          buttonText="RESERVE YOUR GLOW SESSION"
          buttonHref="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
        />
      </div>
    </InnerPageLayout>
  );
}
