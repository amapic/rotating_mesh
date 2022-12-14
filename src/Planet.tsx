import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer
} from "@react-three/drei";

import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import * as three from "three";
import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import AA, { CardPlanet } from "./Text";

export function Tt() {
  const colorMap = useLoader(TextureLoader, "/earth.jpg");
  // useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default function Planet({ radius, image, ...args }) {
  const cube = useRef<three.Mesh>();

  const colorMap = useLoader(TextureLoader, image.colorMap);

  const [sphereX, setSphereX] = useState(0);
  const [cardInc, setCardInc] = useState(0);

  const [animDepart, setanimDepart] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      //your code to be executed after 1 second
      setanimDepart(false);
    }, 500);
  }, []);

  const { pos, ...props } = useSpring({
    pos: animDepart ? [1, 0, 1] : [2, 0, 2],
    config: {
      duration: "1s",
      mass: 10,
      tension: 1000,
      friction: 300,
      precision: 0.00001
    }
  });

  const [sphereRef, sphereApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0]
  }));

  const [cardRef, cardApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0]
  }));

  useFrame(() => {
    // console.log('sphereRef position', sphereRef.current.position);
    // console.log('sphereAPI position', sphereApi.position);
    setSphereX((sphereX) => sphereX + 0.05);
    sphereApi.position.set(
      image.radius * Math.cos((sphereX * 2 * Math.PI) / image.freq),
      0,
      image.radius * Math.sin((sphereX * 2 * Math.PI) / image.freq)
    );

    sphereApi.rotation.set(0, sphereX, 0);
    cardApi.position.set(
      image.radius * Math.cos((sphereX * 2 * Math.PI) / image.freq),
      0,
      image.radius * Math.sin((sphereX * 2 * Math.PI) / image.freq)
    );
  });

  return (
    <>
      <animated.mesh ref={cardRef} position={pos}>
        <CardPlanet {...args} position={pos} text={image.text} image={image} />
      </animated.mesh>
      <animated.mesh ref={sphereRef} {...args} position={pos}>
        <sphereBufferGeometry position={pos} args={[0.3, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          // color={[255, 10, 1]}
          // toneMapped={false}
        />
      </animated.mesh>
    </>
  );
}
