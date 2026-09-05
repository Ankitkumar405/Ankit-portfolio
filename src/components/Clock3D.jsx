import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ACCENT } from "../theme";
import WebGLFallback from "./WebGLFallback";

// Original design: a thin lime ring dial with three flat lime hands,
// tilted slightly, floating and reacting to pointer position.
// This is a from-scratch geometry, not a copy of any existing clock model.
export default function Clock3D({ size = 260, interactive = true }) {
  const mountRef = useRef(null);
  const handsRef = useRef({ hour: null, minute: null, second: null });
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0.4, 5.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setAvailable(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = 0.55;
    scene.add(group);

    // dial ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.05, 16, 96);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(ACCENT),
      metalness: 0.3,
      roughness: 0.4,
      emissive: new THREE.Color(ACCENT),
      emissiveIntensity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    // hour tick marks
    const tickGeo = new THREE.BoxGeometry(0.03, 0.16, 0.03);
    const tickMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    for (let i = 0; i < 12; i++) {
      const tick = new THREE.Mesh(tickGeo, tickMat.clone());
      const a = (i / 12) * Math.PI * 2;
      tick.position.set(Math.cos(a) * 1.42, Math.sin(a) * 1.42, 0);
      tick.rotation.z = a;
      tick.material.opacity = i % 3 === 0 ? 1 : 0.35;
      tick.material.transparent = true;
      group.add(tick);
    }

    // hands
    function makeHand(length, width, color, opacity) {
      const geo = new THREE.BoxGeometry(width, length, 0.04);
      geo.translate(0, length / 2, 0);
      const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity });
      return new THREE.Mesh(geo, mat);
    }
    const hourHand = makeHand(0.72, 0.05, 0xffffff, 1);
    const minuteHand = makeHand(1.05, 0.035, 0xffffff, 0.9);
    const secondHand = makeHand(1.2, 0.015, new THREE.Color(ACCENT), 1);
    group.add(hourHand, minuteHand, secondHand);
    handsRef.current = { hour: hourHand, minute: minuteHand, second: secondHand };

    // center cap
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshStandardMaterial({ color: new THREE.Color(ACCENT) }));
    group.add(cap);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.PointLight(0xffffff, 1.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fillLight = new THREE.PointLight(0x88aaff, 0.4);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    let tx = 0;
    let ty = 0;
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    if (interactive) window.addEventListener("mousemove", onMove);

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      const now = new Date();
      const s = now.getSeconds() + now.getMilliseconds() / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      secondHand.rotation.z = -((s / 60) * Math.PI * 2) + Math.PI / 2;
      minuteHand.rotation.z = -((m / 60) * Math.PI * 2) + Math.PI / 2;
      hourHand.rotation.z = -((h / 12) * Math.PI * 2) + Math.PI / 2;

      group.rotation.y += (tx - group.rotation.y) * 0.03;
      group.rotation.x += (0.55 + ty - group.rotation.x) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      if (interactive) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      [ringGeo, tickGeo].forEach((g) => g.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [interactive]);

  if (!available) return <WebGLFallback label="Local time" />;
  return <div ref={mountRef} style={{ width: size, height: size }} />;
}
