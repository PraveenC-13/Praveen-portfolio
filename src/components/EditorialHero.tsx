import React from 'react';
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { PRAVEEN_PROFILE } from '../data/editorialContent';

interface HeroProps {
  onExploreWork: () => void;
  onAbout: () => void;
  onContact: () => void;
}

export const EditorialHero: React.FC<HeroProps> = ({
  onExploreWork,
  onAbout,
  onContact,
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#fbf9f5] via-[#f7f2ea] to-[#fbf9f5]">
      {/* Subtle luxury architectural background geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <circle cx="720" cy="450" r="400" stroke="#4a1521" strokeWidth="1.5" />
          <circle cx="720" cy="450" r="280" stroke="#4a1521" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Top Editorial Bar (Clean city name and graduation without coordinates) */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4a1521]/15 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#4a1521] animate-pulse" />
          <span className="font-mono-tech text-xs tracking-[0.25em] text-[#4a1521] font-medium uppercase">
            BENGALURU, INDIA
          </span>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.25em] text-[#6b4e54] uppercase">
          HKBK CSE · EXPECTED 2027
        </div>
      </div>

      {/* Center Stage: Luxury Editorial Typography in Maroon & Pure White */}
      <div className="relative z-10 max-w-5xl my-auto py-12 md:py-20 space-y-8">
        <div>
          <span className="font-mono-tech text-xs md:text-sm tracking-[0.35em] text-[#731e32] uppercase block mb-4 font-semibold">
            A PERSONAL PORTFOLIO OF SOFTWARE ENGINEERING
          </span>
          <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-[#1b070b] leading-[0.95]">
            PRAVEEN <span className="font-italic-accent italic text-[#4a1521] font-normal">C.</span>
          </h1>
        </div>

        {/* Poetic Statement mixing Serif & Artisan Italic with Maroon accent */}
        <div className="border-l-2 border-[#4a1521] pl-6 md:pl-10 max-w-3xl space-y-3">
          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#1b070b] font-light leading-snug">
            Building systems. <br />
            <span className="font-italic-accent italic text-[#4a1521]">Understanding problems.</span> <br />
            Creating things that matter.
          </p>
          <p className="font-sans-clean text-sm md:text-base text-[#4a3b3e] max-w-2xl pt-2 leading-relaxed">
            Computer Science Engineer specializing in backend development, distributed streaming, and computational systems. An emerging software engineer who learns by building real, practical solutions.
          </p>
        </div>

        {/* Action Buttons with Rich Maroon & Crisp White */}
        <div className="pt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreWork}
            className="px-7 py-3.5 rounded bg-[#4a1521] text-white hover:bg-[#6b1c2e] font-mono-tech text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#4a1521]/20 cursor-pointer"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onAbout}
            className="px-6 py-3.5 rounded border border-[#4a1521]/30 hover:border-[#4a1521] text-[#4a1521] hover:bg-[#4a1521]/5 font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer font-medium"
          >
            ABOUT ME
          </button>

          <a
            href={PRAVEEN_PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded border border-[#4a1521]/30 hover:border-[#4a1521] text-[#4a1521] hover:bg-[#4a1521]/5 font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="/resume.pdf"
            download="Praveen_C_Resume.pdf"
            className="px-5 py-3.5 rounded border border-transparent text-[#6b4e54] hover:text-[#4a1521] font-mono-tech text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>
        </div>
      </div>

      {/* Bottom Editorial Meta Information */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-[#4a1521]/15 text-xs font-mono-tech text-[#6b4e54]">
        <div>
          <span className="text-[#4a1521] uppercase tracking-widest block text-[10px] font-semibold">CURRENT FOCUS</span>
          <span className="text-[#1b070b] text-xs">Distributed Systems · Reinforcement Learning · Ingestion Pipelines</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={PRAVEEN_PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4a1521] transition-colors font-medium"
          >
            LINKEDIN
          </a>
          <a
            href={PRAVEEN_PROFILE.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4a1521] transition-colors font-medium"
          >
            LEETCODE
          </a>
          <button
            onClick={onContact}
            className="text-[#4a1521] hover:text-[#731e32] transition-colors uppercase font-semibold cursor-pointer"
          >
            CONNECT →
          </button>
        </div>
      </div>
    </section>
  );
};
