import { useState, useRef } from "react";
import { type MagnifierConfig } from "./types";

const useMagnifier = (config: MagnifierConfig) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const mainImgRef = useRef<HTMLImageElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mainImgRef.current) return;
    const frameRect = e.currentTarget.getBoundingClientRect();
    const imgRect = mainImgRef.current.getBoundingClientRect();

    const mouseX = e.clientX - frameRect.left;
    const mouseY = e.clientY - frameRect.top;

    const imgLeft = imgRect.left - frameRect.left;
    const imgTop = imgRect.top - frameRect.top;
    const imgWidth = imgRect.width;
    const imgHeight = imgRect.height;

    const halfLens = (config.lensSize ?? 190) / 2;

    const clampedX = Math.max(imgLeft + halfLens, Math.min(mouseX, imgLeft + imgWidth - halfLens));
    const clampedY = Math.max(imgTop + halfLens, Math.min(mouseY, imgTop + imgHeight - halfLens));

    setMagnifierPos({
      x: clampedX,
      y: clampedY,
    });
  };

  return {
    showMagnifier,
    setShowMagnifier,
    magnifierPos,
    mainImgRef,
    previewImgRef,
    handleMouseMove,
  };
};

export default useMagnifier;
