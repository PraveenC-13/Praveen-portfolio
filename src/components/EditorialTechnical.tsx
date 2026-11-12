import React from 'react';
import { TECHNICAL_SKILLS } from '../data/editorialContent';
import { Server, Database, Cloud, Terminal } from 'lucide-react';

export const EditorialTechnical: React.FC = () => {
  return (
    <section id="technical" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#fbf9f5] border-t border-[#4a1521]/15">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4a1521]/15 pb-8">
          <div>
            <span className="font-mono-tech text-xs tracking-[0.3em] text-[#731e32] uppercase block font-semibold">
              CHAPTER 03 · SYSTEMS & TOOLS
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#1b070b] font-light tracking-tight mt-2">
              TECHNICAL <span className="font-italic-accent italic text-[#4a1521]">CAPABILITIES</span>
            </h2>
          </div>
          <p className="font-mono-tech text-xs tracking-widest text-[#731e32] uppercase font-medium">
            VERIFIED STACK · ZERO FAKE METRICS
          </p>
        </div>

        {/* 4 Architectural Groups in Clean White & Maroon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Group 1: Backend Systems */}
          <div className="bg-white border border-[#4a1521]/15 p-8 rounded-xl space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-[#4a1521]" />
              <h3 className="font-editorial text-2xl text-[#1b070b]">
                Backend Systems & Languages
              </h3>
            </div>
            <div className="space-y-4">
              {TECHNICAL_SKILLS.backend.map((item) => (
                <div key={item.name} className="border-l-2 border-[#4a1521] pl-4 space-y-1">
                  <h4 className="font-mono-tech text-sm text-[#1b070b] font-semibold">
                    {item.name}
                  </h4>
                  <p className="font-sans-clean text-xs text-[#4a3b3e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Data & Messaging */}
          <div className="bg-white border border-[#4a1521]/15 p-8 rounded-xl space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#4a1521]" />
              <h3 className="font-editorial text-2xl text-[#1b070b]">
                Data Persistence & Messaging
              </h3>
            </div>
            <div className="space-y-4">
              {TECHNICAL_SKILLS.dataAndMessaging.map((item) => (
                <div key={item.name} className="border-l-2 border-[#4a1521] pl-4 space-y-1">
                  <h4 className="font-mono-tech text-sm text-[#1b070b] font-semibold">
                    {item.name}
                  </h4>
                  <p className="font-sans-clean text-xs text-[#4a3b3e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Cloud & Infrastructure */}
          <div className="bg-white border border-[#4a1521]/15 p-8 rounded-xl space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-[#4a1521]" />
              <h3 className="font-editorial text-2xl text-[#1b070b]">
                Cloud & Container Infrastructure
              </h3>
            </div>
            <div className="space-y-4">
              {TECHNICAL_SKILLS.cloudAndInfrastructure.map((item) => (
                <div key={item.name} className="border-l-2 border-[#4a1521] pl-4 space-y-1">
                  <h4 className="font-mono-tech text-sm text-[#1b070b] font-semibold">
                    {item.name}
                  </h4>
                  <p className="font-sans-clean text-xs text-[#4a3b3e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 4: Engineering Practices */}
          <div className="bg-white border border-[#4a1521]/15 p-8 rounded-xl space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#4a1521]" />
              <h3 className="font-editorial text-2xl text-[#1b070b]">
                Engineering Methodology
              </h3>
            </div>
            <div className="space-y-4">
              {TECHNICAL_SKILLS.engineeringPractices.map((item) => (
                <div key={item.name} className="border-l-2 border-[#4a1521] pl-4 space-y-1">
                  <h4 className="font-mono-tech text-sm text-[#1b070b] font-semibold">
                    {item.name}
                  </h4>
                  <p className="font-sans-clean text-xs text-[#4a3b3e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
