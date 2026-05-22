import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Listen",
    desc: "We begin in silence, understanding the quiet rhythms of your life and the architecture you inhabit."
  },
  {
    num: "02",
    title: "Translate",
    desc: "Your intentions are translated into a material language of stillness, light, and tactile honesty."
  },
  {
    num: "03",
    desc: "The final space is delivered not as a set of objects, but as a living environment for stillness.",
    title: "Deliver"
  }
];

function Step({ step, i }: { step: typeof steps[0]; i: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="mb-32 last:mb-0">
      <div className="flex items-baseline gap-8 mb-8">
        <span className="text-8xl md:text-[10rem] font-serif italic font-light text-aura-dark/10 leading-none">{step.num}</span>
        <h3 className="text-4xl md:text-6xl font-serif italic text-aura-dark font-light">{step.title}</h3>
      </div>
      <div className="relative h-[1px] w-full mb-12">
        <div className="absolute inset-0 bg-aura-dark/10" />
        <motion.div 
          style={{ width }}
          className="absolute inset-0 bg-aura-brass/40 origin-left" 
        />
      </div>
      <p className="text-xl md:text-2xl text-aura-dark/70 font-serif italic font-light max-w-2xl leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}

export default function Process() {
  return (
    <section className="py-32 px-6 bg-aura-bg border-t border-aura-dark/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-32">
          <span className="text-aura-brass text-[11px] uppercase tracking-[0.2em] mb-4 block opacity-60">04 / Our Methodology</span>
          <h2 className="text-5xl md:text-7xl font-serif italic font-light text-aura-dark">The Dialogue</h2>
        </div>

        <div className="relative">
          {steps.map((step, i) => (
            <Step key={i} step={step} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
