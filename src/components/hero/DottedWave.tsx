"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SPACING = 0.45;

export function DottedWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const [gridSize, setGridSize] = useState(40); // Safe default for SSR/initial render (mobile-first)

  // Detect screen size on client side
  useEffect(() => {
    const handleResize = () => {
      // If desktop, use 80, otherwise use 45 (reduces particle count to ~30% of desktop)
      const size = window.innerWidth >= 768 ? 80 : 45;
      setGridSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate initial positions based on dynamic gridSize
  const positions = useMemo(() => {
    const pos = new Float32Array(gridSize * gridSize * 3);
    
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Center the grid around origin
        const px = (x - gridSize / 2) * SPACING;
        const pz = (z - gridSize / 2) * SPACING;
        
        pos[i * 3] = px;
        pos[i * 3 + 1] = 0; // Y will be updated in useFrame
        pos[i * 3 + 2] = pz;
        i++;
      }
    }
    return pos;
  }, [gridSize]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentPositions = pointsRef.current?.geometry.attributes.position.array as Float32Array | undefined;
    
    if (!currentPositions || currentPositions.length !== gridSize * gridSize * 3) return;

    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const px = (x - gridSize / 2) * SPACING;
        const pz = (z - gridSize / 2) * SPACING;
        
        // Complex wave function to mimic reference image
        const waveX = Math.sin(px * 0.4 + time * 0.8) * 0.5;
        const waveZ = Math.cos(pz * 0.3 + time * 0.5) * 0.5;
        const waveCombined = Math.sin(px * 0.2 + pz * 0.2 + time) * 1.2;
        
        currentPositions[i * 3 + 1] = waveX + waveZ + waveCombined; // Update Y
        i++;
      }
    }
    
    pointsRef.current!.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={gridSize}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
}

