import React from "react";
import { useReveal } from "../hooks";

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", style: customStyle, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...customStyle,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
