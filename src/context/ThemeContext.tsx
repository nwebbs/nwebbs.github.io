import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * THEME CONFIGURATION
 * Edit these values to change the site's colors and effects.
 */
const CONFIG = {
  primary: '#d49f0f',   // Main highlight color (Cyan)
  secondary: '#8a670a', // Accent color (Pink)
  accent: '#bd00ff',    // Tertiary color (Purple)

  iconGlowPrimary: '#666666',   // Mascot glow start color
  iconGlowSecondary: '#666666', // Mascot glow end color
  
  glowPulsing: false,     // Toggle if the glow pulses
  glowBrightness: 1.0,   // Multiplier for glow intensity (0.0 to 2.0+)

  crtEnabled: true,      // Toggle the scanline/flicker effect
  starColor: '#ffffff',  // Color of the background stars
  starSpeed: 1,          // Speed of star movement
  starDirection: 'down' as const, // 'up' | 'down' | 'left' | 'right' | 'towards' | 'away'
};

const defaultTheme: Theme = {
  ...CONFIG,
  taskbarPosition: 'top',
  showDesktopIcons: false,
};

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  iconGlowPrimary: string;
  iconGlowSecondary: string;
  glowPulsing: boolean;
  glowBrightness: number;
  taskbarPosition: 'top' | 'bottom';
  crtEnabled: boolean;
  showDesktopIcons: boolean;
  starColor: string;
  starDirection: 'up' | 'down' | 'left' | 'right' | 'towards' | 'away';
  starSpeed: number;
};

type ThemeContextType = {
  theme: Theme;
  updateTheme: (updates: Partial<Theme>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('sknii-theme');
    if (saved) {
      // Prioritize CONFIG values over saved localStorage values for easier editing
      return { ...JSON.parse(saved), ...CONFIG };
    }
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('sknii-theme', JSON.stringify(theme));

    // Update Favicon Color
    const updateFavicon = () => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) return;

      const svgString = `<svg version="1.1" width="72.64" height="66.88" viewBox="0 0 72.64 66.88" xmlns="http://www.w3.org/2000/svg">
  <ellipse style="fill:${theme.primary}" cx="35.48" cy="34.42" rx="34.47" ry="34.56" />
  <ellipse style="fill:#000000" cx="35.71" cy="34.21" rx="32.35" ry="31.91" />
  <g>
    <path style="fill:${theme.primary}" d="M 3.49,64.88 A 33.5,31.02 0 0 1 2.65,57.99 33.5,31.02 0 0 1 36.15,26.97 a 33.5,31.02 0 0 1 33.5,31.02 33.5,31.02 0 0 1 -0.69,6.27 A 35.09,39.69 0 0 0 36.33,39.17 35.09,39.69 0 0 0 3.49,64.88 Z" />
    <path style="fill:${theme.primary}" d="m 28.46,18.92 0.18,34.47 6.89,9.9 6.36,-9.37 -0.53,-35.89 9.9,-2.47 -14.67,-3.36 -1.77,-8.66 -2.12,8.66 -13.79,3.36 z" />
  </g>
</svg>`;

      const encodedSvg = encodeURIComponent(svgString);
      favicon.setAttribute('href', `data:image/svg+xml,${encodedSvg}`);
    };

    updateFavicon();
  }, [theme]);

  const updateTheme = (updates: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div 
        style={{ 
          //@ts-ignore
          '--color-primary': CONFIG.primary,
          '--color-secondary': CONFIG.secondary,
          '--color-accent': CONFIG.accent,
          '--color-icon-glow-primary': CONFIG.iconGlowPrimary,
          '--color-icon-glow-secondary': CONFIG.iconGlowSecondary,
          '--glow-brightness': CONFIG.glowBrightness,
          '--glow-animation': CONFIG.glowPulsing ? 'glow 3s ease-in-out infinite alternate' : 'none',
          '--glow-animation-icon': CONFIG.glowPulsing ? 'icon-glow 3s ease-in-out infinite alternate' : 'none',
        }}
        className="contents"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
