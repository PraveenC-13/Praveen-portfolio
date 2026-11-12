import React, { useState } from 'react';
import { EDITORIAL_PROJECTS } from '../data/editorialContent';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const EditorialProjects: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(EDITORIAL_PROJECTS[0].id);
  const [expandedDiagramId, setExpandedDiagramId] = useState<string | null>(EDITORIAL_PROJECTS[0].id);

  const activeProject = EDITORIAL_PROJECTS.find((p) => p.id === activeProjectId) || EDITORIAL_PROJECTS[0];

  return (
    <section id="projects" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#f7f2ea] border-t border-[#4a1521]/15">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4a1521]/15 pb-8">
          <div>
            <span className="font-mono-tech text-xs tracking-[0.3em] text-[#731e32] uppercase block font-semibold">
              CHAPTER 02 · SELECTED ENGINEERING WORK
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl text-[#1b070b] font-light tracking-tight mt-2">
              THE STORY <span className="font-italic-accent italic text-[#4a1521]">OF THE BUILD</span>
            </h2>
          </div>
          <p className="font-sans-clean text-xs text-[#6b4e54] max-w-md">
            Detailed engineering breakdowns—explaining why each system was built, how data moves through components, technical challenges overcome, and real lessons learned.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDITORIAL_PROJECTS.map((proj) => {
            const isSelected = activeProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`text-left p-6 rounded-lg border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#4a1521] border-[#4a1521] text-white shadow-xl shadow-[#4a1521]/15'
                    : 'bg-white border-[#4a1521]/15 hover:border-[#4a1521]/40 hover:bg-white/80'
                }`}
              >
                <div>
                  <div className={`flex items-center justify-between text-xs font-mono-tech mb-3 ${isSelected ? 'text-[#f4efe6]/80' : 'text-[#731e32]'}`}>
                    <span className="font-semibold">CHAPTER {proj.chapterNumber}</span>
                    <span>{proj.period}</span>
                  </div>
                  <h3 className={`font-editorial text-2xl font-normal transition-colors ${isSelected ? 'text-white' : 'text-[#1b070b]'}`}>
                    {proj.title}
                  </h3>
                  <p className={`font-mono-tech text-[10px] tracking-wider uppercase mt-1 ${isSelected ? 'text-[#f4efe6]/70' : 'text-[#6b4e54]'}`}>
                    {proj.category.split('&')[0]}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono-tech ${isSelected ? 'border-white/20 text-[#f4efe6]' : 'border-[#4a1521]/10 text-[#731e32]'}`}>
                  <span className="font-medium">
                    {isSelected ? 'ACTIVE CASE STUDY' : 'READ CASE STUDY'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Full Editorial Article */}
        <article className="bg-white border border-[#4a1521]/15 rounded-2xl p-8 md:p-14 space-y-16 shadow-lg">
          {/* Article Header */}
          <div className="space-y-6 border-b border-[#4a1521]/15 pb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase font-semibold">
                CASE STUDY {activeProject.chapterNumber} · {activeProject.category}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#f7f2ea] border border-[#4a1521]/20 hover:border-[#4a1521] hover:bg-[#4a1521] hover:text-white font-mono-tech text-xs tracking-wider text-[#4a1521] transition-colors"
                >
                  <span>SOURCE REPOSITORY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-editorial text-4xl sm:text-6xl text-[#1b070b] font-light">
                {activeProject.title}
              </h3>
              <p className="font-editorial text-xl sm:text-2xl text-[#731e32] italic font-normal mt-2">
                "{activeProject.subtitle}"
              </p>
            </div>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-tech text-xs px-3 py-1 rounded bg-[#f7f2ea] border border-[#4a1521]/15 text-[#1b070b] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section: The Problem & The Idea */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                01. THE PROBLEM
              </span>
              <h4 className="font-editorial text-2xl text-[#1b070b]">
                Why did this project deserve to exist?
              </h4>
              <p className="font-sans-clean text-[#4a3b3e] text-sm md:text-base leading-relaxed">
                {activeProject.theProblem}
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                02. THE IDEA
              </span>
              <h4 className="font-editorial text-2xl text-[#1b070b]">
                What was the initial approach?
              </h4>
              <p className="font-sans-clean text-[#4a3b3e] text-sm md:text-base leading-relaxed">
                {activeProject.theIdea}
              </p>
            </div>
          </div>

          {/* Section: The Build */}
          <div className="space-y-4 border-t border-[#4a1521]/15 pt-10">
            <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
              03. THE BUILD
            </span>
            <h4 className="font-editorial text-2xl md:text-3xl text-[#1b070b]">
              How was the system constructed?
            </h4>
            <p className="font-sans-clean text-[#4a3b3e] text-base leading-relaxed max-w-4xl">
              {activeProject.theBuild}
            </p>
          </div>

          {/* Section: Architecture & Data Flow */}
          <div className="space-y-6 border-t border-[#4a1521]/15 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                  04. THE ARCHITECTURE
                </span>
                <h4 className="font-editorial text-2xl md:text-3xl text-[#1b070b]">
                  Verified Component Pipeline & Data Flow
                </h4>
              </div>
              <button
                onClick={() => setExpandedDiagramId(expandedDiagramId === activeProject.id ? null : activeProject.id)}
                className="font-mono-tech text-xs tracking-wider text-[#4a1521] hover:text-[#731e32] flex items-center gap-1.5 self-start cursor-pointer font-medium"
              >
                <span>{expandedDiagramId === activeProject.id ? 'COLLAPSE PIPELINE' : 'EXPAND PIPELINE'}</span>
                {expandedDiagramId === activeProject.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <p className="font-sans-clean text-sm text-[#4a3b3e]">
              {activeProject.theArchitecture.summary}
            </p>

            {/* Architecture Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {activeProject.theArchitecture.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-[#fbf9f5] border border-[#4a1521]/15 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] text-[#731e32] tracking-widest uppercase font-semibold">
                      NODE 0{idx + 1}
                    </span>
                    <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-white text-[#4a1521] border border-[#4a1521]/15 font-medium">
                      {comp.tech}
                    </span>
                  </div>
                  <h5 className="font-editorial text-lg text-[#1b070b]">
                    {comp.name}
                  </h5>
                  <p className="font-sans-clean text-xs text-[#4a3b3e] leading-relaxed">
                    {comp.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Step-by-Step Data Flow Sequence */}
            {expandedDiagramId === activeProject.id && (
              <div className="p-6 rounded-xl bg-[#fbf9f5] border border-[#4a1521]/15 space-y-4 animate-fade-in mt-4">
                <span className="font-mono-tech text-xs tracking-[0.2em] text-[#731e32] uppercase block font-semibold">
                  CHRONOLOGICAL TELEMETRY / DATA FLOW
                </span>
                <ol className="space-y-3 font-sans-clean text-xs text-[#1b070b]">
                  {activeProject.theArchitecture.dataFlowSteps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3">
                      <span className="font-mono-tech text-xs text-[#4a1521] font-bold shrink-0">
                        {String(sIdx + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-[#4a3b3e] leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Code Excerpt */}
          {activeProject.codeExcerpt && (
            <div className="space-y-4 border-t border-[#4a1521]/15 pt-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                    VERIFIED CODEBASE EXCERPT
                  </span>
                  <h4 className="font-editorial text-xl text-[#1b070b] mt-1">
                    {activeProject.codeExcerpt.filename}
                  </h4>
                </div>
                <span className="font-mono-tech text-xs text-[#731e32] uppercase font-semibold">
                  {activeProject.codeExcerpt.language}
                </span>
              </div>

              <pre className="p-6 rounded-xl bg-[#1b070b] border border-[#4a1521]/30 text-[#fbf9f5] font-mono-tech text-xs overflow-x-auto leading-relaxed">
                <code>{activeProject.codeExcerpt.code}</code>
              </pre>

              <p className="font-sans-clean text-xs text-[#6b4e54] italic">
                {activeProject.codeExcerpt.explanation}
              </p>
            </div>
          )}

          {/* Section: The Challenges & Debugging */}
          <div className="space-y-6 border-t border-[#4a1521]/15 pt-10">
            <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
              05. THE CHALLENGES & DEBUGGING
            </span>
            <h4 className="font-editorial text-2xl md:text-3xl text-[#1b070b]">
              Real Technical Bottlenecks Encountered
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProject.theChallenges.map((ch, chIdx) => (
                <div
                  key={chIdx}
                  className="p-6 rounded-xl bg-[#fbf9f5] border border-[#4a1521]/15 space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#4a1521]">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <h5 className="font-editorial text-lg text-[#1b070b]">
                      {ch.title}
                    </h5>
                  </div>
                  <p className="font-sans-clean text-xs md:text-sm text-[#4a3b3e] leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Lessons & What Comes Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#4a1521]/15 pt-10">
            <div className="space-y-4">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                06. THE LESSONS
              </span>
              <h4 className="font-editorial text-2xl text-[#1b070b]">
                What did I understand through this build?
              </h4>
              <p className="font-sans-clean text-[#4a3b3e] text-sm md:text-base leading-relaxed">
                {activeProject.theLessons}
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#731e32] uppercase block font-semibold">
                07. WHAT COMES NEXT
              </span>
              <h4 className="font-editorial text-2xl text-[#1b070b]">
                Planned Engineering Iterations
              </h4>
              <ul className="space-y-2.5 font-sans-clean text-xs md:text-sm text-[#4a3b3e]">
                {activeProject.whatComesNext.map((nextItem, nIdx) => (
                  <li key={nIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a1521] mt-2 shrink-0" />
                    <span>{nextItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
