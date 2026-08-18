"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
const CURVE_SEGMENTS = 24;       // curve subdivision — kept as-is; the mark must not change shape

// Rendered frames per second while idling.
//
// Profiling the Services page found this canvas responsible for essentially
// ALL of the main-thread blocking during a scroll that reaches the CTA —
// hiding it took a 30-wheel scroll from 10,491ms of long tasks to 180ms.
// The loop was already stopped off screen; the cost is what it does while
// visible.
//
// The idle drift is 0.12 rad/s. At that speed the mark turns roughly a third
// of a degree between 60fps frames, so half of those frames are redrawing an
// image indistinguishable from the one already on screen. Capping the redraw
// removes that work outright. Dragging is exempt — a finger following the
// mark is the one moment the extra frames are actually visible.
const IDLE_FPS = 36;


// Built ONCE per session and shared by every mount.
//
// This is the expensive part of the whole component: parsing the traced SVG
// and running ExtrudeGeometry over it took ~1.6-2.2s of blocking main thread,
// and it was paying that on EVERY page navigation, because the CTA band that
// hosts the mark is on every page. Caching at module scope means the cost is
// paid at most once; the geometries are never disposed, which is correct here
// because they are shared and there is exactly one logo.
let cachedGeometries: THREE.ExtrudeGeometry[] | null = null;

function buildLogoGeometries(): THREE.ExtrudeGeometry[] {
  if (cachedGeometries) return cachedGeometries;

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
          curveSegments: CURVE_SEGMENTS,
        }),
      );
    }
  }

  // Center on the source artwork own view box, not the traced ink tight
  // bounding box. The arrow tip is thin and stretches the bbox rightward, so
  // bbox-centering pulls the visually heavy swoosh off to the left — the flat
  // logo everywhere else on the site already reads as centered within its full
  // canvas, so that canvas center is the correct anchor. Z has no such
  // reference, so the tight bbox is used there.
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

  cachedGeometries = geoms;
  return geoms;
}

function LogoMesh({ spin }: { spin: "right" | "left" }) {
  const groupRef = useRef<THREE.Group>(null);
  // Time banked since the last drawn frame, for the idle frame cap below.
  // Seeded above any interval so the very first frame paints immediately —
  // starting at 0 leaves the canvas blank until the second tick.
  const sinceDraw = useRef(1);
  // Idle direction alternates page to page (see Logo3DProps.spin), so the mark
  // never reads as the same loop repeated down the site.
  const idleSpin = spin === "left" ? -IDLE_SPIN : IDLE_SPIN;
  // Resting angle the mark is first seen at, before any drift.
  const START_Y = spin === "left" ? -0.45 + Math.PI : -0.45;
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: idleSpin });
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

  const geometries = useMemo(() => buildLogoGeometries(), []);

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

  // Priority 1 hands rendering to us: react-three-fiber stops drawing
  // automatically and this callback decides when a frame is worth painting.
  // Everything below the render call is state maths on three numbers, which
  // costs nothing next to a draw.
  useFrame(({ gl: renderer, scene: s3, camera }, rawDelta) => {
    const g = groupRef.current;
    const s = drag.current;
    if (!g) return;

    // Clamp the timestep. A stalled frame — tab switch, chunk still loading,
    // a slow first paint — arrives as one huge delta, and multiplying the idle
    // velocity by it snaps the mark through a quarter turn in a single frame.
    // That is how the deliberate starting angle was getting lost within a
    // second of load. 1/30s is the largest step worth integrating here.
    const delta = Math.min(rawDelta, 1 / 30);

    if (!s.active) {
      // Inertia decaying toward the gentle idle spin. A drag against the idle
      // direction still settles back to it, so the page keeps its own sense.
      s.vy = THREE.MathUtils.damp(s.vy, idleSpin, 1.6, delta);
      s.vx = THREE.MathUtils.damp(s.vx, 0, 1.6, delta);
      g.rotation.y += s.vy * delta;
      g.rotation.x += s.vx * delta;
      // Settle the tilt back to level while idling.
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0, 0.4, delta);
    }
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x, -MAX_TILT, MAX_TILT);

    // Full rate under the finger, capped when left alone.
    sinceDraw.current += rawDelta;
    const interval = s.active ? 0 : 1 / IDLE_FPS;
    if (sinceDraw.current < interval) return;
    sinceDraw.current = 0;
    renderer.render(s3, camera);
  }, 1);

  return (
    // SVG y-axis points down; PI around X turns it right-side up without
    // mirroring, so triangle winding (and backface culling) stay correct.
    //
    // A left-drifting mark STARTS from the reverse face — arrow tip pointing
    // left — so the direction is legible the moment the band appears rather
    // than only after several seconds of rotation. Half a turn on Y presents
    // that face; it is the same geometry seen from behind, not a mirrored
    // copy, so nothing about the winding or the lighting changes.
    <group ref={groupRef} rotation={[0.12, START_Y, 0]}>
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
  /**
   * Which way the mark drifts while idle. The client asked for this to
   * alternate page to page: Home right, Services left, About right,
   * Contact left. Dragging still overrides it; the mark eases back to the
   * page's own direction on release.
   */
  spin?: "right" | "left";
};

export function Logo3D({ className, spin = "right" }: Logo3DProps) {
  const holder = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // On screen is not the same as being watched. A background tab still runs
  // the loop, and the mark is on the CTA band of every page, so a visitor who
  // opens the site and switches away leaves it spinning against their battery
  // for as long as the tab lives.
  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const inView = onScreen && tabVisible;

  // The CTA sits at the very bottom of every page, so for most of a visit this
  // canvas is thousands of pixels off screen — and a react-three-fiber Canvas
  // renders every frame regardless. Driving `frameloop` from an
  // IntersectionObserver stops the render loop entirely while it is away,
  // which is free performance on phones: no GPU work, no battery, and nothing
  // competing with scrolling.
  //
  // The 200px margin starts the loop just before the band appears, so it is
  // never caught mid-stop. Visually identical whenever it can actually be seen.
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        setOnScreen(visible);
        // Latch: once built, keep it mounted so navigating away and back does
        // not tear down and rebuild the scene.
        if (visible) setMounted(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={holder}
      className={className}
      role="img"
      aria-label="CREServices logo in 3D — drag to rotate"
    >
      {/* Mounted only once the band is close. Rendering the Canvas immediately
          also builds the extruded geometry immediately, and that build is the
          single most expensive thing on the site — so on every page it blocked
          the main thread right after navigation, for a mark sitting far below
          the fold. Deferring it moves the cost to the moment it is needed, and
          the module-level cache means it is only ever paid once. */}
      {mounted ? (
      <Canvas
        // Capped at 1.5, not the display's full ratio. A retina screen would
        // otherwise ask for four times the pixels of a 1x one, and on a small
        // metallic mark with antialiasing already on, nobody can tell 1.5 from
        // 2 — while the fill cost falls by nearly half.
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 8.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <LogoMesh spin={spin} />
      </Canvas>
      ) : null}
    </div>
  );
}
