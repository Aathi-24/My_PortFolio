import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const FloatingShape = ({ position, color, scale = 1, speed = 1, shape = "sphere" }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  shape?: "sphere" | "torus" | "icosahedron";
}) => {
  const ShapeComponent = shape === "torus" ? Torus : shape === "icosahedron" ? Icosahedron : Sphere;
  const args = shape === "torus" ? [1, 0.4, 16, 32] : shape === "icosahedron" ? [1, 0] : [1, 32, 32];

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <ShapeComponent args={args as any} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.4}
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
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          
          <FloatingShape position={[-4, 2, -2]} color="#00f5ff" scale={0.8} speed={1.5} shape="sphere" />
          <FloatingShape position={[4, -1, -3]} color="#a855f7" scale={1} speed={1} shape="torus" />
          <FloatingShape position={[0, 3, -4]} color="#f0abfc" scale={0.6} speed={2} shape="icosahedron" />
          <FloatingShape position={[-3, -2, -2]} color="#00f5ff" scale={0.5} speed={1.8} shape="icosahedron" />
          <FloatingShape position={[3, 1, -1]} color="#a855f7" scale={0.4} speed={1.2} shape="sphere" />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
