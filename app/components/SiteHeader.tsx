"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "About", href: "/about", isRoute: true },
  { label: "Goal", href: "/goal", isRoute: true },
  { label: "Beds", href: "/beds", isRoute: true },
  { label: "Coffee", href: "/coffee", isRoute: true },
  { label: "Memberships", href: "/memberships", isRoute: true },
  { label: "Shop", href: "/shop", isRoute: true },
  { label: "Team", href: "/team", isRoute: true },
  { label: "Location", href: "/location", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

interface SiteHeaderProps {
  visible: boolean;
  headerRef?: React.RefObject<HTMLElement | null>;
}

export default function SiteHeader({ visible, headerRef }: SiteHeaderProps) {
  const internalRef = useRef<HTMLElement>(null);
  const activeRef = headerRef || internalRef;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!visible || !activeRef?.current) return;

    gsap.fromTo(
      activeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible, activeRef]);

  // Handle mobile body scroll locking
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  // Handle screen resize to close drawer if scaling up to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        ref={activeRef as React.Ref<HTMLElement>}
        className={`site-header glass-header fixed z-[60] ${scrolled ? "glass-header-scrolled" : ""
          } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="header-inner mx-auto flex items-center justify-between gap-3 px-5 py-3 md:gap-4 md:px-10 md:py-3.5">
          {/* Left Desktop Nav */}
          <nav className="hidden flex-1 items-center gap-4 md:flex lg:gap-6">
            {NAV.slice(0, 5).map((item) => {
              const href = item.isRoute ? item.href : (isHome ? item.href : `/${item.href}`);
              return (
                <Link key={item.href} href={href} className="nav-link whitespace-nowrap">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Centered Clickable Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="header-logo-slot relative flex flex-col items-start text-left md:items-center md:text-center cursor-pointer transition-opacity duration-300 hover:opacity-85 md:static md:flex-1 w-auto"
          >
            <span className="font-display text-[11px] sm:text-[13px] tracking-[0.14em] text-[#B48B78] leading-none">
              LIFE'S A BEACH
            </span>
            <span className="font-forum text-[6px] sm:text-[7px] tracking-[0.38em] text-[#B48B78]/70 mt-1 leading-none">
              LUXURY TANNING SALON
            </span>
          </Link>

          {/* Right Desktop Nav */}
          <nav className="hidden flex-1 items-center justify-end gap-3 md:gap-4 lg:gap-6 md:flex">
            {NAV.slice(5).map((item) => {
              const href = item.isRoute ? item.href : (isHome ? item.href : `/${item.href}`);
              return (
                <Link key={item.href} href={href} className="nav-link whitespace-nowrap">
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury ml-2 px-3.5 py-1.5 text-[7px] lg:ml-4 lg:px-4 lg:py-2 lg:text-[8px] tracking-[0.2em] font-semibold whitespace-nowrap"
            >
              Reserve / Sign Up
            </a>
          </nav>

          {/* Mobile Book Button */}
          <a
            href="https://book.activesaloncloud.com/lifesabeach/login?returnUrl=%2Flifesabeach"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-luxury ml-auto px-4 py-1.5 text-[9px] md:hidden"
          >
            Reserve
          </a>

          {/* Mobile Burger Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`menu-btn flex flex-col gap-1.5 md:hidden z-[70] ${menuOpen ? "menu-active" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-line transition-all duration-300" />
            <span className="menu-line menu-line-short transition-all duration-300" />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu-drawer fixed inset-0 z-50 flex flex-col justify-between overflow-hidden backdrop-blur-xl px-8 py-24 transition-all duration-500 ease-in-out md:hidden ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        {/* Soft elegant warm light orb behind menu */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full pointer-events-none opacity-20 filter blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(180, 139, 120, 0.45) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-10 filter blur-[60px]"
          style={{ background: "radial-gradient(circle, rgba(227, 201, 172, 0.3) 0%, transparent 70%)" }}
          aria-hidden
        />

        {/* Blurred Leaf Decorations (from footer) */}
        {/* Palm Leaf — left side */}
        <div className="footer-leaf footer-leaf-left pointer-events-none absolute select-none" aria-hidden>
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="footer-leaf-img"
            style={{ filter: "blur(8px) brightness(0.55) saturate(0.7)", opacity: 0.45 }}
          />
        </div>

        {/* Monstera Leaf — right side */}
        <div className="footer-leaf footer-leaf-right pointer-events-none absolute select-none" aria-hidden>
          <img
            src="/hero_monstera_leaf.png"
            alt=""
            className="footer-leaf-img"
            style={{ filter: "blur(10px) brightness(0.5) saturate(0.65)", opacity: 0.38 }}
          />
        </div>

        {/* Palm Leaf small — top center bleed */}
        <div className="footer-leaf footer-leaf-top pointer-events-none absolute select-none" aria-hidden>
          <img
            src="/hero_palm_leaf.png"
            alt=""
            className="footer-leaf-img"
            style={{ filter: "blur(14px) brightness(0.45) saturate(0.5)", opacity: 0.22, transform: "rotate(120deg) scaleX(-1)" }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-6 text-center">
          {/* Accent Ornament */}
          <div className="flex items-center justify-center gap-3 opacity-50 mb-3" aria-hidden>
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#e8d5c4]/40" />
            <span className="font-forum text-[8px] text-[#e8d5c4] tracking-widest">✦</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#e8d5c4]/40" />
          </div>

          {NAV.map((item, idx) => {
            const href = item.isRoute ? item.href : (isHome ? item.href : `/${item.href}`);
            return (
              <Link
                key={item.href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`font-display text-lg tracking-[0.12em] text-[#FCF9F6]/90 transition-all hover:text-[#B48B78] active:scale-95 duration-300 block py-1.5 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Brand Copyright */}
        <div className="text-center opacity-30 mt-6 border-t border-white/5 pt-6 flex flex-col items-center">
          <span className="font-display text-[8px] tracking-[0.2em] text-[#B48B78] mb-1">
            LIFE'S A BEACH
          </span>
          <p className="font-sans-premium text-[5.5px] tracking-[0.3em] text-[#FCF9F6]/80">
            © 2026 — ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  );
}
