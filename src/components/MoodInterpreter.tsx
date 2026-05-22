import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, ArrowRight } from "lucide-react";
import { MoodResponse } from "@/src/types";

export default function MoodInterpreter() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MoodResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/interpret-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to interpret mood");
      const data = await response.json();
      setResult(data);
      
      // Scroll to result after delay
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-aura-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aura-brass/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-aura-sage/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-aura-brass text-[11px] uppercase tracking-[0.2em] mb-4 block opacity-60">03 / The Mood Interpreter</span>
          <h2 className="text-aura-bg text-4xl md:text-6xl font-serif font-light italic leading-tight">Describe your space.<br />We'll interpret it.</h2>
        </div>

        <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Mornings that feel like slow coffee..."
            disabled={isLoading}
            className="w-full bg-transparent border-b border-aura-bg/20 py-8 text-2xl font-serif italic text-aura-bg placeholder:text-aura-bg/20 focus:outline-none focus:border-aura-brass transition-colors pr-12 font-light"
          />
          <button 
            type="submit" 
            disabled={isLoading || !prompt}
            className="absolute right-0 bottom-8 text-aura-bg hover:text-aura-brass transition-colors disabled:opacity-30"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight size={32} strokeWidth={1} />}
          </button>
        </form>

        <div ref={scrollRef} className="mt-24">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-16"
              >
                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-aura-brass uppercase tracking-[0.2em] text-[10px] mb-4 opacity-60"
                  >
                    Resonance 
                  </motion.p>
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-aura-bg text-5xl font-serif italic font-light mb-8"
                  >
                    {result.name}
                  </motion.h3>
                  
                  <div className="space-y-8 mb-12">
                    {result.principles.map((principle, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex gap-4 border-l border-aura-brass/20 pl-6"
                      >
                        <span className="text-aura-brass text-[10px] font-light">0{i+1}</span>
                        <p className="text-aura-bg/70 leading-relaxed font-light text-sm italic">{principle}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-aura-bg/90 font-serif text-xl italic font-light border-t border-aura-bg/10 pt-8"
                  >
                    "{result.direction}"
                  </motion.p>
                </div>

                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-aura-brass uppercase tracking-[0.2em] text-[10px] mb-8 opacity-60"
                  >
                    Materiality
                  </motion.p>
                  <div className="space-y-3">
                    {result.palette.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.5 + i * 0.15,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="origin-left"
                      >
                        <div className="flex items-center gap-6 p-2 bg-aura-bg/[0.02] border border-aura-bg/[0.05] group hover:bg-aura-bg/[0.08] transition-colors rounded-sm overflow-hidden">
                          <div 
                            className="w-12 h-12 flex-shrink-0"
                            style={{ backgroundColor: item.hex }}
                          />
                          <div>
                            <p className="text-aura-bg font-serif text-lg italic font-light">{item.material}</p>
                            <p className="text-aura-bg/30 font-mono text-[9px] uppercase tracking-[0.1em]">{item.hex}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16"
                  >
                    <button className="w-full py-4 border border-aura-brass text-aura-brass text-xs uppercase tracking-[0.2em] hover:bg-aura-brass hover:text-aura-dark transition-all">
                      Book a Consultation Around This Vision
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
