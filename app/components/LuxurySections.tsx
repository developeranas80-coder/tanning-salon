"use client";

const BEDS = [
  {
    name: "The Onyx Elite",
    desc: "Maximum intensity for the seasoned tanner seeking a deep, even bronze.",
    tag: "Level IV",
  },
  {
    name: "Sand & Sea",
    desc: "Gentle build-up with refreshing cooling mist and aromatherapy.",
    tag: "Level II",
  },
  {
    name: "Golden Hour",
    desc: "The perfect balance of glow, warmth, and post-tan relaxation.",
    tag: "Level III",
  },
];

const PRODUCTS = [
  { name: "Bronzing Silk No.1", price: "$45" },
  { name: "Golden Mist Serum", price: "$52" },
  { name: "After-Glow Oil", price: "$38" },
  { name: "Coastal Glow Lotion", price: "$45" },
];

export default function LuxurySections() {
  return (
    <>
      <section id="about-us" className="section-luxury relative py-28 md:py-36">
        <div className="section-glow section-glow-right" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-24">
          <div className="reveal-up relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src="/hero-salon.png" alt="Salon interior" className="h-full w-full object-cover" />
            <div className="image-shine absolute inset-0" />
          </div>
          <div className="reveal-up space-y-8">
            <span className="section-label">Our Sanctuary</span>
            <h2 className="section-title">
              Where Sun-Kissed
              <br />
              Meets Serenity
            </h2>
            <p className="font-cormorant text-lg italic leading-relaxed text-[#5c4538]/85 md:text-xl">
              Step into an architectural haven of warm arches, soft light, and bespoke tanning
              rituals. Every detail is designed for your glow.
            </p>
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { n: "6", l: "Premium Beds" },
                { n: "100%", l: "Private Suites" },
                { n: "5★", l: "Guest Experience" },
              ].map((stat) => (
                <div key={stat.l}>
                  <p className="font-display text-4xl text-[#B48B78]">{stat.n}</p>
                  <p className="font-sans-premium mt-1 text-[7px] tracking-[0.35em] text-[#B48B78]/60">
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="our-beds" className="section-luxury section-dark relative py-28 md:py-36">
        <div className="section-glow section-glow-left" />
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="reveal-up mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="section-label text-[#E3C9AC]/80">The Collection</span>
              <h2 className="section-title text-[#FCF9F6]">
                State of the Art
                <br />
                Tanning Beds
              </h2>
            </div>
            <p className="max-w-md font-cormorant text-lg italic text-[#E3C9AC]/70">
              Experience the pinnacle of UV technology in a private, climate-controlled sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {BEDS.map((bed) => (
              <article key={bed.name} className="luxury-card group">
                <div className="card-image-wrap relative mb-6 aspect-[3/4] overflow-hidden rounded-sm bg-[#2a1f18]">
                  <img
                    src="/hero-salon.png"
                    alt={bed.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="card-image-overlay absolute inset-0" />
                  <span className="card-tag font-forum">{bed.tag}</span>
                  <div className="card-hover-cta">
                    <span className="font-forum text-[8px] tracking-[0.35em] text-white">RESERVE</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-[#E3C9AC]">{bed.name}</h3>
                <p className="mt-2 font-cormorant text-sm italic text-[#E3C9AC]/60">{bed.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="coffee-station" className="section-luxury relative overflow-hidden py-28 md:py-36">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-16 px-6 md:px-12 lg:flex-row lg:gap-24">
          <div className="reveal-up relative w-full lg:w-1/2">
            <div className="coffee-image-ring relative mx-auto aspect-square max-w-md overflow-hidden rounded-full border-[12px] border-white/80 shadow-2xl">
              <img src="/enter-bg.png" alt="Coffee station" className="h-full w-full object-cover" />
            </div>
            <div className="coffee-badge absolute -bottom-6 -right-4 hidden h-52 w-52 flex-col items-center justify-center rounded-full bg-[#B48B78] text-center text-white shadow-xl md:flex">
              <span className="font-cursive text-4xl">Signature</span>
              <span className="font-forum mt-1 text-[8px] tracking-[0.25em]">ESPRESSO BLEND</span>
            </div>
          </div>
          <div className="reveal-up w-full space-y-8 lg:w-1/2">
            <span className="section-label">The Ritual</span>
            <h2 className="section-title">
              Pre-Tan
              <br />
              Refreshment
            </h2>
            <p className="font-cormorant text-lg italic leading-relaxed text-[#5c4538]/85 md:text-xl">
              Elevate your experience with our artisanal coffee bar.
            </p>
            <button type="button" className="btn-luxury-outline px-10 py-4 text-[9px]">
              VIEW MENU
            </button>
          </div>
        </div>
      </section>

      <section id="shop" className="section-luxury relative py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="reveal-up mb-16 text-center">
            <span className="section-label">Essentials</span>
            <h2 className="section-title">The Glow Shop</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="luxury-card group text-center">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-sm bg-[#F5EDE6]">
                  <img
                    src="/enter-bg.png"
                    alt={p.name}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                  <button type="button" className="shop-add-btn font-forum">
                    ADD TO CART
                  </button>
                </div>
                <h3 className="font-display text-lg text-[#B48B78] md:text-xl">{p.name}</h3>
                <p className="font-sans-premium mt-1 text-[7px] text-[#B48B78]/50">{p.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="footer-luxury relative py-24 md:py-28">
        <div className="footer-glow" />
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
            <div className="reveal-up md:col-span-2">
              <h2 className="font-display text-4xl text-[#FCF9F6]">Life&apos;s A Beach</h2>
              <p className="mt-6 max-w-md font-cormorant text-lg italic text-[#FCF9F6]/75">
                Bringing the warmth of the sun and the luxury of a private sanctuary to your daily
                routine.
              </p>
              <div className="mt-8 flex gap-8">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/lifes.abeachtanning?igsh=d2ZsbGVja2tjcXM0" },
                  { name: "Facebook", href: "#" },
                  { name: "TikTok", href: "#" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.href !== "#" ? "_blank" : undefined}
                    rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                    className="footer-social font-sans-premium"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="reveal-up">
              <span className="footer-heading font-forum">Location</span>
              <p className="mt-4 font-cormorant text-lg italic text-[#FCF9F6]/80">
                Unit 3, South Drum Retail Park
                <br />
                Bo'ness, EH51 9FD
              </p>
            </div>
            <div className="reveal-up">
              <span className="footer-heading font-forum">Hours</span>
              <p className="mt-4 font-cormorant text-lg italic text-[#FCF9F6]/80">
                Monday — Sunday
                <br />
                9:00 AM — 9:00 PM
              </p>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="font-sans-premium text-[7px] text-[#FCF9F6]/35">
              © 2026 LIFE&apos;S A BEACH. ALL RIGHTS RESERVED.
            </p>
            <p className="font-sans-premium text-[7px] tracking-[0.2em] text-[#FCF9F6]/35">
              PRIVACY — TERMS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
