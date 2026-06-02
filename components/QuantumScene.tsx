
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1, distort = 0.4, speed = 2 }: { position: [number, number, number]; color: string; scale?: number | [number, number, number]; distort?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Gentle floating animation handled by Float, but we add internal rotation
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.2}
        roughness={0.1}
        distort={distort}
        speed={speed}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2 + Math.PI / 2;
       ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[4.5, 0.05, 16, 100]} position={[0,0,-1]} rotation={[Math.PI / 2, 0, 0]}>
      {/* @ts-ignore */}
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.2} transparent opacity={0.3} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* @ts-ignore */}
        <ambientLight intensity={0.8} />
        {/* @ts-ignore */}
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        {/* @ts-ignore */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />
        
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
           {/* Large Left Shape - Organic Oval */}
           <QuantumParticle 
              position={[-4.5, 0.5, -2]} 
              color="#C5A059" 
              scale={[2.2, 3.2, 2.2]} 
              distort={0.5} 
              speed={1.5}
           />
           
           {/* Large Right Shape - Organic Oval */}
           <QuantumParticle 
              position={[4.5, -0.5, -2]} 
              color="#4F46E5" 
              scale={[2.4, 3.0, 2.4]} 
              distort={0.6} 
              speed={2}
           />
           
           <MacroscopicWave />
        </Float>

        <Environment preset="city" />
        {/* Subtle background stars */}
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

// Replaces the 3D Cryostat with a relevant Agency Image Scene
// Updated to use a video with a beige matte overlay as requested
export const AgencyImageScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#F9F8F4] overflow-hidden">
        <video 
            src="https://res.cloudinary.com/dostsdy1z/video/upload/v1770046971/grok-video-a0d0ccd0-6d4a-4c88-a972-86d6d1a37c53_k9e8pw.mp4" 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
        />
        {/* Beige Matte Layer - mix of overlay and slight opacity to wash out the video with beige */}
        <div className="absolute inset-0 bg-[#F9F8F4] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#C5A059] opacity-5 mix-blend-color pointer-events-none"></div>
    </div>
  );
}
