import React from "react";

const MagnifierLens = ({
  show,
  x,
  y,
  size,
  style,
}: {
  show: boolean;
  x: number;
  y: number;
  size: number;
  style?: React.CSSProperties;
}) =>
  show ? (
    <div
      className="absolute pointer-events-none border-2 border-[#c7c6c58c] bg-white bg-opacity-50"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        ...style,
      }}
      data-gallery-role="magnifier-zoom"
    />
  ) : null;

export default MagnifierLens;
