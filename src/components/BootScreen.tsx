import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<'spin' | 'move'>('spin');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('move');
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex items-start justify-center p-4 md:p-8 overflow-y-auto w-full">
      <div className="relative w-full max-w-2xl h-[32px]">
        {/* The Empty Title Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="win95-outset surface-grit bg-[#1a1a1a] w-full h-full flex items-center justify-end px-1 absolute inset-0 z-10"
        >
          <div className="flex gap-1 pr-1 opacity-50">
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
            <div className="win95-outset w-4 h-4 bg-gray-800" />
          </div>
        </motion.div>

        {/* The Rune Animation */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.img 
            key={phase}
            src="/assets/icons/launcher-rune.svg"
            alt="Rune"
            initial={phase === 'spin' ? {
              scale: 3, rotate: 0, x: 0, y: 0
            } : {
              scale: 3, rotate: 360, x: 0, y: 0
            }}
            animate={phase === 'spin' ? {
              rotate: 360,
              scale: 3.2,
            } : {
              rotate: 720,
              scale: 1,
              x: -302, 
              y: 0,
            }}
            transition={{ 
              duration: phase === 'spin' ? 0.6 : 0.4,
              ease: phase === 'spin' ? "easeOut" : "anticipate"
            }}
            onAnimationComplete={() => {
              if (phase === 'move') {
                setTimeout(onComplete, 50);
              }
            }}
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
};