"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoImage3D from "./components/LogoImage3D";
import LogoVideo3D from "./components/LogoVideo3D";

gsap.registerPlugin(ScrollTrigger);

export const LOGO_IMAGE_SRC = "/ChatGPT Image May 29, 2026, 04_08_34 AM.png";
export const LOGO_VIDEO_SRC =
  "/Remove_background_slow_rotation_202605270531 (online-video-cutter.com).mp4";

interface Logo3DProps {
  hideSubtitle?: boolean;
  floating?: boolean;
  scrollDriven?: boolean;
  imageSrc?: string;
  videoSrc?: string;
  rotating?: boolean;
}

const LOGO_SCALE = 0.88;
const CAMERA_Z = 12.5;
const CAMERA_FOV = 30;

const CHAMPAGNE = 0xf5ebe0;
const GOLD_LIGHT = 0xe8d4bc;
const GOLD = 0xc9a882;
const GOLD_DEEP = 0x9a7358;
const BRONZE = 0x8a6b5c;

const FONT_SERIF = "/fonts/baskerville_regular.typeface.json";
const FONT_SANS = "/fonts/droid_sans_regular.typeface.json";

function luxuryMetal(color: number, opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.93,
    roughness: 0.11,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    reflectivity: 1,
    envMapIntensity: 2.2,
    ...opts,
  });
}

function loadFont(url: string): Promise<Font> {
  return new Promise((resolve, reject) => {
    new FontLoader().load(url, resolve, undefined, reject);
  });
}

function createEmbossedText(
  text: string,
  font: Font,
  size: number,
  depth: number,
  color: number
) {
  const geo = new TextGeometry(text, {
    font,
    size,
    depth,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: depth * 0.35,
    bevelSize: depth * 0.18,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  geo.computeBoundingBox();
  const box = geo.boundingBox!;
  geo.translate(-(box.max.x + box.min.x) / 2, -(box.max.y + box.min.y) / 2, -box.min.z);

  const mesh = new THREE.Mesh(
    geo,
    luxuryMetal(color, {
      emissive: 0x3d2a1c,
      emissiveIntensity: 0.18,
      sheen: 1,
      sheenRoughness: 0.35,
      sheenColor: new THREE.Color(CHAMPAGNE),
    })
  );
  return mesh;
}

function createTaperedLine(width: number) {
  const shape = new THREE.Shape();
  const h = 0.012;
  shape.moveTo(-width / 2, 0);
  shape.quadraticCurveTo(0, h * 1.8, width / 2, 0);
  shape.quadraticCurveTo(0, -h * 0.4, -width / 2, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  geo.center();
  return new THREE.Mesh(geo, luxuryMetal(GOLD_DEEP, { roughness: 0.2 }));
}

function buildLogoScene(fonts: { serif: Font; sans: Font }, hideSubtitle: boolean) {
  const group = new THREE.Group();

  const plaque = new THREE.Mesh(
    new THREE.CylinderGeometry(2.05, 2.08, 0.07, 64),
    new THREE.MeshPhysicalMaterial({
      color: CHAMPAGNE,
      metalness: 0.15,
      roughness: 0.45,
      clearcoat: 0.8,
      transparent: true,
      opacity: 0.92,
      transmission: 0.15,
      thickness: 0.2,
    })
  );
  plaque.position.z = -0.06;
  group.add(plaque);

  const title = createEmbossedText("Life's a Beach", fonts.serif, 0.42, 0.1, GOLD_LIGHT);
  title.position.set(0, 0.12, 0.04);
  group.add(title);

  if (!hideSubtitle) {
    const line = createTaperedLine(1.35);
    line.position.set(0, -0.08, 0.05);
    group.add(line);

    const subtitle = createEmbossedText("LUXURY TANNING SALON", fonts.sans, 0.11, 0.035, BRONZE);
    subtitle.position.set(0, -0.28, 0.045);
    subtitle.scale.set(1.05, 1, 1);
    group.add(subtitle);
  } else {
    title.position.y = 0.02;
  }

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 48),
    new THREE.MeshBasicMaterial({
      color: 0x3d2b1f,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0, -0.12);
  group.add(shadow);

  return group;
}

export default function Logo3D({
  hideSubtitle = false,
  floating = false,
  scrollDriven = false,
  imageSrc = LOGO_IMAGE_SRC,
  videoSrc,
  rotating = false,
}: Logo3DProps) {
  if (videoSrc) {
    return (
      <LogoVideo3D
        src={videoSrc}
        rotating={rotating}
        scrollDriven={scrollDriven}
      />
    );
  }

  if (imageSrc) {
    return (
      <LogoImage3D
        src={imageSrc}
        rotating={rotating}
        scrollDriven={scrollDriven}
      />
    );
  }

  return (
    <Logo3DScene
      hideSubtitle={hideSubtitle}
      floating={floating}
      scrollDriven={scrollDriven}
      rotating={rotating}
    />
  );
}

function Logo3DScene({
  hideSubtitle = false,
  floating = false,
  scrollDriven = false,
  rotating = false,
}: Omit<Logo3DProps, "imageSrc">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);
  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lightsRef = useRef<{ key: THREE.DirectionalLight; rim: THREE.DirectionalLight } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;
    const container = containerRef.current;
    const geosToDispose: THREE.BufferGeometry[] = [];

    const init = async () => {
      let logoGroup: THREE.Group;

      let serif: Font;
      let sans: Font;
      try {
        [serif, sans] = await Promise.all([loadFont(FONT_SERIF), loadFont(FONT_SANS)]);
      } catch {
        return;
      }
      if (disposed || !containerRef.current) return;
      logoGroup = buildLogoScene({ serif, sans }, hideSubtitle);

      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      const scene = new THREE.Scene();
      scene.background = null;
      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, width / height, 0.1, 1000);
      camera.position.set(0, 0, CAMERA_Z);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envScene = new THREE.Scene();
      envScene.add(new THREE.AmbientLight(0xfff8f0, 1.5));
      const envKey = new THREE.DirectionalLight(0xffffff, 4);
      envKey.position.set(2, 5, 6);
      envScene.add(envKey);
      const envFill = new THREE.DirectionalLight(0xe3c9ac, 2);
      envFill.position.set(-4, 1, 3);
      envScene.add(envFill);
      scene.environment = pmrem.fromScene(envScene, 0.04).texture;
      pmrem.dispose();

      scene.add(new THREE.AmbientLight(0xfff8f2, 0.45));

      const keyLight = new THREE.DirectionalLight(0xfff5eb, 2.8);
      keyLight.position.set(4, 6, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xffe8d0, 2);
      rimLight.position.set(-5, 2, -4);
      scene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0xe8d5c4, 0.85);
      fillLight.position.set(0, -4, 6);
      scene.add(fillLight);

      const spot = new THREE.SpotLight(0xfff8f0, 12, 30, Math.PI / 5, 0.4, 1);
      spot.position.set(0, 3, 6);
      spot.target.position.set(0, 0, 0);
      scene.add(spot);
      scene.add(spot.target);

      lightsRef.current = { key: keyLight, rim: rimLight };

      logoGroup.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh && mesh.geometry) {
          geosToDispose.push(mesh.geometry);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      logoGroup.scale.setScalar(LOGO_SCALE);
      logoGroupRef.current = logoGroup;
      scene.add(logoGroup);

      let scrollTrigger: ScrollTrigger | null = null;
      if (scrollDriven) {
        scrollTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        });
      }

      const animate = () => {
        if (disposed) return;
        rafRef.current = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        const group = logoGroupRef.current;
        if (!group) return;

        if (scrollDriven) {
          group.rotation.y = scrollProgressRef.current * Math.PI * 4;
          group.rotation.x = Math.sin(scrollProgressRef.current * Math.PI * 2) * 0.022;
        } else if (rotating) {
          group.rotation.y = time * 0.75;
          group.rotation.x = Math.sin(time * 0.55) * 0.05;
          group.position.y = Math.sin(time * 0.9) * 0.03;
        } else if (floating) {
          group.rotation.y = Math.sin(time * 0.4) * 0.1;
          group.rotation.x = Math.sin(time * 0.32) * 0.035;
          group.position.y = Math.sin(time * 0.65) * 0.05;
        } else {
          group.rotation.y += 0.0012;
        }

        outerRingSpin(group, time);
        if (lightsRef.current) {
          lightsRef.current.key.intensity = 2.5 + Math.sin(time * 0.7) * 0.3;
          lightsRef.current.rim.position.x = -5 + Math.sin(time * 0.45) * 0.6;
        }

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!containerRef.current) return;
        const w = Math.max(containerRef.current.clientWidth, 1);
        const h = Math.max(containerRef.current.clientHeight, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        scrollTrigger?.kill();
        renderer.dispose();
        geosToDispose.forEach((g) => g.dispose());
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

    function outerRingSpin(group: THREE.Group, time: number) {
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
          const r = (child.geometry as THREE.TorusGeometry).parameters.radius;
          if (r > 1.9 && r < 2.05) {
            child.rotation.z = Math.sin(time * 0.35) * 0.012;
          }
        }
      });
    }

    let cleanupScene: (() => void) | undefined;
    init().then((cleanup) => {
      cleanupScene = cleanup;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      cleanupScene?.();
      logoGroupRef.current = null;
    };
  }, [hideSubtitle, floating, scrollDriven, rotating]);

  return (
    <div
      ref={containerRef}
      className="logo-3d-root h-full w-full overflow-visible [&_canvas]:pointer-events-none"
      aria-hidden
    />
  );
}
