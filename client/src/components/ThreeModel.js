import React, { Suspense} from "react";
import { Canvas} from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  useGLTF,
  Environment,
  Clone,
} from "@react-three/drei";


// 1. Model loader
function Model({ url }) {
  const { scene } = useGLTF(url); // cached original
  return <Clone object={scene} />; // clone it to avoid reloading
}


export default function ThreeModel({ src, size = 110 }) {
  
  return (
    <Canvas
      key={src}
      camera={{ fov: 35, position: [0, 0.2, 1.3] }}
      style={{ width: size, height: size }}
    >
      <ambientLight intensity={1} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <Center scale={1} cacheKey={src} position={[0, -0.2, 0]}>
          <Model url={src} />
        </Center>
      </Suspense>

      <OrbitControls autoRotate autoRotateSpeed={2.5} />
    </Canvas>
  );
}
