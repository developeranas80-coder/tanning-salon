export function processLogoImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Only use crossOrigin anonymous for remote assets to avoid same-origin local CORS restrictions
    const isLocal = src.startsWith("/") || 
                    (typeof window !== "undefined" && 
                     (src.startsWith(window.location.origin) || 
                      src.startsWith("http://localhost") || 
                      src.startsWith("http://127.0.0.1")));
    if (!isLocal) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      let minX = w;
      let minY = h;
      let maxX = 0;
      let maxY = 0;

      // Sample border pixels to detect if background is white or black
      const samples = [
        [0, 0],
        [w - 1, 0],
        [0, h - 1],
        [w - 1, h - 1],
        [Math.floor(w / 2), 0],
        [Math.floor(w / 2), h - 1],
        [0, Math.floor(h / 2)],
        [w - 1, Math.floor(h / 2)]
      ];
      
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let validSamplesCount = 0;
      
      for (const [sx, sy] of samples) {
        const idx = (sy * w + sx) * 4;
        sumR += d[idx];
        sumG += d[idx + 1];
        sumB += d[idx + 2];
        validSamplesCount++;
      }
      
      const avgR = sumR / validSamplesCount;
      const avgG = sumG / validSamplesCount;
      const avgB = sumB / validSamplesCount;
      
      // If average of sampled background is bright, we assume a light background
      const isLightBg = (avgR > 180 && avgG > 180 && avgB > 180);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          let isBg = false;
          if (isLightBg) {
            const dr = r - avgR;
            const dg = g - avgG;
            const db = b - avgB;
            const dist = Math.sqrt(dr * dr + dg * dg + db * db);
            
            // Allow a threshold to key out white background and compression artifacts
            if (dist < 60 || (r > 215 && g > 215 && b > 215)) {
              isBg = true;
            }
          } else {
            // Dark background: key out pixels close to black
            if (r < 25 && g < 25 && b < 25) {
              isBg = true;
            }
          }

          if (isBg) {
            d[i + 3] = 0;
          } else {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Bulletproof bounds check: fallback to full image if no foreground pixels are detected
      if (minX > maxX || minY > maxY) {
        minX = 0;
        minY = 0;
        maxX = w - 1;
        maxY = h - 1;
      }

      const pad = Math.round(Math.min(w, h) * 0.01);
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(w - 1, maxX + pad);
      maxY = Math.min(h - 1, maxY + pad);
      const cw = maxX - minX + 1;
      const ch = maxY - minY + 1;

      const cropped = document.createElement("canvas");
      cropped.width = cw;
      cropped.height = ch;
      const cctx = cropped.getContext("2d");
      if (!cctx) {
        reject(new Error("Could not get crop canvas context"));
        return;
      }
      cctx.drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);
      resolve(cropped.toDataURL("image/png"));
    };
    img.onerror = (err) => {
      console.error("Image failed to load in processLogoImage:", src, err);
      reject(new Error(`Failed to load logo: ${src}`));
    };
    img.src = encodeURI(src);
  });
}
