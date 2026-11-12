import React, { useState } from 'react';
import { ExternalLink, Compass, Menu, X, ArrowRight } from 'lucide-react';
import { PROJECTS, TRAVELLER_BIO, SceneMeta, JOURNEY_SCENES } from '../data/journeyData';
import { GithubLogo, PostgresLogo, DockerLogo, GoLogo, PythonLogo, ReactLogo } from './TechLogos';

interface ProjectsSectionProps {
  onJumpToScene?: (index: number) => void;
}

export const ProjectsAndBioSection: React.FC<ProjectsSectionProps> = ({ onJumpToScene }) => {
  const [selectedProject, setSelectedProject] = useState<string>(PROJECTS[0].id);

  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('go')) return <GoLogo className="w-4 h-4" />;
    if (t.includes('python')) return <PythonLogo className="w-4 h-4" />;
    if (t.includes('react')) return <ReactLogo className="w-4 h-4" />;
    if (t.includes('docker')) return <DockerLogo className="w-4 h-4" />;
    if (t.includes('postgres')) return <PostgresLogo className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="relative z-20 bg-gradient-to-b from-transparent via-[#0b0e14] to-[#06080b] text-neutral-100 px-6 md:px-16 lg:px-24 py-24 space-y-32">
      {/* ============================================================== */}
      {/* SECTION 08: THE FINAL DESTINATION — MY PROJECTS */}
      {/* ============================================================== */}
      <section id="projects" className="max-w-7xl mx-auto space-y-16">
        <div className="border-b border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-mono-tech text-xs tracking-[0.3em] uppercase">
                SCENE 08 · DESTINATION ARCHIVES
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tight text-white mt-2">
              ENGINEERED ARTIFACTS
            </h2>
            <p className="text-neutral-400 font-body text-base max-w-2xl mt-3">
              Practical systems born from algorithmic explorations—featuring high-throughput distributed transit streaming, reinforcement learning cloud optimization, and containerized maritime operations.
            </p>
          </div>

          <a
            href={TRAVELLER_BIO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 transition font-mono-tech text-xs tracking-wider text-amber-400 self-start md:self-auto"
          >
            <GithubLogo className="w-4 h-4" />
            <span>EXPLORE FULL GITHUB REPOSITORY</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Cinematic Full-Width Project Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`group relative p-8 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                selectedProject === project.id
                  ? 'bg-neutral-900/90 border-amber-500/60 shadow-2xl shadow-amber-950/20'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-cinematic font-bold text-amber-500/80">
                    {project.number}
                  </span>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700">
                    VERIFIED PROJECT
                  </span>
                </div>

                <div>
                  <p className="text-xs font-mono-tech tracking-widest text-amber-400 uppercase">
                    {project.title}
                  </p>
                  <h3 className="text-2xl font-cinematic font-bold text-white mt-1 group-hover:text-amber-200 transition">
                    {project.name}
                  </h3>
                  <p className="text-xs italic text-neutral-400 mt-1">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm font-body text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics / Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Architecture Note */}
                <div className="p-3 rounded bg-black/40 border border-neutral-800/80 text-xs text-neutral-400 font-mono-tech">
                  <span className="text-amber-400/90 font-semibold">Architecture: </span>
                  {project.architecture}
                </div>
              </div>

              {/* Technologies Badges & Action */}
              <div className="pt-6 mt-6 border-t border-neutral-800/80 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800/70 text-xs text-neutral-300 border border-neutral-700/60"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono-tech tracking-wider text-amber-400 hover:text-amber-300 pt-2 group-hover:translate-x-1 transition"
                >
                  <span>VIEW REPOSITORY ON GITHUB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 09: ABOUT THE TRAVELLER (HONEST BIO) */}
      {/* ============================================================== */}
      <section id="about" className="max-w-5xl mx-auto border border-neutral-800/90 rounded-2xl bg-neutral-950/70 p-8 md:p-14 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-mono-tech tracking-[0.3em] text-amber-400 uppercase">
              ABOUT THE TRAVELLER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-800 pb-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white tracking-wide">
                {TRAVELLER_BIO.name}
              </h3>
              <p className="text-sm md:text-base font-mono-tech text-amber-400/90 tracking-wide">
                {TRAVELLER_BIO.degree} · GRADUATION {TRAVELLER_BIO.graduationYear}
              </p>
              <p className="text-sm text-neutral-400 font-mono-tech">
                {TRAVELLER_BIO.college}
              </p>
              <p className="text-sm md:text-base text-neutral-300 font-body leading-relaxed pt-2">
                "{TRAVELLER_BIO.philosophy}"
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <p className="text-[10px] font-mono-tech text-neutral-500 uppercase tracking-widest">
                  LOCATION & FOCUS
                </p>
                <p className="text-sm font-semibold text-neutral-200 mt-1">
                  {TRAVELLER_BIO.location}
                </p>
                <p className="text-xs text-neutral-400 mt-2 font-mono-tech leading-relaxed">
                  Backend Systems · Concurrency · Microservices · Algorithmic Architecture
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
                <a
                  href={TRAVELLER_BIO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono-tech text-amber-400 hover:text-amber-300 flex items-center justify-between"
                >
                  <span>LINKEDIN PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={TRAVELLER_BIO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono-tech text-neutral-300 hover:text-white flex items-center justify-between"
                >
                  <span>GITHUB PORTFOLIO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-xs text-neutral-400 font-body leading-relaxed max-w-3xl">
            "I'm a computer science engineering student interested in software engineering, backend systems, distributed technologies and modern web development. I enjoy exploring new technologies, solving problems and building practical software projects."
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 10: FINAL SCENE — THE JOURNEY CONTINUES */}
      {/* ============================================================== */}
      <section id="contact" className="max-w-4xl mx-auto text-center space-y-8 pt-8">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        <span className="text-xs font-mono-tech tracking-[0.4em] text-amber-400/90 uppercase">
          THE JOURNEY DOES NOT END HERE
        </span>
        <h2 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tight text-white">
          EVERY CHALLENGE IS ANOTHER DESTINATION.
        </h2>
        <p className="text-neutral-400 font-body text-base max-w-xl mx-auto">
          Open to software engineering opportunities, backend collaborations, and systems development.
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={TRAVELLER_BIO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 font-mono-tech text-xs tracking-wider font-semibold transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>CONNECT ON LINKEDIN</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={TRAVELLER_BIO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 font-mono-tech text-xs tracking-wider transition flex items-center gap-2"
          >
            <GithubLogo className="w-4 h-4" />
            <span>VIEW GITHUB</span>
          </a>

          <a
            href={`mailto:${TRAVELLER_BIO.email}`}
            className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 font-mono-tech text-xs tracking-wider transition flex items-center gap-2"
          >
            <span>EMAIL DIRECTLY</span>
            <span className="text-neutral-400 text-[10px]">({TRAVELLER_BIO.email})</span>
          </a>
        </div>

        <div className="pt-16 border-t border-neutral-900 text-xs font-mono-tech text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>THE ODYSSEY OF CODE · PRAVEEN C · 2026</span>
          <span>DESIGNED WITH PHOTOREALISTIC THREE.JS & GSAP</span>
        </div>
      </section>
    </div>
  );
};
