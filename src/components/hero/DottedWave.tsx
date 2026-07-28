"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SPACING = 0.45;

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  
  void main() {
    vec3 pos = position;
    
    // Wave calculations matching the original CPU math
    float waveX = sin(pos.x * 0.4 + uTime * 0.8) * 0.5;
    float waveZ = cos(pos.z * 0.3 + uTime * 0.5) * 0.5;
    float waveCombined = sin(pos.x * 0.2 + pos.z * 0.2 + uTime) * 1.2;
    
    pos.y = waveX + waveZ + waveCombined;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Standard size attenuation formula
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    // Make points circular and smooth
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Smooth edges for soft glow circles
    float alpha = smoothstep(0.5, 0.4, dist) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function DottedWave({ isLight }: { isLight?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [gridSize, setGridSize] = useState(40); // Safe default for SSR/initial render (mobile-first)

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(isLight ? "#161614" : "#ffffff") },
        uOpacity: { value: isLight ? 0.8 : 0.7 },
        uSize: { value: 16.0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  // Update uniforms when theme changes
  useEffect(() => {
    material.uniforms.uColor.value.set(isLight ? "#161614" : "#ffffff");
    material.uniforms.uOpacity.value = isLight ? 0.8 : 0.7;
  }, [isLight, material]);

  // Detect screen size on client side and adjust grid size/particle visual size
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      const size = isDesktop ? 80 : 45;
      setGridSize(size);
      material.uniforms.uSize.value = isDesktop ? 16.0 : 12.0;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [material]);

  // Clean up WebGL resource on unmount
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

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
        pos[i * 3 + 1] = 0; // Y is updated completely on the GPU
        pos[i * 3 + 2] = pz;
        i++;
      }
    }
    return pos;
  }, [gridSize]);

  // Update time uniform in frame loop
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime();
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
      <primitive object={material} attach="material" />
    </points>
  );
}

