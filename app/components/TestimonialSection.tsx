"use client";

import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "Absolute heaven. The Onyx Elite suite changed everything — I walked out glowing like I'd been in Santorini for a week.",
    name: "Isabelle R.",
    title: "Level IV Regular",
    stars: 5,
  },
  {
    quote: "The ambiance alone is worth every penny. Warm lighting, the scent of the coffee bar, private suites — this is luxury tanning redefined.",
    name: "Marcus T.",
    title: "Golden Hour Member",
    stars: 5,
  },
  {
    quote: "I've visited salons across London and Miami. Nothing comes close to the attention to detail here. Absolutely immaculate.",
    name: "Sophia L.",
    title: "Sand & Sea Guest",
    stars: 5,
  },
  {
    quote: "The team is incredible — knowledgeable, warm, and genuinely passionate. My skin has never looked so even and radiant.",
    name: "Camille N.",
    title: "Monthly Member",
    stars: 5,
  },
  {
    quote: "From the artisanal espresso to the plush suite, every touchpoint exudes luxury. My self-care ritual now starts here.",
    name: "Elena V.",
    title: "Onyx Elite Guest",
    stars: 5,
  },
  {
    quote: "Walking into Life's A Beach feels like stepping into a five-star hotel. The glow I leave with is just the beginning.",
    name: "Jasmine A.",
    title: "Golden Hour Member",
    stars: 5,
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="testi-card">
      <div className="testi-stars" aria-label={`${t.stars} stars`}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} className="testi-star">✦</span>
        ))}
      </div>
      <blockquote className="testi-quote font-cormorant">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="testi-author">
        <div className="testi-author-line" />
        <div>
          <p className="testi-name font-display">{t.name}</p>
          <p className="testi-title font-forum">{t.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate so seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="testi-section relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="testi-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="testi-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0" aria-hidden />

      {/* Top rule */}
      <div className="testi-rule-top" aria-hidden />

      {/* Header */}
      <div className="relative z-10 mb-14 px-6 text-center md:mb-18 md:px-12">
        <span className="section-label text-[#E3C9AC]/70">What Our Guests Say</span>
        <h2 className="testi-headline mt-3">
          Stories of
          <br />
          <em>Golden Radiance</em>
        </h2>
        <div className="testi-headline-divider mx-auto mt-6" />
      </div>

      {/* Carousel — full-width overflow, CSS animation */}
      <div className="testi-carousel-wrap relative z-10">
        {/* Left fade vignette */}
        <div className="testi-fade-left pointer-events-none absolute inset-y-0 left-0 z-10" aria-hidden />
        {/* Right fade vignette */}
        <div className="testi-fade-right pointer-events-none absolute inset-y-0 right-0 z-10" aria-hidden />

        <div ref={trackRef} className="testi-track">
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Review Button */}
      <div className="relative z-10 mt-12 flex justify-center">
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJR4TWh8VJiEgR2p3687352kM"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury px-10 py-4 text-[8px]"
        >
          WRITE A REVIEW
        </a>
      </div>

      {/* Bottom rule */}
      <div className="testi-rule-bottom" aria-hidden />
    </section>
  );
}
