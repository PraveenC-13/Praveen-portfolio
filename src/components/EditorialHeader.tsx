import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const EditorialHeader: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#4a1521]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand / Monogram */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group flex items-baseline gap-3 cursor-pointer"
        >
          <span className="font-editorial text-2xl md:text-3xl font-medium tracking-tight text-[#1b070b] group-hover:text-[#4a1521] transition-colors">
            PRAVEEN C
          </span>
          <span className="hidden sm:inline-block font-mono-tech text-[10px] tracking-[0.25em] text-[#731e32] uppercase">
            PORTFOLIO · 2026
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-10">
          <button
            onClick={() => onNavigate('about')}
            className="font-mono-tech text-xs tracking-[0.18em] text-[#4a1521] hover:text-[#731e32] uppercase transition-colors cursor-pointer font-medium"
          >
            01. ABOUT
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="font-mono-tech text-xs tracking-[0.18em] text-[#4a1521] hover:text-[#731e32] uppercase transition-colors cursor-pointer font-medium"
          >
            02. WORK
          </button>
          <button
            onClick={() => onNavigate('technical')}
            className="font-mono-tech text-xs tracking-[0.18em] text-[#4a1521] hover:text-[#731e32] uppercase transition-colors cursor-pointer font-medium"
          >
            03. SYSTEMS
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#4a1521]/40 hover:bg-[#4a1521] hover:text-white text-[#4a1521] font-mono-tech text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </header>
  );
};
