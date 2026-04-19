import { motion } from "motion/react";
import { CORE_CAPABILITIES } from "../data";
import { ShieldCheck, Globe, Zap } from "lucide-react";

const iconMap = {
  ShieldCheck: ShieldCheck,
  Globe: Globe,
  Zap: Zap,
};

export const CoreCapabilities = () => {
  return (
    <section id="capabilities" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF]">
            {CORE_CAPABILITIES.title}
          </h2>
          <p className="text-[#007BFF] font-medium mt-2 font-[family-name:var(--font-chinese)]">
            {CORE_CAPABILITIES.titleZh}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CORE_CAPABILITIES.items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Aurora Blue glow border effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
                <div className="absolute inset-[-1px] border border-primary/30 blur-[2px]" />
              </div>

              <div className="relative z-10">
                <div className="mb-6 p-3 w-fit bg-white/[0.05] group-hover:bg-primary/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#007BFF] font-medium mb-4 font-[family-name:var(--font-chinese)]">
                  {item.titleZh}
                </p>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
