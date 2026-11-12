import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface CameraDirectorProps {
  scrollProgress: number; // 0 to 1
}

export const CinematicCameraDirector: React.FC<CameraDirectorProps> = ({ scrollProgress }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.5, 9));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame(() => {
    // Continuous cinematic curve calculation across the odyssey:
    // 0.00: Desert wide aerial opening
    // 0.08: Desert tracking behind traveller towards Node monument
    // 0.18: Beach approach, lowering towards shoreline
    // 0.24: Beach coffee close-up shot
    // 0.32: Furious ocean boarding ship
    // 0.40 - 0.50: Steering helm & DSA dragons
    // 0.58: Docker Whale wide breach & Go companion
    // 0.70: Entering coastal Python Redwood forest
    // 0.82: React Atom Monolith sanctuary approach
    // 0.95: Final horizon backwards wide-angle crane retreat

    let targetCamPos = new THREE.Vector3(0, 4.5, 12);
    let targetLookAt = new THREE.Vector3(0, 1.2, 0);

    if (scrollProgress < 0.14) {
      // SCENE 01: DESERT & NODE MONUMENT
      // Aerial wide opening moving smoothly down behind the traveller
      const localP = scrollProgress / 0.14;
      targetCamPos.set(
        Math.sin(localP * 0.8) * 2.5,
        7.5 - localP * 4.5, // starts high (aerial), moves lower
        16.0 - localP * 12.0
      );
      targetLookAt.set(0, 1.4, -localP * 12);
    } else if (scrollProgress < 0.28) {
      // SCENE 02: DESERT BEACH & JAVA COFFEE
      const localP = (scrollProgress - 0.14) / 0.14;
      if (localP < 0.5) {
        // Transition down sand onto shoreline
        targetCamPos.set(1.5, 2.2, 12 + localP * 10);
        targetLookAt.set(2.0, 1.0, 20 + localP * 4);
      } else {
        // Close-up cinematic shot of traveller drinking coffee, steam & Java logo
        targetCamPos.set(3.4, 1.2, 23.5);
        targetLookAt.set(2.5, 0.85, 24);
      }
    } else if (scrollProgress < 0.42) {
      // SCENE 03: FURIOUS OCEAN & DSA DRAGONS
      const localP = (scrollProgress - 0.28) / 0.14;
      // Dramatic wide angles and sea spray tracking
      targetCamPos.set(
        -8 + localP * 4,
        4.8 + Math.sin(localP * 4) * 0.5,
        42 + localP * 10
      );
      targetLookAt.set(0, 2.0, 50);
    } else if (scrollProgress < 0.56) {
      // SCENE 04: KUBERNETES WHEEL & SHIP NAVIGATION
      const localP = (scrollProgress - 0.42) / 0.14;
      // Close tracking behind the helm wheel, showing turning wheel and leviathans
      targetCamPos.set(
        Math.sin(localP * 2) * 1.5,
        3.2,
        44.5 + localP * 4
      );
      targetLookAt.set(0, 2.7, 50);
    } else if (scrollProgress < 0.70) {
      // SCENE 05: DOCKER WHALE & GO MASCOT
      const localP = (scrollProgress - 0.56) / 0.14;
      // Wide shot panning with the whale and container pods
      targetCamPos.set(8.5, 3.8, 48 + localP * 8);
      targetLookAt.set(12, 1.5, 48);
    } else if (scrollProgress < 0.84) {
      // SCENE 06: PYTHON FOREST
      const localP = (scrollProgress - 0.70) / 0.14;
      // Tracking beneath dense redwoods, sunbeams and slithering serpents
      targetCamPos.set(
        -2.5 + localP * 3,
        2.8,
        86 + localP * 14
      );
      targetLookAt.set(0, 2.2, 95 + localP * 10);
    } else {
      // SCENE 07: REACT DESTINATION & THE HORIZON
      const localP = (scrollProgress - 0.84) / 0.16;
      if (localP < 0.6) {
        // Circling around the ancient React atom monument
        const angle = localP * Math.PI;
        targetCamPos.set(
          Math.sin(angle) * 11,
          4.2,
          140 + Math.cos(angle) * 11
        );
        targetLookAt.set(0, 4.5, 140);
      } else {
        // FINAL SHOT: Reverse crane shot receding into the infinite horizon
        const retreatP = (localP - 0.6) / 0.4;
        targetCamPos.set(0, 5.0 + retreatP * 6, 130 - retreatP * 20);
        targetLookAt.set(0, 2.0, 160);
      }
    }

    // Smooth cinematic damping (Lerp) to eliminate all jitter and sudden cuts
    currentPos.current.lerp(targetCamPos, 0.055);
    currentLookAt.current.lerp(targetLookAt, 0.055);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
