import * as DREI from "@react-three/drei";
import { Text } from "@react-three/drei";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
export function CardPlanet({ text, position, ...args }) {
  const myMesh = useRef();
  const myMesh2 = useRef<typeof DREI.Text>();

  var boxGeometry = new THREE.BoxGeometry();

  const [boxGeo, setBoxGeo] = useState([2, 2, 2]);
  const [hovered, hover] = useState(false);

  const colorMap = useLoader(TextureLoader, "/c.png");
  // var isJPEG =
  //   colorMap.url.search(/\.(jpg|jpeg)$/) > 0 ||
  //   colorMap.url.search(/^data\:image\/jpeg/) === 0;
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  var mmesh = new THREE.Mesh();

  var boxGeometry = new THREE.BoxGeometry();
  mmesh.boundingbox;

  useLayoutEffect(() => {}, []);
  var ggg = colorMap.url;
  colorMap.format = "RGBAFormat";
  colorMap.needsUpdate = true;
  const aspect = colorMap.image.width / colorMap.image.height;
  useFrame(({ gl, scene, camera }) => {
    // myMesh2.current!.geometry.lookAt(0, 0, 0);
    // myMesh.current.BufferGeometry.computeBoundingBox();
    // myMesh2.current!.geometry.computeBoundingBox();
    // console.log(myMesh.current!.buffergeometry.getattribute("boundingbox"));
    if (hovered) {
      // myMesh2.current!.parent.lookAt(camera.position);
    }
  }, 1);

  // useEffect(
  //   ({ camera }) => {
  //     // console.log(myMesh2.current);
  //     if (hovered) {
  //       myMesh2.current!.parent.lookAt(camera.position);
  //     }
  //     // console.log();
  //     // var lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  //   },
  //   [text]
  // );

  return (
    <group>
      <mesh
        position={[0, 2, 0]}
        // lookAt={[0, 0, 0]}
        scale={[4, 5, 2]}
        ref={myMesh}
        onPointerOver={(x) => {
          hover(true);
          let hh = x.position;
          var vec = new THREE.Vector3();
          var box2 = new THREE.Box3().setFromObject(x.object);
          var boxx3 = new THREE.Box3();
          x.object.getWorldPosition(vec);
          // console.log(myMesh.getWorldPosition(hh));
          console.log("object", box2);
          console.log("boxsize", box2.getSize(vec));
          // console.log("ee", x.object.parent.geometry.computeBoundingBox());
          // setBoxGeo(box2);

          const box = new THREE.BoxHelper(x.object, 0xffff00);
          setBoxGeo(vec);
          // console.log(
          //   "ff",
          //   myMesh2.current!.parent.geometry.getAttribute("boundingbox").getSize(hh);
          // );
          boxx3 = x.object.parent.geometry.boundingBox;
          // console.log("ff", boxx3);
          // console.log("gg", vec);
          // boxx3.getSize(hh);
        }}
        onPointerOut={() => hover(false)}
      >
        <Text
          scale={[5, 5, 5]}
          anchorX="center" // default
          anchorY="middle" // default
          color="white"
          ref={myMesh2}
          fillOpacity={hovered ? 1 : 0}
          onUpdate={(x) => {
            // x.lookAt(3, 3, 3);
            // console.log(x.getWorldPosition(tt));
          }}
          // onUpdate={() => myMesh.current.lookAt([1, 10, 3])}
        >
          {text}
        </Text>
      </mesh>
      <mesh
        position={[0, 2, 0]}
        // ref={myMesh2}
        onUpdate={(x) => {
          // x.lookAt(3, 3, 3);
          // console.log(x.getWorldPosition(tt));
        }}
        // fillOpacity={hovered ? 1 : 0}
      >
        <boxGeometry geometry={[boxGeo[0], boxGeo[1], boxGeo[2]]} />
        <meshStandardMaterial
          // fillOpacity={hovered ? 1 : 0}
          color="red"
          // map={colorMap}
          opacity={1}
          // transparent
        />
      </mesh>
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color={"#9c88ff"}
          linewidth={10}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </group>
  );
}
