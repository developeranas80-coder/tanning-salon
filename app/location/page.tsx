"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";

gsap.registerPlugin(ScrollTrigger);

export default function LocationPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.utils.toArray<HTMLElement>(".location-reveal").forEach((item) => {
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Our Location"
        subtitle="Visit our beachfront sanctuary in Bo'ness and plan your escape."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Location" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground reduced />

        {/* ─── Location Details & Map Section ─── */}
        <section className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          {/* Info Details Section on Top */}
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 mb-16">
            <div className="location-reveal grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

              {/* Left Column: Heading and description */}
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="about-section-index font-forum">01</span>
                  <div className="about-section-index-line" />
                  <span className="section-label mb-0">Our Sanctuary</span>
                </div>
                <h2 className="about-page-headline">
                  <em>Sanctuary</em>
                </h2>
                <p className="font-cormorant text-[1.18rem] leading-relaxed text-[#5c4538]/85 italic max-w-2xl">
                  Experience timeless coastal serenity. Located right on the waterfront, our flagship salon captures natural ocean air to combine with your indoor tanning ritual.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pt-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">ADDRESS</span>
                      <span className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium font-sans-readable">
                        Unit 3, South Drum Retail Park, Bo'ness, EH51 9FD
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">COORDINATES</span>
                      <span className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium font-sans-readable">
                        56.008027° N, 3.582281° W
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">EMAIL</span>
                      <a href="mailto:Jenna.baillie@lifesabeachtanning.co.uk" className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium hover:text-[#b48b78] transition-colors block font-sans-readable break-all">
                        Jenna.baillie@lifesabeachtanning.co.uk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">PHONE</span>
                      <a href="tel:07908046370" className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium hover:text-[#b48b78] transition-colors block font-sans-readable">
                        07908046370
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Operating Hours Card */}
              <div className="md:col-span-5 self-center">
                <div className="about-value-card p-8 bg-[#faf6f0]/40 backdrop-blur-sm border border-[#b48b78]/15 rounded-sm">
                  <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] block mb-3">
                    OPERATING HOURS
                  </span>
                  <div className="space-y-3 font-cormorant text-md text-[#5c4538]/85">
                    <div className="flex justify-between border-b border-[#b48b78]/10 pb-1.5">
                      <span>Monday — Sunday</span>
                      <span className="font-semibold text-[#3d2b1f]">9:00 AM — 9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Full Screen Width Map Section on Bottom */}
          <div className="location-reveal relative z-10 w-full px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="relative h-[400px] sm:h-[480px] md:h-[540px] w-full overflow-hidden rounded-md border border-[#b48b78]/25 shadow-2xl bg-[#faf6f0]">
              <iframe
                src="https://maps.google.com/maps?q=56.008027,-3.582281&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.1) sepia(0.08) contrast(1.02)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Life's A Beach Location Map"
              ></iframe>
              {/* Offset inner gold line border */}
              <div className="absolute inset-4 border border-[#b48b78]/15 pointer-events-none rounded-sm" />
            </div>
          </div>

        </section>
      </div>
    </InnerPageLayout>
  );
}
