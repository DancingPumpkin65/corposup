import imgtest from '@/assets/Item.jpg';

type GalleryItem = {
  id: number;
  product_id: number;
  image_path: string;
};

const Thumbnail = ({
  img,
  idx,
  selected,
  onClick,
  isVideo,
}: {
  img?: GalleryItem;
  idx: number;
  selected: boolean;
  onClick: () => void;
  isVideo?: boolean;
}) => (
  <div
    key={img?.id ?? idx}
    className={`fotorama__thumb-border ${selected ? "ring-2 ring-orange-500 border-orange-500" : "border-gray-200"} border-2 rounded-lg cursor-pointer overflow-hidden w-16 h-16 box-border relative ${isVideo ? "bg-[#222]" : ""}`}
    onClick={onClick}
  >
    {isVideo ? (
      <>
        <div className="flex items-center justify-center w-full h-full bg-[#222]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="#fff">
            <circle cx="16" cy="16" r="16" fill="#222" />
            <polygon points="12,10 24,16 12,22" fill="#fff" />
          </svg>
        </div>
        <span className="absolute bottom-1 right-2 bg-white text-[#222] text-xs px-1.5 py-0.5 rounded font-semibold">Vidéo</span>
      </>
    ) : (
      <img
        src={imgtest}
        alt={`gallery-thumb-${idx}`}
        className="w-full h-full object-cover"
      />
    )}
  </div>
);

export default Thumbnail;
