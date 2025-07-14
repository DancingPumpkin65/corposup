import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/Shadcn/Carousel";
import arrowUp from "@/assets/arrowUp.svg";
import arrowDown from "@/assets/arrowDown.svg";
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

const ProductGallery = ({ galleries = [], productName = "" }: { galleries: Product["galleries"] | Product["galleries"][]; productName?: string }) => {
  const galleryArr = normalizeGalleries(galleries);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!galleryArr.length) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border">
        <span className="text-gray-400">Aucune image</span>
      </div>
    );
  }
  const handlePrev = () => setSelectedImageIdx(i => (i > 0 ? i - 1 : galleryArr.length - 1));
  const handleNext = () => setSelectedImageIdx(i => (i < galleryArr.length - 1 ? i + 1 : 0));
  return (
    <div className="flex flex-row gap-8">
      <div className="flex-1 flex flex-col items-start h-[500px]">
        <img
          src={`http://127.0.0.1:8000/storage/${galleryArr[selectedImageIdx].image_path}`}
          alt={productName}
          className="w-auto h-full object-cover rounded-lg border"
        />
      </div>
      <div className="flex flex-col items-center">
        <button onClick={handlePrev} className="mb-2 p-1 rounded hover:bg-gray-100">
          <img src={arrowUp} alt="Up" className="w-5 h-5" />
        </button>
        <Carousel orientation="vertical" opts={{ align: "start" }}>
          <CarouselContent>
            {galleryArr.map((img, idx) => (
              <CarouselItem key={img.id || idx}>
                <img
                  src={`http://127.0.0.1:8000/storage/${img.image_path}`}
                  alt={`gallery-${idx}`}
                  className={`w-14 h-14 object-cover rounded border cursor-pointer mb-2 ${
                    selectedImageIdx === idx ? "ring-1 ring-orange-500 border-orange-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImageIdx(idx)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <button onClick={handleNext} className="mt-2 p-1 rounded hover:bg-gray-100">
          <img src={arrowDown} alt="Down" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
