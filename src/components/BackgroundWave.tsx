"use client";

import dynamic from "next/dynamic";
import {DottedWave} from "./hero/DottedWave";

// Dynamically import Canvas to prevent SSR hydration errors with WebGL
const Canvas = dynamic(
    () => import("@react-three/fiber").then((mod) => mod.Canvas),
    {ssr: false}
);

export function BackgroundWave() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[#030303]">
            <Canvas dpr={[1, 2]} camera={{position: [0, 6, 12], fov: 60}}>
                <color attach="background" args={["#030303"]}/>
                <ambientLight intensity={0.5}/>
                <DottedWave/>
            </Canvas>
        </div>
    );
}
