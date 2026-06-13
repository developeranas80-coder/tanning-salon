"use client";

import { useEffect } from "react";
import { destroyLenisScroll, initLenisScroll } from "./lib/scroll";

export default function SmoothScroll() {
  useEffect(() => {
    initLenisScroll();
    return () => destroyLenisScroll();
  }, []);

  return null;
}
