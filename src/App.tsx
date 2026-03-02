import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ResumeWindow } from './components/ResumeWindow';
import { Starfield } from './components/Starfield';
import { BootScreen } from './components/BootScreen';
import { AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const { theme } = useTheme();
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <div className={`h-screen w-screen flex flex-col relative overflow-hidden select-none`}>
      <Starfield />
      
      {/* CRT Effects */}
      {theme.crtEnabled && (
        <>
          <div className="crt-overlay" />
          <div className="scanline" />
        </>
      )}

      <AnimatePresence mode="wait">
        {!hasBooted ? (
          <div key="boot-container" className="flex-1 relative z-50 flex items-start justify-center">
            <BootScreen onComplete={() => setHasBooted(true)} />
          </div>
        ) : (
          <main key="content" className="flex-1 relative z-10 flex flex-col overflow-y-auto">
            <ResumeWindow name="Nicholas Webb Seamans" />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
