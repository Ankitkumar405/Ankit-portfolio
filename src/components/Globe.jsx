import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ACCENT } from "../theme";
import WebGLFallback from "./WebGLFallback";

// Original design: an evenly-distributed dot sphere (Fibonacci lattice,
// not a traced continent map), with one highlighted point + pulse ring
// marking India. Communicates "available globally" without reproducing
// anyone else's specific world-map artwork.
export default function Globe({ size = 320 }) {
  const mountRef = useRef(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 50);
    camera.position.set(0, 0, 5);

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
    scene.add(group);

    // Fibonacci sphere point distribution
    const COUNT = 900;
    const radius = 1.6;
    const positions = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    let indiaPos = new THREE.Vector3();
    let indiaDist = Infinity;
    // Approximate India's position on the sphere for the highlight marker
    const indiaLat = (20 * Math.PI) / 180;
    const indiaLon = (78 * Math.PI) / 180;
    const indiaTarget = new THREE.Vector3(
      Math.cos(indiaLat) * Math.cos(indiaLon),
      Math.sin(indiaLat),
      Math.cos(indiaLat) * Math.sin(indiaLon)
    );

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      positions[i * 3] = x * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = z * radius;

      const d = new THREE.Vector3(x, y, z).distanceTo(indiaTarget);
      if (d < indiaDist) {
        indiaDist = d;
        indiaPos = new THREE.Vector3(x, y, z).multiplyScalar(radius);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.028,
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);

    // highlight marker + pulse ring at India
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(ACCENT) })
    );
    marker.position.copy(indiaPos);
    group.add(marker);

    const pulseGeo = new THREE.RingGeometry(0.06, 0.075, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    pulse.position.copy(indiaPos);
    pulse.lookAt(indiaPos.clone().multiplyScalar(2));
    group.add(pulse);

    let pulseScale = 1;

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      group.rotation.y += 0.0025;

      pulseScale += 0.02;
      if (pulseScale > 2.2) pulseScale = 1;
      pulse.scale.setScalar(pulseScale);
      pulse.material.opacity = Math.max(0, 0.8 - (pulseScale - 1) * 0.6);

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
      window.removeEventListener("resize", onResize);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (!available) return <WebGLFallback label="Global reach" />;
  return <div ref={mountRef} style={{ width: "100%", height: size }} />;
}
