"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshLenisScroll } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function useLandingAnimations(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-animate").forEach((section, index) => {
        const label = section.querySelector(".section-label");
        const title = section.querySelector(".section-title");
        const body = section.querySelector(".section-body");
        const placeholder = section.querySelector(".section-placeholder");
        const visual = section.querySelector("[data-parallax='visual']");
        const cards = section.querySelectorAll(".section-card, .section-grid-item, .section-team-card");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (label) tl.from(label, { x: index % 2 === 0 ? -24 : 24, opacity: 0, duration: 0.9, ease: "power3.out" }, 0);
        if (title) tl.from(title, { y: 56, opacity: 0, duration: 1.1, ease: "power3.out" }, 0.08);
        if (body) tl.from(body, { y: 36, opacity: 0, duration: 1, ease: "power3.out" }, 0.18);
        if (placeholder) tl.from(placeholder, { opacity: 0, duration: 0.8 }, 0.28);

        if (visual) {
          gsap.from(visual, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            scale: 0.92,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          });

          gsap.to(visual, {
            yPercent: index % 2 === 0 ? -8 : 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          });
        }

        gsap.from(section.querySelector(".section-line-accent"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          scaleX: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      });

      gsap.to(".ambient-lighting", {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: true,
        },
      });
    });

    refreshLenisScroll();
    const t = setTimeout(refreshLenisScroll, 600);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [active]);
}
