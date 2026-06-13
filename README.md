# Life's a Beach — Luxury Tanning Salon

A premium website concept built with Next.js, Three.js, GSAP, and Lenis.

## ✨ Features

- **Cinematic Enter Page**: Immersive entrance with a 3D rotating logo and ambient glow.
- **3D Logo Monogram**: Custom-built Three.js component featuring a golden ring and "LB" monogram.
- **Smooth Scrolling**: Powered by Lenis for an ultra-premium feel.
- **Luxury Aesthetic**: Curated color palette (Cream, Brandy Rose, Sand Beige) with elegant typography.
- **GSAP Animations**: Fluid transitions and scroll-linked interactions.
- **Responsive Design**: Fully optimized for mobile and desktop viewing.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Animations**: [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `app/`: Next.js App Router files.
  - `page.tsx`: Main page combining Enter and Landing experiences.
  - `Logo3D.tsx`: Three.js 3D logo component.
  - `SmoothScroll.tsx`: Lenis initialization.
  - `globals.css`: Luxury design system and custom animations.
  - `layout.tsx`: Root layout with font configuration.
