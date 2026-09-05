import React, { useState, useRef } from "react";

export default function Magnetic({ children, className = "", style = {}, href, onClick, target, rel, ...rest }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    setT({ x: relX * 0.25, y: relY * 0.25 });
  };
  const reset = () => setT({ x: 0, y: 0 });
  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{
        ...style,
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform 0.2s cubic-bezier(.2,.7,.2,1)",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
