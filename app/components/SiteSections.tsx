"use client";

import { useState, useEffect, useRef } from "react";
import TestimonialSection from "./TestimonialSection";

/* ─── About Us Section ─── */
function AboutSection() {
  return (
    <section
      id="about-us"
      className="about-section relative overflow-hidden"
    >
      {/* ── Hero-matching parallax bg (same as hero) ── */}
      <div className="about-parallax-bg pointer-events-none absolute inset-0" aria-hidden />

      {/* ── Radial sun bloom top-right (mirrors hero) ── */}
      <div className="about-sun-bloom pointer-events-none absolute" aria-hidden />

      {/* ── Grain texture overlay ── */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* ── Large editorial BG number "01" ── */}
      <div className="about-bg-number pointer-events-none absolute select-none" aria-hidden>
        01
      </div>

      {/* ── Top horizontal rule ── */}
      <div className="about-top-rule" aria-hidden />

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-stretch gap-0 px-0 lg:grid-cols-[1fr_1.1fr]">

        {/* ── Left: Image column ── */}
        <div className="about-image-col relative flex flex-col justify-end overflow-hidden px-8 pb-16 pt-32 md:px-14 md:pb-20 md:pt-40 lg:pb-28 lg:pt-44">

          {/* Vertical label strip */}
          <div className="about-vert-label pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 select-none md:left-8" aria-hidden>
            <span className="font-forum text-[7px] tracking-[0.55em] text-[#B48B78]/50">
              LIFE&apos;S A BEACH TANNING SANCTUARY
            </span>
          </div>

          {/* Image with double frame */}
          <div className="about-frame-outer relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="about-frame-accent" aria-hidden />
            <div className="about-frame-inner relative overflow-hidden">
              <img
                src="/about_salon.png"
                alt="Life's A Beach luxury tanning salon interior"
                className="about-img h-full w-full object-cover about-img-noBg"
              />
              {/* Warm light overlay on image */}
              <div className="about-img-warm" aria-hidden />
              <div className="about-img-shine" aria-hidden />
            </div>

            {/* Gold wax seal badge */}
            <div className="about-seal">
              <svg className="about-seal-ring" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="56" stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" strokeDasharray="2 4" />
                <circle cx="60" cy="60" r="46" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </svg>
              <div className="about-seal-inner">
                <span className="about-seal-est font-forum">EST</span>
                <span className="about-seal-year font-display">2026</span>
                <div className="about-seal-rule" />
                <span className="about-seal-glyph">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Copy column ── */}
        <div className="about-copy-col relative flex flex-col justify-center px-8 pb-20 pt-16 md:px-14 md:pb-28 md:pt-20 lg:px-16 lg:pb-32 lg:pt-28">

          {/* Section index label */}
          <div className="about-index-wrap mb-8 flex items-center gap-4">
            <span className="about-index font-forum">01</span>
            <div className="about-index-line" />
            <span className="section-label mb-0">Our Sanctuary</span>
          </div>

          {/* Headline */}
          <h2 className="about-headline">
            Where Sun‑Kissed
            <br />
            <em>Meets Serenity</em>
          </h2>

          {/* Ornament divider */}
          <div className="about-ornament mt-8 mb-8 flex items-center gap-4">
            <div className="about-ornament-line flex-1" />
            <span className="about-ornament-glyph font-forum">✦</span>
            <div className="about-ornament-line flex-1" />
          </div>

          {/* Body copy */}
          <p className="about-body font-cormorant">
            Step into an architectural haven of warm arches, soft light, and bespoke tanning
            rituals. Every detail — from our artisan coffee bar to our private UV suites —
            is curated for your perfect, sun-kissed glow.
          </p>

          {/* Stats — horizontal luxury band */}
          <div className="about-stats mt-12">
            {[
              { n: "6", l: "Premium Beds" },
              { n: "100%", l: "Private Suites" },
              { n: "5★", l: "Guest Care" },
              { n: "Free", l: "Espresso Bar" },
            ].map((s, i) => (
              <div key={s.l} className="about-stat-item">
                {i > 0 && <div className="about-stat-divider" />}
                <div className="about-stat-inner">
                  <span className="about-stat-n font-display">{s.n}</span>
                  <span className="about-stat-l font-forum">{s.l}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach" target="_blank" rel="noopener noreferrer" className="about-cta-link group inline-flex items-center gap-5">
              <span className="btn-luxury px-10 py-4 text-[8px]">BOOK YOUR SESSION</span>
              <span className="about-cta-aside font-forum">
                Private suites available
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom rule ── */}
      <div className="about-bottom-rule" aria-hidden />
    </section>
  );
}

/* ─── Contact / Reservations Section ─── */
type FormState = "idle" | "submitting" | "success";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", suite: "", date: "", notes: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <section
      id="contact"
      className="contact-section relative overflow-hidden py-28 md:py-40"
    >
      {/* Dark luxury background */}
      <div className="contact-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="contact-glow-top pointer-events-none absolute inset-x-0 top-0 h-[60%]" aria-hidden />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">

        {/* Section header */}
        <div className="contact-header mb-16 text-center md:mb-20">
          <span className="section-label text-[#E3C9AC]/80">Reservations</span>
          <h2 className="contact-title mt-3">
            Begin Your<br />
            <em>Glow Journey</em>
          </h2>
          <div className="contact-title-divider mx-auto mt-6" />
        </div>

        {/* Two-column layout */}
        <div className="contact-grid grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">

          {/* Left — Info columns */}
          <div className="contact-info space-y-10">
            {/* Address */}
            <div className="contact-info-block">
              <div className="contact-info-icon">📍</div>
              <div>
                <span className="contact-info-label font-forum">Location</span>
                <p className="contact-info-text font-sans-readable text-[14px]">
                  Unit 3, South Drum Retail Park<br />
                  Bo'ness, EH51 9FD
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-info-block">
              <div className="contact-info-icon">🕐</div>
              <div>
                <span className="contact-info-label font-forum">Hours</span>
                <p className="contact-info-text font-sans-readable text-[14px]">
                  Monday – Sunday:<br />
                  9:00 am – 9:00 pm
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-block">
              <div className="contact-info-icon">✉</div>
              <div className="min-w-0 flex-1">
                <span className="contact-info-label font-forum">Email</span>
                <a href="mailto:Jenna.baillie@lifesabeachtanning.co.uk" className="contact-info-text contact-info-link font-sans-readable text-[14px] break-all block">
                  Jenna.baillie@lifesabeachtanning.co.uk
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-info-block">
              <div className="contact-info-icon">📞</div>
              <div className="min-w-0 flex-1">
                <span className="contact-info-label font-forum">Phone</span>
                <a href="tel:07908046370" className="contact-info-text contact-info-link font-sans-readable text-[14px] block">
                  07908046370
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="contact-socials mt-4 flex gap-6">
              {[
                { name: "Instagram", href: "https://www.instagram.com/lifes.abeachtanning?igsh=d2ZsbGVja2tjcXM0" },
                { name: "Facebook", href: "#" },
                { name: "TikTok", href: "#" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                  className="contact-social font-forum"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Booking form */}
          <div className="contact-form-wrap relative">
            {/* Glass card */}
            <div className="contact-glass-card">

              {/* Success overlay */}
              {status === "success" && (
                <div className="contact-success">
                  <div className="contact-success-icon">✦</div>
                  <h3 className="contact-success-title font-display">Request Received</h3>
                  <p className="contact-success-body font-cormorant">
                    Thank you. Our team will confirm your reservation within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="btn-luxury mt-6 px-10 py-3 text-[8px]"
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", suite: "", date: "", notes: "" }); }}
                  >
                    BOOK ANOTHER SESSION
                  </button>
                </div>
              )}

              {status !== "success" && (
                <form onSubmit={handleSubmit} className="contact-form space-y-6" noValidate>
                  <div className="contact-form-header mb-8">
                    <h3 className="contact-form-title font-display">Reserve a Suite</h3>
                    <p className="contact-form-subtitle font-cormorant">
                      Your luxury experience begins here.
                    </p>
                  </div>

                  {/* Name */}
                  <div className={`contact-field ${focused === "name" || form.name ? "contact-field-active" : ""}`}>
                    <label htmlFor="cf-name" className="contact-field-label font-forum">Full Name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="contact-field-input font-cormorant"
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                    <div className="contact-field-line" />
                  </div>

                  {/* Email */}
                  <div className={`contact-field ${focused === "email" || form.email ? "contact-field-active" : ""}`}>
                    <label htmlFor="cf-email" className="contact-field-label font-forum">Email Address</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="contact-field-input font-cormorant"
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                    <div className="contact-field-line" />
                  </div>

                  {/* Sunbed selection */}
                  <div className={`contact-field ${focused === "suite" || form.suite ? "contact-field-active" : ""}`}>
                    <label htmlFor="cf-suite" className="contact-field-label font-forum">Sunbed Name</label>
                    <select
                      id="cf-suite"
                      name="suite"
                      required
                      value={form.suite}
                      onChange={handleChange}
                      onFocus={() => setFocused("suite")}
                      onBlur={() => setFocused(null)}
                      className="contact-field-input contact-field-select font-cormorant"
                    >
                      <option value="" disabled>Choose your sunbed</option>
                      <option value="dubai">Dubai</option>
                      <option value="maldives">Maldives</option>
                      <option value="mauritius">Mauritius</option>
                      <option value="seychelles">Seychelles</option>
                      <option value="thailand">Thailand</option>
                      <option value="dominican-republic">Dominican Republic</option>
                    </select>
                    <div className="contact-field-line" />
                  </div>

                  {/* Date */}
                  <div className={`contact-field ${focused === "date" || form.date ? "contact-field-active" : ""}`}>
                    <label htmlFor="cf-date" className="contact-field-label font-forum">Preferred Date &amp; Time</label>
                    <input
                      id="cf-date"
                      name="date"
                      type="datetime-local"
                      required
                      value={form.date}
                      onChange={handleChange}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                      className="contact-field-input font-cormorant"
                    />
                    <div className="contact-field-line" />
                  </div>

                  {/* Notes */}
                  <div className={`contact-field ${focused === "notes" || form.notes ? "contact-field-active" : ""}`}>
                    <label htmlFor="cf-notes" className="contact-field-label font-forum">Special Requests</label>
                    <textarea
                      id="cf-notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={handleChange}
                      onFocus={() => setFocused("notes")}
                      onBlur={() => setFocused(null)}
                      className="contact-field-input contact-field-textarea font-cormorant"
                      placeholder="Any preferences or notes for our team…"
                    />
                    <div className="contact-field-line" />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-luxury mt-4 w-full py-5 text-[8px] tracking-[0.42em]"
                  >
                    {status === "submitting" ? (
                      <span className="contact-submitting">
                        <span className="contact-dot" /><span className="contact-dot" /><span className="contact-dot" />
                      </span>
                    ) : (
                      "BOOK SESSION"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* TestimonialSection is now imported from "./TestimonialSection" */

/* ─── Site Footer ─── */
function SiteFooter() {
  return (
    <footer className="footer-premium relative overflow-hidden">

      {/* ── Bg layers ── */}
      <div className="footer-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="footer-glow-top pointer-events-none absolute inset-x-0 top-0 h-2/3" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      {/* ── Blurred Leaf Decorations (from hero assets) ── */}
      {/* Palm Leaf — left side */}
      <div className="footer-leaf footer-leaf-left pointer-events-none absolute select-none" aria-hidden>
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="footer-leaf-img"
          style={{ filter: "blur(8px) brightness(0.55) saturate(0.7)", opacity: 0.45 }}
        />
      </div>

      {/* Monstera Leaf — right side */}
      <div className="footer-leaf footer-leaf-right pointer-events-none absolute select-none" aria-hidden>
        <img
          src="/hero_monstera_leaf.png"
          alt=""
          className="footer-leaf-img"
          style={{ filter: "blur(10px) brightness(0.5) saturate(0.65)", opacity: 0.38 }}
        />
      </div>

      {/* Palm Leaf small — top center bleed */}
      <div className="footer-leaf footer-leaf-top pointer-events-none absolute select-none" aria-hidden>
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="footer-leaf-img"
          style={{ filter: "blur(14px) brightness(0.45) saturate(0.5)", opacity: 0.22, transform: "rotate(120deg) scaleX(-1)" }}
        />
      </div>

      {/* ── Top rule ── */}
      <div className="footer-top-rule" aria-hidden />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-10 pt-16 md:px-12 md:pt-20">

        {/* Brand centre block */}
        <div className="footer-brand text-center">
          {/* Gold ornament */}
          <div className="footer-ornament mx-auto mb-6 flex items-center justify-center gap-4">
            <div className="footer-ornament-line" />
            <span className="footer-ornament-glyph font-forum">✦</span>
            <div className="footer-ornament-line" />
          </div>

          <h2 className="footer-wordmark font-display">Life&apos;s A Beach</h2>
          <p className="footer-tagline font-cormorant mt-3">
            Where every day is a beach day.
          </p>

          {/* Social links */}
          <div className="footer-socials mt-8 flex items-center justify-center gap-8">
            {[
              { name: "Instagram", href: "https://www.instagram.com/lifes.abeachtanning?igsh=d2ZsbGVja2tjcXM0" },
              { name: "TikTok", href: "#" },
              { name: "Facebook", href: "#" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.href !== "#" ? "_blank" : undefined}
                rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                className="footer-social font-forum"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Divider rule */}
        <div className="footer-mid-rule my-12" aria-hidden />

        {/* Info columns */}
        <div className="footer-info grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <span className="footer-info-label font-forum">Location</span>
            <p className="footer-info-text font-sans-readable text-[13px] mt-3">
              Unit 3, South Drum Retail Park<br />Bo'ness, EH51 9FD
            </p>
          </div>
          <div className="sm:text-center">
            <span className="footer-info-label font-forum">Hours</span>
            <p className="footer-info-text font-sans-readable text-[13px] mt-3">
              Mon – Sun: 9am – 9pm
            </p>
          </div>
          <div className="sm:text-right">
            <span className="footer-info-label font-forum">Contact</span>
            <p className="footer-info-text font-sans-readable text-[13px] mt-3">
              <a href="tel:07908046370" className="hover:text-[#b48b78] transition-colors block mb-1">07908046370</a>
              <a href="mailto:Jenna.baillie@lifesabeachtanning.co.uk" className="hover:text-[#b48b78] transition-colors block break-all">Jenna.baillie@lifesabeachtanning.co.uk</a>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-8 sm:flex-row">
          <p className="font-sans-premium text-[6.5px] tracking-[0.4em] text-[#FCF9F6]/28">
            © 2026 LIFE&apos;S A BEACH — ALL RIGHTS RESERVED
          </p>
          <p className="font-sans-premium text-[6.5px] tracking-[0.3em] text-[#FCF9F6]/20">
            PRIVACY — TERMS
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function SiteSections() {
  return (
    <div className="site-sections">
      <AboutSection />
      <TestimonialSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
