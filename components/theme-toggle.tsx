'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return <div className="w-24 h-12" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-12 w-24 items-center justify-between rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        isDark 
          ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border-[#333]' 
          : 'bg-gradient-to-r from-amber-50 to-slate-200 border-slate-200'
      } p-1.5 shadow-lg overflow-hidden border-2 cursor-pointer hover:scale-105 active:scale-95`}
      aria-label="Toggle theme"
    >
      {/* Background container for better layout */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        {/* Light mode label */}
        <span className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
          isDark ? 'opacity-40 translate-x-2' : 'opacity-100'
        } text-amber-600`}>
          Light
        </span>
        
        {/* Dark mode label */}
        <span className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
          isDark ? 'opacity-100' : 'opacity-40 -translate-x-2'
        } text-blue-400`}>
          Dark
        </span>
      </div>
      
      {/* Sliding circle */}
      <span
        className={`${
          isDark 
            ? 'translate-x-[calc(100%-0px)] bg-gradient-to-br from-[#333] to-[#222] border-[#444]' 
            : 'translate-x-0 bg-gradient-to-br from-white to-slate-100 border-slate-300'
        } absolute left-1.5 flex items-center justify-center h-9 w-9 transform rounded-full transition-transform duration-300 ease-in-out shadow-md border z-10`}
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-blue-400 drop-shadow" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500 drop-shadow" />
        )}
        
        {/* Inner glow effect */}
        <span className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-blue-500/5' : 'bg-amber-500/5'
        } blur-sm`}></span>
      </span>
      
      {/* Decorative glow behind the sliding circle */}
      <span 
        className={`absolute rounded-full w-9 h-9 transition-all duration-300 ${
          isDark 
            ? 'right-1.5 bg-blue-500/10 blur-md' 
            : 'left-1.5 bg-amber-500/10 blur-md'
        }`}
      />
      
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
} 