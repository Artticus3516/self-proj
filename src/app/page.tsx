import dynamic from "next/dynamic";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { SceneFallback } from "@/components/scene/Scene";

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((module) => module.Scene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  },
);

export default function Home() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <Scene />
      <PortfolioShell />
    </div>
  );
}
