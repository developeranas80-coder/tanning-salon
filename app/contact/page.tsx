"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InnerPageLayout from "../components/InnerPageLayout";
import InnerPageBanner from "../components/InnerPageBanner";
import AboutBackground from "../components/AboutBackground";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((item) => {
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
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
  };

  return (
    <InnerPageLayout>
      <InnerPageBanner
        title="Contact Us"
        subtitle="Reach out to Jenna Baillie or find our beachfront sanctuary location details."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <div ref={contentRef} className="relative w-full overflow-hidden">
        <AboutBackground reduced />

        {/* ─── Contact Form & Location Section ─── */}
        <section className="about-page-section relative overflow-hidden py-20">
          <div className="about-section-glow about-section-glow-left pointer-events-none absolute" aria-hidden />
          <div className="grain-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

          <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-20">
            {/* Left side: Message Form */}
            <div className="contact-reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="about-section-index font-forum">01</span>
                <div className="about-section-index-line" />
                <span className="section-label mb-0">Send a Message</span>
              </div>
              <h2 className="about-page-headline mb-8">
                Get in Touch
                <br />
                <em>With Jenna</em>
              </h2>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label className="font-forum text-[8px] tracking-widest text-[#b48b78] uppercase block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alexander Mercer"
                      className="w-full bg-[#faf6f0]/40 border border-[#b48b78]/20 focus:border-[#b48b78] outline-none rounded-sm px-5 py-3.5 font-cormorant text-md text-[#3d2b1f] placeholder:text-[#3d2b1f]/35 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="font-forum text-[8px] tracking-widest text-[#b48b78] uppercase block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full bg-[#faf6f0]/40 border border-[#b48b78]/20 focus:border-[#b48b78] outline-none rounded-sm px-5 py-3.5 font-cormorant text-md text-[#3d2b1f] placeholder:text-[#3d2b1f]/35 transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="font-forum text-[8px] tracking-widest text-[#b48b78] uppercase block mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full bg-[#faf6f0]/40 border border-[#b48b78]/20 focus:border-[#b48b78] outline-none rounded-sm px-5 py-3.5 font-cormorant text-md text-[#3d2b1f] placeholder:text-[#3d2b1f]/35 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-luxury w-full py-4 text-[8px]">
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              ) : (
                <div className="about-value-card p-10 text-center space-y-6">
                  <span className="text-[#b48b78] font-forum text-lg block">✦ MESSAGE SENT ✦</span>
                  <h3 className="font-display text-xl text-[#3d2b1f]">Thank You, {name}</h3>
                  <p className="font-cormorant text-[1.12rem] text-[#5c4538]/85 italic">
                    Your message has been received! We will get back to you shortly at <strong>{email}</strong>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="btn-luxury px-10 py-4 text-[7px]"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Contact Details, Hours */}
            <div id="location" className="contact-reveal space-y-12">
              {/* Salon info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="about-section-index font-forum">02</span>
                  <div className="about-section-index-line" />
                  <span className="section-label mb-0">Our Sanctuary</span>
                </div>
                <h3 className="font-display text-xl text-[#3d2b1f] tracking-wide mb-6">
                  Beachfront Sanctuary
                </h3>
                <p className="font-cormorant text-[1.15rem] leading-relaxed text-[#5c4538]/85 italic mb-6">
                  Experience timeless coastal serenity. Located right on the waterfront, our flagship salon captures natural ocean air to combine with your indoor tanning ritual.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">ADDRESS</span>
                      <span className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium font-sans-readable">
                        Unit 3, South Drum Retail Park, Bo'ness, EH51 9FD
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">EMAIL</span>
                      <a href="mailto:Jenna.baillie@lifesabeachtanning.co.uk" className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium hover:text-[#b48b78] transition-colors block font-sans-readable break-all">
                        Jenna.baillie@lifesabeachtanning.co.uk
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#b48b78] font-forum text-[10px] mt-1">✦</span>
                    <div>
                      <span className="font-sans-premium text-[6px] tracking-widest text-[#b48b78] block">PHONE</span>
                      <a href="tel:07908046370" className="text-[14px] tracking-wide text-[#3d2b1f]/90 font-medium hover:text-[#b48b78] transition-colors block font-sans-readable">
                        07908046370
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="about-value-card p-8">
                <span className="font-sans-premium text-[7px] tracking-[0.2em] text-[#b48b78] block mb-3">
                  OPERATING HOURS
                </span>
                <div className="space-y-3 font-cormorant text-md text-[#5c4538]/85">
                  <div className="flex justify-between border-b border-[#b48b78]/10 pb-1.5">
                    <span>Monday — Sunday</span>
                    <span className="font-semibold text-[#3d2b1f]">9:00 AM — 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </InnerPageLayout>
  );
}
