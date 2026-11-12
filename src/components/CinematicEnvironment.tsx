import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface EnvironmentProps {
  scrollProgress: number; // 0 to 1 across the full journey
}

export const CinematicEnvironment: React.FC<EnvironmentProps> = ({ scrollProgress }) => {
  const waterMeshRef = useRef<THREE.Mesh>(null);
  const sandDunesRef = useRef<THREE.Group>(null);
  const forestRef = useRef<THREE.Group>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  const monolithRef = useRef<THREE.Group>(null);
  const coffeeTableRef = useRef<THREE.Group>(null);
  const shipRef = useRef<THREE.Group>(null);
  const helmWheelRef = useRef<THREE.Group>(null);
  const whaleRef = useRef<THREE.Group>(null);
  const reactSanctuaryRef = useRef<THREE.Group>(null);
  const serpentsRef = useRef<THREE.Group>(null);
  const dsaDragonsRef = useRef<THREE.Group>(null);

  // Atmospheric particle generator (desert dust, sea spray, forest spores)
  const particleCount = 1200;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      sc[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sc];
  }, []);

  // Frame animation loop driven by time and scroll progress
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Water animation
    if (waterMeshRef.current) {
      const geom = waterMeshRef.current.geometry as THREE.PlaneGeometry;
      const posAttr = geom.attributes.position;
      // Animate wave displacement for violent ocean and gentle beach
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        const waveAmp = scrollProgress > 0.28 && scrollProgress < 0.65 ? 0.7 : 0.15;
        const waveFreq = scrollProgress > 0.28 && scrollProgress < 0.65 ? 1.8 : 0.8;
        const z = Math.sin(u * 0.2 + time * waveFreq) * Math.cos(v * 0.2 + time * waveFreq) * waveAmp;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // 2. Dust/Spray particles drift
    if (dustParticlesRef.current) {
      dustParticlesRef.current.rotation.y = time * 0.02;
      const positionsArray = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3 + 1] -= 0.03;
        if (positionsArray[i * 3 + 1] < 0) {
          positionsArray[i * 3 + 1] = 20;
        }
      }
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Kubernetes Steering Wheel Rotation
    if (helmWheelRef.current) {
      if (scrollProgress >= 0.40 && scrollProgress <= 0.55) {
        // Active steering evasion
        helmWheelRef.current.rotation.z = Math.sin(time * 2.2) * 1.2;
      } else {
        helmWheelRef.current.rotation.z = Math.sin(time * 0.6) * 0.2;
      }
    }

    // 4. Ship rocking in ocean
    if (shipRef.current) {
      shipRef.current.rotation.z = Math.sin(time * 1.5) * 0.07;
      shipRef.current.rotation.x = Math.cos(time * 1.2) * 0.05;
      shipRef.current.position.y = -0.5 + Math.sin(time * 2) * 0.15;
    }

    // 5. Docker Whale breaching motion
    if (whaleRef.current) {
      const whaleCycle = time * 0.8;
      whaleRef.current.position.y = -1.2 + Math.sin(whaleCycle) * 0.8;
      whaleRef.current.rotation.x = Math.sin(whaleCycle) * 0.15;
      whaleRef.current.rotation.z = Math.cos(whaleCycle) * 0.05;
    }

    // 6. Python serpents slithering
    if (serpentsRef.current) {
      serpentsRef.current.children.forEach((child, index) => {
        child.rotation.y = Math.sin(time * 1.2 + index) * 0.2;
        child.position.x = Math.sin(time * 0.8 + index * 2) * 0.4;
      });
    }

    // 7. React Atom Core Orbits
    if (reactSanctuaryRef.current) {
      const ring1 = reactSanctuaryRef.current.getObjectByName('ring1');
      const ring2 = reactSanctuaryRef.current.getObjectByName('ring2');
      const ring3 = reactSanctuaryRef.current.getObjectByName('ring3');
      if (ring1) ring1.rotation.z = time * 0.8;
      if (ring2) ring2.rotation.z = time * 0.8 + (Math.PI / 3);
      if (ring3) ring3.rotation.z = time * 0.8 + (Math.PI * 2 / 3);
    }
  });

  // Calculate dynamic lighting and fog based on continuous scroll sequence
  // 0.0 - 0.15: Desert (warm sand, bronze gold)
  // 0.15 - 0.28: Beach (golden sunset, pale sand)
  // 0.28 - 0.55: Violent Ocean & DSA Dragons & Helm (dark navy, storm clouds, lightning)
  // 0.55 - 0.68: Docker Whale (calm cold ocean, twilight blue)
  // 0.68 - 0.85: Python Forest (deep moss green, sunbeams)
  // 0.85 - 1.0: React Sanctuary & Destination (warm twilight, stone grey)

  const fogColor = useMemo(() => {
    if (scrollProgress < 0.16) return new THREE.Color('#d4a373'); // Sandstone
    if (scrollProgress < 0.30) return new THREE.Color('#e0a96d'); // Warm Sunset
    if (scrollProgress < 0.56) return new THREE.Color('#0a131c'); // Violent Storm Ocean
    if (scrollProgress < 0.70) return new THREE.Color('#0c202d'); // Calm Docker Deep
    if (scrollProgress < 0.86) return new THREE.Color('#13241b'); // Dense Forest
    return new THREE.Color('#181b22'); // React Sanctuary
  }, [scrollProgress]);

  const sunColor = useMemo(() => {
    if (scrollProgress < 0.16) return '#ffdfa0';
    if (scrollProgress < 0.30) return '#ffaa5e';
    if (scrollProgress < 0.56) return '#486581';
    if (scrollProgress < 0.70) return '#627d98';
    if (scrollProgress < 0.86) return '#99e9f2';
    return '#8ecae6';
  }, [scrollProgress]);

  return (
    <>
      {/* Volumetric Fog & Atmospheric Environment */}
      <fog attach="fog" args={[fogColor.getHexString() ? `#${fogColor.getHexString()}` : '#d4a373', 10, 55]} />
      
      {/* Natural Sunlight */}
      <directionalLight
        position={[25, 30, 20]}
        intensity={scrollProgress > 0.30 && scrollProgress < 0.60 ? 0.6 : 1.8}
        color={sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={90}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <ambientLight intensity={scrollProgress > 0.30 && scrollProgress < 0.60 ? 0.25 : 0.65} color={sunColor} />

      {/* Atmospheric Dust & Wind Particles */}
      <points ref={dustParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color={scrollProgress > 0.30 && scrollProgress < 0.60 ? '#8da4c4' : '#e2b17a'}
          transparent
          opacity={0.45}
        />
      </points>

      {/* ============================================================== */}
      {/* SCENE 01: ENDLESS DESERT & NODE.JS MONUMENT */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]} visible={scrollProgress <= 0.30}>
        {/* Sand Dunes Terrain Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[120, 120, 32, 32]} />
          <meshStandardMaterial color="#c2915c" roughness={0.95} />
        </mesh>

        {/* Sculpted Sand Dune ridges */}
        <group ref={sandDunesRef}>
          <mesh position={[-15, 1.8, -12]} rotation={[0, 0.4, 0]}>
            <coneGeometry args={[14, 3.8, 5]} />
            <meshStandardMaterial color="#b37e49" roughness={0.96} />
          </mesh>
          <mesh position={[18, 2.2, -18]} rotation={[0, -0.6, 0]}>
            <coneGeometry args={[16, 4.4, 5]} />
            <meshStandardMaterial color="#c99763" roughness={0.96} />
          </mesh>
          <mesh position={[-25, 3.5, -35]}>
            <coneGeometry args={[22, 7.0, 5]} />
            <meshStandardMaterial color="#9f6b39" roughness={0.98} />
          </mesh>
        </group>

        {/* Gigantic Ancient Stone Node.js Monument */}
        <group ref={monolithRef} position={[0, 4.5, -22]}>
          {/* Main Weathered Hexagonal Stone Monolith */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[4.2, 5.0, 9.5, 6]} />
            <meshStandardMaterial
              color="#54493b" // Weathered ancient sandstone/basalt
              roughness={0.9}
              metalness={0.12}
            />
          </mesh>

          {/* Stepped Monument Foundation */}
          <mesh position={[0, -4.5, 0]} receiveShadow>
            <cylinderGeometry args={[6.5, 7.5, 1.2, 6]} />
            <meshStandardMaterial color="#41382e" roughness={0.95} />
          </mesh>

          {/* Physically Carved Hexagonal Node.js Glyph in Deep Relief */}
          <group position={[0, 0.5, 3.7]} rotation={[0, 0, 0]}>
            {/* Outer carved hexagon depression */}
            <mesh position={[0, 0, -0.15]}>
              <cylinderGeometry args={[2.2, 2.2, 0.35, 6]} />
              <meshStandardMaterial color="#2d3a28" roughness={0.7} />
            </mesh>
            {/* Embedded glowing ancient stone Node glyph */}
            <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.3, 1.75, 6]} />
              <meshStandardMaterial color="#48883b" emissive="#1f4b16" emissiveIntensity={0.65} roughness={0.6} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SCENE 02: THE DESERT BEACH & JAVA COFFEE MOMENT */}
      {/* ============================================================== */}
      <group position={[0, 0, 20]} visible={scrollProgress > 0.12 && scrollProgress <= 0.35}>
        {/* Coastal sand shoreline */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[100, 60, 24, 24]} />
          <meshStandardMaterial color="#d8bc98" roughness={0.9} />
        </mesh>

        {/* Shoreline water foam edge */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 14]}>
          <planeGeometry args={[90, 16]} />
          <meshStandardMaterial color="#3a6073" transparent opacity={0.65} roughness={0.2} />
        </mesh>

        {/* Weathered Wooden Bench / Shore Rock where traveller pauses */}
        <group ref={coffeeTableRef} position={[2.5, 0.35, 4]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.55, 0.9]} />
            <meshStandardMaterial color="#3a2f26" roughness={0.88} />
          </mesh>
          
          {/* Glass of Steaming Java Coffee with authentic emblem */}
          <group position={[0.3, 0.45, 0]}>
            {/* Transparent glass cylinder */}
            <mesh castShadow>
              <cylinderGeometry args={[0.16, 0.12, 0.35, 24]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.92}
                opacity={1}
                transparent
                roughness={0.08}
                ior={1.52}
              />
            </mesh>
            {/* Rich dark espresso inside */}
            <mesh position={[0, -0.02, 0]}>
              <cylinderGeometry args={[0.145, 0.11, 0.3, 20]} />
              <meshStandardMaterial color="#220e04" roughness={0.15} />
            </mesh>
            {/* Java Logo red steam flame emblem on glass */}
            <mesh position={[0, 0.02, 0.155]}>
              <planeGeometry args={[0.18, 0.18]} />
              <meshBasicMaterial color="#e63946" transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>
            {/* Realistic Rising Coffee Steam Wisps */}
            <points position={[0, 0.3, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={25}
                  array={new Float32Array([
                    0, 0.05, 0,  0.02, 0.15, 0.01,  -0.02, 0.25, -0.01,
                    0.03, 0.35, 0.02,  -0.04, 0.45, -0.02,  0.01, 0.55, 0.01,
                    -0.03, 0.12, 0.02,  0.04, 0.22, -0.01,  -0.01, 0.32, 0.03,
                    0.05, 0.42, -0.02,  -0.02, 0.52, 0.01,  0.03, 0.62, -0.01,
                    0.01, 0.18, -0.02,  -0.03, 0.28, 0.02,  0.02, 0.38, -0.01,
                    -0.04, 0.48, 0.03,  0.02, 0.58, -0.02,  -0.01, 0.68, 0.01,
                    0.03, 0.14, 0.01,  -0.02, 0.24, -0.03,  0.04, 0.34, 0.02,
                    -0.01, 0.44, -0.01,  0.02, 0.54, 0.03,  -0.03, 0.64, -0.02,
                    0.01, 0.72, 0.01
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <pointsMaterial size={0.06} color="#f8edeb" transparent opacity={0.35} />
            </points>
          </group>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SCENE 03 & 04: FURIOUS OCEAN, DSA DRAGONS & KUBERNETES HELM */}
      {/* ============================================================== */}
      <group position={[0, 0, 50]} visible={scrollProgress > 0.25 && scrollProgress <= 0.68}>
        {/* Dynamic Storm Water Surface */}
        <mesh ref={waterMeshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
          <planeGeometry args={[150, 150, 64, 64]} />
          <meshStandardMaterial
            color={scrollProgress > 0.55 ? '#091c28' : '#05111a'} // Deep navy to violent storm teal
            roughness={0.12}
            metalness={0.7}
          />
        </mesh>

        {/* Massive Realistic Wooden Sailing Ship */}
        <group ref={shipRef} position={[0, 0.4, 0]}>
          {/* Main Hull Structure */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 2.4, 15.5]} />
            <meshStandardMaterial color="#2d2015" roughness={0.82} />
          </mesh>
          {/* Ship Bow Wedge */}
          <mesh position={[0, 0.2, 8.5]} rotation={[0, 0, 0]} castShadow>
            <coneGeometry args={[2.8, 4.2, 4]} />
            <meshStandardMaterial color="#22170d" roughness={0.85} />
          </mesh>
          {/* Main Mast with Rigging */}
          <mesh position={[0, 5.2, -1.5]} castShadow>
            <cylinderGeometry args={[0.22, 0.3, 11, 12]} />
            <meshStandardMaterial color="#3c2a1a" roughness={0.8} />
          </mesh>
          {/* Billowing Storm Canvas Sails */}
          <mesh position={[0, 6.2, -1.3]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[6.8, 5.2, 0.15]} />
            <meshStandardMaterial color="#c8baa5" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>

          {/* Ship Stern Deck / Quarterdeck */}
          <mesh position={[0, 1.4, -4.8]} castShadow receiveShadow>
            <boxGeometry args={[3.8, 1.2, 4.8]} />
            <meshStandardMaterial color="#2a1e14" roughness={0.85} />
          </mesh>

          {/* ============================================================== */}
          {/* 4. THE KUBERNETES STEERING WHEEL */}
          {/* ============================================================== */}
          <group position={[0, 2.3, -4.2]}>
            {/* Helm Support Stand */}
            <mesh position={[0, -0.3, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.24, 0.85, 12]} />
              <meshStandardMaterial color="#251b12" roughness={0.75} />
            </mesh>

            {/* Rotating Ship's Wheel with Kubernetes 7-Spoke Hub */}
            <group ref={helmWheelRef} position={[0, 0.32, 0]}>
              {/* Outer Timber Rim */}
              <mesh castShadow>
                <torusGeometry args={[0.75, 0.055, 12, 32]} />
                <meshStandardMaterial color="#3f2b1c" roughness={0.65} />
              </mesh>
              {/* 7 Evenly Spaced Spokes (Kubernetes 7-spoke signature) */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const angle = (i * 2 * Math.PI) / 7;
                return (
                  <group key={i} rotation={[0, 0, angle]}>
                    {/* Spoke handle extending outward */}
                    <mesh position={[0, 0.42, 0]}>
                      <cylinderGeometry args={[0.028, 0.028, 0.88, 8]} />
                      <meshStandardMaterial color="#8a6136" roughness={0.7} />
                    </mesh>
                    {/* Outer handle peg */}
                    <mesh position={[0, 0.9, 0]}>
                      <cylinderGeometry args={[0.038, 0.02, 0.24, 8]} />
                      <meshStandardMaterial color="#47321e" roughness={0.6} />
                    </mesh>
                  </group>
                );
              })}
              {/* Central Core Medallion with Kubernetes Blue Emblem */}
              <mesh position={[0, 0, 0.02]}>
                <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
                <meshStandardMaterial color="#326ce5" metalness={0.4} roughness={0.3} />
              </mesh>
              {/* Inner 7-spoke Helm Heptagon Ring */}
              <mesh position={[0, 0, 0.07]}>
                <ringGeometry args={[0.08, 0.2, 7]} />
                <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
              </mesh>
            </group>
          </group>
        </group>

        {/* ============================================================== */}
        {/* SCENE 03: THE 9 DSA DRAGONS (MYTHICAL OCEAN LEVIATHANS) */}
        {/* ============================================================== */}
        <group ref={dsaDragonsRef}>
          {/* DRAGON 01: ARRAY DRAGON - Segmented Contiguous Armoured Leviathan */}
          <group position={[-16, 2.5, 6]} rotation={[0, 0.4, 0]}>
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <mesh key={idx} position={[0, Math.sin(idx * 0.6) * 0.8, -idx * 2.2]} castShadow>
                <boxGeometry args={[2.4, 1.8, 1.9]} />
                <meshStandardMaterial color="#2d4a3e" roughness={0.7} metalness={0.3} />
              </mesh>
            ))}
            {/* Dragon Head with glowing amber indexed eyes */}
            <mesh position={[0, 0.6, 1.4]}>
              <coneGeometry args={[1.5, 2.8, 5]} />
              <meshStandardMaterial color="#1a2f26" roughness={0.6} />
            </mesh>
          </group>

          {/* DRAGON 02: LINKED LIST SERPENT - Chained Node Leviathan */}
          <group position={[18, 1.8, -4]} rotation={[0, -0.6, 0]}>
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <group key={idx} position={[Math.sin(idx * 0.8) * 2.5, 0, -idx * 2.8]}>
                <mesh castShadow>
                  <sphereGeometry args={[1.1, 16, 16]} />
                  <meshStandardMaterial color="#1f4438" roughness={0.65} />
                </mesh>
                {/* Glowing Link Pointer Conduit */}
                {idx < 6 && (
                  <mesh position={[0.5, 0, -1.4]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.12, 0.12, 1.8, 8]} />
                    <meshBasicMaterial color="#10b981" />
                  </mesh>
                )}
              </group>
            ))}
          </group>

          {/* DRAGON 03: STACK DRAGON - Vertical Towering Basalt Column */}
          <group position={[-24, 5.0, -14]}>
            {[0, 1, 2, 3, 4].map((idx) => (
              <mesh key={idx} position={[0, idx * 2.2, 0]} castShadow>
                <cylinderGeometry args={[2.4 - idx * 0.25, 2.8 - idx * 0.25, 1.8, 6]} />
                <meshStandardMaterial color="#3b334a" roughness={0.8} />
              </mesh>
            ))}
            {/* Topmost active plate (Last In, First Out) */}
            <mesh position={[0, 11, 0]}>
              <ringGeometry args={[0.5, 2.0, 6]} />
              <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* DRAGON 05: TREE DRAGON / BST - Branching Coral Monster */}
          <group position={[25, 4.0, 18]}>
            <mesh position={[0, 2, 0]} castShadow>
              <cylinderGeometry args={[1.2, 2.4, 7, 10]} />
              <meshStandardMaterial color="#1b3d32" roughness={0.85} />
            </mesh>
            {/* Left Branch */}
            <mesh position={[-2.4, 5.5, 0]} rotation={[0, 0, 0.6]}>
              <cylinderGeometry args={[0.7, 1.1, 5, 8]} />
              <meshStandardMaterial color="#234e40" roughness={0.8} />
            </mesh>
            {/* Right Branch */}
            <mesh position={[2.4, 5.5, 0]} rotation={[0, 0, -0.6]}>
              <cylinderGeometry args={[0.7, 1.1, 5, 8]} />
              <meshStandardMaterial color="#234e40" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* ============================================================== */}
        {/* SCENE 05: THE DOCKER WHALE & GO COMPANION */}
        {/* ============================================================== */}
        <group ref={whaleRef} position={[12, -0.5, -2]} visible={scrollProgress > 0.48 && scrollProgress < 0.72}>
          {/* Massive Oceanic Blue Whale Body */}
          <mesh castShadow>
            <coneGeometry args={[4.2, 19, 20]} />
            <meshStandardMaterial
              color="#1a415a" // Natural oceanic blue-grey whale skin
              roughness={0.45}
              metalness={0.2}
            />
          </mesh>

          {/* Whale Tail Flukes */}
          <mesh position={[0, 0.4, -9.8]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[7.2, 0.35, 2.8]} />
            <meshStandardMaterial color="#123044" roughness={0.5} />
          </mesh>

          {/* Whale Flippers / Fins */}
          <mesh position={[-4.2, -0.4, 2]} rotation={[0, 0.3, -0.5]}>
            <boxGeometry args={[4.2, 0.28, 1.8]} />
            <meshStandardMaterial color="#123044" roughness={0.5} />
          </mesh>
          <mesh position={[4.2, -0.4, 2]} rotation={[0, -0.3, 0.5]}>
            <boxGeometry args={[4.2, 0.28, 1.8]} />
            <meshStandardMaterial color="#123044" roughness={0.5} />
          </mesh>

          {/* Signature Containers Stacked on Whale's Back (Official Docker Motif) */}
          <group position={[0, 2.6, 1.5]}>
            {/* Container Row 1 */}
            <mesh position={[-1.2, 0, -1.5]} castShadow>
              <boxGeometry args={[1.4, 1.1, 2.2]} />
              <meshStandardMaterial color="#205f8b" roughness={0.7} />
            </mesh>
            <mesh position={[0.6, 0, -1.5]} castShadow>
              <boxGeometry args={[1.4, 1.1, 2.2]} />
              <meshStandardMaterial color="#2b77ab" roughness={0.7} />
            </mesh>
            <mesh position={[-0.8, 0, 1.0]} castShadow>
              <boxGeometry args={[1.4, 1.1, 2.2]} />
              <meshStandardMaterial color="#205f8b" roughness={0.7} />
            </mesh>
            <mesh position={[1.0, 0, 1.0]} castShadow>
              <boxGeometry args={[1.4, 1.1, 2.2]} />
              <meshStandardMaterial color="#3289c4" roughness={0.7} />
            </mesh>
            {/* Top Tier Container */}
            <mesh position={[0, 1.1, -0.2]} castShadow>
              <boxGeometry args={[1.5, 1.1, 2.2]} />
              <meshStandardMaterial color="#2496ed" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Go Gopher Mascot perched gracefully atop the whale container */}
            <group position={[0, 2.0, -0.2]}>
              {/* Gopher Body */}
              <mesh castShadow>
                <cylinderGeometry args={[0.34, 0.36, 0.72, 16]} />
                <meshStandardMaterial color="#00add8" roughness={0.5} />
              </mesh>
              {/* Gopher Big Round Eyes */}
              <mesh position={[-0.14, 0.22, 0.32]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[-0.14, 0.22, 0.41]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#111111" />
              </mesh>
              <mesh position={[0.14, 0.22, 0.32]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0.14, 0.22, 0.41]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#111111" />
              </mesh>
              {/* Gopher Snout & Front Teeth */}
              <mesh position={[0, 0.08, 0.34]}>
                <sphereGeometry args={[0.09, 10, 10]} />
                <meshStandardMaterial color="#f7dbaf" />
              </mesh>
              <mesh position={[0, 0.01, 0.41]}>
                <boxGeometry args={[0.07, 0.07, 0.04]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SCENE 06: THE PYTHON FOREST & SLITHERING SERPENTS */}
      {/* ============================================================== */}
      <group ref={forestRef} position={[0, 0, 95]} visible={scrollProgress > 0.60 && scrollProgress <= 0.88}>
        {/* Forest Mossy Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[110, 110, 32, 32]} />
          <meshStandardMaterial color="#1c2b1e" roughness={0.95} />
        </mesh>

        {/* Towering Primeval Redwood & Pine Trees */}
        {[-14, -8, -18, 9, 16, 22, -4, 5].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0, -idx * 4 - 6]}>
            {/* Tree Trunk */}
            <mesh position={[0, 7.5, 0]} castShadow>
              <cylinderGeometry args={[0.65, 1.2, 16, 10]} />
              <meshStandardMaterial color="#2a1d13" roughness={0.92} />
            </mesh>
            {/* Dense Foliage Canopy */}
            <mesh position={[0, 15, 0]} castShadow>
              <coneGeometry args={[4.2, 9, 8]} />
              <meshStandardMaterial color="#16301d" roughness={0.88} />
            </mesh>
            <mesh position={[0, 19, 0]} castShadow>
              <coneGeometry args={[3.2, 7, 8]} />
              <meshStandardMaterial color="#21422a" roughness={0.88} />
            </mesh>
          </group>
        ))}

        {/* Carved Python Stone Emblem Monolith in the clearing */}
        <group position={[0, 3.2, -18]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[3.2, 3.8, 6.4, 8]} />
            <meshStandardMaterial color="#232724" roughness={0.85} />
          </mesh>
          {/* Dual Blue and Yellow Intertwined Python Serpent Glyphs */}
          <group position={[0, 0.4, 3.1]}>
            <mesh position={[-0.45, 0.45, 0]}>
              <boxGeometry args={[1.3, 0.55, 0.25]} />
              <meshStandardMaterial color="#3776ab" metalness={0.2} roughness={0.5} />
            </mesh>
            <mesh position={[0.45, -0.45, 0]}>
              <boxGeometry args={[1.3, 0.55, 0.25]} />
              <meshStandardMaterial color="#ffd43b" metalness={0.2} roughness={0.5} />
            </mesh>
          </group>
        </group>

        {/* Slithering Serpents through the undergrowth */}
        <group ref={serpentsRef} position={[0, 0.2, -6]}>
          <group position={[-3.5, 0, 0]}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <mesh key={i} position={[Math.sin(i * 0.9) * 0.7, 0.18, -i * 0.8]} castShadow>
                <sphereGeometry args={[0.22 - i * 0.015, 12, 12]} />
                <meshStandardMaterial color="#29587e" roughness={0.4} />
              </mesh>
            ))}
          </group>
          <group position={[3.8, 0, -2]}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <mesh key={i} position={[Math.cos(i * 0.9) * 0.7, 0.18, -i * 0.8]} castShadow>
                <sphereGeometry args={[0.22 - i * 0.015, 12, 12]} />
                <meshStandardMaterial color="#d4a326" roughness={0.4} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SCENE 07: THE REACT DESTINATION & ATOM SANCTUARY */}
      {/* ============================================================== */}
      <group ref={reactSanctuaryRef} position={[0, 0, 140]} visible={scrollProgress > 0.80}>
        {/* Ancient Stone Sanctuary Plaza Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <cylinderGeometry args={[26, 28, 0.4, 32]} />
          <meshStandardMaterial color="#21262d" roughness={0.88} />
        </mesh>

        {/* Outer Circular Monolithic Pillars */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          const px = Math.cos(angle) * 16;
          const pz = Math.sin(angle) * 16;
          return (
            <mesh key={i} position={[px, 4.5, pz]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 9.5, 1.6]} />
              <meshStandardMaterial color="#2c333e" roughness={0.85} />
            </mesh>
          );
        })}

        {/* Central Altar Monument Structure */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4.5, 5.5, 2.4, 12]} />
          <meshStandardMaterial color="#1a1e24" roughness={0.8} />
        </mesh>

        {/* Monumental Rotating Authentic React Atom Sculpture */}
        <group position={[0, 5.2, 0]}>
          {/* Central Nucleus Core */}
          <mesh castShadow>
            <sphereGeometry args={[0.75, 24, 24]} />
            <meshStandardMaterial
              color="#61dafb"
              emissive="#1565c0"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* 3 Orbital Elliptical Rings inclined at 60 degree offsets */}
          <mesh name="ring1" rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.2, 0.09, 16, 64]} />
            <meshStandardMaterial color="#61dafb" emissive="#0d47a1" emissiveIntensity={0.5} roughness={0.3} />
          </mesh>
          <mesh name="ring2" rotation={[Math.PI / 2, Math.PI / 3, 0]}>
            <torusGeometry args={[3.2, 0.09, 16, 64]} />
            <meshStandardMaterial color="#61dafb" emissive="#0d47a1" emissiveIntensity={0.5} roughness={0.3} />
          </mesh>
          <mesh name="ring3" rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
            <torusGeometry args={[3.2, 0.09, 16, 64]} />
            <meshStandardMaterial color="#61dafb" emissive="#0d47a1" emissiveIntensity={0.5} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </>
  );
};
