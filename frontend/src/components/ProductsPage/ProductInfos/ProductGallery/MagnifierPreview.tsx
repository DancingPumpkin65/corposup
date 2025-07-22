import React from "react";

type MagnifierConfig = {
  previewWidth: number;
  previewHeight: number;
};

const MagnifierPreview = ({
  showMagnifier,
  config,
  previewImgRef,
  getLargeImageStyle,
  productName,
  imgSrc,
}: {
  showMagnifier: boolean;
  config: MagnifierConfig;
  previewImgRef: React.RefObject<HTMLImageElement>;
  getLargeImageStyle: () => string;
  productName?: string;
  imgSrc: string;
}) => (
  <div
    className={`magnifier-preview${showMagnifier ? "" : " magnify-hidden"}`}
    data-gallery-role="magnifier"
    id="preview"
    style={{
      width: config.previewWidth,
      height: config.previewHeight,
      top: 0,
      left: 'calc(100% + 32px)',
      position: "absolute",
      background: "#fff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      overflow: "hidden",
      display: showMagnifier ? "block" : "none",
      zIndex: 20,
      ...(window.innerWidth < 1024
        ? {
            position: "fixed",
            left: "auto",
            right: 0,
            bottom: 0,
            top: "auto",
            width: "90vw",
            maxWidth: 320,
            height: 240,
          }
        : {}),
    }}
  >
    <div className="w-full h-full overflow-hidden relative">
      <img
        ref={previewImgRef}
        src={imgSrc}
        id="magnifier-item-0-large"
        className={getLargeImageStyle()}
        alt={productName}
        draggable={false}
      />
    </div>
  </div>
);

export default MagnifierPreview;
