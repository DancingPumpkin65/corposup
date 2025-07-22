import Thumbnail from './Thumbnail';
import { type GalleryItem } from './types';

const Thumbnails = ({
  galleryArr,
  video_path,
  galleryWithVideo,
  selectedImageIdx,
  setSelectedImageIdx,
}: {
  galleryArr: GalleryItem[];
  video_path?: string;
  galleryWithVideo: GalleryItem[];
  selectedImageIdx: number;
  setSelectedImageIdx: (idx: number) => void;
}) => (
  galleryWithVideo.length > 0 ? (
    <div className="fotorama__nav-wrap" data-gallery-role="nav-wrap">
      <div className="fotorama__nav flex items-end h-[82px]">
        <div className="fotorama__nav__shaft fotorama__grab flex space-x-2 items-center">
          {galleryArr.map((img, idx) => (
            <Thumbnail
              key={img.id || idx}
              img={img}
              idx={idx}
              selected={selectedImageIdx === idx}
              onClick={() => setSelectedImageIdx(idx)}
            />
          ))}
          {video_path && (
            <Thumbnail
              key="video-thumb"
              idx={galleryWithVideo.length - 1}
              selected={selectedImageIdx === galleryWithVideo.length - 1}
              onClick={() => setSelectedImageIdx(galleryWithVideo.length - 1)}
              isVideo
            />
          )}
        </div>
      </div>
    </div>
  ) : null
);

export default Thumbnails;
