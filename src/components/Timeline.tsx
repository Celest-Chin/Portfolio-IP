import { motion } from "motion/react";
import { TIMELINE } from "../data";
import { Badge } from "./ui/badge";

export const Timeline = () => {
  return (
    <section id="experience" className="py-24 px-4 bg-white/[0.02] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF]">
            Professional Journey
          </h2>
          <p className="text-[#007BFF] font-medium mt-2 font-[family-name:var(--font-chinese)]">
            职业历程
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative md:flex md:items-center md:justify-between mb-12 md:mb-24">
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(0,123,255,0.8)] md:-translate-x-1/2 z-10" />

                  {/* Content Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? 'md:text-right' : 'md:ml-auto'}`}
                  >
                    <div className={`p-8 bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all duration-500 group relative`}>
                      {/* Date Label */}
                      <div className={`text-xs text-primary uppercase tracking-widest mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} flex items-center gap-2`}>
                        {isEven && <span className="hidden md:block w-8 h-px bg-primary/30" />}
                        {item.year}
                        {!isEven && <span className="hidden md:block w-8 h-px bg-primary/30" />}
                      </div>

                      <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                        {item.role}
                      </h3>
                      <p className="text-lg text-white/60 font-medium mb-4">
                        {item.company}
                      </p>
                      
                      {/* @ts-ignore - summary added in data.ts */}
                      <p className="text-muted-foreground font-light leading-relaxed mb-6">
                        {item.summary}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {item.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="secondary" 
                            className="rounded-none bg-primary/5 text-primary/80 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 font-normal border-primary/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Year Marker for Desktop */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 text-[10rem] font-bold text-white/[0.02] select-none pointer-events-none z-0">
                    {item.year.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
