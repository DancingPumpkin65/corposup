import { useState, useRef } from "react";
import { type Product } from "@/components/ProductsPage/types";

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

const MAGNIFIER_SIZE = 190;
const MAGNIFIER_PREVIEW_WIDTH = 500;
const MAGNIFIER_PREVIEW_HEIGHT = 600;
const MAGNIFIER_PREVIEW_LEFT = 565;
const MAGNIFIER_PREVIEW_TOP = 0;

const ProductGallery = ({
  galleries = [],
  productName = "",
}: {
  galleries: Product["galleries"] | Product["galleries"][];
  productName?: string;
}) => {
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

  const handlePrev = () => setSelectedImageIdx(i => (i > 0 ? i - 1 : galleryArr.length - 1));
  const handleNext = () => setSelectedImageIdx(i => (i < galleryArr.length - 1 ? i + 1 : 0));
  const handleThumbClick = (idx: number) => setSelectedImageIdx(idx);

  // Magnifier logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mainImgRef.current) return;
    const frameRect = e.currentTarget.getBoundingClientRect();
    const imgRect = mainImgRef.current.getBoundingClientRect();

    // Mouse position relative to frame
    const mouseX = e.clientX - frameRect.left;
    const mouseY = e.clientY - frameRect.top;

    // Image position and size within frame
    const imgLeft = imgRect.left - frameRect.left;
    const imgTop = imgRect.top - frameRect.top;
    const imgWidth = imgRect.width;
    const imgHeight = imgRect.height;

    const halfLens = MAGNIFIER_SIZE / 2;

    // Clamp lens center within image bounds
    const clampedX = Math.max(imgLeft + halfLens, Math.min(mouseX, imgLeft + imgWidth - halfLens));
    const clampedY = Math.max(imgTop + halfLens, Math.min(mouseY, imgTop + imgHeight - halfLens));

    setMagnifierPos({
      x: clampedX,
      y: clampedY,
    });
  };

  const getLargeImageStyle = () => {
    const zoom = 2;
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
    // Calculate offset so lens center is centered in preview
    const previewCenterX = MAGNIFIER_PREVIEW_WIDTH / 2;
    const previewCenterY = MAGNIFIER_PREVIEW_HEIGHT / 2;
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
      className="fotorama-item fotorama max-w-[600px] mx-auto"
      data-gallery-role="gallery"
      style={{ width: "100%" }}
    >
      <div data-gallery-role="fotorama__focusable-start" tabIndex={-1}></div>
      <div
        className="fotorama__wrap fotorama__wrap--css3 fotorama__wrap--slide fotorama__wrap--toggle-arrows"
        style={{ minWidth: 0, maxWidth: "100%" }}
      >
        <div className="fotorama__stage rounded-xl bg-white border shadow-sm" style={{ height: 556, width: 556 }}>
          {/* Fullscreen/Zoom/Prev/Next */}
          <button
            className={`fotorama__arr fotorama__arr--prev${galleryArr.length <= 1 ? " fotorama__arr--disabled" : ""}`}
            tabIndex={-1}
            aria-label="Previous"
            data-gallery-role="arrow"
            disabled={galleryArr.length <= 1}
            style={{ display: galleryArr.length > 1 ? undefined : "none" }}
            onClick={handlePrev}
            type="button"
          >
            <div className="fotorama__arr__arr"></div>
          </button>
          <div
            className="fotorama__stage__shaft mx-auto"
            tabIndex={0}
            data-gallery-role="stage-shaft"
            style={{
              transitionDuration: "300ms",
              transform: "translate3d(0px, 0px, 0px)",
              width: 496,
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
              style={{ width: 496, height: 496, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
            >
              <img
                ref={mainImgRef}
                src={`http://127.0.0.1:8000/storage/${galleryArr[selectedImageIdx].image_path}`}
                alt={productName}
                className="fotorama__img"
                style={{ maxHeight: 480, maxWidth: 480, objectFit: "contain" }}
                draggable={false}
              />
              {/* Magnifier lens */}
              {showMagnifier && (
                <div
                  className="magnify-lens bg-white bg-opacity-50"
                  data-gallery-role="magnifier-zoom"
                  style={{
                    position: "absolute",
                    pointerEvents: "none",
                    left: magnifierPos.x - MAGNIFIER_SIZE / 2,
                    top: magnifierPos.y - MAGNIFIER_SIZE / 2,
                    width: MAGNIFIER_SIZE,
                    height: MAGNIFIER_SIZE,
                    border: "2px solid #c7c6c58c",
                  }}
                />
              )}
            </div>
            {/* Magnifier preview */}
            <div
              className={`magnifier-preview${showMagnifier ? "" : " magnify-hidden"}`}
              data-gallery-role="magnifier"
              id="preview"
              style={{
                width: MAGNIFIER_PREVIEW_WIDTH,
                height: MAGNIFIER_PREVIEW_HEIGHT,
                top: MAGNIFIER_PREVIEW_TOP,
                left: MAGNIFIER_PREVIEW_LEFT,
                position: "absolute",
                background: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                overflow: "hidden",
                display: showMagnifier ? "block" : "none",
                zIndex: 20,
              }}
            >
              <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                <img
                  ref={previewImgRef}
                  src={`http://127.0.0.1:8000/storage/${galleryArr[selectedImageIdx].image_path}`}
                  id="magnifier-item-0-large"
                  className={`magnifier-large${showMagnifier ? " w-full" : " magnify-hidden"}`}
                  style={getLargeImageStyle()}
                  alt={productName}
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <button
            className={`fotorama__arr fotorama__arr--next${galleryArr.length <= 1 ? " fotorama__arr--disabled" : ""}`}
            tabIndex={-1}
            aria-label="Next"
            data-gallery-role="arrow"
            disabled={galleryArr.length <= 1}
            style={{ display: galleryArr.length > 1 ? undefined : "none" }}
            onClick={handleNext}
            type="button"
          >
            <div className="fotorama__arr__arr"></div>
          </button>
        </div>
        {/* Thumbnails */}
        {galleryArr.length > 1 && (
          <div className="fotorama__nav-wrap" data-gallery-role="nav-wrap" style={{ marginTop: 16 }}>
            <div className="fotorama__nav" style={{ height: 82, display: "flex", alignItems: "center" }}>
              <button
                className={`fotorama__thumb__arr fotorama__thumb__arr--left${selectedImageIdx === 0 ? " fotorama__arr--disabled" : ""}`}
                role="button"
                aria-label="Previous"
                data-gallery-role="arrow"
                tabIndex={-1}
                disabled={selectedImageIdx === 0}
                onClick={handlePrev}
                type="button"
                style={{ marginRight: 8 }}
              >
                <div className="fotorama__thumb--icon"></div>
              </button>
              <div className="fotorama__nav__shaft fotorama__grab" style={{ display: "flex", alignItems: "center" }}>
                {galleryArr.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className={`fotorama__thumb-border${selectedImageIdx === idx ? " ring-2 ring-orange-500" : ""}`}
                    style={{
                      margin: "0 4px",
                      border: selectedImageIdx === idx ? "2px solid #fb923c" : "2px solid #e5e7eb",
                      borderRadius: 6,
                      cursor: "pointer",
                      overflow: "hidden",
                      width: 64,
                      height: 64,
                      boxSizing: "border-box",
                    }}
                    onClick={() => handleThumbClick(idx)}
                  >
                    <img
                      src={`http://127.0.0.1:8000/storage/${img.image_path}`}
                      alt={`gallery-thumb-${idx}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
              <button
                className={`fotorama__thumb__arr fotorama__thumb__arr--right${selectedImageIdx === galleryArr.length - 1 ? " fotorama__arr--disabled" : ""}`}
                role="button"
                aria-label="Next"
                data-gallery-role="arrow"
                tabIndex={-1}
                disabled={selectedImageIdx === galleryArr.length - 1}
                onClick={handleNext}
                type="button"
                style={{ marginLeft: 8 }}
              >
                <div className="fotorama__thumb--icon"></div>
              </button>
            </div>
          </div>
        )}
      </div>
      <div data-gallery-role="fotorama__focusable-end" tabIndex={-1}></div>
    </div>
  );
};

export default ProductGallery;
