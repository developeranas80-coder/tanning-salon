"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshLenisScroll } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export function useLuxuryScroll(entered: boolean, salonEntered: boolean) {
  useEffect(() => {
    if (!entered) return;

    const ctx = gsap.context(() => {
      if (salonEntered) {
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            y: 70,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",
          });
        });

        gsap.utils.toArray<HTMLElement>(".luxury-card").forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1.1,
            delay: i * 0.08,
            ease: "power3.out",
          });
        });
      }
    });

    refreshLenisScroll();

    return () => ctx.revert();
  }, [entered, salonEntered]);
}
