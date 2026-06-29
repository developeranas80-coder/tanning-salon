"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";
import Link from "next/link";
import TestimonialSection from "../components/TestimonialSection";
import InnerPageCta from "../components/InnerPageCta";
import PerfectTanSection from "../components/PerfectTanSection";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  // ─── Tanning Cream Bottles (200ml / 6.76 fl oz) — £29.99 each ───
  {
    name: "Peach Tanning Cream",
    category: "Tanning Cream",
    price: "£29.99",
    image: "/peach-cream.png",
    description: "A premium, non-sticky tanning accelerator cream infused with sweet peach extracts. Helps speed up the skin's melanin production for a deep, natural, and long-lasting golden tan.",
    size: "200ml / 6.76 fl. oz",
    ingredients: "L-Tyrosine, Beta-Carotene, Peach Fruit Extract, Aloe Vera Leaf Juice, Shea Butter, Coconut Oil, Carrot Seed Oil, Vitamin E, Panthenol (Vitamin B5), Glycerin, Mica.",
  },
  {
    name: "Mango Tanning Cream",
    category: "Tanning Cream",
    price: "£29.99",
    image: "/mango-cream.png",
    description: "Formulated with tropical mango butter and skin-nourishing vitamins. This non-greasy accelerator deeply hydrates and leaves your skin feeling silky smooth and smelling like paradise.",
    size: "200ml / 6.76 fl. oz",
    ingredients: "L-Tyrosine, Mango Butter, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Jojoba Oil, Carrot Seed Oil, Vitamin E, Panthenol (Vitamin B5), Glycerin, Mica.",
  },
  {
    name: "Strawberry Tanning Cream",
    category: "Tanning Cream",
    price: "£29.99",
    image: "/strawberry-cream.png",
    description: "A delicious strawberry-infused tanning accelerator cream. Perfect for sunbeds and natural sunlight, this blend locks in moisture while maximizing your bronzing potential.",
    size: "200ml / 6.76 fl. oz",
    ingredients: "L-Tyrosine, Strawberry Fruit Extract, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Coconut Oil, Carrot Seed Oil, Vitamin E, Panthenol (Vitamin B5), Glycerin, Mica.",
  },
  {
    name: "Coconut & Vanilla Tanning Cream",
    category: "Tanning Cream",
    price: "£29.99",
    image: "/coconut-cream.png",
    description: "Our classic beach blend of rich coconut oil and warm vanilla bean extracts. Intensely moisturizing to keep your tan glowing and skin ageless.",
    size: "200ml / 6.76 fl. oz",
    ingredients: "L-Tyrosine, Coconut Oil, Vanilla Planifolia Fruit Extract, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Jojoba Oil, Vitamin E, Panthenol (Vitamin B5), Glycerin, Mica.",
  },

  // ─── Cream Sachets (15ml / 0.5 fl oz) — £4.00 each ───
  {
    name: "Strawberry Cream Sachet",
    category: "Cream Sachet",
    price: "£4.00",
    image: "/background_black_kardo_2K_202606111031.png",
    description: "Single-use travel-sized strawberry tanning accelerator. Provides a quick blast of intense hydration and tanning boosters before your UV or outdoor session.",
    size: "15ml / 0.5 fl. oz",
    ingredients: "L-Tyrosine, Strawberry Fruit Extract, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Coconut Oil, Carrot Seed Oil, Vitamin E, Glycerin, Mica.",
  },
  {
    name: "Mango Cream Sachet",
    category: "Cream Sachet",
    price: "£4.00",
    image: "/background_black_kardo_2K_202606111031 (1).png",
    description: "Single-use travel-sized mango tanning accelerator. Enriched with tropical fruit extracts to nourish the skin barrier and prepare it for maximum tan retention.",
    size: "15ml / 0.5 fl. oz",
    ingredients: "L-Tyrosine, Mango Butter, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Jojoba Oil, Carrot Seed Oil, Vitamin E, Glycerin, Mica.",
  },
  {
    name: "Peach Cream Sachet",
    category: "Cream Sachet",
    price: "£4.00",
    image: "/background_black_kardo_2K_202606111031 (2).png",
    description: "Single-use travel-sized peach tanning accelerator. Boosts natural melanin production and keeps skin moisturized for a beautifully smooth tan.",
    size: "15ml / 0.5 fl. oz",
    ingredients: "L-Tyrosine, Beta-Carotene, Peach Fruit Extract, Aloe Vera Leaf Juice, Shea Butter, Coconut Oil, Carrot Seed Oil, Vitamin E, Glycerin, Mica.",
  },
  {
    name: "Coconut Vanilla Cream Sachet",
    category: "Cream Sachet",
    price: "£4.00",
    image: "/background_black_kardo_2K_202606111031 (3).png",
    description: "Single-use travel-sized coconut & vanilla tanning accelerator. Deeply hydrates with natural oils to prevent dry skin during UV light sessions.",
    size: "15ml / 0.5 fl. oz",
    ingredients: "L-Tyrosine, Coconut Oil, Vanilla Planifolia Fruit Extract, Beta-Carotene, Aloe Vera Leaf Juice, Shea Butter, Jojoba Oil, Vitamin E, Glycerin, Mica.",
  },

  // ─── Tanning Salt Sprays (120ml / 4.0 fl oz) — £19.99 each ───
  {
    name: "Sol De Janeiro Salt Spray",
    category: "Tanning Salt Spray",
    price: "£19.99",
    image: "/In_sarey_prodycts_ko_spray_202606111005 (2).png",
    description: "A lightweight, quick-drying formula inspired by the warm, sun-kissed beaches of Rio. Infused with sea salt and hydrating panthenol to refresh your skin while tanning.",
    size: "120ml / 4.0 fl. oz",
    ingredients: "Sea Salt, Magnesium Sulfate, Glycerin, Panthenol (Vitamin B5), Aloe Vera Leaf Juice, PEG-40 Hydrogenated Castor Oil, Fragrance Oil, Allantoin, Cocoa Butter.",
  },
  {
    name: "Cherry Salt Spray",
    category: "Tanning Salt Spray",
    price: "£19.99",
    image: "/In_sarey_prodycts_ko_spray_202606111005 (3).png",
    description: "Enhance your tanning routine with a refreshing mist of cherry sea-salt. Lightweight and quick-drying, it keeps your skin feeling soft, hydrated, and deliciously scented.",
    size: "120ml / 4.0 fl. oz",
    ingredients: "Sea Salt, Magnesium Sulfate, Glycerin, Panthenol (Vitamin B5), Aloe Vera Leaf Juice, PEG-40 Hydrogenated Castor Oil, Cherry Extract, Fragrance Oil, Allantoin, Cocoa Butter.",
  },
  {
    name: "Vanilla & Coconut Salt Spray",
    category: "Tanning Salt Spray",
    price: "£19.99",
    image: "/In_sarey_prodycts_ko_spray_202606111005 (1).png",
    description: "A warm, comforting blend of vanilla and sweet coconut. Specially formulated with natural sea salts to condition skin and build an exquisite, rich beach glow.",
    size: "120ml / 4.0 fl. oz",
    ingredients: "Sea Salt, Magnesium Sulfate, Glycerin, Panthenol (Vitamin B5), Aloe Vera Leaf Juice, PEG-40 Hydrogenated Castor Oil, Coconut Extract, Fragrance Oil, Allantoin, Cocoa Butter.",
  },
  {
    name: "Baccarat Rouge Salt Spray",
    category: "Tanning Salt Spray",
    price: "£19.99",
    image: "/In_sarey_prodycts_ko_spray_202606111005 (4).png",
    description: "A luxurious, scent-inspired tanning salt spray. Delivers skin-soothing hydration and lightweight conditioning with an opulent, high-end amber-floral trail.",
    size: "120ml / 4.0 fl. oz",
    ingredients: "Sea Salt, Magnesium Sulfate, Glycerin, Panthenol (Vitamin B5), Aloe Vera Leaf Juice, PEG-40 Hydrogenated Castor Oil, Fragrance Oil, Allantoin, Cocoa Butter.",
  },
];

export default function ShopPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = (prod: typeof PRODUCTS[0]) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveProduct(prod);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveProduct(null);
      closeTimeoutRef.current = null;
    }, 500); // Wait for transition duration (500ms) to complete
  };

  useEffect(() => {
    if (activeProduct && !isModalOpen) {
      // Trigger opening animation in the next frame to guarantee the browser registers the initial state
      const raf = requestAnimationFrame(() => {
        setIsModalOpen(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [activeProduct, isModalOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.utils.toArray<HTMLElement>(".shop-reveal").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      // Stagger product cards
      gsap.utils.toArray<HTMLElement>(".shop-card").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.95,
          delay: (idx % 2) * 0.15,
          ease: "power3.out"
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="The Shop"
        subtitle="Ageless skincare and high-performance bronzers, hand-selected to elevate your golden complexion."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "The Shop" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground reduced />

        {/* Perfect Tan Product Guide Intro Section */}
        <PerfectTanSection />

        {/* ─── Product Catalog Grid ─── */}
        <section id="product-catalog" className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-right pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="shop-reveal mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Ageless Skincare</span>
              </div>
              <h2 className="about-page-headline">
                Formulated for an Exquisite,
                <br />
                <em>Sun-Kissed Silk Complexion</em>
              </h2>
              <div className="about-ornament-divider flex items-center justify-center gap-4 max-w-[360px] mx-auto mb-6">
                <div className="about-ornament-div-line flex-1" />
                <span className="about-ornament-div-glyph font-forum">✦</span>
                <div className="about-ornament-div-line flex-1" />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14">
              {PRODUCTS.map((prod) => {
                const isFirstSpray = prod.category === "Tanning Salt Spray" && !PRODUCTS.slice(0, PRODUCTS.indexOf(prod)).some(p => p.category === "Tanning Salt Spray");
                return (
                  <div
                    key={prod.name}
                    id={isFirstSpray ? "tanning-sprays-section" : undefined}
                    className="shop-card about-value-card group cursor-pointer"
                    onClick={() => openModal(prod)}
                  >
                    {/* Image Wrap */}
                    <div className="relative aspect-[16/10] w-full rounded-sm bg-[#faf6f0]/40 border border-[#b48b78]/10 p-8 flex items-center justify-center mb-6 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-[180px] w-auto object-contain transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="about-story-img-shine absolute inset-0 pointer-events-none" />
                    </div>

                    <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="about-value-title font-display text-lg text-[#3d2b1f] mb-3 leading-tight">
                      {prod.name}
                    </h3>

                    {/* Embedded Product Description */}
                    <p className="font-cormorant text-[1.1rem] leading-relaxed text-[#5c4538]/85 italic mb-6">
                      {prod.description}
                    </p>

                    <div className="about-ornament-divider flex items-center gap-2 mb-6 opacity-30">
                      <div className="about-ornament-div-line flex-1" />
                      <span className="about-ornament-div-glyph font-forum">✦</span>
                      <div className="about-ornament-div-line flex-1" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-display text-lg font-bold text-[#3d2b1f]">{prod.price}</span>
                      <button className="text-[7px] tracking-[0.2em] font-sans-premium border-b border-[#b48b78]/30 pb-0.5 text-[#5c4538] hover:text-[#2a1f18] hover:border-[#2a1f18] transition-colors">
                        VIEW DETAILS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Product Modal (Pure CSS/React overlay with exit animations) ─── */}
        {activeProduct && (
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#19120e]/80 backdrop-blur-md px-6 py-10 transition-all duration-500 ease-in-out cursor-pointer ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            onClick={closeModal}
          >
            <div
              className={`relative w-full max-w-[780px] bg-white border border-[#b48b78]/25 rounded-lg p-10 md:p-14 shadow-2xl flex flex-col md:flex-row gap-10 md:gap-14 items-center cursor-default transition-all duration-500 ${isModalOpen ? "scale-100 rotate-0 opacity-100 blur-0" : "scale-[0.85] -rotate-1 opacity-0 blur-[4px]"
                }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking on card details
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 font-forum text-[9px] tracking-widest text-[#3d2b1f] hover:text-[#b48b78] transition-colors"
              >
                CLOSE [✕]
              </button>

              {/* Left Product Image */}
              <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] flex items-center justify-center p-6 bg-[#faf6f0] border border-[#b48b78]/10 rounded-md flex-shrink-0">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="h-[160px] md:h-[200px] w-auto object-contain"
                />
              </div>

              {/* Right Product Details */}
              <div className="flex-1 space-y-5">
                <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78]">
                  {activeProduct.category}
                </span>
                <h3 className="font-display text-2xl text-[#3d2b1f] tracking-wide">
                  {activeProduct.name}
                </h3>

                <div className="about-ornament-divider flex items-center gap-2 opacity-30">
                  <div className="about-ornament-div-line flex-1" />
                  <span className="about-ornament-div-glyph font-forum">✦</span>
                  <div className="about-ornament-div-line flex-1" />
                </div>

                <p className="font-cormorant text-[1.12rem] italic text-[#5c4538]/85 leading-relaxed">
                  {activeProduct.description}
                </p>
                <div className="flex items-center justify-between border-t border-b border-[#b48b78]/15 py-4">
                  <span className="font-forum text-xs text-[#b48b78]/80">{activeProduct.size}</span>
                  <span className="font-display text-lg text-[#3d2b1f]">{activeProduct.price}</span>
                </div>
                {activeProduct.ingredients && (
                  <div className="pt-2 pb-2">
                    <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] block mb-2">
                      KEY INGREDIENTS
                    </span>
                    <p className="font-sans text-[11px] text-[#5c4538]/80 leading-relaxed font-sans-readable">
                      {activeProduct.ingredients}
                    </p>
                  </div>
                )}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    onClick={closeModal}
                    className="btn-luxury block w-full text-center py-4 text-[7px]"
                  >
                    PURCHASE IN SALON
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Testimonials Section ─── */}
        <TestimonialSection />

        {/* ─── Shop Guarantee CTA ─── */}
        <InnerPageCta
          title={<>Hand-Crafted Serums<br /><em>For Gold Protection</em></>}
          subtitle="All formulations are dermatologist tested, organic, and exclusive to our beachfront boutique."
          buttonText="VISIT THE BOUTIQUE"
          buttonHref="/contact"
        />
      </div>
    </InnerPageLayout>
  );
}
