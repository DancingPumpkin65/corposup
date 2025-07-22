import imgtest from '@/assets/Item.jpg';
import MagnifierLens from './MagnifierLens';
import MagnifierPreview from './MagnifierPreview';
import VideoPlayerSection from './VideoPlayerSection';
import { type MagnifierConfig } from './types';

const ImageViewer = ({
  isVideoSelected,
  video_path,
  video_description,
  mainImgRef,
  previewImgRef,
  showMagnifier,
  magnifierPos,
  config,
  handleMouseMove,
  setShowMagnifier,
  productName,
}: {
  isVideoSelected: boolean;
  video_path?: string;
  video_description?: string;
  mainImgRef: React.RefObject<HTMLImageElement>;
  previewImgRef: React.RefObject<HTMLImageElement>;
  showMagnifier: boolean;
  magnifierPos: { x: number; y: number };
  config: MagnifierConfig;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setShowMagnifier: (show: boolean) => void;
  productName?: string;
}) => {
  const getLargeImageStyle = () => {
    const zoom = config.zoom ?? 2;
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
    const previewCenterX = (config.previewWidth ?? 500) / 2;
    const previewCenterY = (config.previewHeight ?? 600) / 2;
    const offsetX = previewCenterX - originX * zoom;
    const offsetY = previewCenterY - originY * zoom;

    return showMagnifier
      ? `absolute left-[${offsetX}px] top-[${offsetY}px] w-full h-auto object-[initial] scale-[${zoom}] origin-top-left transition-none`
      : "w-full h-auto object-[initial]";
  };

  return (
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
      <div className="fotorama__stage__frame mx-auto fotorama__active fotorama_vertical_ratio fotorama__loaded fotorama__loaded--img flex items-center justify-center relative w-full max-w-[496px] min-h-[200px]">
        {isVideoSelected ? (
          <VideoPlayerSection video_path={video_path} video_description={video_description} />
        ) : (
          <>
            <img
              ref={mainImgRef}
              src={imgtest}
              alt={productName}
              className="fotorama__img w-full max-w-[480px] max-h-[320px] sm:max-h-[480px] object-contain"
              draggable={false}
            />
            <MagnifierLens show={showMagnifier} x={magnifierPos.x} y={magnifierPos.y} size={config.lensSize ?? 190} />
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
  );
};

export default ImageViewer;
