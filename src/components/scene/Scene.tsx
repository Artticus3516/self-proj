"use client";

import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, use, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MIN_DPR = 1;
const MAX_DPR = 1.5;

let sceneAssetsPromise: Promise<void> | null = null;

function preloadSceneAssets(): Promise<void> {
  if (!sceneAssetsPromise) {
    sceneAssetsPromise = new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  return sceneAssetsPromise;
}

export function SceneFallback() {
  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center bg-[#050505]"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading 3D scene"
    >
      <div className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    </div>
  );
}

function AdaptivePixelRatio({
  onDprChange,
}: {
  onDprChange: (dpr: number) => void;
}) {
  return (
    <PerformanceMonitor
      bounds={(refreshRate) => (refreshRate > 90 ? [50, 90] : [30, 58])}
      flipflops={3}
      onChange={({ factor }) => {
        const nextDpr = THREE.MathUtils.clamp(
          MIN_DPR + factor * (MAX_DPR - MIN_DPR),
          MIN_DPR,
          MAX_DPR,
        );
        onDprChange(nextDpr);
      }}
    />
  );
}

function PlaceholderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.x += delta * 0.35;
    mesh.rotation.y += delta * 0.55;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusKnotGeometry args={[0.75, 0.22, 128, 24]} />
      <meshStandardMaterial
        color="#9aa8ff"
        metalness={0.45}
        roughness={0.28}
      />
    </mesh>
  );
}

function SceneContents() {
  use(preloadSceneAssets());

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 18]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        intensity={1.1}
        position={[4, 6, 3]}
        shadow-mapSize={[512, 512]}
      />
      <pointLight color="#6b7cff" intensity={0.6} position={[-3, 2, -2]} />

      <PlaceholderMesh />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <circleGeometry args={[4, 48]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
      </mesh>

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.48}
        minPolarAngle={Math.PI * 0.22}
        rotateSpeed={0.55}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.ROTATE,
        }}
      />
    </>
  );
}

function SceneCanvas() {
  const [dpr, setDpr] = useState(() =>
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio, MAX_DPR)
      : MAX_DPR,
  );

  const glConfig = useMemo(
    () => ({
      antialias: false,
      powerPreference: "high-performance" as WebGLPowerPreference,
      alpha: false,
    }),
    [],
  );

  return (
    <Canvas
      className="touch-none"
      dpr={dpr}
      frameloop="demand"
      gl={glConfig}
      shadows
      camera={{ position: [0, 0.5, 4.5], fov: 45, near: 0.1, far: 30 }}
    >
      <AdaptivePixelRatio onDprChange={setDpr} />
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}

export function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<SceneFallback />}>
        <SceneCanvas />
      </Suspense>
    </div>
  );
}
