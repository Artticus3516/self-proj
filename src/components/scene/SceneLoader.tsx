"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "@/components/scene/Scene";

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((module) => module.Scene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  },
);

export function SceneLoader() {
  return <Scene />;
}
