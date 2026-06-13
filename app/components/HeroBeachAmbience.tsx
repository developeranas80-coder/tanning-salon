"use client";

/** Decorative beach layers: sun, rays, sand, dust — no client logic. */
export default function HeroBeachAmbience() {
  return (
    <>
      <div className="hero-sky-gradient" aria-hidden />
      <div className="hero-sun-atmosphere" aria-hidden />
      <div className="hero-sun-wrap" aria-hidden>
        <div className="hero-sun-glow" />
        <div className="hero-sun-glow-outer" />
        <div className="hero-sun-disc" />
      </div>
      <div className="hero-god-rays" aria-hidden />
      <div className="hero-sun-sky-wash" aria-hidden />
      <div className="hero-horizon-line" aria-hidden />
      <div className="hero-sand-zone" aria-hidden>
        <div className="hero-sand-base" />
        <div className="hero-sand-grain" />
        <div className="hero-sand-shimmer" />
        <div className="hero-sun-light-on-sand" aria-hidden />
      </div>
      <div className="hero-dust" aria-hidden>
        <span className="floating-particle floating-particle-1" />
        <span className="floating-particle floating-particle-2" />
        <span className="floating-particle floating-particle-3" />
        <span className="floating-particle floating-particle-4" />
        <span className="floating-particle floating-particle-5" />
      </div>
    </>
  );
}
