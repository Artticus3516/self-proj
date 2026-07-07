import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { SceneLoader } from "@/components/scene/SceneLoader";

export default function Home() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <SceneLoader />
      <PortfolioShell />
    </div>
  );
}
