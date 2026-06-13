"use client";

export default function AmbientLighting() {
  return (
    <div className="ambient-lighting pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      <div className="light-orb light-orb-1" />
      <div className="light-orb light-orb-2" />
      <div className="god-rays" />
      <div className="grain-overlay" />
    </div>
  );
}
