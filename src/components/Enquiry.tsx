import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

function Fabric() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
      meshRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.1) * 0.05;
      
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5 + clock.getElapsedTime() * 0.2) * 0.2 +
                  Math.cos(y * 0.5 + clock.getElapsedTime() * 0.3) * 0.2;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial 
        color="#E8E2D9" 
        side={THREE.DoubleSide} 
        roughness={0.9} 
        metalness={0.1}
        wireframe={false}
      />
    </mesh>
  );
}

export default function Enquiry() {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "Residential", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && formData.name && formData.message) {
      handleSubmit(e as any);
    }
  };

  return (
    <section className="h-screen w-full relative overflow-hidden bg-aura-bg">
      <div className="absolute inset-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#B8965A" />
          <Fabric />
        </Canvas>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10">
        <div className="w-full max-w-2xl text-center">
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-16">
                  <span className="text-aura-brass text-[11px] uppercase tracking-[0.2em] mb-4 block opacity-60">05 / Inquire</span>
                  <h2 className="text-5xl md:text-7xl font-serif italic font-light text-aura-dark">Begin a Dialogue</h2>
                </div>

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-12">
                  <div className="flex flex-col md:flex-row gap-12 text-left">
                    <div className="flex-1 border-b border-aura-dark/10 focus-within:border-aura-dark transition-colors">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-aura-dark/40 mb-2 block">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent py-4 font-serif italic text-2xl text-aura-dark focus:outline-none font-light" 
                      />
                    </div>
                    <div className="w-full md:w-64 border-b border-aura-dark/10 focus-within:border-aura-dark transition-colors">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-aura-dark/40 mb-2 block">Residency Type</label>
                      <select 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-transparent py-4 font-serif italic text-2xl text-aura-dark focus:outline-none appearance-none cursor-pointer font-light"
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Cultural</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-left border-b border-aura-dark/10 focus-within:border-aura-dark transition-colors">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-aura-dark/40 mb-2 block">Message</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      rows={1}
                      className="w-full bg-transparent py-4 font-serif italic text-2xl text-aura-dark focus:outline-none resize-none font-light" 
                    />
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-[0.25em] text-aura-dark/40 pt-8 italic font-light">
                    Press Enter to Send
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="py-32"
              >
                <p className="text-3xl font-serif text-aura-dark italic">
                  We'll be in touch before the week is out.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
