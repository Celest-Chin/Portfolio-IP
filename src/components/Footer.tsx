import { motion } from "motion/react";
import { CONTACT } from "../data";
import { Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [analytics, setAnalytics] = useState({
    total: 0,
    visitor: 0,
    engagement: 0
  });

  useEffect(() => {
    // Analytics Logic
    const updateAnalytics = () => {
      // 1. Total Views (Session based)
      const sessionKey = 'celest_session_view';
      const hasViewedSession = sessionStorage.getItem(sessionKey);
      
      // 2. Repeat Visitors (30 days)
      const visitorKey = 'celest_visitor_id';
      const lastVisit = localStorage.getItem(visitorKey);
      const isRepeat = lastVisit && (Date.now() - parseInt(lastVisit)) < 30 * 24 * 60 * 60 * 1000;
      
      // Update storage
      localStorage.setItem(visitorKey, Date.now().toString());
      if (!hasViewedSession) {
        sessionStorage.setItem(sessionKey, 'true');
      }

      // Simulated Data based on logic
      const baseTotal = 15420;
      const baseVisitor = 8940;
      const baseEngagement = 3240;

      setAnalytics({
        total: baseTotal + (hasViewedSession ? 0 : 1),
        visitor: baseVisitor + (isRepeat ? 1 : 0),
        engagement: baseEngagement + Math.floor(Math.random() * 50)
      });
    };

    updateAnalytics();
  }, []);

  const formatCount = (num: number) => num.toString().padStart(6, '0');

  return (
    <footer id="contact" className="py-24 px-4 border-t border-white/10 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-[#FFFFFF]">Let's Connect</h2>
          <p className="text-[#A0A0A0] text-lg font-light max-w-xl mx-auto leading-relaxed">
            {CONTACT.message}
          </p>
        </motion.div>

        <div className="flex items-center justify-center mb-20">
          <motion.a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-4 text-[#A0A0A0] hover:text-[#007BFF] transition-all duration-500 group"
          >
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#007BFF] group-hover:bg-[#007BFF]/5 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <Linkedin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Connect on LinkedIn</span>
          </motion.a>
        </div>

        {/* Exclusive Brand Signature Section */}
        <div className="pt-20 border-t border-white/5 flex flex-col items-center">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-6 group cursor-pointer outline-none"
          >
            {/* Subtle Aurora Blue Glow Effect - Enhanced for visibility */}
            <motion.div 
              animate={{ 
                opacity: [0.1, 0.25, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-[#007BFF] blur-[50px] rounded-full pointer-events-none"
            />
            
            <div className="relative z-10 h-16 md:h-24 flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/13HLVLRy645mYZ_ajnwMmvM3qrtfqXhSG" 
                alt="Celest Chin Signature" 
                className="h-full w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.button>
          
          <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-[#A0A0A0] mb-8 uppercase">
            Global Brand Marketing Professional | AI Integrated Branding Strategist
          </p>

          {/* Background Metadata Analytics */}
          <div className="analytics-text uppercase flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>V-Total: {formatCount(analytics.total)}</span>
            <span>R-Visitor: {formatCount(analytics.visitor)}</span>
            <span>Engagement-Live: {formatCount(analytics.engagement)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
