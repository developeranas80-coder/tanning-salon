"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import AmbientLighting from "./components/AmbientLighting";
import EnterScreen from "./components/EnterScreen";
import SiteHeader from "./components/SiteHeader";
import LandingHero from "./components/LandingHero";
import SiteSections from "./components/SiteSections";
import PageBackground from "./components/PageBackground";
import { useLandingAnimations } from "./hooks/useLandingAnimations";
import { refreshLenisScroll, scrollToTop } from "./lib/scroll";
import { getHasEnteredSite, setHasEnteredSite } from "./lib/navigationState";

export default function App() {
  const [entered, setEntered] = useState(getHasEnteredSite());
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useLandingAnimations(entered);

  useEffect(() => {
    if (!entered) return;
    const t1 = requestAnimationFrame(() => refreshLenisScroll());
    const t2 = setTimeout(refreshLenisScroll, 400);
    const t3 = setTimeout(refreshLenisScroll, 1200);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [entered]);

  const handleEnter = useCallback(() => {
    setHasEnteredSite(true);
    setEntered(true);
    scrollToTop(true);
    requestAnimationFrame(() => {
      refreshLenisScroll();
      setTimeout(refreshLenisScroll, 600);
    });
  }, []);

  return (
    <main className="site-root relative min-h-screen overflow-x-hidden bg-transparent text-[#3d2b1f] selection:bg-[#B48B78] selection:text-white">
      {!entered && <EnterScreen onEnter={handleEnter} />}

      {entered && (
        <>
          <AmbientLighting />
          <SiteHeader headerRef={headerRef} visible />
          <div className="site-content relative">
            <PageBackground />
            <LandingHero active heroRef={heroRef} />
            <SiteSections />
          </div>
        </>
      )}
    </main>
  );
}
