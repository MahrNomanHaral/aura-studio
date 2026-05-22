import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Space",
    description: "The void is our most valuable material.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Light",
    description: "Sculpting the atmosphere with golden rays.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920",
  },
  {
    title: "Time",
    description: "Design that honors history and awaits tomorrow.",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function Philosophy({ scrollEnabled = true }: { scrollEnabled?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollEnabled) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const scrollWidth = container.scrollWidth - window.innerWidth;
    if (scrollWidth <= 0) return;

    let ctx: gsap.Context | undefined;

    const init = () => {
      ctx = gsap.context(() => {
        gsap.to(container, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinReparent: false,
            scrub: 1,
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    };

    const frame = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(frame);
      ctx?.revert();
    };
  }, [scrollEnabled]);

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden bg-aura-dark">
      <div 
        ref={containerRef} 
        className="flex h-full w-[300vw]"
      >
        {principles.map((item, i) => (
          <div 
            key={i} 
            className="w-screen h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center"
          >
            {/* Background Texture/Image */}
            <div className="absolute inset-0 opacity-40">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="relative z-10 text-center px-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-aura-brass uppercase tracking-[0.25em] text-[10px] font-light block mb-6 opacity-60"
              >
                0{i + 1} / {item.title}
              </motion.span>
              <h2 className="text-aura-bg text-6xl md:text-8xl font-serif italic font-light max-w-4xl leading-[1.1]">
                "{item.description}"
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
