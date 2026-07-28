"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackgroundWave = dynamic(() => import("./BackgroundWave"), {
  ssr: false,
});

export default function BackgroundWaveWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay loading the 3D canvas until the main thread is idle (drastically improves TTI)
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => setMounted(true));
    } else {
      const timer = setTimeout(() => setMounted(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return <BackgroundWave />;
}
