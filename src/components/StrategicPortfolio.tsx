import React from "react";
import { motion } from "motion/react";
import { PROJECTS } from "../data";
import { CheckCircle2 } from "lucide-react";

const Marquee = ({ images }: { images: string[] }) => {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/5 bg-white/[0.01] py-10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...images, ...images].map((img, i) => (
          <div key={i} className="mx-4 w-64 md:w-80 h-48 md:h-60 flex-shrink-0 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src={img} 
              alt="" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const renderExperienceText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      // Split by parentheses containing Chinese characters
      const subParts = content.split(/(\([^)]*[\u4e00-\u9fa5][^)]*\))/g);
      return (
        <strong key={i} className="text-[#FFFFFF] font-bold">
          {subParts.map((sub, j) => {
            if (sub.startsWith('(') && sub.endsWith(')') && /[\u4e00-\u9fa5]/.test(sub)) {
              // Remove parentheses and set color to blue
              const cleanSub = sub.slice(1, -1);
              return <span key={j} className="text-[#007BFF] font-medium ml-1 font-[family-name:var(--font-chinese)]">{cleanSub}</span>;
            }
            return sub;
          })}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export const StrategicPortfolio = () => {
  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#FFFFFF] mb-4">
            {PROJECTS.title}
          </h2>
          <p className="text-[#007BFF] font-medium text-xl font-[family-name:var(--font-chinese)] mb-6">
            {PROJECTS.titleZh}
          </p>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto font-light text-lg">
            {PROJECTS.description}
          </p>
        </motion.div>
      </div>

      <div className="space-y-32">
        {PROJECTS.items.map((item, index) => (
          <div key={item.id} className="group">
            {/* Top Section: Two-column layout */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Left Column: Strategic Overview & Key Metric */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-[#007BFF] text-sm tracking-widest uppercase">Case Study 0{index + 1}</span>
                  <div className="h-px w-12 bg-[#007BFF]/30" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#007BFF] font-medium text-lg font-[family-name:var(--font-chinese)] mb-8">
                  {item.titleZh}
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Strategic Overview</h4>
                    <p className="text-[#A0A0A0] text-lg font-light leading-relaxed">
                      {item.overview}
                    </p>
                  </div>

                  {/* Key Metric Card */}
                  <div className="bg-white/[0.03] border border-white/10 p-8 relative overflow-hidden group-hover:border-[#007BFF]/30 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#007BFF]/5 blur-[60px] rounded-full" />
                    <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-[0.4em] block mb-2">
                      {item.metricLabel}
                    </span>
                    <div className="text-3xl md:text-4xl font-bold text-[#007BFF] tracking-tight">
                      {item.metricValue}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Backed by Professional Experience */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-end"
              >
                <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 h-full">
                  <div className="mb-8 border-b border-white/10 pb-4">
                    <h4 className="text-sm font-bold text-[#007BFF] uppercase tracking-[0.4em]">
                      Backed by Professional Experience
                    </h4>
                    <p className="text-xs text-[#007BFF] font-medium font-[family-name:var(--font-chinese)] mt-1 uppercase tracking-widest">
                      实战经验背书
                    </p>
                  </div>
                  
                  <ul className="space-y-6">
                    {item.experience.map((point, i) => (
                      <li key={i} className="flex gap-4 group/item">
                        <CheckCircle2 className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-1 opacity-40 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <p className="text-[#A0A0A0] font-light leading-relaxed text-lg group-hover/item:text-[#FFFFFF] transition-colors duration-300">
                          {renderExperienceText(point)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section: Rolling Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="px-4 mb-6 max-w-7xl mx-auto">
                <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Rolling Image Gallery</h4>
              </div>
              <Marquee images={item.gallery} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
