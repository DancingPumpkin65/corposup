import { useState, useRef } from "react";
import { type Product } from "@/components/ProductsPage/types";
import imgtest from '@/assets/Item.jpg';

type GalleryItem = {
  id: number;
  product_id: number;
  image_path: string;
};

const normalizeGalleries = (galleries: Product["galleries"] | Product["galleries"][]) => {
  if (Array.isArray(galleries)) return galleries as GalleryItem[];
  if (galleries && typeof galleries === "object") return [galleries as GalleryItem];
  return [];
};

type MagnifierConfig = {
  zoom?: number;
  lensSize?: number;
  previewWidth?: number;
  previewHeight?: number;
  previewLeft?: number;
  previewTop?: number;
};

const DEFAULT_MAGNIFIER_CONFIG: Required<MagnifierConfig> = {
  zoom: 2,
  lensSize: 190,
  previewWidth: 500,
  previewHeight: 600,
  previewLeft: 565,
  previewTop: 0,
};

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
      className="magnify-lens bg-white bg-opacity-50"
      data-gallery-role="magnifier-zoom"
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        border: "2px solid #c7c6c58c",
        ...style,
      }}
    />
  ) : null;

const Thumbnail = ({
  img,
  idx,
  selected,
  onClick,
}: {
  img: GalleryItem;
  idx: number;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    key={img.id || idx}
    className={`fotorama__thumb-border${selected ? " ring-2 ring-orange-500" : ""}`}
    style={{
      margin: "0 4px",
      border: selected ? "2px solid #fb923c" : "2px solid #e5e7eb",
      borderRadius: 6,
      cursor: "pointer",
      overflow: "hidden",
      width: 64,
      height: 64,
      boxSizing: "border-box",
    }}
    onClick={onClick}
  >
    <img
      src={imgtest}
      alt={`gallery-thumb-${idx}`}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

const ProductGallery = ({
  galleries = [],
  productName = "",
  magnifierConfig = {},
}: {
  galleries: Product["galleries"] | Product["galleries"][];
  productName?: string;
  magnifierConfig?: MagnifierConfig;
}) => {
  const config = { ...DEFAULT_MAGNIFIER_CONFIG, ...magnifierConfig };
  const galleryArr = normalizeGalleries(galleries);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const mainImgRef = useRef<HTMLImageElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  if (!galleryArr.length) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border">
        <span className="text-gray-400">Aucune image</span>
      </div>
    );
  }
  const handleThumbClick = (idx: number) => setSelectedImageIdx(idx);

  // Magnifier logic
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

    const halfLens = config.lensSize / 2;

    const clampedX = Math.max(imgLeft + halfLens, Math.min(mouseX, imgLeft + imgWidth - halfLens));
    const clampedY = Math.max(imgTop + halfLens, Math.min(mouseY, imgTop + imgHeight - halfLens));

    setMagnifierPos({
      x: clampedX,
      y: clampedY,
    });
  };

  const getLargeImageStyle = () => {
    const zoom = config.zoom;
    if (!mainImgRef.current) {
      return { width: "100%", height: "auto", objectFit: "initial" };
    }
    const imgRect = mainImgRef.current.getBoundingClientRect();
    const frameRect = mainImgRef.current.parentElement?.getBoundingClientRect();
    let originX = magnifierPos.x;
    let originY = magnifierPos.y;
    if (frameRect) {
      originX = magnifierPos.x - (imgRect.left - frameRect.left);
      originY = magnifierPos.y - (imgRect.top - frameRect.top);
    }
    const previewCenterX = config.previewWidth / 2;
    const previewCenterY = config.previewHeight / 2;
    const offsetX = previewCenterX - originX * zoom;
    const offsetY = previewCenterY - originY * zoom;

    return showMagnifier
      ? {
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          width: "100%",
          height: "auto",
          position: "absolute",
          left: offsetX,
          top: offsetY,
          objectFit: "initial",
          transition: "none",
        }
      : { width: "100%", height: "auto", objectFit: "initial" };
  };

  return (
    <div
      className="fotorama-item fotorama max-w-[600px] w-full mx-auto"
      data-gallery-role="gallery"
      style={{ width: "100%" }}
    >
      <div data-gallery-role="fotorama__focusable-start" tabIndex={-1}></div>
      <div
        className="fotorama__wrap fotorama__wrap--css3 fotorama__wrap--slide fotorama__wrap--toggle-arrows"
        style={{ minWidth: 0, maxWidth: "100%" }}
      >
        <div className="fotorama__stage rounded-xl bg-white border shadow-sm w-full max-w-[556px] mx-auto" style={{ height: "auto" }}>
          {/* Fullscreen/Zoom/Prev/Next */}
          <div
            className="fotorama__stage__shaft mx-auto"
            tabIndex={0}
            data-gallery-role="stage-shaft"
            style={{
              transitionDuration: "300ms",
              transform: "translate3d(0px, 0px, 0px)",
              width: "100%",
              maxWidth: 496,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            onMouseMove={e => {
              setShowMagnifier(true);
              handleMouseMove(e);
            }}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseEnter={e => {
              setShowMagnifier(true);
              handleMouseMove(e);
            }}
          >
            <div
              className="fotorama__stage__frame fotorama__active fotorama_vertical_ratio fotorama__loaded fotorama__loaded--img"
              aria-hidden="false"
              data-active="true"
              style={{
                width: "100%",
                maxWidth: 496,
                height: "auto",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              <img
                ref={mainImgRef}
                src={imgtest}
                alt={productName}
                className="fotorama__img w-full max-w-[480px] max-h-[320px] sm:max-h-[480px] object-contain"
                style={{ objectFit: "contain" }}
                draggable={false}
              />
              <MagnifierLens show={showMagnifier} x={magnifierPos.x} y={magnifierPos.y} size={config.lensSize} />
            </div>
            {/* Magnifier preview */}
            <div
              className={`magnifier-preview${showMagnifier ? "" : " magnify-hidden"}`}
              data-gallery-role="magnifier"
              id="preview"
              style={{
                // Show beside the image on large screens, fixed bottom-right on mobile
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
                // Responsive: fallback to fixed for small screens
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
              <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                <img
                  ref={previewImgRef}
                  src={imgtest}
                  id="magnifier-item-0-large"
                  className={`magnifier-large${showMagnifier ? " w-full" : " magnify-hidden"}`}
                  style={getLargeImageStyle()}
                  alt={productName}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Thumbnails */}
        {galleryArr.length > 1 && (
          <div className="fotorama__nav-wrap" data-gallery-role="nav-wrap">
            <div className="fotorama__nav" style={{ height: 82, display: "flex", alignItems: "end" }}>
              <div className="fotorama__nav__shaft fotorama__grab" style={{ display: "flex", alignItems: "center" }}>
                {galleryArr.map((img, idx) => (
                  <Thumbnail
                    key={img.id || idx}
                    img={img}
                    idx={idx}
                    selected={selectedImageIdx === idx}
                    onClick={() => handleThumbClick(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div data-gallery-role="fotorama__focusable-end" tabIndex={-1}></div>
    </div>
  );
};

export default ProductGallery;
