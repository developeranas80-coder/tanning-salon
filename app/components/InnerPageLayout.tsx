"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import { setHasEnteredSite } from "../lib/navigationState";

gsap.registerPlugin(ScrollTrigger);



/* ─── Compact Inner-Page Footer ─── */
function InnerFooter() {
  return (
    <footer className="footer-premium relative overflow-hidden">
      {/* Bg layers */}
      <div className="footer-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="footer-glow-top pointer-events-none absolute inset-x-0 top-0 h-2/3" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden />

      {/* Blurred Leaf Decorations */}
      <div className="footer-leaf footer-leaf-left pointer-events-none absolute select-none" aria-hidden>
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="footer-leaf-img"
          style={{ filter: "blur(8px) brightness(0.55) saturate(0.7)", opacity: 0.45 }}
        />
      </div>
      <div className="footer-leaf footer-leaf-right pointer-events-none absolute select-none" aria-hidden>
        <img
          src="/hero_monstera_leaf.png"
          alt=""
          className="footer-leaf-img"
          style={{ filter: "blur(10px) brightness(0.5) saturate(0.65)", opacity: 0.38 }}
        />
      </div>

      {/* Top rule */}
      <div className="footer-top-rule" aria-hidden />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-10 pt-16 md:px-12 md:pt-20">
        {/* Brand centre block */}
        <div className="footer-brand text-center">
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

/* ─── Inner Page Layout ─── */
interface InnerPageLayoutProps {
  children: React.ReactNode;
}

export default function InnerPageLayout({ children }: InnerPageLayoutProps) {
  useEffect(() => {
    setHasEnteredSite(true);
  }, []);

  return (
    <main className="inner-page-root relative min-h-screen overflow-x-hidden bg-transparent text-[#3d2b1f] selection:bg-[#B48B78] selection:text-white">
      <SiteHeader visible={true} />
      <div className="inner-page-content">
        {children}
      </div>
      <InnerFooter />
    </main>
  );
}
