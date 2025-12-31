import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, OrbitControls, MeshWobbleMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// Custom shader for glowing effect
const GlowMaterial = ({ color = "#00f5ff", intensity = 1 }: { color?: string; intensity?: number }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color: { value: new THREE.Color(color) },
    intensity: { value: intensity },
  }), [color, intensity]);

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          vec3 pos = position;
          pos += normal * sin(time * 1.5 + position.y * 2.0) * 0.02;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `}
      fragmentShader={`
        uniform vec3 color;
        uniform float intensity;
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float glow = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glowColor = color * glow * intensity;
          
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          glowColor *= pulse;
          
          gl_FragColor = vec4(glowColor, glow * 0.6);
        }
      `}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

// Mouse-following floating orb (no trail)
const MouseFollower = ({ color, size, offset, speed }: { 
  color: string; 
  size: number; 
  offset: [number, number, number];
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const targetX = mouse.x * 1.5 + offset[0];
      const targetY = mouse.y * 1 + offset[1];
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.015 * speed;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.015 * speed;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={offset}>
      <icosahedronGeometry args={[size, 1]} />
      <GlowMaterial color={color} intensity={1} />
    </mesh>
  );
};

// Pulsating ring
const PulsatingRing = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.2, 0.04, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

// Orbiting particles
const OrbitingParticle = ({ radius, speed, color, size }: { 
  radius: number; 
  speed: number; 
  color: string;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.y = Math.sin(t) * radius * 0.4;
      meshRef.current.position.z = Math.sin(t) * radius * 0.2 - 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

// Central glowing core
const GlowingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      
      // Subtle mouse influence
      meshRef.current.rotation.x += mouse.y * 0.05;
      meshRef.current.rotation.y += mouse.x * 0.05;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, -3]}>
        <icosahedronGeometry args={[1.8, 2]} />
        <MeshDistortMaterial
          color="#00f5ff"
          transparent
          opacity={0.2}
          distort={0.25}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

const FloatingShape = ({ position, color, scale = 1, speed = 1, shape = "sphere" }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  shape?: "sphere" | "torus" | "icosahedron";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Reduced mouse influence
      meshRef.current.position.x = position[0] + mouse.x * 0.15;
      meshRef.current.position.y = position[1] + mouse.y * 0.15 + Math.sin(clock.getElapsedTime() * speed) * 0.2;
    }
  });

  const ShapeComponent = shape === "torus" ? Torus : shape === "icosahedron" ? Icosahedron : Sphere;
  const args = shape === "torus" ? [1, 0.4, 16, 32] : shape === "icosahedron" ? [1, 0] : [1, 32, 32];

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.3} floatIntensity={1}>
      <ShapeComponent ref={meshRef} args={args as any} position={position} scale={scale}>
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.4}
          factor={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </ShapeComponent>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />
          <pointLight position={[0, 5, 0]} intensity={0.2} color="#f0abfc" />
          
          {/* Central glowing core */}
          <GlowingCore />
          
          {/* Mouse-following orbs (no trails) */}
          <MouseFollower color="#00f5ff" size={0.12} offset={[-3, 1, 0]} speed={1.2} />
          <MouseFollower color="#a855f7" size={0.1} offset={[3, -1, 0]} speed={1} />
          <MouseFollower color="#f0abfc" size={0.08} offset={[0, 2, 0]} speed={1.4} />
          
          {/* Pulsating rings */}
          <PulsatingRing position={[-3, 0, -4]} color="#00f5ff" />
          <PulsatingRing position={[3, 1, -5]} color="#a855f7" />
          
          {/* Orbiting particles */}
          <OrbitingParticle radius={4} speed={0.3} color="#00f5ff" size={0.06} />
          <OrbitingParticle radius={5} speed={0.2} color="#a855f7" size={0.05} />
          <OrbitingParticle radius={3.5} speed={0.4} color="#f0abfc" size={0.04} />
          
          {/* Floating shapes with reduced mouse influence */}
          <FloatingShape position={[-4, 2, -2]} color="#00f5ff" scale={0.5} speed={1} shape="sphere" />
          <FloatingShape position={[4, -1, -3]} color="#a855f7" scale={0.6} speed={0.8} shape="torus" />
          <FloatingShape position={[-2, -2, -2]} color="#f0abfc" scale={0.3} speed={1.2} shape="icosahedron" />
          
          {/* Reduced sparkles */}
          <Sparkles
            count={60}
            scale={12}
            size={1.5}
            speed={0.3}
            color="#00f5ff"
          />
          <Sparkles
            count={30}
            scale={10}
            size={1}
            speed={0.2}
            color="#a855f7"
          />
          
          {/* Subtle auto-rotation */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
