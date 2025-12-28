import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, OrbitControls, MeshWobbleMaterial, Trail, Sparkles } from "@react-three/drei";
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
          pos += normal * sin(time * 2.0 + position.y * 3.0) * 0.05;
          
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
          
          float pulse = sin(time * 3.0) * 0.2 + 0.8;
          glowColor *= pulse;
          
          gl_FragColor = vec4(glowColor, glow * 0.8);
        }
      `}
      transparent
      side={THREE.DoubleSide}
    />
  );
};

// Mouse-following floating orb
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
      const targetX = mouse.x * 3 + offset[0];
      const targetY = mouse.y * 2 + offset[1];
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02 * speed;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02 * speed;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Trail
      width={2}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={offset}>
        <icosahedronGeometry args={[size, 1]} />
        <GlowMaterial color={color} intensity={1.5} />
      </mesh>
    </Trail>
  );
};

// Pulsating ring
const PulsatingRing = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1.5, 0.05, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
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
      meshRef.current.position.y = Math.sin(t) * radius * 0.5;
      meshRef.current.position.z = Math.sin(t) * radius * 0.3 - 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Central glowing core
const GlowingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      
      // Subtle mouse influence
      meshRef.current.rotation.x += mouse.y * 0.1;
      meshRef.current.rotation.y += mouse.x * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -3]}>
        <icosahedronGeometry args={[2, 2]} />
        <MeshDistortMaterial
          color="#00f5ff"
          transparent
          opacity={0.3}
          distort={0.4}
          speed={3}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

// Wireframe DNA helix
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 50 * Math.PI * 4;
      pts.push(new THREE.Vector3(
        Math.cos(t) * 0.5,
        (i / 50 - 0.5) * 4,
        Math.sin(t) * 0.5
      ));
    }
    return pts;
  }, []);

  const points2 = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 50 * Math.PI * 4 + Math.PI;
      pts.push(new THREE.Vector3(
        Math.cos(t) * 0.5,
        (i / 50 - 0.5) * 4,
        Math.sin(t) * 0.5
      ));
    }
    return pts;
  }, []);

  return (
    <group ref={groupRef} position={[4, 0, -2]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.5} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points2.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </line>
    </group>
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
      // Mouse influence
      meshRef.current.position.x = position[0] + mouse.x * 0.3;
      meshRef.current.position.y = position[1] + mouse.y * 0.3 + Math.sin(clock.getElapsedTime() * speed) * 0.3;
    }
  });

  const ShapeComponent = shape === "torus" ? Torus : shape === "icosahedron" ? Icosahedron : Sphere;
  const args = shape === "torus" ? [1, 0.4, 16, 32] : shape === "icosahedron" ? [1, 0] : [1, 32, 32];

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <ShapeComponent ref={meshRef} args={args as any} position={position} scale={scale}>
        <MeshWobbleMaterial
          color={color}
          transparent
          opacity={0.6}
          factor={0.3}
          speed={2}
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
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          <pointLight position={[0, 5, 0]} intensity={0.3} color="#f0abfc" />
          
          {/* Central glowing core */}
          <GlowingCore />
          
          {/* Mouse-following orbs with trails */}
          <MouseFollower color="#00f5ff" size={0.15} offset={[-3, 1, 0]} speed={1.5} />
          <MouseFollower color="#a855f7" size={0.12} offset={[3, -1, 0]} speed={1.2} />
          <MouseFollower color="#f0abfc" size={0.1} offset={[0, 2, 0]} speed={1.8} />
          
          {/* Pulsating rings */}
          <PulsatingRing position={[-3, 0, -4]} color="#00f5ff" />
          <PulsatingRing position={[3, 1, -5]} color="#a855f7" />
          
          {/* Orbiting particles */}
          <OrbitingParticle radius={4} speed={0.5} color="#00f5ff" size={0.08} />
          <OrbitingParticle radius={5} speed={0.3} color="#a855f7" size={0.06} />
          <OrbitingParticle radius={3.5} speed={0.7} color="#f0abfc" size={0.05} />
          
          {/* DNA Helix */}
          <DNAHelix />
          
          {/* Floating shapes with mouse influence */}
          <FloatingShape position={[-4, 2, -2]} color="#00f5ff" scale={0.6} speed={1.5} shape="sphere" />
          <FloatingShape position={[4, -1, -3]} color="#a855f7" scale={0.8} speed={1} shape="torus" />
          <FloatingShape position={[-2, -2, -2]} color="#f0abfc" scale={0.4} speed={1.8} shape="icosahedron" />
          
          {/* Sparkles for magical effect */}
          <Sparkles
            count={100}
            scale={12}
            size={2}
            speed={0.5}
            color="#00f5ff"
          />
          <Sparkles
            count={50}
            scale={10}
            size={1.5}
            speed={0.3}
            color="#a855f7"
          />
          
          {/* Subtle auto-rotation */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
