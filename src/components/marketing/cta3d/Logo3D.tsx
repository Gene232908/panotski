"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LOGO_COLOR, LOGO_PATHS, LOGO_VIEW } from "./logo3d-data";

// Interactive 3D rendition of the CREServices mark, added at the client's
// request for the closing CTA band: the traced logo silhouette extruded to
// the proportions of their 3dlogolab reference, in the mark's own teal.
// Hold-and-drag spins it (with inertia); left alone it idles slowly.

const TARGET_WIDTH = 4;          // world units the mark spans
const DEPTH_RATIO = 0.15;        // extrusion depth vs width — "thickness 15"
const IDLE_SPIN = 0.12;          // rad/s when not being dragged
const DRAG_SENSITIVITY = 0.006;  // rad per px of pointer travel
const MAX_TILT = 1.0;            // clamp x-rotation so it can't flip over

function LogoMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: IDLE_SPIN });
  const { gl, scene } = useThree();

  // Procedural studio environment — no network fetch, works offline.
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  const geometries = useMemo(() => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_VIEW.width} ${LOGO_VIEW.height}">` +
      LOGO_PATHS.map((d) => `<path d="${d}" fill="#000"/>`).join("") +
      `</svg>`;
    const parsed = new SVGLoader().parse(svg);

    const scale = TARGET_WIDTH / LOGO_VIEW.width;
    const depth = (TARGET_WIDTH * DEPTH_RATIO) / scale;

    const geoms: THREE.ExtrudeGeometry[] = [];
    for (const path of parsed.paths) {
      for (const shape of SVGLoader.createShapes(path)) {
        geoms.push(
          new THREE.ExtrudeGeometry(shape, {
            depth,
            bevelEnabled: true,
            bevelThickness: depth * 0.06,
            bevelSize: depth * 0.06,
            bevelSegments: 3,
            curveSegments: 24,
          }),
        );
      }
    }

    // Center on the source artwork's own view box, not the traced ink's
    // tight bounding box. The arrow tip is thin and stretches the bbox
    // rightward, so bbox-centering pulls the visually heavy swoosh off to
    // the left — the flat logo everywhere else on the site already reads
    // as centered within its full canvas, so that canvas center is the
    // correct anchor. Z has no such reference, so the tight bbox is used
    // there (only the uniform extrude depth needs to be centered).
    const box = new THREE.Box3();
    for (const g of geoms) {
      g.computeBoundingBox();
      box.union(g.boundingBox as THREE.Box3);
    }
    const zCenter = box.getCenter(new THREE.Vector3()).z;
    const cx = LOGO_VIEW.width / 2;
    const cy = LOGO_VIEW.height / 2;
    for (const g of geoms) {
      g.translate(-cx, -cy, -zCenter);
      g.scale(scale, scale, scale);
    }
    return geoms;
  }, []);

  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries]);

  // Drag-to-rotate on the canvas element itself.
  useEffect(() => {
    const el = gl.domElement;
    const s = drag.current;

    const down = (e: PointerEvent) => {
      s.active = true;
      s.x = e.clientX;
      s.y = e.clientY;
      s.vx = 0;
      s.vy = 0;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!s.active || !groupRef.current) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      s.x = e.clientX;
      s.y = e.clientY;
      groupRef.current.rotation.y += dx * DRAG_SENSITIVITY;
      groupRef.current.rotation.x += dy * DRAG_SENSITIVITY;
      // Remember the last motion as velocity for the release inertia.
      s.vy = dx * DRAG_SENSITIVITY * 60;
      s.vx = dy * DRAG_SENSITIVITY * 60;
    };
    const up = (e: PointerEvent) => {
      s.active = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    };

    el.style.cursor = "grab";
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    const s = drag.current;
    if (!g) return;
    if (!s.active) {
      // Inertia decaying toward the gentle idle spin.
      s.vy = THREE.MathUtils.damp(s.vy, IDLE_SPIN, 1.6, delta);
      s.vx = THREE.MathUtils.damp(s.vx, 0, 1.6, delta);
      g.rotation.y += s.vy * delta;
      g.rotation.x += s.vx * delta;
      // Settle the tilt back to level while idling.
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0, 0.4, delta);
    }
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x, -MAX_TILT, MAX_TILT);
  });

  return (
    // SVG y-axis points down; PI around X turns it right-side up without
    // mirroring, so triangle winding (and backface culling) stay correct.
    <group ref={groupRef} rotation={[0.12, -0.45, 0]}>
      <group rotation={[Math.PI, 0, 0]}>
        {geometries.map((geom, i) => (
          <mesh key={i} geometry={geom}>
            <meshPhysicalMaterial
              color={LOGO_COLOR}
              metalness={0.85}
              roughness={0.22}
              clearcoat={0.6}
              clearcoatRoughness={0.25}
              envMapIntensity={1.15}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

type Logo3DProps = {
  className?: string;
};

export function Logo3D({ className }: Logo3DProps) {
  return (
    <div className={className} role="img" aria-label="CREServices logo in 3D — drag to rotate">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <LogoMesh />
      </Canvas>
    </div>
  );
}
