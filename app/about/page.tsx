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

const VALUES = [
  {
    icon: "✦",
    title: "Luxury Experience",
    desc: "Every detail in our salon has been meticulously curated — from the ambient lighting to the premium bed linens — to deliver a tanning experience that transcends the ordinary.",
  },
  {
    icon: "◆",
    title: "Expert Care",
    desc: "Our certified specialists craft personalized tanning plans tailored to your skin type, ensuring a flawless, healthy glow every single session.",
  },
  {
    icon: "✦",
    title: "Premium Products",
    desc: "We partner with the world's finest tanning brands to offer exclusive bronzing serums, after-glow oils, and skin-nourishing formulations.",
  },
  {
    icon: "◆",
    title: "Private Suites",
    desc: "Experience complete privacy in our individually climate-controlled suites, each designed as a personal sanctuary for your relaxation.",
  },
];

const MILESTONES = [
  { year: "2025", event: "There was an idea..." },
  { year: "2026", event: "That idea became reality. We now open our doors to you, our customers, for an experience like never before." },
  { year: "2027", event: "Expanding our horizons. Integrating next-generation UV/red-light hybrid systems and personalized skin care." },
  { year: "2028", event: "Opening new coastal sanctuaries to spread the timeless, premium resort-style tanning experience." },
  { year: "2029", event: "Redefining the future of wellness and tanning luxury with ageless organic innovations and global standards." },
];

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate all reveal-up elements on scroll
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Trigger slightly earlier for responsive UX
            once: true, // Only animates once, keeping it 100% visible permanently
          },
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      // Animate value cards with premium internal component stagger
      gsap.utils.toArray<HTMLElement>(".about-value-card").forEach((card) => {
        const icon = card.querySelector(".about-value-icon-wrap");
        const title = card.querySelector(".about-value-title");
        const desc = card.querySelector(".about-value-desc");
        
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
        .from(icon, {
          scale: 0.45,
          opacity: 0,
          duration: 0.55,
          ease: "back.out(1.8)"
        }, "-=0.55")
        .from(title, {
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.55,
          ease: "power2.out"
        }, "-=0.35")
        .from(desc, {
          y: 8,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out"
        }, "-=0.35");
      });

      // Dynamic vertical timeline line draw-in on scroll scrub
      const timelineLine = el.querySelector(".about-timeline-line");
      if (timelineLine) {
        gsap.fromTo(timelineLine, 
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ".about-timeline",
              start: "top 72%",
              end: "bottom 72%",
              scrub: true
            }
          }
        );
      }

      // Elastic bounce popup for timeline dots
      gsap.utils.toArray<HTMLElement>(".about-timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          duration: 0.75,
          ease: "back.out(2.2)"
        });
      });

      // Timeline items slide stagger
      gsap.utils.toArray<HTMLElement>(".about-timeline-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, el);

    // Refresh ScrollTrigger dynamic positions after dynamic elements render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Our Story"
        subtitle="Where sun-kissed meets serenity — discover the soul behind Life's A Beach."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground />

        {/* ─── Section 1: Story ─── */}
        <section className="about-page-section about-story-section relative overflow-hidden">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <div className="about-story-image-wrap relative">
              <div className="about-story-frame relative overflow-hidden rounded-sm">
                <img
                  src="/about_salon.png"
                  alt="Life's A Beach luxury tanning salon interior"
                  className="about-story-img h-full w-full object-cover"
                />
                <div className="about-story-img-overlay absolute inset-0" aria-hidden />
                <div className="about-story-img-shine absolute inset-0" aria-hidden />
              </div>

              {/* Floating seal */}
              <div className="about-story-seal">
                <div className="about-story-seal-inner">
                  <span className="about-story-seal-est font-forum">EST</span>
                  <span className="about-story-seal-year font-display">2026</span>
                  <div className="about-story-seal-rule" />
                  <span className="about-story-seal-glyph">✦</span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="about-reveal space-y-8">
              <div className="flex items-center gap-4">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Our Beginning</span>
              </div>

              <h2 className="about-page-headline">
                Born from a Vision of
                <br />
                <em>Golden Elegance</em>
              </h2>

              <div className="about-ornament-divider flex items-center gap-4">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>

              <p className="about-page-body font-cormorant">
                Life&apos;s A Beach was born from a simple yet profound belief: that tanning should be more
                than a service — it should be an experience. We envisioned a sanctuary where warmth,
                luxury, and expert care converge to create moments of pure, sun-kissed bliss.
              </p>
              <p className="about-page-body font-cormorant">
                From our hand-selected premium beds to our complimentary artisanal espresso bar, every
                element has been thoughtfully designed to transport you to a world of coastal serenity
                and timeless elegance.
              </p>

              <div className="mt-8">
                <a href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach" target="_blank" rel="noopener noreferrer" className="btn-luxury inline-block px-10 py-4 text-[8px]">
                  BOOK YOUR EXPERIENCE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Values (Our Philosophy) ─── */}
        <section className="about-page-section about-values-section relative overflow-hidden">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="about-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">02</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Our Philosophy</span>
              </div>
              <h2 className="about-page-headline mb-4">
                The Pillars of
                <br />
                <em>Our Luxury</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto mb-6">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
              <p className="about-page-body font-cormorant max-w-[580px] mx-auto text-[1.12rem] leading-relaxed text-center text-[#5c4538]/85 italic mb-14">
                We believe that true beauty is built on care, comfort, and uncompromising luxury. Discover the core values that define our sanctuary.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((val) => (
                <article key={val.title} className="about-value-card group">
                  <div className="about-value-icon-wrap">
                    <span className="about-value-icon">{val.icon}</span>
                  </div>
                  <h3 className="about-value-title font-display">{val.title}</h3>
                  <p className="about-value-desc font-cormorant">{val.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Journey Timeline ─── */}
        <section className="about-page-section about-timeline-section relative overflow-hidden">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[800px] px-6 md:px-12">
            <div className="about-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">03</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Our Journey</span>
              </div>
              <h2 className="about-page-headline">
                Milestones of
                <br />
                <em>Excellence</em>
              </h2>
            </div>

            <div className="about-timeline relative">
              <div className="about-timeline-line absolute left-1/2 top-0 bottom-0 -translate-x-1/2" aria-hidden />

              {MILESTONES.map((m, i) => (
                <div
                  key={i}
                  className={`about-timeline-item relative flex items-start gap-8 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } mb-14 last:mb-0`}
                >
                  <div className={`about-timeline-content flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span className="about-timeline-year font-display">{m.year}</span>
                    <p className="about-timeline-event font-cormorant">{m.event}</p>
                  </div>
                  <div className="about-timeline-dot relative z-10 flex-shrink-0">
                    <span className="about-timeline-dot-inner" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials Section ─── */}
        <TestimonialSection />

        {/* ─── Section 4: Premium Light CTA Section ─── */}
        <InnerPageCta 
          title={<>Ready to Experience<br /><em>the Difference?</em></>}
          subtitle="Step into our sanctuary and discover why our guests never settle for anything less."
          buttonText="RESERVE YOUR SUITE"
          buttonHref="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
        />
      </div>
    </InnerPageLayout>
  );
}
