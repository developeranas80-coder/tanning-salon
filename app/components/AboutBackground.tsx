"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutBackgroundProps {
  reduced?: boolean;
  rightLeafOnly?: boolean;
}

export default function AboutBackground({ reduced = false, rightLeafOnly = false }: AboutBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const leaves = gsap.utils.toArray<HTMLElement>(".page-bg-leaf");
      leaves.forEach((leaf, i) => {
        const isShadow = leaf.querySelector("img")?.getAttribute("src")?.includes("palm_tree_shadow");
        const direction = i % 2 === 0 ? 1 : -1;

        let speed = 25 + (i % 3) * 12; // Balanced, gentle coprime speeds for luxurious float
        let rotateAmt = 10 * direction;
        let yMult = 0.20;
        let xAmt = 7;
        let scrubVal = 2.4;

        if (isShadow) {
          // Make the palm tree shadow glide extremely slowly and subtly (practically stilled)
          speed = 6 + (i % 2) * 3;
          rotateAmt = 0.8 * direction; // Barely visible micro-sway
          yMult = 0.015; // Extremely slow vertical parallax drift (almost static!)
          xAmt = 0.5 * direction; // Tiny horizontal drift
          scrubVal = 5.0; // Extreme fluid drag to completely stabilize shadow movement
        }

        gsap.to(leaf, {
          yPercent: speed * direction * yMult,
          xPercent: xAmt,
          rotation: rotateAmt,
          ease: "none",
          scrollTrigger: {
            trigger: leaf,
            start: "top bottom",
            end: "bottom top",
            scrub: scrubVal,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="page-background-system pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-[1]" aria-hidden="true">
      <div className="page-bg-leaves-track absolute inset-0 w-full h-full">

        {/* ── Viewport-Fixed / Absolute Palm Tree Shadows (Drifting on Scroll) ── */}
        {/* Shadow 1: Top Right, around 8% of page height */}
        {!rightLeafOnly && (
          <div
            className="page-bg-leaf absolute right-[-8%] top-[8%] w-[min(38vw,420px)] z-[2]"
            style={{ transform: "rotate(10deg) scaleX(-1)" }}
          >
            <img
              src="/palm_tree_shadow.png?v=4"
              alt=""
              className="shadow-float-anim-slow w-full object-contain opacity-[0.22]"
              style={{ filter: "blur(5px) brightness(0.95)" }}
            />
          </div>
        )}


        {/* Shadow 3: Bottom Left, around 78% of page height */}
        <div
          className="page-bg-leaf absolute left-[-6%] top-[78%] w-[min(36vw,400px)] z-[2]"
          style={{ transform: "rotate(-20deg) scaleY(-1)" }}
        >
          <img
            src="/palm_tree_shadow.png?v=4"
            alt=""
            className="shadow-float-anim-slow w-full object-contain opacity-[0.22]"
            style={{ filter: "blur(5.5px) brightness(0.95)" }}
          />
        </div>


        {/* ── Viewport-Fixed / Absolute Tropical Leaves (Crisp, highly visible) ── */}
        {/* Leaf 1: Left side normally, or Right side when rightLeafOnly */}
        <div
          className={`page-bg-leaf absolute ${rightLeafOnly ? 'right-[-5%]' : 'left-[-5%]'} top-[18%] w-[min(23vw,260px)] z-[2]`}
          style={{ transform: rightLeafOnly ? "rotate(12deg) scaleX(-1)" : "rotate(-12deg)" }}
        >
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="leaf-float-anim-1 w-full object-contain opacity-[0.26]"
            style={{ filter: "blur(2.5px) brightness(1.05) saturate(0.9) contrast(0.9) sepia(0.12)" }}
          />
        </div>


        {/* Leaf 5: Left side, monstera leaf near top of Philosophy, around 28% of page height (Omitted if reduced) */}
        {!reduced && (
          <div
            className="page-bg-leaf absolute left-[-4%] top-[28%] w-[min(18vw,200px)] z-[2]"
            style={{ transform: "rotate(15deg) scaleX(-1)" }}
          >
            <img
              src="/hero_monstera_leaf.png"
              alt=""
              className="leaf-float-anim-2 w-full object-contain opacity-[0.22]"
              style={{ filter: "blur(3.5px) brightness(1.08) saturate(0.85) contrast(0.92) sepia(0.14)" }}
            />
          </div>
        )}


        {/* Leaf 2: Right side, near Philosophy Section, around 40% of page height */}
        <div
          className="page-bg-leaf absolute right-[-4%] top-[40%] w-[min(19vw,220px)] z-[2]"
          style={{ transform: "rotate(38deg) scaleX(-1)" }}
        >
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="leaf-float-anim-3 w-full object-contain opacity-[0.24]"
            style={{ filter: "blur(3px) brightness(1.1) saturate(0.85) contrast(0.95) sepia(0.15)" }}
          />
        </div>


        {/* Leaf 6: Right side, palm leaf near middle of Timeline, around 53% of page height (Omitted if reduced) */}
        {!reduced && (
          <div
            className="page-bg-leaf absolute right-[-5%] top-[53%] w-[min(20vw,230px)] z-[2]"
            style={{ transform: "rotate(-18deg)" }}
          >
            <img
              src="/hero_palm_leaf.png"
              alt=""
              className="leaf-float-anim-1 w-full object-contain opacity-[0.25]"
              style={{ filter: "blur(2.8px) brightness(1.05) saturate(0.9) contrast(0.9) sepia(0.12)" }}
            />
          </div>
        )}


        {/* Leaf 3: Left side, near Timeline Section, around 65% of page height (Omitted if reduced) */}
        {!reduced && (
          <div
            className="page-bg-leaf absolute left-[-5%] top-[65%] w-[min(21vw,240px)] z-[2]"
            style={{ transform: "rotate(-25deg) scaleY(-1)" }}
          >
            <img
              src="/hero_palm_leaf.png"
              alt=""
              className="leaf-float-anim-2 w-full object-contain opacity-[0.24]"
              style={{ filter: "blur(3px) brightness(1.05) saturate(0.9) contrast(0.9) sepia(0.12)" }}
            />
          </div>
        )}


        {/* Leaf 4: Right side, near CTA Section, around 85% of page height */}
        <div
          className="page-bg-leaf absolute right-[-4%] top-[85%] w-[min(17vw,190px)] z-[2]"
          style={{ transform: "rotate(20deg)" }}
        >
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="leaf-float-anim-3 w-full object-contain opacity-[0.28]"
            style={{ filter: "blur(2px) brightness(1.1) saturate(0.85) contrast(0.95) sepia(0.15)" }}
          />
        </div>

      </div>
    </div>
  );
}
