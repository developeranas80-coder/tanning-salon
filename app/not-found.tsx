"use client";

import Link from "next/link";
import InnerPageLayout from "./components/InnerPageLayout";
import InnerPageBanner from "./components/InnerPageBanner";
import AboutBackground from "./components/AboutBackground";

export default function NotFound() {
  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Sanctuary Lost"
        subtitle="The golden path you were seeking seems to have drifted away like sand."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "404 Not Found" },
        ]}
      />
      <div className="relative w-full overflow-hidden min-h-[50vh] flex flex-col items-center justify-center py-20">
        <AboutBackground reduced />
        
        <div className="relative z-10 text-center space-y-8 px-6">
          <span className="font-forum text-6xl text-[#b48b78] block tracking-widest animate-pulse">404</span>
          
          <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[240px] mx-auto">
            <div className="about-ornament-div-line flex-1" />
            <span className="about-ornament-div-glyph font-forum">✦</span>
            <div className="about-ornament-div-line flex-1" />
          </div>
          
          <p className="font-cormorant text-2xl italic text-[#5c4538]/85 max-w-[480px] mx-auto">
            The page you are looking for does not exist in our beachfront retreat.
          </p>
          
          <div className="pt-6">
            <Link href="/" className="btn-luxury inline-block px-14 py-5 text-[8px]">
              RETURN TO SANCTUARY
            </Link>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}
