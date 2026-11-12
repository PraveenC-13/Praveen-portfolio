import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface TravellerModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  isWalking?: boolean;
  isDrinking?: boolean;
  isSteering?: boolean;
  scale?: number;
}

export const CinematicTraveller: React.FC<TravellerModelProps> = ({
  position = [0, 0, 0],
  rotation = [0, Math.PI, 0],
  isWalking = true,
  isDrinking = false,
  isSteering = false,
  scale = 1.0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const cloakRef = useRef<THREE.Mesh>(null);
  const coffeeCupRef = useRef<THREE.Group>(null);

  // Materials with weathered, dusty, photorealistic tactile aesthetics
  const coatMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2622', // Weathered dark charcoal/earth brown
    roughness: 0.88,
    metalness: 0.1,
  });

  const backpackMaterial = new THREE.MeshStandardMaterial({
    color: '#42362b', // Worn leather/heavy canvas
    roughness: 0.82,
    metalness: 0.15,
  });

  const pantsMaterial = new THREE.MeshStandardMaterial({
    color: '#1e1c1a', // Dusty weathered travel pants
    roughness: 0.92,
  });

  const bootsMaterial = new THREE.MeshStandardMaterial({
    color: '#151311', // Rugged expedition leather
    roughness: 0.65,
    metalness: 0.25,
  });

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: '#8d5534',
    roughness: 0.7,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
  });

  const coffeeLiquidMaterial = new THREE.MeshStandardMaterial({
    color: '#2b1408',
    roughness: 0.2,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isWalking && !isDrinking && !isSteering) {
        // Natural human walking gait simulation
        const walkSpeed = 3.5;
        const legSwing = Math.sin(t * walkSpeed) * 0.45;
        const armSwing = Math.cos(t * walkSpeed) * 0.4;
        const torsoBob = Math.abs(Math.sin(t * walkSpeed)) * 0.04;

        if (leftLegRef.current) leftLegRef.current.rotation.x = legSwing;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -legSwing;
        if (leftArmRef.current) leftArmRef.current.rotation.x = -armSwing;
        if (rightArmRef.current) rightArmRef.current.rotation.x = armSwing;
        if (torsoRef.current) {
          torsoRef.current.position.y = 0.85 + torsoBob;
          torsoRef.current.rotation.y = Math.sin(t * walkSpeed) * 0.05;
        }
        if (cloakRef.current) {
          cloakRef.current.rotation.x = 0.1 + Math.sin(t * walkSpeed * 2) * 0.06;
        }
      } else if (isDrinking) {
        // Sitting and drinking coffee pose
        if (torsoRef.current) torsoRef.current.position.y = 0.55;
        if (leftLegRef.current) {
          leftLegRef.current.rotation.x = -1.2;
          leftLegRef.current.position.y = 0.45;
        }
        if (rightLegRef.current) {
          rightLegRef.current.rotation.x = -1.2;
          rightLegRef.current.position.y = 0.45;
        }
        if (rightArmRef.current) {
          // Raising glass to drink periodically
          const sipCycle = (Math.sin(t * 1.5) + 1) * 0.5;
          rightArmRef.current.rotation.x = -0.5 - sipCycle * 0.9;
          rightArmRef.current.rotation.z = -0.3 + sipCycle * 0.2;
        }
      } else if (isSteering) {
        // Sailing ship steering pose: both hands gripping the wheel
        if (torsoRef.current) {
          torsoRef.current.position.y = 0.85 + Math.sin(t * 1.8) * 0.03;
          torsoRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -1.1;
          leftArmRef.current.rotation.z = 0.35 + Math.sin(t * 1.2) * 0.1;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -1.1;
          rightArmRef.current.rotation.z = -0.35 - Math.sin(t * 1.2) * 0.1;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Torso & Head */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        {/* Upper Body / Dust-worn Coat */}
        <mesh position={[0, 0.35, 0]} material={coatMaterial} castShadow>
          <boxGeometry args={[0.38, 0.52, 0.24]} />
        </mesh>

        {/* Cinematic Hood / Neck Scarf */}
        <mesh position={[0, 0.62, 0.03]} material={coatMaterial}>
          <cylinderGeometry args={[0.13, 0.17, 0.16, 12]} />
        </mesh>

        {/* Head Silhouette */}
        <mesh position={[0, 0.72, 0]} material={skinMaterial} castShadow>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>

        {/* Dust-worn Travel Cloak Cape Behind */}
        <mesh ref={cloakRef} position={[0, 0.28, -0.14]} material={coatMaterial} castShadow>
          <boxGeometry args={[0.42, 0.65, 0.04]} />
        </mesh>

        {/* Expedition Heavy Backpack */}
        <mesh position={[0, 0.35, -0.22]} material={backpackMaterial} castShadow>
          <boxGeometry args={[0.34, 0.44, 0.22]} />
        </mesh>
        {/* Bedroll strapped to top of backpack */}
        <mesh position={[0, 0.6, -0.22]} rotation={[0, 0, Math.PI / 2]} material={coatMaterial}>
          <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.24, 0.52, 0]}>
          <mesh position={[0, -0.22, 0]} material={coatMaterial} castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.44, 8]} />
          </mesh>
          <mesh position={[0, -0.46, 0]} material={skinMaterial}>
            <sphereGeometry args={[0.045, 8, 8]} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.24, 0.52, 0]}>
          <mesh position={[0, -0.22, 0]} material={coatMaterial} castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.44, 8]} />
          </mesh>
          <mesh position={[0, -0.46, 0]} material={skinMaterial}>
            <sphereGeometry args={[0.045, 8, 8]} />
          </mesh>

          {/* Transparent Glass Coffee Cup in Hand (active in Beach scene) */}
          {isDrinking && (
            <group ref={coffeeCupRef} position={[0, -0.5, 0.08]}>
              <mesh material={glassMaterial}>
                <cylinderGeometry args={[0.045, 0.035, 0.1, 16]} />
              </mesh>
              {/* Coffee Liquid */}
              <mesh position={[0, -0.01, 0]} material={coffeeLiquidMaterial}>
                <cylinderGeometry args={[0.04, 0.032, 0.08, 16]} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* Left Leg & Boot */}
      <group ref={leftLegRef} position={[-0.11, 0.85, 0]}>
        <mesh position={[0, -0.42, 0]} material={pantsMaterial} castShadow>
          <cylinderGeometry args={[0.075, 0.065, 0.85, 8]} />
        </mesh>
        <mesh position={[0, -0.85, 0.05]} material={bootsMaterial} castShadow>
          <boxGeometry args={[0.11, 0.12, 0.22]} />
        </mesh>
      </group>

      {/* Right Leg & Boot */}
      <group ref={rightLegRef} position={[0.11, 0.85, 0]}>
        <mesh position={[0, -0.42, 0]} material={pantsMaterial} castShadow>
          <cylinderGeometry args={[0.075, 0.065, 0.85, 8]} />
        </mesh>
        <mesh position={[0, -0.85, 0.05]} material={bootsMaterial} castShadow>
          <boxGeometry args={[0.11, 0.12, 0.22]} />
        </mesh>
      </group>
    </group>
  );
};
