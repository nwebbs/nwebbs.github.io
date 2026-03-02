import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ResumeWindow } from './components/ResumeWindow';
import { Starfield } from './components/Starfield';

const MainLayout = () => {
  const { theme } = useTheme();

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

      <main className="flex-1 relative z-10 flex flex-col overflow-y-auto">
        <ResumeWindow name="YOUR NAME" />
      </main>
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