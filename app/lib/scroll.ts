import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export function initLenisScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.addEventListener("refresh", () => lenis?.resize());

  const ticker = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function refreshLenisScroll() {
  lenis?.resize();
  ScrollTrigger.refresh(true);
}

export function scrollToTop(immediate = true) {
  lenis?.scrollTo(0, { immediate });
}

export function destroyLenisScroll() {
  lenis?.destroy();
  lenis = null;
}
