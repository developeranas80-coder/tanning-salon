"use client";

import Link from "next/link";

interface InnerPageCtaProps {
  title: React.ReactNode;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

export default function InnerPageCta({ title, subtitle, buttonText, buttonHref }: InnerPageCtaProps) {
  return (
    <section className="about-cta-section relative overflow-hidden">
      {/* Background Image with luxury soft gradient mask */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <img
          src="/cta_luxury_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.14] scale-[1.03] will-change-transform transform-gpu"
          style={{ filter: "brightness(1.02) contrast(1.02)" }}
        />
        {/* Ambient warm gradient mask overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E3DAC9] via-transparent to-[#EBE5D9] opacity-90" />
      </div>

      {/* Ambient background wash */}
      <div className="about-cta-bg absolute inset-0 pointer-events-none" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      {/* Floating Leaves inside the CTA section container */}
      {/* Left Palm Leaf */}
      <div 
        className="absolute left-[-10%] md:left-[-5%] top-[10%] w-[min(26vw,260px)] z-0 pointer-events-none select-none"
        style={{ transform: "rotate(-15deg)" }}
      >
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="leaf-float-anim-1 w-full object-contain opacity-[0.24]"
          style={{ filter: "blur(2px) brightness(1.05) saturate(0.9) contrast(0.9) sepia(0.12)" }}
        />
      </div>

      {/* Right Monstera Leaf */}
      <div 
        className="absolute right-[-10%] md:right-[-5%] bottom-[10%] w-[min(22vw,220px)] z-0 pointer-events-none select-none"
        style={{ transform: "rotate(25deg) scaleX(-1)" }}
      >
        <img
          src="/hero_monstera_leaf.png"
          alt=""
          className="leaf-float-anim-2 w-full object-contain opacity-[0.22]"
          style={{ filter: "blur(2.5px) brightness(1.1) saturate(0.85) contrast(0.95) sepia(0.15)" }}
        />
      </div>

      {/* Centered card frame */}
      <div className="relative z-10 mx-auto max-w-[760px] px-6 md:px-12">
        <div className="beds-reveal about-cta-frame text-center">
          <div className="about-cta-ornament mx-auto mb-8 flex items-center justify-center gap-4">
            <div className="about-cta-ornament-line" />
            <span className="about-cta-ornament-glyph font-forum">✦</span>
            <div className="about-cta-ornament-line" />
          </div>

          <h2 className="about-cta-title font-cormorant">
            {title}
          </h2>
          <p className="about-cta-body font-cormorant">
            {subtitle}
          </p>
          {buttonHref.startsWith("http") ? (
            <a href={buttonHref} target="_blank" rel="noopener noreferrer" className="btn-luxury inline-block mt-10 px-14 py-5 text-[8px]">
              {buttonText}
            </a>
          ) : (
            <Link href={buttonHref} className="btn-luxury inline-block mt-10 px-14 py-5 text-[8px]">
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
