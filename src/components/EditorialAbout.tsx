import React from 'react';
import { PRAVEEN_PROFILE } from '../data/editorialContent';

export const EditorialAbout: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#fbf9f5] border-t border-[#4a1521]/15">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4a1521]/15 pb-8">
          <div>
            <span className="font-mono-tech text-xs tracking-[0.3em] text-[#731e32] uppercase block font-semibold">
              CHAPTER 01 · THE JOURNEY
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#1b070b] font-light tracking-tight mt-2">
              THE PERSON <span className="font-italic-accent italic text-[#4a1521]">BEHIND THE CODE</span>
            </h2>
          </div>
          <p className="font-mono-tech text-xs tracking-widest text-[#731e32] uppercase font-medium">
            LEARNING THROUGH DIRECT CONSTRUCTION
          </p>
        </div>

        {/* Magazine Editorial Spread Layout (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Pull Quote & Background Story */}
          <div className="lg:col-span-7 space-y-8">
            <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1b070b] font-light leading-snug border-l-2 border-[#4a1521] pl-6">
              "I prefer understanding <span className="font-italic-accent italic text-[#4a1521]">how systems work under stress</span> rather than memorizing frameworks. True mastery comes from observing what breaks when the network jitters."
            </blockquote>

            <div className="space-y-6 font-sans-clean text-[#4a3b3e] text-base leading-relaxed">
              <p>
                {PRAVEEN_PROFILE.statement}
              </p>
              <p>
                {PRAVEEN_PROFILE.learningApproach}
              </p>
              <p>
                As a Computer Science Engineering student at HKBK College of Engineering in Bengaluru, I immerse myself in the fundamentals—studying operating system scheduling, database indexing bottlenecks, and network concurrency models while applying them directly to full-cycle projects.
              </p>
            </div>
          </div>

          {/* Right Column: Academic & Technical Pillars Card */}
          <div className="lg:col-span-5 bg-white border border-[#4a1521]/15 p-8 rounded-xl space-y-8 shadow-sm">
            <div>
              <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                ACADEMIC FOUNDATION
              </span>
              <h3 className="font-editorial text-2xl text-[#1b070b] mt-1 font-normal">
                {PRAVEEN_PROFILE.education.degree}
              </h3>
              <p className="font-sans-clean text-sm text-[#4a3b3e] mt-1 font-medium">
                {PRAVEEN_PROFILE.education.institution}
              </p>
              <p className="font-mono-tech text-xs text-[#731e32] mt-2 font-medium">
                Expected Graduation: {PRAVEEN_PROFILE.education.graduationYear} · {PRAVEEN_PROFILE.education.location}
              </p>
            </div>

            {/* Core Coursework */}
            <div className="space-y-3 pt-4 border-t border-[#4a1521]/15">
              <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                CORE COURSEWORK & FOUNDATIONS
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {PRAVEEN_PROFILE.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="font-mono-tech text-xs px-3 py-1.5 rounded bg-[#f7f2ea] border border-[#4a1521]/15 text-[#1b070b] font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Engineering Principles */}
            <div className="space-y-3 pt-4 border-t border-[#4a1521]/15">
              <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                ENGINEERING PILLARS
              </span>
              <ul className="space-y-2.5 font-sans-clean text-xs text-[#1b070b]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a1521] mt-1.5 shrink-0" />
                  <span><strong>Zero Exaggeration:</strong> Documenting only what is implemented, measured, and verified in code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a1521] mt-1.5 shrink-0" />
                  <span><strong>First-Principles Debugging:</strong> Profiling memory allocations and socket buffers rather than guessing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a1521] mt-1.5 shrink-0" />
                  <span><strong>Resilience Over Perfection:</strong> Handling network timeouts, stale cache entries, and malformed inputs gracefully.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
