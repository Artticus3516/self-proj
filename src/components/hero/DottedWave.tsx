"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GRID_SIZE = 80;
const SPACING = 0.45;

export function DottedWave() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial positions
  const { positions } = useMemo(() => {
    const positions = new Float32Array(GRID_SIZE * GRID_SIZE * 3);
    
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        // Center the grid around origin
        const px = (x - GRID_SIZE / 2) * SPACING;
        const pz = (z - GRID_SIZE / 2) * SPACING;
        
        positions[i * 3] = px;
        positions[i * 3 + 1] = 0; // Y will be updated in useFrame
        positions[i * 3 + 2] = pz;
        i++;
      }
    }
    return { positions };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current?.geometry.attributes.position.array as Float32Array | undefined;
    
    if (!positions) return;

    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const px = (x - GRID_SIZE / 2) * SPACING;
        const pz = (z - GRID_SIZE / 2) * SPACING;
        
        // Complex wave function to mimic reference image
        const waveX = Math.sin(px * 0.4 + time * 0.8) * 0.5;
        const waveZ = Math.cos(pz * 0.3 + time * 0.5) * 0.5;
        const waveCombined = Math.sin(px * 0.2 + pz * 0.2 + time) * 1.2;
        
        positions[i * 3 + 1] = waveX + waveZ + waveCombined; // Update Y
        i++;
      }
    }
    
    pointsRef.current!.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
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
