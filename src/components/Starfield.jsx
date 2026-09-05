import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ACCENT } from "../theme";

export default function Starfield() {
  const mountRef = useRef(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 6;

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

    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.028,
      color: new THREE.Color(ACCENT),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      points.rotation.y += 0.0009;
      points.rotation.x += (target.y - points.rotation.x) * 0.02;
      points.rotation.y += (target.x - points.rotation.y) * 0.0005;
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
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (!available) return null;
  return <div ref={mountRef} className="absolute inset-0" />;
}
