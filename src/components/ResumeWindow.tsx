import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ResumeWindowProps {
  name: string;
}

export const ResumeWindow: React.FC<ResumeWindowProps> = ({ name }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Info');

  const tabs = ['Info', 'Projects', 'Contact'];

  return (
    <div className="flex-1 flex items-start justify-center p-4 md:p-8 overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.98, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="win95-outset surface-grit w-full max-w-2xl min-h-[80vh] flex flex-col relative z-10"
      >
        {/* Title Bar with Tabs */}
        <div 
          className="p-1 flex items-center justify-between select-none relative z-10 border-b border-black/20"
          style={{ backgroundColor: `${theme.primary}33` }}
        >
          <div className="flex items-center gap-0">
            <div className="px-2 border-r border-black/20 mr-2">
              <img src="/assets/icons/launcher-rune.svg" alt="Rune" className="w-5 h-5" />
            </div>
            
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 text-xs font-bold uppercase tracking-tight transition-all
                    ${activeTab === tab 
                      ? 'win95-inset bg-black/40 text-white' 
                      : 'win95-outset bg-gray-800 hover:bg-gray-700 text-gray-400'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex gap-1 pr-1">
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 win95-inset m-1 bg-black/40 backdrop-blur-sm relative z-10 overflow-y-auto">
          {activeTab === 'Info' && (
            <div className="space-y-8">
              <header className="text-center space-y-2 border-b border-white/10 pb-6">
                <h1 
                  className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic"
                  style={{ color: theme.primary, textShadow: `2px 2px ${theme.secondary}66` }}
                >
                  {name}
                </h1>
                <p className="text-xs opacity-50 font-mono tracking-widest uppercase">Full Stack Video Game Developer</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-mono">
                <section className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                    <span className="w-2 h-2 bg-current" />
                    EXPERIENCE
                  </h2>
                  <div className="space-y-4 border-l-2 border-white/10 pl-4 ml-1">
                    <div className="space-y-1">
                      <h3 className="font-bold text-white">Lead Developer @ TechCorp</h3>
                      <p className="text-[10px] opacity-50 italic">2022 - PRESENT</p>
                      <p className="text-gray-400 leading-relaxed">Spearheaded the development of high-performance distributed systems using React and Rust. Optimized cloud infrastructure, reducing costs by 30%.</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-white">Software Engineer @ InnovateSoft</h3>
                      <p className="text-[10px] opacity-50 italic">2020 - 2022</p>
                      <p className="text-gray-400 leading-relaxed">Built scalable microservices and implemented modern CI/CD pipelines. Collaborated with design teams to deliver pixel-perfect UIs.</p>
                    </div>
                  </div>
                </section>

                <div className="space-y-8">
                  <section className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                      <span className="w-2 h-2 bg-current" />
                      EDUCATION
                    </h2>
                    <div className="space-y-3 border-l-2 border-white/10 pl-4 ml-1">
                      <div>
                        <h3 className="font-bold text-white italic">B.S. Computer Science</h3>
                        <p className="text-xs text-gray-400">University of Engineering</p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                      <span className="w-2 h-2 bg-current" />
                      SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Rust', 'PostgreSQL', 'Docker'].map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/5 win95-outset text-[10px] text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <footer className="pt-10 opacity-30 text-[8px] font-mono text-center uppercase tracking-[0.5em]">
                System Residue © 2026 - No Rights Reserved
              </footer>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="flex flex-col items-center justify-center py-20 opacity-50 italic">
              <p>Project Archive: Access Denied</p>
              <p className="text-[10px] mt-2">Initialize directory scanning...</p>
            </div>
          )}

          {activeTab === 'Contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold italic" style={{ color: theme.secondary }}>CONNECT_WITH_USER</h2>
              <div className="win95-inset p-4 space-y-2 bg-black/20">
                <p>EMAIL: hello@example.com</p>
                <p>GITHUB: github.com/username</p>
                <p>TWITTER: @username</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
