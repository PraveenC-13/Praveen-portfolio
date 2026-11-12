import React, { useState } from 'react';
import { Compass, Menu, X, ChevronRight } from 'lucide-react';
import { JOURNEY_SCENES, SceneMeta } from '../data/journeyData';

interface NavigationProps {
  currentSceneIndex: number;
  onSelectScene: (index: number) => void;
  onSelectProjects: () => void;
  onSelectAbout: () => void;
}

export const NavigationMenu: React.FC<NavigationProps> = ({
  currentSceneIndex,
  onSelectScene,
  onSelectProjects,
  onSelectAbout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Trigger */}
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation chapters"
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700/80 hover:border-amber-500/80 text-neutral-200 transition shadow-xl group"
        >
          <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-xs font-mono-tech tracking-widest uppercase">
            {isOpen ? 'CLOSE ARCHIVES' : 'EXPEDITION LOG'}
          </span>
          {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Slide-out Expeditions / Chapter Nav Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg flex justify-end animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#0d1017] border-l border-neutral-800 p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-8">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-[10px] font-mono-tech tracking-[0.3em] text-amber-400 uppercase">
                  EXPEDITION CHAPTERS
                </span>
                <h3 className="text-2xl font-cinematic font-bold text-white mt-1">
                  THE ODYSSEY PATH
                </h3>
              </div>

              {/* Chapter list */}
              <div className="space-y-3">
                {JOURNEY_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      onSelectScene(idx);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between group ${
                      currentSceneIndex === idx
                        ? 'bg-amber-950/40 border-amber-500/60 text-white'
                        : 'bg-neutral-900/40 border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono-tech tracking-widest text-amber-500">
                        CHAPTER {scene.chapterNumber}
                      </span>
                      <p className="text-sm font-cinematic font-semibold text-neutral-200 group-hover:text-amber-200 transition">
                        {scene.title}
                      </p>
                      <p className="text-xs text-neutral-400 font-mono-tech mt-0.5">
                        {scene.tech} · {scene.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>

              {/* Jump to Projects / About */}
              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <button
                  onClick={() => {
                    onSelectProjects();
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 text-xs font-mono-tech text-amber-400 tracking-wider flex items-center justify-between"
                >
                  <span>SCENE 08: VERIFIED PROJECTS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onSelectAbout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 text-xs font-mono-tech text-neutral-300 tracking-wider flex items-center justify-between"
                >
                  <span>SCENE 09: ABOUT PRAVEEN C</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 text-[10px] font-mono-tech text-neutral-500">
              PRAVEEN C · SOFTWARE ENGINEERING
            </div>
          </div>
        </div>
      )}
    </>
  );
};
