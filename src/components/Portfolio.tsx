import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { X } from "lucide-react";
import copenhagenImg from "../assets/images/copenhagen_residency_1779430977670.png";
import silenceImg from "../assets/images/house_for_silence_1779431000942.png";
import dubaiImg from "../assets/images/dusk_dubai_1779431027364.png";
import linenImg from "../assets/images/marble_linen_texture_1779431054946.png";

const projects = [
  {
    id: "1",
    title: "The Copenhagen Residency",
    location: "Denmark",
    scope: "Architecture + Interior",
    image: copenhagenImg,
    description: "A dialogue between Nordic clarity and tactile warmth. We stripped the space back to its core architectural intentions, allowing sunlight to become the primary tenant."
  },
  {
    id: "2",
    title: "A House for Silence",
    location: "Kyoto",
    scope: "Minimalist Retreat",
    image: silenceImg,
    description: "Built on the principles of Ma—the space between. This residence prioritizes the ritual of quietude, with concrete volumes framing the shifting shadows of an ancient courtyard."
  },
  {
    id: "3",
    title: "Dusk, Dubai",
    location: "UAE",
    scope: "Penthouse",
    image: dubaiImg,
    description: "Elevation meets horizon. A project designed to catch the desert's shifting light, utilizing massive travertine slabs and raw silk to ground the verticality of the Burj Khalifa views."
  },
  {
    id: "4",
    title: "The Gallery Archive",
    location: "London",
    scope: "Public Space",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "A curated sequence of rooms designed to disappear. The architecture serves as a silent witness to the art it contains, utilizing surgical restraint in materiality."
  },
  {
    id: "5",
    title: "Linen Loft",
    location: "NYC",
    scope: "Residential",
    image: linenImg,
    description: "Texture as structure. We replaced hard boundaries with soft transitions, using oversized linen drapes and lime-wash walls to create a breathable urban sanctuary."
  },
  {
    id: "6",
    title: "Basalt Basin",
    location: "Iceland",
    scope: "Wellness",
    image: "https://images.unsplash.com/photo-1545459720-aac273a2778a?auto=format&fit=crop&q=80&w=800",
    description: "Carved from the earth. A subterranean wellness space that mirrors the volcanic landscape, utilizing raw basalt and thermal water to create a primal sensory experience."
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section className="py-32 px-6 bg-aura-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex justify-between items-baseline border-b border-aura-dark/10 pb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-aura-brass block mb-4 opacity-60">02 / Selected Works</span>
            <h2 className="text-5xl md:text-7xl font-serif italic font-light text-aura-dark">The Archive</h2>
          </div>
          <p className="text-[11px] uppercase tracking-[0.1em] text-aura-dark/40 max-w-[200px] text-right">
            A curation of spatial experiments and inhabited silences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 lg:grid-flow-dense">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group cursor-pointer perspective-1000",
                i === 0 ? "md:col-span-2 lg:row-span-2" : "",
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-aura-dark/5 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.3] sepia-[0.1] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aura-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-aura-bg uppercase tracking-[0.2em] text-[10px] mb-1 font-light">{project.location}</p>
                  <h3 className="text-aura-bg font-serif text-2xl italic font-light">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-aura-bg"
          >
            <motion.button
              onClick={() => setSelectedProject(null)}
              className="absolute top-10 right-10 text-aura-dark hover:rotate-90 transition-transform z-50"
            >
              <X size={32} strokeWidth={1} />
            </motion.button>

            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                className="w-full md:w-1/2 aspect-[3/4] overflow-hidden"
              >
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div className="w-full md:w-1/2">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[11px] uppercase tracking-[0.2em] text-aura-brass mb-4 block opacity-60"
                >
                  {selectedProject.location} / {selectedProject.scope}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-serif text-aura-dark mb-8 leading-[1.1] italic font-light"
                >
                  {selectedProject.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-aura-dark/70 text-lg leading-relaxed max-w-md mb-12 font-serif italic font-light"
                >
                  "{selectedProject.description}"
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="#"
                  className="text-[10px] uppercase tracking-[0.25em] border-b border-aura-dark/10 pb-2 hover:border-aura-dark transition-colors font-light italic font-serif"
                >
                  View Narrative
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
