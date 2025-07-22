import { useState } from "react";
import { type Product } from "@/components/ProductsPage/types";
import { VIDEO_THUMB_ID, DEFAULT_MAGNIFIER_CONFIG } from "./ProductGallery/constants";
import { type MagnifierConfig } from "./ProductGallery/types";
import normalizeGalleries from "@/components/ProductsPage/ProductInfos/ProductGallery/normalizeGalleries";
import useMagnifier from "@/components/ProductsPage/ProductInfos/ProductGallery/useMagnifier";
import ImageViewer from "@/components/ProductsPage/ProductInfos/ProductGallery/ImageViewer";
import Thumbnails from "@/components/ProductsPage/ProductInfos/ProductGallery/Thumbnails";

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

  // Magnifier logic extracted to hook
  const {
    showMagnifier,
    magnifierPos,
    mainImgRef,
    previewImgRef,
    handleMouseMove,
    setShowMagnifier,
  } = useMagnifier(config);

  if (!galleryWithVideo.length) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border">
        <span className="text-gray-400">Aucune image</span>
      </div>
    );
  }

  const isVideoSelected = video_path && selectedImageIdx === galleryWithVideo.length - 1;

  return (
    <div className="fotorama-item fotorama max-w-[600px] w-full mx-auto" data-gallery-role="gallery">
      <div data-gallery-role="fotorama__focusable-start" tabIndex={-1}></div>
      <div className="fotorama__wrap fotorama__wrap--css3 fotorama__wrap--slide fotorama__wrap--toggle-arrows">
        <div className="fotorama__stage rounded-xl bg-white border shadow-sm w-full max-w-[556px]">
          <ImageViewer
            isVideoSelected={!!isVideoSelected}
            video_path={video_path}
            video_description={video_description}
            mainImgRef={mainImgRef}
            previewImgRef={previewImgRef}
            showMagnifier={showMagnifier}
            magnifierPos={magnifierPos}
            config={config}
            handleMouseMove={handleMouseMove}
            setShowMagnifier={setShowMagnifier}
            productName={productName}
          />
        </div>
        <Thumbnails
          galleryArr={galleryArr}
          video_path={video_path}
          galleryWithVideo={galleryWithVideo}
          selectedImageIdx={selectedImageIdx}
          setSelectedImageIdx={setSelectedImageIdx}
        />
      </div>
      <div data-gallery-role="fotorama__focusable-end" tabIndex={-1}></div>
    </div>
  );
};

export default ProductGallery;