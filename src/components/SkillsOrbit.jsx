import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ACCENT } from "../theme";
import { SKILLS } from "../data";
import WebGLFallback from "./WebGLFallback";

function makeLabelSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 340;
  canvas.height = 96;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(19,19,21,0.9)";
  const r = 24;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, r);
  ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, r);
  ctx.arcTo(0, canvas.height, 0, 0, r);
  ctx.arcTo(0, 0, canvas.width, 0, r);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(214,255,75,0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#F2F2F0";
  ctx.font = "600 44px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.7, 0.48, 1);
  return { sprite, texture, mat };
}

export default function SkillsOrbit() {
  const mountRef = useRef(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 7.5);

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
    const disposables = [];
    const radius = 3.6;
    SKILLS.forEach((skill, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const { sprite, texture, mat } = makeLabelSprite(skill);
      sprite.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 0.7, Math.sin(angle) * radius);
      group.add(sprite);
      disposables.push(texture, mat);

      const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(ACCENT) });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(sprite.position);
      group.add(dot);
      disposables.push(dotGeo, dotMat);
    });
    scene.add(group);

    let hovered = false;
    mount.addEventListener("mouseenter", () => (hovered = true));
    mount.addEventListener("mouseleave", () => (hovered = false));

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      group.rotation.y += hovered ? 0.0022 : 0.006;
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
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (!available) return <WebGLFallback label="Tools & technologies" />;
  return <div ref={mountRef} className="w-full h-[380px] md:h-[440px]" />;
}
