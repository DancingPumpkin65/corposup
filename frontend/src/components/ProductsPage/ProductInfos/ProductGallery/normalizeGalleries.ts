import { type GalleryItem } from "./types";

const normalizeGalleries = (galleries: GalleryItem | GalleryItem[] | undefined): GalleryItem[] => {
  if (Array.isArray(galleries)) return galleries as GalleryItem[];
  if (galleries && typeof galleries === "object") return [galleries as GalleryItem];
  return [];
};

export default normalizeGalleries;
