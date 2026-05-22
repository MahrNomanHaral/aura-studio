import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";

const LETTERS = ["a", "u", "r", "a"];

function Room() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Parallax effect
  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.1, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.1, 0.05);
  });

  return (
    <group ref={meshRef}>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1.5}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#F5F0EA" roughness={0.8} />
      </mesh>
      
      {/* Wall */}
      <mesh position-z={-5}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#F5F0EA" roughness={0.9} />
      </mesh>

      {/* Sofa (Simplified) */}
      <group position={[0, -1.1, -2]}>
        <mesh>
          <boxGeometry args={[4, 0.8, 1.5]} />
          <meshStandardMaterial color="#E8E2D9" />
        </mesh>
        <mesh position={[0, 0.6, -0.5]}>
          <boxGeometry args={[4, 0.6, 0.5]} />
          <meshStandardMaterial color="#E8E2D9" />
        </mesh>
      </group>

      {/* Noguchi-style table (Simplified) */}
      <mesh position={[0.5, -1.4, -0.5]} rotation-y={Math.PI / 4}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial color="#BDC3C7" metalness={0.2} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, -1.45, -0.5]}>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#1C1C1E" />
      </mesh>

      {/* Lighting */}
      <pointLight 
        intensity={2} 
        color="#B8965A" 
        position={[4, 2, 2]} 
      />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const [init, setInit] = useState(false);

  useFrame(() => {
    if (!init) {
      // Zoom out from close up
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6, 0.05);
      if (Math.abs(camera.position.z - 6) < 0.1) setInit(true);
    }
  });

  return null;
}

export default function ThreeHero() {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 1.5]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Environment preset="studio" />
        <Room />
        <CameraRig />
      </Canvas>
      
      {/* Navigation Header */}
      <nav className="absolute top-0 w-full pt-10 px-12 flex justify-between items-baseline z-20 pointer-events-auto">
        <div className="text-2xl tracking-[0.2em] font-serif italic font-light lowercase">aura</div>
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.25em] font-light opacity-60">
          <a href="#" className="hover:opacity-100 transition-opacity">Philosophy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Works</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Inquiry</a>
        </div>
      </nav>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl font-serif text-aura-dark tracking-widest lowercase italic font-light overflow-hidden flex justify-center gap-[0.05em]">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={`hero-letter-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 3 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4.5 }}
            className="mt-12"
          >
            <button className="px-8 py-3 border border-aura-dark/20 text-xs tracking-[0.3em] uppercase hover:bg-aura-dark hover:text-aura-bg transition-colors pointer-events-auto">
              Enter the Studio
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-30">
        <div className="w-[1px] h-16 bg-aura-dark animate-pulse" />
      </div>
    </div>
  );
}
