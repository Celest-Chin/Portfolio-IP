import { motion } from "motion/react";
import { HERO_CONTENT } from "../data";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#000000] to-[#101010]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white leading-[1.1] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {HERO_CONTENT.title}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-none border-white/20 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 px-10 py-7 text-lg tracking-widest uppercase bg-transparent text-white group"
              onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">{HERO_CONTENT.cta}</span>
              <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[480px] aspect-[4/5] group">
            {/* Artistic Frame Layers */}
            <div className="absolute inset-0 border border-primary/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700 pointer-events-none" />
            <div className="absolute inset-0 border border-white/10 -translate-x-4 -translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative h-full w-full overflow-hidden bg-[#151515] shadow-2xl">
              <img 
                src={HERO_CONTENT.image} 
                alt="Celest Chin Portrait" 
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Artistic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              
              {/* Glassmorphism Detail */}
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">Strategic Visionary</p>
              </div>
            </div>
          </div>
          
          {/* Floating Abstract Elements */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-24 h-24 border border-white/5 rounded-full hidden lg:block"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};
