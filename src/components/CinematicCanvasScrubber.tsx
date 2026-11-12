import React, { useRef, useEffect } from 'react';

interface CinematicCanvasScrubberProps {
  scrollProgress: number; // 0 to 1 across the full journey
}

interface SceneSequenceConfig {
  dir: string;
  frameCount: number;
  startProgress: number;
  endProgress: number;
}

const SEQUENCES: SceneSequenceConfig[] = [
  { dir: '/cinematic/seq-desert', frameCount: 16, startProgress: 0.0, endProgress: 0.14 },
  { dir: '/cinematic/seq-beach', frameCount: 16, startProgress: 0.14, endProgress: 0.28 },
  { dir: '/cinematic/seq-ocean', frameCount: 16, startProgress: 0.28, endProgress: 0.42 },
  { dir: '/cinematic/seq-helm', frameCount: 16, startProgress: 0.42, endProgress: 0.56 },
  { dir: '/cinematic/seq-whale', frameCount: 16, startProgress: 0.56, endProgress: 0.70 },
  { dir: '/cinematic/seq-forest', frameCount: 16, startProgress: 0.70, endProgress: 0.84 },
  { dir: '/cinematic/seq-react', frameCount: 16, startProgress: 0.84, endProgress: 1.0 },
];

export const CinematicCanvasScrubber: React.FC<CinematicCanvasScrubberProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Preload all frames on mount
  useEffect(() => {
    SEQUENCES.forEach((seq) => {
      for (let i = 0; i < seq.frameCount; i++) {
        const frameKey = `${seq.dir}/frame_${i.toString().padStart(2, '0')}.jpg`;
        if (!imagesCacheRef.current.has(frameKey)) {
          const img = new Image();
          img.src = frameKey;
          imagesCacheRef.current.set(frameKey, img);
        }
      }
    });
  }, []);

  // Scrub frame on canvas when scrollProgress changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find active sequence
    let currentSeq = SEQUENCES[0];
    for (const seq of SEQUENCES) {
      if (scrollProgress >= seq.startProgress && scrollProgress <= seq.endProgress) {
        currentSeq = seq;
        break;
      }
    }
    if (scrollProgress > SEQUENCES[SEQUENCES.length - 1].endProgress) {
      currentSeq = SEQUENCES[SEQUENCES.length - 1];
    }

    // Compute frame index inside the active sequence
    const duration = currentSeq.endProgress - currentSeq.startProgress;
    const localP = Math.max(0, Math.min(1, (scrollProgress - currentSeq.startProgress) / (duration || 0.01)));
    const frameIndex = Math.min(
      Math.floor(localP * currentSeq.frameCount),
      currentSeq.frameCount - 1
    );

    const frameKey = `${currentSeq.dir}/frame_${frameIndex.toString().padStart(2, '0')}.jpg`;
    const cachedImg = imagesCacheRef.current.get(frameKey);

    const render = (imgToDraw: HTMLImageElement) => {
      // Cover fit inside canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const hRatio = canvas.width / imgToDraw.width;
      const vRatio = canvas.height / imgToDraw.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - imgToDraw.width * ratio) / 2;
      const centerShiftY = (canvas.height - imgToDraw.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        imgToDraw,
        0,
        0,
        imgToDraw.width,
        imgToDraw.height,
        centerShiftX,
        centerShiftY,
        imgToDraw.width * ratio,
        imgToDraw.height * ratio
      );
    };

    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      render(cachedImg);
    } else {
      const fallbackImg = new Image();
      fallbackImg.src = frameKey;
      fallbackImg.onload = () => {
        imagesCacheRef.current.set(frameKey, fallbackImg);
        render(fallbackImg);
      };
    }
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ filter: 'contrast(1.05) saturate(1.1)' }}
    />
  );
};
