import { motion } from "motion/react";
import { CONTACT } from "../data";
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
      const baseVisitor = 8941;
      const baseEngagement = 3256;

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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-[#FFFFFF]">Let's Connect</h2>
          <p className="text-[#A0A0A0] text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Open to discussing innovative brand strategies, AI integration projects, or global marketing challenges. Let's start a conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            {/* Button 1: Download Resume */}
            <motion.a
              href="https://drive.google.com/file/d/1SiofPfqEqCD14_6PkuZNeadKUR6tfTBP/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-[#A0A0A0] text-[#A0A0A0] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#007BFF] hover:text-[#007BFF] hover:shadow-[0_0_20px_rgba(0,123,255,0.3)] relative group overflow-hidden"
            >
              [ Download Resume ]
            </motion.a>

            {/* Button 2: LinkedIn Link */}
            <motion.a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-[#A0A0A0] hover:text-[#007BFF] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 relative group"
            >
              <span className="relative">
                [ Connect on LinkedIn ]
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-current transform scale-x-100 transition-transform duration-500" />
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Exclusive Brand Signature Section */}
        <div className="pt-24 border-t border-white/5 flex flex-col items-center">
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
            <span>V-TOTAL: {formatCount(analytics.total)}</span>
            <span>R-VISITOR: {formatCount(analytics.visitor)}</span>
            <span>ENGAGEMENT-LIVE: {formatCount(analytics.engagement)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
