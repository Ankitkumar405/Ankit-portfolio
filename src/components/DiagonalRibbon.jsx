import React from "react";
import { ACCENT, BG } from "../theme";
import { SKILLS } from "../data";

export default function DiagonalRibbon() {
  const words = [...SKILLS, "OPEN TO WORK", "3D WEB", "CREATIVE DESIGN"];
  return (
    <div className="py-16 overflow-hidden" style={{ background: BG }}>
      <div
        className="overflow-hidden"
        style={{
          transform: "rotate(-3deg)",
          width: "110%",
          marginLeft: "-5%",
          background: `linear-gradient(100deg, ${ACCENT}, #eaff8f 45%, ${ACCENT})`,
          padding: "18px 0",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="marquee">
          {[...words, ...words].map((w, i) => (
            <span
              key={i}
              className="display font-bold mx-5 whitespace-nowrap flex items-center gap-3"
              style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "#0a0a0a" }}
            >
              {w} <span style={{ fontSize: "0.6em" }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
