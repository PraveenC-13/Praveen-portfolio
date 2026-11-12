import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRAVEEN_PROFILE } from '../data/editorialContent';

export const EditorialContact: React.FC = () => {
  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#1b070b] text-[#fbf9f5]">
      <div className="max-w-5xl mx-auto space-y-16 text-center">
        {/* Decorative Maroon/White divider */}
        <div className="w-16 h-0.5 bg-[#4a1521] mx-auto" />

        <div className="space-y-6">
          <span className="font-mono-tech text-xs tracking-[0.35em] text-[#b38b95] uppercase block font-semibold">
            THE FINAL SCENE · PERSPECTIVE
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white max-w-4xl mx-auto leading-tight">
            "Every system starts with a question. <br />
            <span className="font-italic-accent italic text-[#d4af37]">The interesting part is what we build next."</span>
          </h2>
          <p className="font-sans-clean text-sm sm:text-base text-[#b38b95] max-w-xl mx-auto leading-relaxed pt-2">
            I am actively seeking software engineering internships, backend opportunities, and systems development roles. If your team builds resilient distributed infrastructure, I would welcome the conversation.
          </p>
        </div>

        {/* Primary Contact Action Pill & Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={PRAVEEN_PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded bg-[#4a1521] text-white hover:bg-[#6b1c2e] font-mono-tech text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center gap-2 shadow-xl shadow-black/40 cursor-pointer"
          >
            <span>CONNECT ON LINKEDIN</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={PRAVEEN_PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded border border-white/20 hover:border-white hover:bg-white/10 text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={PRAVEEN_PROFILE.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded border border-white/20 hover:border-white hover:bg-white/10 text-white font-mono-tech text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>LEETCODE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Direct email indicator */}
        <p className="font-mono-tech text-xs text-[#b38b95]">
          Direct inquiry inbox: <span className="text-white font-semibold">{PRAVEEN_PROFILE.socials.email}</span>
        </p>

        {/* Footer Editorial Colophon */}
        <div className="pt-20 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#b38b95]">
          <span>© 2026 PRAVEEN C · BENGALURU, INDIA</span>
          <span>CURATED EDITORIAL PORTFOLIO · LUXURY MAROON & WHITE</span>
        </div>
      </div>
    </section>
  );
};
