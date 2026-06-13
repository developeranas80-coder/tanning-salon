"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Apply gentle GSAP ScrollTrigger parallax animation to each leaf
    const ctx = gsap.context(() => {
      const leaves = gsap.utils.toArray<HTMLElement>(".page-bg-leaf");
      leaves.forEach((leaf, i) => {
        const speed = 60 + (i % 3) * 35; // Coprime speeds for natural stagger
        const direction = i % 2 === 0 ? 1 : -1;
        const rotateAmt = 12 * direction;

        gsap.to(leaf, {
          yPercent: speed * direction * 0.45,
          xPercent: 15 * direction,
          rotation: rotateAmt,
          ease: "none",
          scrollTrigger: {
            trigger: leaf,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4, // Rich inertial lag
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="page-background-system pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none">

      {/* ── absolute leaf wrapper spanning the entire document height ── */}
      <div className="page-bg-leaves-track absolute inset-0 w-full h-full" aria-hidden="true">

        {/* Leaf 1: Top-Left (near About section, around 14% of page height) */}
        <div
          className="page-bg-leaf absolute left-[-5%] top-[14%] w-[min(24vw,280px)] z-[2]"
          style={{ transform: "rotate(-15deg)" }}
        >
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="leaf-float-anim-1 w-full object-contain filter-blur-sm opacity-25"
            style={{ filter: "blur(4px) brightness(0.65) saturate(0.85)" }}
          />
        </div>

        {/* Leaf 2: Top-Right (near bottom of About / top of Testimonials, around 33% of page height) */}
        <div
          className="page-bg-leaf absolute right-[-4%] top-[33%] w-[min(20vw,240px)] z-[2]"
          style={{ transform: "rotate(45deg) scaleX(-1)" }}
        >
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="leaf-float-anim-2 w-full object-contain filter-blur-md opacity-22"
            style={{ filter: "blur(6px) brightness(0.6) saturate(0.8)" }}
          />
        </div>

        {/* Leaf 3: Mid-Left (near middle of Testimonials, around 51% of page height) */}
        <div
          className="page-bg-leaf absolute left-[-3%] top-[51%] w-[min(22vw,260px)] z-[2]"
          style={{ transform: "rotate(10deg)" }}
        >
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="leaf-float-anim-3 w-full object-contain filter-blur-sm opacity-20"
            style={{ filter: "blur(5px) brightness(0.7) saturate(0.8)" }}
          />
        </div>

        {/* Leaf 4: Mid-Right (near bottom of Testimonials / top of Contact, around 68% of page height) */}
        <div
          className="page-bg-leaf absolute right-[-5%] top-[68%] w-[min(22vw,260px)] z-[2]"
          style={{ transform: "rotate(-35deg)" }}
        >
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="leaf-float-anim-1 w-full object-contain filter-blur-md opacity-24"
            style={{ filter: "blur(7px) brightness(0.62) saturate(0.82)" }}
          />
        </div>

        {/* Leaf 5: Bottom-Left (near middle of Contact, around 82% of page height) */}
        <div
          className="page-bg-leaf absolute left-[-4%] top-[82%] w-[min(20vw,240px)] z-[2]"
          style={{ transform: "rotate(-20deg) scaleY(-1)" }}
        >
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="leaf-float-anim-2 w-full object-contain filter-blur-md opacity-22"
            style={{ filter: "blur(6px) brightness(0.65) saturate(0.8)" }}
          />
        </div>

        {/* Leaf 6: Bottom-Right (near Footer, around 93% of page height) */}
        <div
          className="page-bg-leaf absolute right-[-4%] top-[93%] w-[min(18vw,210px)] z-[2]"
          style={{ transform: "rotate(25deg)" }}
        >
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="leaf-float-anim-3 w-full object-contain filter-blur-sm opacity-26"
            style={{ filter: "blur(4px) brightness(0.58) saturate(0.75)" }}
          />
        </div>

      </div>
    </div>
  );
}
