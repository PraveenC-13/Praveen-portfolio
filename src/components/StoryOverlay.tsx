import React from 'react';
import { SceneMeta, DsaDragon, DSA_DRAGONS } from '../data/journeyData';
import {
  NodeLogo,
  JavaLogo,
  ReactLogo,
  PythonLogo,
  GoLogo,
  DockerLogo,
  KubernetesLogo,
} from './TechLogos';

interface OverlayProps {
  currentScene: SceneMeta;
  scrollProgress: number;
  activeDsaIndex: number;
}

export const StoryOverlay: React.FC<OverlayProps> = ({
  currentScene,
  scrollProgress,
  activeDsaIndex,
}) => {
  // Opening Title sequence (at beginning 0.0 - 0.07)
  const isOpeningTitle = scrollProgress < 0.06;

  // Active DSA Encounter calculation during Scene 3 (0.28 to 0.44)
  const isDsaEncounter = scrollProgress >= 0.28 && scrollProgress <= 0.44;
  const currentDragon: DsaDragon = DSA_DRAGONS[Math.min(activeDsaIndex, DSA_DRAGONS.length - 1)];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 md:p-12">
      {/* ============================================================== */}
      {/* TOP BAR / FILM HEADER */}
      {/* ============================================================== */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] md:text-xs font-mono-tech tracking-[0.35em] text-amber-500/80 uppercase">
            A PERSONAL JOURNEY THROUGH TECHNOLOGY
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-neutral-400 font-mono-tech tracking-wider">
              PRAVEEN C · ODYSSEY LOG
            </span>
          </div>
        </div>

        {/* Chapter Coordinate Indicator */}
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[10px] md:text-xs text-neutral-500 font-mono-tech tracking-widest uppercase">
              CHAPTER
            </span>
            <span className="text-sm md:text-base font-cinematic font-bold text-amber-400">
              {currentScene.chapterNumber} / 07
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-mono-tech tracking-widest uppercase">
            {currentScene.subtitle}
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CENTER STAGE: FILM TITLE OR SCENE PROSE */}
      {/* ============================================================== */}
      {isOpeningTitle ? (
        <div className="text-center my-auto max-w-4xl mx-auto space-y-4 animate-fade-in">
          <p className="text-xs md:text-sm tracking-[0.4em] text-neutral-400 font-mono-tech uppercase">
            ORIGINAL INTERACTIVE CINEMATIC EXPERIENCE
          </p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-cinematic font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-700/80 drop-shadow-2xl">
            THE ODYSSEY
            <span className="block text-2xl md:text-5xl lg:text-6xl text-amber-500/90 font-normal tracking-[0.2em] mt-2">
              OF CODE
            </span>
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6" />
          <div className="pt-2">
            <p className="text-base md:text-xl font-cinematic tracking-[0.25em] text-neutral-200 uppercase">
              PRAVEEN C
            </p>
            <p className="text-xs md:text-sm text-neutral-400 font-mono-tech tracking-widest uppercase mt-1">
              SOFTWARE ENGINEERING · SYSTEMS · DEVELOPMENT
            </p>
          </div>
          <div className="pt-8 animate-bounce flex items-center justify-center gap-2 text-xs font-mono-tech text-amber-400/80 tracking-widest">
            <span>SCROLL TO ADVANCE THE ODYSSEY</span>
            <span>↓</span>
          </div>
        </div>
      ) : isDsaEncounter && currentDragon ? (
        /* SPECIAL DSA DRAGON ENCOUNTER HUD (PHOTOREALISTIC CINEMATIC LABELS) */
        <div className="max-w-xl bg-black/60 backdrop-blur-md border border-sky-900/40 p-6 md:p-8 rounded-lg shadow-2xl space-y-3 pointer-events-auto transition-all duration-500">
          <div className="flex items-center justify-between border-b border-sky-800/30 pb-2">
            <span className="text-[11px] font-mono-tech tracking-widest text-sky-400 uppercase">
              ENCOUNTER {currentDragon.number} / 09 · LEVIATHAN CLASSIFICATION
            </span>
            <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/40">
              {currentDragon.timeComplexity}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-4xl font-cinematic font-bold text-sky-100 tracking-wider">
              {currentDragon.concept}
            </h2>
            <span className="text-xs text-neutral-400 font-mono-tech">
              [{currentDragon.name}]
            </span>
          </div>
          <p className="text-sm md:text-base italic font-serif text-sky-200/90">
            "{currentDragon.quote}"
          </p>
          <div className="pt-2 text-xs text-neutral-300 font-body leading-relaxed border-t border-sky-900/30">
            <span className="text-sky-400 font-mono-tech font-semibold">Morphology: </span>
            {currentDragon.visualTrait}
          </div>
        </div>
      ) : (
        /* STANDARD EDITORIAL CINEMATIC SUBTITLES */
        <div className="max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-lg shadow-2xl space-y-4 pointer-events-auto transition-all duration-700">
          <div className="flex items-center gap-3">
            {/* Authentic Brand Icon Preview */}
            <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              {currentScene.id === 'desert-node' && <NodeLogo className="w-7 h-7" />}
              {currentScene.id === 'beach-java' && <JavaLogo className="w-7 h-7" />}
              {currentScene.id === 'kubernetes-helm' && <KubernetesLogo className="w-7 h-7" />}
              {currentScene.id === 'docker-whale' && (
                <div className="flex items-center gap-1.5">
                  <DockerLogo className="w-7 h-7" />
                  <GoLogo className="w-6 h-6" />
                </div>
              )}
              {currentScene.id === 'python-forest' && <PythonLogo className="w-7 h-7" />}
              {currentScene.id === 'react-destination' && <ReactLogo className="w-7 h-7" />}
            </div>

            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.25em] text-amber-400 uppercase">
                {currentScene.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-cinematic font-bold text-white tracking-wide">
                {currentScene.tech}
              </h2>
            </div>
          </div>

          <p className="text-sm md:text-lg italic font-serif text-neutral-300">
            "{currentScene.quote}"
          </p>

          <p className="text-xs md:text-sm text-neutral-300 font-body leading-relaxed">
            {currentScene.description}
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM JOURNEY PROGRESS TIMELINE BAR */}
      {/* ============================================================== */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono-tech text-neutral-400">
          <span>DESERT ORIGIN</span>
          <span className="text-amber-400 tracking-widest font-bold">
            ODYSSEY PROGRESS {Math.round(scrollProgress * 100)}%
          </span>
          <span>HORIZON DESTINATION</span>
        </div>
        <div className="h-1 w-full bg-neutral-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-sky-500 to-emerald-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
