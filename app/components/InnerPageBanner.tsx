"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface InnerPageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function InnerPageBanner({
  title,
  subtitle,
  breadcrumbs = [],
}: InnerPageBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.2 }
        );
      }

      // Subtitle reveal
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );
      }

      // Ornament reveal
      if (ornamentRef.current) {
        gsap.fromTo(
          ornamentRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: "power2.inOut", delay: 0.4 }
        );
      }

      // Breadcrumb reveal
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.7 }
        );
      }

      // Leaf float animations
      if (leaf1Ref.current) {
        gsap.fromTo(
          leaf1Ref.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
        gsap.to(leaf1Ref.current, {
          y: 20,
          x: 10,
          rotation: 8,
          duration: 7.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (leaf2Ref.current) {
        gsap.fromTo(
          leaf2Ref.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );
        gsap.to(leaf2Ref.current, {
          y: -18,
          x: -12,
          rotation: -6,
          duration: 8.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Parallax on scroll
      gsap.to(".banner-bg-layer", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Split title for styled rendering
  const titleParts = title.split("\n");

  return (
    <div ref={bannerRef} className="inner-banner relative overflow-hidden">
      {/* Background layers */}
      <div className="banner-bg-layer absolute inset-0" aria-hidden>
        <div className="banner-bg-gradient absolute inset-0" />
        <div className="banner-bg-texture absolute inset-0" />
      </div>

      {/* Golden sun bloom top-right */}
      <div className="banner-sun-bloom absolute pointer-events-none" aria-hidden />

      {/* Warm light wash */}
      <div className="banner-light-wash absolute inset-0 pointer-events-none" aria-hidden />

      {/* Grain overlay */}
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      {/* Floating decorative leaves */}
      <div
        ref={leaf1Ref}
        className="banner-leaf banner-leaf-left absolute pointer-events-none select-none z-[2]"
        aria-hidden
      >
        <img
          src="/hero_palm_leaf.png"
          alt=""
          className="banner-leaf-img w-full object-contain"
        />
      </div>
      <div
        ref={leaf2Ref}
        className="banner-leaf banner-leaf-right absolute pointer-events-none select-none z-[2]"
        aria-hidden
      >
        <img
          src="/hero_monstera_leaf.png"
          alt=""
          className="banner-leaf-img w-full object-contain"
        />
      </div>

      {/* Floating golden particles */}
      <div className="banner-particles pointer-events-none absolute inset-0 z-[3]" aria-hidden>
        <div className="banner-particle banner-particle-1" />
        <div className="banner-particle banner-particle-2" />
        <div className="banner-particle banner-particle-3" />
        <div className="banner-particle banner-particle-4" />
        <div className="banner-particle banner-particle-5" />
      </div>

      {/* Bottom gradient fade */}
      <div className="banner-bottom-fade absolute bottom-0 left-0 right-0 pointer-events-none z-[4]" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-center px-6 text-center">
        {/* Section index ornament */}
        <div ref={ornamentRef} className="banner-ornament mb-8 flex items-center gap-4">
          <div className="banner-ornament-line" />
          <span className="banner-ornament-glyph font-forum">✦</span>
          <div className="banner-ornament-line" />
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="banner-title">
          {titleParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {i === titleParts.length - 1 && titleParts.length > 1 ? (
                <em>{part}</em>
              ) : (
                part
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p ref={subtitleRef} className="banner-subtitle font-cormorant">
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div ref={breadcrumbRef} className="banner-breadcrumbs mt-8">
            <nav className="flex items-center justify-center gap-3" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="banner-breadcrumb-sep font-forum">—</span>
                  )}
                  {crumb.href ? (
                    <Link href={crumb.href} className="banner-breadcrumb-link font-forum">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="banner-breadcrumb-active font-forum">
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Bottom decorative rule */}
      <div className="banner-bottom-rule absolute bottom-0 left-0 right-0 z-[5]" aria-hidden />
    </div>
  );
}
