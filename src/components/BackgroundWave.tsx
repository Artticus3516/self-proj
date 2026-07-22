"use client";

import { Canvas } from "@react-three/fiber";
import { DottedWave } from "./hero/DottedWave";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundWave() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = resolvedTheme === "light";
  const bgColor = isLight ? "#faf9f6" : "#030303";

  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 bg-[#faf9f6] dark:bg-[#030303]"
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
