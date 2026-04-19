import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SANDBOX_PROJECTS } from "../data";
import { ExternalLink } from "lucide-react";

const CATEGORIES = ["All Experiments", "Generative AI", "Interactive UI", "Gamification"];

export const InnovationSandbox = () => {
  const [activeCategory, setActiveCategory] = useState("All Experiments");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Experiments") return SANDBOX_PROJECTS.items;
    return SANDBOX_PROJECTS.items.filter(project => 
      project.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <section id="sandbox" className="relative py-32 px-4 overflow-hidden bg-black">
      {/* Dynamic Light Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/10 rounded-full blur-[150px] pointer-events-none opacity-50 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#FFFFFF] mb-4">
            {SANDBOX_PROJECTS.title}
          </h2>
          <p className="text-[#007BFF] font-medium text-xl font-[family-name:var(--font-chinese)] mb-6">
            {SANDBOX_PROJECTS.titleZh}
          </p>
          <div className="max-w-3xl mx-auto space-y-2">
            <p className="text-[#A0A0A0] font-light text-lg leading-relaxed">
              {SANDBOX_PROJECTS.description}
            </p>
            <p className="text-[#A0A0A0] font-light text-sm font-[family-name:var(--font-chinese)] leading-relaxed">
              {SANDBOX_PROJECTS.descriptionZh}
            </p>
          </div>
        </motion.div>

        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 rounded-full border ${
                activeCategory === category 
                  ? "bg-[#001A33] border-[#007BFF] text-white" 
                  : "bg-transparent border-transparent text-[#A0A0A0] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Glassmorphism Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 to-[#007BFF]/0 group-hover:from-[#007BFF]/10 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />
                <div className="h-full flex flex-col p-8 bg-white/[0.03] backdrop-blur-md border border-white/10 group-hover:border-[#007BFF]/50 rounded-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#007BFF]/50 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.categories.map((cat, i) => (
                        <span key={i} className="text-[10px] font-bold text-[#007BFF] uppercase tracking-widest bg-[#007BFF]/10 px-2 py-1 rounded-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4 group-hover:text-[#007BFF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-2 mb-8 flex-1">
                      <p className="text-[#A0A0A0] font-light leading-relaxed">
                        {project.description}
                      </p>
                      <p className="text-[#A0A0A0] text-sm font-light leading-relaxed font-[family-name:var(--font-chinese)]">
                        {project.descriptionZh}
                      </p>
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-white/5 hover:bg-[#007BFF] border border-white/10 hover:border-[#007BFF] text-white text-sm tracking-widest uppercase transition-all duration-300 group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        [ Launch Experiment ]
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                      </span>
                      {/* Button Hover Glow */}
                      <div className="absolute inset-0 bg-[#007BFF] blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
