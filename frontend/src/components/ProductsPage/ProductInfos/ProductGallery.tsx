import { useState, useRef } from "react";
import { type Product } from "@/components/ProductsPage/types";
import imgtest from '@/assets/Item.jpg';
import Thumbnail from '@/components/ProductsPage/ProductInfos/ProductGallery/Thumbnail';
import MagnifierLens from '@/components/ProductsPage/ProductInfos/ProductGallery/MagnifierLens';
import MagnifierPreview from '@/components/ProductsPage/ProductInfos/ProductGallery/MagnifierPreview';
import VideoPlayerSection from '@/components/ProductsPage/ProductInfos/ProductGallery/VideoPlayerSection';
import { type GalleryItem } from "@/components/ProductsPage/ProductInfos/ProductGallery/types";

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

const VIDEO_THUMB_ID = -1;

const ProductGallery = ({
  galleries = [],
  productName = "",
  magnifierConfig = {},
  video_path,
  video_description,
}: {
  galleries: Product["galleries"] | Product["galleries"][];
  productName?: string;
  magnifierConfig?: MagnifierConfig;
  video_path?: string;
  video_description?: string;
}) => {
  const config = { ...DEFAULT_MAGNIFIER_CONFIG, ...magnifierConfig };
  const galleryArr = normalizeGalleries(galleries);
  const galleryWithVideo = video_path
    ? [...galleryArr, { id: VIDEO_THUMB_ID, product_id: 0, image_path: "" }]
    : galleryArr;
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const mainImgRef = useRef<HTMLImageElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  if (!galleryWithVideo.length) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border">
        <span className="text-gray-400">Aucune image</span>
      </div>
    );
  }
  const handleThumbClick = (idx: number) => {
    setSelectedImageIdx(idx);
    setShowMagnifier(false);
  };

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
      return "w-full h-auto object-[initial]";
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
      ? `absolute left-[${offsetX}px] top-[${offsetY}px] w-full h-auto object-[initial] scale-[${zoom}] origin-top-left transition-none`
      : "w-full h-auto object-[initial]";
  };

  const isVideoSelected = video_path && selectedImageIdx === galleryWithVideo.length - 1;

  return (
    <div
      className="fotorama-item fotorama max-w-[600px] w-full mx-auto"
      data-gallery-role="gallery"
    >
      <div data-gallery-role="fotorama__focusable-start" tabIndex={-1}></div>
      <div className="fotorama__wrap fotorama__wrap--css3 fotorama__wrap--slide fotorama__wrap--toggle-arrows">
        <div className="fotorama__stage rounded-xl bg-white border shadow-sm w-full max-w-[556px]">
          <div
            className="fotorama__stage__shaft mx-auto"
            tabIndex={0}
            data-gallery-role="stage-shaft"
            onMouseMove={e => {
              if (!isVideoSelected) {
                setShowMagnifier(true);
                handleMouseMove(e);
              }
            }}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseEnter={e => {
              if (!isVideoSelected) {
                setShowMagnifier(true);
                handleMouseMove(e);
              }
            }}
          >
            <div
              className="fotorama__stage__frame fotorama__active fotorama_vertical_ratio fotorama__loaded fotorama__loaded--img flex items-center justify-center relative w-full max-w-[496px] min-h-[200px]"
            >
              {isVideoSelected ? (
                <VideoPlayerSection
                  video_path={video_path}
                  video_description={video_description}
                />
              ) : (
                <>
                  <img
                    ref={mainImgRef}
                    src={imgtest}
                    alt={productName}
                    className="fotorama__img w-full max-w-[480px] max-h-[320px] sm:max-h-[480px] object-contain"
                    draggable={false}
                  />
                  <MagnifierLens show={showMagnifier} x={magnifierPos.x} y={magnifierPos.y} size={config.lensSize} />
                </>
              )}
            </div>
            {!isVideoSelected && (
              <MagnifierPreview
                showMagnifier={showMagnifier}
                config={config}
                previewImgRef={previewImgRef}
                getLargeImageStyle={getLargeImageStyle}
                productName={productName}
                imgSrc={imgtest}
              />
            )}
          </div>
        </div>
        {/* Thumbnails */}
        {galleryWithVideo.length > 0 && (
          <div className="fotorama__nav-wrap" data-gallery-role="nav-wrap">
            <div className="fotorama__nav flex items-end h-[82px]">
              <div className="fotorama__nav__shaft fotorama__grab flex items-center">
                {galleryArr.map((img, idx) => (
                  <Thumbnail
                    key={img.id || idx}
                    img={img}
                    idx={idx}
                    selected={selectedImageIdx === idx}
                    onClick={() => handleThumbClick(idx)}
                  />
                ))}
                {video_path && (
                  <Thumbnail
                    key="video-thumb"
                    idx={galleryWithVideo.length - 1}
                    selected={selectedImageIdx === galleryWithVideo.length - 1}
                    onClick={() => handleThumbClick(galleryWithVideo.length - 1)}
                    isVideo
                  />
                )}
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
