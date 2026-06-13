"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LogoVideo3DProps {
  src: string;
  rotating?: boolean;
  scrollDriven?: boolean;
}

/** Median of small sorted array slice (odd length). */
function medianChannel(values: number[]): number {
  if (values.length === 0) return 0;
  values.sort((a, b) => a - b);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 ? values[mid] : Math.round((values[mid - 1] + values[mid]) / 2);
}

/**
 * Estimate flat background from border pixels (typical for "remove background" exports).
 */
function estimateBorderBackground(
  d: Uint8ClampedArray,
  w: number,
  h: number
): { r: number; g: number; b: number } {
  const border = Math.max(4, Math.min(w, h) >> 4);
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < border || x >= w - border || y < border || y >= h - border) {
        const i = (y * w + x) * 4;
        rs.push(d[i]);
        gs.push(d[i + 1]);
        bs.push(d[i + 2]);
      }
    }
  }

  return {
    r: medianChannel(rs),
    g: medianChannel(gs),
    b: medianChannel(bs),
  };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Soft key: distance from sampled bg + near-black cleanup. Preserves gold highlights.
 */
function applyBackgroundKey(
  d: Uint8ClampedArray,
  w: number,
  h: number,
  bg: { r: number; g: number; b: number }
): void {
  const inner = 18;
  const outer = 62;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const origA = d[i + 3] / 255;

    const dr = r - bg.r;
    const dg = g - bg.g;
    const db = b - bg.b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    let a = smoothstep(inner, outer, dist);

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum < 14) {
      a *= smoothstep(4, 18, lum);
    }

    a *= origA;
    d[i + 3] = Math.round(Math.max(0, Math.min(255, a * 255)));
  }
}

export default function LogoVideo3D({
  src,
  rotating = false,
  scrollDriven = false,
}: LogoVideo3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const bgRef = useRef<{ r: number; g: number; b: number } | null>(null);

  useEffect(() => {
    bgRef.current = null;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) return;

    let active = true;
    let scrollTrigger: ScrollTrigger | null = null;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = encodeURI(src);
    video.loop = !scrollDriven;

    const paint = () => {
      if (!active) return;
      if (video.readyState >= 2 && video.videoWidth > 0) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (canvas.width !== vw || canvas.height !== vh) {
          canvas.width = vw;
          canvas.height = vh;
          bgRef.current = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, vw, vh);

        const imgData = ctx.getImageData(0, 0, vw, vh);
        const d = imgData.data;

        if (!bgRef.current) {
          bgRef.current = estimateBorderBackground(d, vw, vh);
        }
        applyBackgroundKey(d, vw, vh, bgRef.current);

        ctx.putImageData(imgData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(paint);
    };

    const onReady = () => {
      if (!active) return;
      paint();

      if (scrollDriven) {
        video.pause();
        scrollTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
        ScrollTrigger.refresh();
        return;
      }

      if (rotating) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener("loadeddata", onReady, { once: true });
    }
    video.load();

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      scrollTrigger?.kill();
      video.removeEventListener("loadeddata", onReady);
      video.pause();
    };
  }, [src, rotating, scrollDriven]);

  return (
    <div className="logo-video-3d h-full w-full">
      <video ref={videoRef} className="hidden" aria-hidden playsInline muted />
      <canvas ref={canvasRef} className="logo-video-3d__canvas" aria-hidden />
    </div>
  );
}
