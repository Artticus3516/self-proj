"use client";

import { Canvas } from "@react-three/fiber";
import { DottedWave } from "./hero/DottedWave";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundWave() {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = resolvedTheme || theme || "dark";
  const isLight = activeTheme === "light";
  // Three.js Color constructor requires valid hex strings (#faf9f6 / #09090b)
  const bgColor = isLight ? "#faf9f6" : "#09090b";

  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 bg-background"
    >
      {mounted && (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 6, 12], fov: 60 }}>
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={0.5} />
          <DottedWave isLight={isLight} />
        </Canvas>
      )}
    </div>
  );
}
