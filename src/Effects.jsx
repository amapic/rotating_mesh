import * as THREE from "three";
import React, { useMemo, useState, useRef, useEffect, useFrame } from "react";
import { Effects as EffectsComposer } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

export const Effects = () => {
  const { size, scene, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size
  ]);

  return (
    <EffectsComposer
      multisamping={8}
      renderIndex={1}
      disableGamma
      disableRenderPass
    >
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.4, 1, 0]} />
    </EffectsComposer>
  );
};

export function BloomPerso({ children }) {
  const { gl, camera, size } = useThree();
  const [scene, setScene] = useState();
  const composer = useRef();
  useEffect(
    () => void scene && composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(() => scene && composer.current.render(), 1);
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  );
}
