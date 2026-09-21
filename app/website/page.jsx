"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ChevronRight, Hexagon, Check, TerminalSquare } from "lucide-react";

// Custom hook for mouse tracking (powers the interactive glow)
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

export default function JemberTechs() {
  const mousePosition = useMousePosition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Custom exponential easing for premium feel
  const customEase = [0.16, 1, 0.3, 1];

  return (
    <div className="relative min-h-screen bg-[#030005] text-slate-300 overflow-hidden font-sans selection:bg-violet-500/30">
      
      {/* Dynamic Background Ambient Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.07), transparent 40%)`
        }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Header / Navigation */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 border border-violet-500/30 bg-violet-500/10 backdrop-blur-md rounded-none shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Hexagon className="w-5 h-5 text-violet-400" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-violet-500/20 animate-pulse mix-blend-overlay" />
          </div>
          <span className="text-xl font-medium tracking-widest text-white uppercase">
            Jember <span className="text-violet-500 font-light">Techs</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm tracking-widest font-mono text-violet-300/60">
          <a href="mailto:Jembertechs@gmail.com" className="hover:text-violet-300 transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" /> JEMBERTECHS@GMAIL.COM
          </a>
          <a href="tel:7022780251" className="hover:text-violet-300 transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> (702) 278-0251
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 py-12">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: customEase }}
              className="w-full max-w-xl"
            >
              <div className="mb-10 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                  Initialize <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Protocol</span>
                </h1>
                <p className="text-violet-200/50 font-mono text-sm tracking-wide">
                  SYSTEM READY // ENTER PROJECT PARAMETERS
                </p>
              </div>

              {/* Form Container with Mouse Spotlight effect */}
              <div className="group relative border border-white/5 bg-black/40 backdrop-blur-xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid for Business Name & Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="block text-xs font-mono tracking-widest text-violet-400/80">BUSINESS NAME</label>
                      <input 
                        required
                        type="text" 
                        id="businessName"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all rounded-none"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="businessType" className="block text-xs font-mono tracking-widest text-violet-400/80">BUSINESS TYPE</label>
                      <select 
                        required
                        id="businessType"
                        className="w-full bg-[#0a0512] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all rounded-none appearance-none cursor-pointer"
                      >
                        <option value="" disabled selected>Select facility type...</option>
                        <option value="group_home">Group Home</option>
                        <option value="afh">Adult Family Home (AFH)</option>
                        <option value="clinic">Clinic</option>
                        <option value="agency">Agency</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-mono tracking-widest text-violet-400/80">EMAIL ADDRESS</label>
                      <input 
                        required
                        type="email" 
                        id="email"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all rounded-none"
                        placeholder="system@domain.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-mono tracking-widest text-violet-400/80">PHONE (HOW TO REACH YOU)</label>
                      <input 
                        required
                        type="tel" 
                        id="phone"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all rounded-none"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-xs font-mono tracking-widest text-violet-400/80">PROJECT SCOPE</label>
                    <textarea 
                      required
                      id="description"
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all rounded-none resize-none"
                      placeholder="Describe your operational requirements..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="relative w-full group overflow-hidden bg-violet-600 text-white font-medium tracking-widest text-sm py-4 rounded-none disabled:opacity-70 transition-all hover:bg-violet-500"
                  >
                    {/* Button Hover Glow Effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <TerminalSquare className="w-4 h-4 animate-pulse" /> PROCESSING...
                        </>
                      ) : (
                        <>
                          TRANSMIT REQUEST <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: customEase }}
              className="flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                {/* Exploding particle rings */}
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 border border-violet-500 rounded-full"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="absolute inset-0 border border-violet-400 rounded-full"
                />
                
                <motion.div 
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
                  className="relative z-10 flex items-center justify-center w-24 h-24 bg-violet-500/20 border-2 border-violet-500 backdrop-blur-md shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={2} />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Transmission <span className="font-semibold text-violet-400">Successful</span>
                </h2>
                <p className="text-violet-200/60 font-mono text-sm max-w-md mx-auto leading-relaxed">
                  Your project data has been securely logged into the Jember Techs mainframe. I will review your requirements and initiate contact shortly.
                </p>
                
                <div className="pt-8 flex flex-col items-center gap-3">
                  <p className="text-xs text-white/40 tracking-widest font-mono">CONNECTION ESTABLISHED</p>
                  <div className="w-1 px-12 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer HUD elements */}
      <footer className="fixed bottom-0 left-0 w-full p-4 pointer-events-none z-0">
        <div className="flex justify-between items-end opacity-30 font-mono text-[10px] text-white tracking-[0.2em]">
          <div className="space-y-1">
            <p>JEMBER TECHS // 2026</p>
            <p>SYS.VER_9.0.1</p>
          </div>
          <div className="text-right space-y-1">
            <p>LAT: 36.1699° N</p>
            <p>LNG: 115.1398° W</p>
          </div>
        </div>
      </footer>

      {/* Global CSS for animations that shouldn't clutter the Tailwind classes */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}