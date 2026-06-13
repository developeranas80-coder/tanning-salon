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

const TEAM = [
  {
    name: "Scott Brown",
    role: "Director / Owner",
    bio: "Scott brings leadership and strategic vision to Life's A Beach. Under his direction, the salon has redefined UV and skincare standards, creating a premium resort-style digital wellness oasis.",
    certifications: ["Managing Director", "Certified UV Advisor", "Luxury Hospitality Specialist"],
    image: "/team_scott.jpg",
  },
  {
    name: "Jenna Baillie",
    role: "Manager",
    bio: "Jenna coordinates daily sanctuary operations, ensuring an immaculate guest journey from reservation to custom bronzing care. Her attention to detail defines our luxury standards.",
    certifications: ["Operations Manager", "SmartTanning Consultant", "Guest Relations Specialist"],
    image: "/team_jenna.jpg",
  },
];

const MILESTONES = [
  { year: "2025", event: "There was an idea..." },
  { year: "2026", event: "That idea became reality. We now open our doors to you, our customers, for an experience like never before." },
  { year: "2027", event: "Expanding our horizons. Integrating next-generation UV/red-light hybrid systems and personalized skin care." },
  { year: "2028", event: "Opening new coastal sanctuaries to spread the timeless, premium resort-style tanning experience." },
  { year: "2029", event: "Redefining the future of wellness and tanning luxury with ageless organic innovations and global standards." },
];

export default function TeamPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.utils.toArray<HTMLElement>(".team-reveal").forEach((item) => {
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

      // Stagger members card reveal
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.95,
          delay: idx * 0.18,
          ease: "power3.out"
        });
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

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Our Team"
        subtitle="Entrust your tanning rituals to certified dermal technologists and glowing skin specialists."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground reduced />

        {/* ─── Team Catalog Grid ─── */}
        <section className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="team-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Certified Specialists</span>
              </div>
              <h2 className="about-page-headline">
                The Dedicated Artisans
                <br />
                <em>Behind Your Golden Glow</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto mb-6">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
            </div>

            {/* Team Grid — Luxury Editorial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-[960px] mx-auto">
              {TEAM.map((member) => (
                <div key={member.name} className="team-card team-member-card group">
                  {/* Gold accent line */}
                  <div className="team-member-accent" />
                  
                  {/* Corner glyph */}
                  <span className="team-member-glyph">✦</span>

                  {/* Full-bleed portrait */}
                  <div className="team-member-img-wrap">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="team-member-img"
                    />
                    {/* Cinematic overlay */}
                    <div className="team-member-overlay" />
                  </div>

                  {/* Info overlay on bottom */}
                  <div className="team-member-info">
                    <span className="team-member-role">{member.role}</span>
                    <h3 className="team-member-name">{member.name}</h3>
                    <div className="team-member-divider" />
                    <p className="team-member-bio">{member.bio}</p>
                    
                    {/* Certification tags */}
                    <div className="team-member-tags">
                      {member.certifications.map((cert) => (
                        <span key={cert} className="team-member-tag">{cert}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 2: Journey Timeline ─── */}
        <section className="about-page-section about-timeline-section relative overflow-hidden">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[800px] px-6 md:px-12">
            <div className="team-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">02</span>
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

        {/* ─── Team Philosophy CTA ─── */}
        <InnerPageCta 
          title={<>Consult With a Certified<br /><em>SmartTanning Advisor</em></>}
          subtitle="Get a completely custom tanning schedule mapping your skin sensitivity."
          buttonText="SCHEDULE AN INTRO CONSULTATION"
          buttonHref="/contact"
        />
      </div>
    </InnerPageLayout>
  );
}
