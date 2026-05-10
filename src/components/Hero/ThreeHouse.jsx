import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, Box, Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// House mesh built from primitives
function House() {
  return (
    <group position={[0, -1, 0]}>
      {/* Main body */}
      <Box args={[3, 2, 2.5]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#E8C5A0" roughness={0.6} />
      </Box>

      {/* Roof */}
      <Cone args={[2.4, 1.6, 4]} position={[0, 2.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#C4856A" roughness={0.5} />
      </Cone>

      {/* Door */}
      <Box args={[0.6, 1.0, 0.05]} position={[0, 0.5, 1.28]}>
        <meshStandardMaterial color="#7A4A2A" roughness={0.8} />
      </Box>

      {/* Door handle */}
      <Sphere args={[0.06]} position={[0.22, 0.5, 1.34]}>
        <meshStandardMaterial color="#D4A574" metalness={0.7} roughness={0.2} />
      </Sphere>

      {/* Window left */}
      <Box args={[0.7, 0.6, 0.05]} position={[-0.9, 1.2, 1.28]}>
        <meshStandardMaterial color="#A8D4F5" opacity={0.7} transparent roughness={0.1} />
      </Box>

      {/* Window right */}
      <Box args={[0.7, 0.6, 0.05]} position={[0.9, 1.2, 1.28]}>
        <meshStandardMaterial color="#A8D4F5" opacity={0.7} transparent roughness={0.1} />
      </Box>

      {/* Chimney */}
      <Cylinder args={[0.15, 0.15, 0.8]} position={[0.9, 3.4, -0.4]}>
        <meshStandardMaterial color="#8B5E3C" roughness={0.7} />
      </Cylinder>

      {/* Ground / grass patch */}
      <Box args={[5, 0.1, 4]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#7DAF7A" roughness={0.9} />
      </Box>

      {/* Garden flowers (tiny) */}
      {[-1.5, -1, 1, 1.5].map((x, i) => (
        <group key={i} position={[x, 0.15, 1.6]}>
          <Cylinder args={[0.04, 0.04, 0.3]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#5A8A5A" />
          </Cylinder>
          <Sphere args={[0.12]} position={[0, 0.35, 0]}>
            <meshStandardMaterial color={['#FF9EBB', '#FFD700', '#FF7BAC', '#C8A2FF'][i]} />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

// Floating cloud built from overlapping spheres
function Cloud({ position, scale = 1 }) {
  return (
    <Float speed={0.8} rotationIntensity={0} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        <Sphere args={[0.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="white" roughness={1} opacity={0.85} transparent />
        </Sphere>
        <Sphere args={[0.35]} position={[0.55, 0.1, 0]}>
          <meshStandardMaterial color="white" roughness={1} opacity={0.85} transparent />
        </Sphere>
        <Sphere args={[0.35]} position={[-0.55, 0.05, 0]}>
          <meshStandardMaterial color="white" roughness={1} opacity={0.85} transparent />
        </Sphere>
        <Sphere args={[0.28]} position={[0.9, -0.05, 0]}>
          <meshStandardMaterial color="white" roughness={1} opacity={0.85} transparent />
        </Sphere>
        <Sphere args={[0.28]} position={[-0.9, -0.05, 0]}>
          <meshStandardMaterial color="white" roughness={1} opacity={0.85} transparent />
        </Sphere>
      </group>
    </Float>
  );
}

// Slowly rotating scene camera rig
function CameraRig() {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.08;
    }
  });
  return (
    <group ref={groupRef}>
      <House />
      <Cloud position={[-4, 3, -3]} scale={0.9} />
      <Cloud position={[4, 2.5, -4]} scale={0.7} />
      <Cloud position={[-2, 3.5, -5]} scale={0.6} />
      <Cloud position={[5.5, 3, -2]} scale={0.5} />
    </group>
  );
}

export default function ThreeHouse() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 52 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Warm sky gradient via fog */}
      <color attach="background" args={['#FFE0B2']} />
      <fog attach="fog" args={['#FFD0A0', 20, 50]} />

      {/* Lighting */}
      <ambientLight intensity={0.7} color="#FFF5E0" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color="#FFD080"
        castShadow
      />
      <pointLight position={[0, 0.8, 1.5]} intensity={0.5} color="#FFA040" />

      <Environment preset="sunset" />

      <CameraRig />
    </Canvas>
  );
}
