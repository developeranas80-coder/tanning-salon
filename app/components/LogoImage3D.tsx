"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processLogoImage } from "../lib/logoImageProcess";

gsap.registerPlugin(ScrollTrigger);

interface LogoImage3DProps {
  src: string;
  rotating?: boolean;
  scrollDriven?: boolean;
}

const CAMERA_Z = 12.5;
const CAMERA_FOV = 30;
const COIN_SCALE = 1.08;

const GOLD = 0xc9a882;
const GOLD_LIGHT = 0xe8d4bc;

function goldEdgeMaterial(envMap: THREE.Texture) {
  return new THREE.MeshPhysicalMaterial({
    color: GOLD,
    metalness: 0.96,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMap,
    envMapIntensity: 2.4,
    emissive: 0x4a3520,
    emissiveIntensity: 0.12,
  });
}

function buildCoinScene(texture: THREE.Texture, envMap: THREE.Texture) {
  const group = new THREE.Group();
  const img = texture.image as { width: number; height: number };
  const aspect = img.width / img.height;
  const planeH = 4.2;
  const planeW = planeH * aspect;
  const radius = (Math.min(planeW, planeH) / 2) * 0.97;
  const depth = 0.26;
  const halfD = depth / 2;

  const faceMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.04,
    toneMapped: false,
    side: THREE.FrontSide,
  });

  const edgeMat = goldEdgeMaterial(envMap);
  const backMat = goldEdgeMaterial(envMap);
  backMat.color.setHex(GOLD_LIGHT);

  const edge = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, depth, 96, 1, true),
    edgeMat
  );
  edge.rotation.x = Math.PI / 2;
  group.add(edge);

  const front = new THREE.Mesh(new THREE.PlaneGeometry(planeW, planeH), faceMat);
  front.position.z = halfD + 0.004;
  front.renderOrder = 2;
  group.add(front);

  const back = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.99, 96), backMat);
  back.position.z = -(halfD + 0.004);
  back.rotation.y = Math.PI;
  group.add(back);

  return group;
}

export default function LogoImage3D({
  src,
  rotating = false,
  scrollDriven = false,
}: LogoImage3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<THREE.Group | null>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;
    const container = containerRef.current;
    const geos: THREE.BufferGeometry[] = [];

    const init = async () => {
      let dataUrl: string;
      try {
        dataUrl = await processLogoImage(src);
      } catch (err) {
        console.error("Error processing logo image:", err);
        return;
      }
      if (disposed || !containerRef.current) return;

      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(dataUrl, resolve, undefined, reject);
      });
      if (disposed || !containerRef.current) return;

      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, w / h, 0.1, 1000);
      camera.position.set(0, 0, CAMERA_Z);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3)); // Razor-sharp 3x for high-res screens
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35; // Bright gold shine
      container.appendChild(renderer.domElement);

      texture.colorSpace = THREE.SRGBColorSpace;
      const maxAnisotropy = renderer.capabilities?.getMaxAnisotropy() || 16;
      texture.anisotropy = Math.min(maxAnisotropy, 16);
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envScene = new THREE.Scene();
      envScene.add(new THREE.AmbientLight(0xfff8f0, 1.2));
      const envKey = new THREE.DirectionalLight(0xffffff, 3.5);
      envKey.position.set(2, 5, 6);
      envScene.add(envKey);
      const envMap = pmrem.fromScene(envScene, 0.04).texture;
      pmrem.dispose();

      scene.add(new THREE.AmbientLight(0xfff8f2, 0.65));
      const key = new THREE.DirectionalLight(0xfff8f0, 3.2);
      key.position.set(3, 4, 8);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe8d5c4, 1.4);
      fill.position.set(-3, -2, 6);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffe8d0, 1.8);
      rim.position.set(-4, 2, -3);
      scene.add(rim);

      const coin = buildCoinScene(texture, envMap);
      coin.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh && mesh.geometry) geos.push(mesh.geometry);
      });
      coin.scale.setScalar(COIN_SCALE);
      coinRef.current = coin;
      scene.add(coin);

      let scrollTrigger: ScrollTrigger | null = null;
      if (scrollDriven) {
        scrollTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            scrollRef.current = self.progress;
          },
        });
      }

      const animate = () => {
        if (disposed) return;
        rafRef.current = requestAnimationFrame(animate);
        const coinGroup = coinRef.current;
        if (!coinGroup) return;

        const time = Date.now() * 0.001;

        if (scrollDriven) {
          const p = scrollRef.current;
          coinGroup.rotation.y = p * Math.PI * 2.5;
          coinGroup.rotation.x = Math.sin(p * Math.PI * 2) * 0.18 + 0.08;
        } else if (rotating) {
          coinGroup.rotation.y = Math.sin(time * 0.55) * 0.45;
          coinGroup.rotation.x = 0.1 + Math.sin(time * 0.42) * 0.08;
          coinGroup.position.y = Math.sin(time * 0.75) * 0.05;
        } else {
          coinGroup.rotation.y = 0;
          coinGroup.rotation.x = 0;
          coinGroup.position.y = 0;
        }

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!containerRef.current) return;
        const rw = Math.max(containerRef.current.clientWidth, 1);
        const rh = Math.max(containerRef.current.clientHeight, 1);
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer.setSize(rw, rh);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        scrollTrigger?.kill();
        texture.dispose();
        envMap.dispose();
        renderer.dispose();
        geos.forEach((g) => g.dispose());
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh && mesh.material) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => m.dispose());
          }
        });
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      cleanup?.();
      coinRef.current = null;
    };
  }, [src, rotating, scrollDriven]);

  return (
    <div
      ref={containerRef}
      className="logo-image-3d h-full w-full overflow-visible [&_canvas]:pointer-events-none"
      aria-hidden
    />
  );
}
