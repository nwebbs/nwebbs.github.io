import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
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
      <div className="win95-outset surface-grit w-full max-w-2xl flex flex-col relative z-10">
        {/* Title Bar with Tabs */}
        <div 
          className="p-1 flex items-center justify-between select-none relative z-10 border-b border-black/20"
          style={{ backgroundColor: `${theme.primary}33` }}
        >
          <div className="flex items-center gap-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-2 border-r border-black/20 mr-2"
            >
              <img src="/assets/icons/launcher-rune.svg" alt="Rune" className="w-5 h-5" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-1"
            >
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
            </motion.div>
          </div>

          <div className="hidden md:flex gap-1 pr-1">
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
          </div>
        </div>
        
        {/* Content Area - Slides out vertically */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="win95-inset m-1 bg-black/40 backdrop-blur-sm relative z-10 overflow-hidden flex flex-col"
        >
          {activeTab === 'Info' && (
            <div className="p-6 md:p-10 flex flex-col min-h-[500px] flex-1">
              <div className="flex-1 flex flex-col space-y-8">
              <header className="text-center space-y-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <h1 
                    className="text-4xl md:text-5xl font-bold tracking-tighter uppercase animate-glow"
                    style={{ color: theme.primary }}
                  >
                    {name}
                  </h1>
                  <p className="text-xs opacity-50 font-mono tracking-widest uppercase">Full Stack Developer and Digital Artist</p>
                </div>
                
                <div className="flex justify-center">
                  <a 
                    href="/resume.pdf" 
                    download
                    onClick={() => {
                      // @ts-ignore
                      if (typeof window.gtag !== 'undefined') {
                        // @ts-ignore
                        window.gtag('event', 'download_resume', {
                          'event_category': 'Engagement',
                          'event_label': 'PDF Download'
                        });
                      }
                    }}
                    className="win95-outset bg-gray-800 hover:bg-gray-700 px-4 py-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter transition-colors text-gray-300 active:win95-inset"
                  >
                    <Download className="w-3 h-3" />
                    DOWNLOAD_PDF
                  </a>
                </div>
              </header>

              <div className="flex-grow space-y-10">
                {/* Row 1: Skills and Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                      <span className="w-2 h-2 bg-current" />
                      SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {['C++', 'Java', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'HTML/CSS'].map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/5 win95-outset text-[10px] text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                      <span className="w-2 h-2 bg-current" />
                      EDUCATION
                    </h2>
                    <div className="space-y-3 border-l-2 border-white/10 pl-4 ml-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 animate-icon-glow p-1">
                          <img 
                            src="/assets/icons/UB_bull.svg" 
                            alt="UB Mascot" 
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              // Falls back to a generic icon if the file isn't there yet
                              (e.target as HTMLImageElement).src = "/assets/icons/launcher-rune.svg";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-white italic text-sm">B.S. Computer Science</h3>
                          <p className="text-xs text-gray-400">University of Buffalo</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Row 2: Experience (Full Width) */}
                <section className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.secondary }}>
                    <span className="w-2 h-2 bg-current" />
                    EXPERIENCE
                  </h2>
                  <div className="space-y-6 border-l-2 border-white/10 pl-4 ml-1">
                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-sm">Data Entry Analyst | Citibank (Contract via Adecco)</h3>
                      <p className="text-[10px] opacity-50 italic">2022 - 2024</p>
                      <div className="space-y-2 mt-1">
                        <p className="text-gray-400 leading-relaxed text-xs flex gap-2">
                          <span className="text-secondary">•</span>
                          Processed high-volumes of records with a focus on data integrity, consistently achieving near highest accuracy ratings in a fast-paced, audit-ready banking environment.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-sm">Insulation Specialist | Residential & Commercial</h3>
                      <p className="text-[10px] opacity-50 italic">2020 - 2022</p>
                      <div className="space-y-2 mt-1">
                        <p className="text-gray-400 leading-relaxed text-xs flex gap-2">
                          <span className="text-secondary">•</span>
                          Collaborated with multi-disciplinary construction teams to troubleshoot onsite logistical challenges.
                        </p>
                        <p className="text-gray-400 leading-relaxed text-xs flex gap-2">
                          <span className="text-secondary">•</span>
                          Managed material inventory and project timelines to ensure 100% on-time completion of residential/commercial contracts.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <footer className="pt-10 mt-auto opacity-30 text-[8px] font-mono text-center uppercase tracking-[0.5em]">
                Nicholas Webb Seamans © 2026 - No Rights Reserved
              </footer>
            </div>
          </div>
        )}

          {activeTab === 'Projects' && (
            <div className="p-6 md:p-10 flex flex-col min-h-[500px] flex-1">
              <div className="flex flex-col items-center justify-center py-20 opacity-50 italic">
                <p>Project Archive: Access Denied</p>
                <p className="text-[14px] mt-2">Come back later!</p>
              </div>
            </div>
          )}
          
            
          {activeTab === 'Contact' && (
            <div className="p-6 md:p-10 flex flex-col min-h-[500px] flex-1">
              <div className="space-y-6">
                <h2 className="text-lg font-bold italic" style={{ color: theme.secondary }}>CONNECT_WITH_USER</h2>
                <div className="win95-inset p-4 space-y-2 bg-black/20">
                  <p>EMAIL: contact@nwebbs.dev</p>
                  <p>GITHUB: github.com/nwebbs</p>
                  <p>LINKEDIN: </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
