import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { MainLayout } from "../layouts/MainLayout";
import { useProductss } from "@/hooks/useProductss";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/Shadcn/Carousel";
import arrowUp from "@/assets/arrowUp.svg";
import arrowDown from "@/assets/arrowDown.svg";
import { Button } from "@/components/Shadcn/Button";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/Shadcn/Breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Shadcn/Dialog";
import inImg from "@/assets/in.svg";
import whatsImg from "@/assets/whats.svg";
import tweetImg from "@/assets/tweet.svg";
import faceImg from "@/assets/face.svg";
import linkImg from "@/assets/link.svg";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading } = useProductss();
  const [quantity, setQuantity] = useState(1);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [selectedShippingIdx, setSelectedShippingIdx] = useState(0);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Tabs state
  const [activeTab, setActiveTab] = React.useState<"description" | "specification" | "return" | "reviews">("description");
  // Carousel state for selected image
  const [selectedImageIdx, setSelectedImageIdx] = React.useState(0);

  const product = products.find((p) => String(p.id) === String(productId));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader className="animate-spin mr-2" /> Chargement du produit...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-red-500 py-10">
        Produit introuvable.
      </div>
    );
  }
    const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg 
        key={index} 
        className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  // Custom handlers for up/down arrows
  const handlePrevImage = () => {
    setSelectedImageIdx((prev) =>
      prev > 0 ? prev - 1 : product.galleries.length - 1
    );
  };
  const handleNextImage = () => {
    setSelectedImageIdx((prev) =>
      prev < product.galleries.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="max-w-[1580px] mx-auto w-full px-8 pt-8 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            {product?.category?.category_name && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categories/${product.category.id}/products`}>Agriculture et alimentation</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categories/${product.category.id}/products`}>{product.category.category_name}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="pointer-default underline">{product?.product_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-[1580px] mx-auto w-full px-8 py-8 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row h-auto">
          {/* Left: Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="flex flex-row gap-8">
              {product.galleries && Array.isArray(product.galleries) && product.galleries.length > 0 ? (
                <>
                  {/* Main Image */}
                  <div className="flex-1 flex flex-col items-start h-[500px]">
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.galleries[selectedImageIdx].image_path}`}
                      alt={product.product_name}
                      className="w-auto h-full object-cover rounded-lg border"
                    />
                  </div>
                  {/* Vertical Carousel Thumbnails with custom arrows */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handlePrevImage}
                      className="mb-2 p-1 rounded hover:bg-gray-100"
                    >
                      <img src={arrowUp} alt="Up" className="w-5 h-5" />
                    </button>
                    <Carousel orientation="vertical" opts={{align: "start"}}>
                      <CarouselContent>
                        {product.galleries.map((img: any, idx: number) => (
                          <CarouselItem key={img.id || idx}>
                            <img
                              src={`http://127.0.0.1:8000/storage/${img.image_path}`}
                              alt={`gallery-${idx}`}
                              className={`w-14 h-14 object-cover rounded border cursor-pointer mb-2 ${
                                selectedImageIdx === idx
                                  ? "ring-1 ring-orange-500 border-orange-500"
                                  : "border-gray-200"
                              }`}
                              onClick={() => setSelectedImageIdx(idx)}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <button
                      onClick={handleNextImage}
                      className="mt-2 p-1 rounded hover:bg-gray-100"
                    >
                      <img src={arrowDown} alt="Down" className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-lg border">
                  <span className="text-gray-400">Aucune image</span>
                </div>
              )}
            </div>
            {/* Share Buttons below gallery */}
            <div className="flex items-center gap-2 mt-10 self-start">
              <span className="text-gray-500 text-base font-bold">Share</span>
              <a href="#">
                <img src={inImg} alt="Link" className="w-15 h-15" />
              </a>
              <a href="#">
                <img src={faceImg} alt="Link" className="w-15 h-15" />
              </a>
              <a href="#">
                <img src={whatsImg} alt="Link" className="w-15 h-15" />
              </a>
              <a href="#">
                <img src={tweetImg} alt="Link" className="w-15 h-15" />
              </a>
              <a href="#">
                <img src={linkImg} alt="Link" className="w-15 h-15" />
              </a>
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="md:w-1/2 flex flex-col gap-4">
            {/* Product Name & Details */}
            <div>
              <div className="text-lg text-gray-400 mb-1">{product.product_ref}</div>
              <h1 className="text-4xl w-full font-bold mb-4 text-justify">{product.product_name}, {product.details.brand}, {product.details.material}, {product.details.color}<br /></h1>
              <div className="flex flex-wrap items-center gap-2 text-lg mb-4">
                Magasin{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold underline"
                >
                  {product.store?.store_name}
                </a>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex">
                    {renderStars(product.reviews.rating || 0)}
                </div>
              </div>
            </div>
            {/* Price, Old Price, Discount */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold text-orange-600">{product.discount?.discount_active ? product.discount.new_price : product.product_price} DH</span>
              {product.discount?.discount_active && (
                <>
                  <span className="text-lg line-through text-gray-400">{product.product_price} DH</span>
                  <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs">
                    {Math.round(product.discount.discount_value)}%
                  </span>
                </>
              )}<br /><br />
            </div>
            {/* Unit, Minimum, Delivery */}
            <div className="text-lg text-gray-700 mb-8">
              <div className="mb-2">
                <span className="font-bold">Unit :</span> {product.unit_id}
              </div>
              <div className="mb-2">
                <span className="font-bold">Minimum number of units :</span> {product.product_minimum_commande}
              </div>
              <div className="mb-2">
                <span className="font-bold">Delivery :</span>{" "}
                {product.shippings && product.shippings.length > 0 ? (
                  <Dialog open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                    <DialogTrigger asChild>
                      <button
                        className="text-blue-600 hover:text-blue-800 transition border border-blue-600 font-bold rounded px-3 py-2"
                        type="button"
                      >
                        {product.shippings[selectedShippingIdx].shipping_delivery_time} - {product.shippings[selectedShippingIdx].shipping_name} - {product.shippings[selectedShippingIdx].shipping_cost} MAD
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choisissez une méthode de livraison</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        {product.shippings.map((shipping: any, idx: number) => (
                          <button
                            key={shipping.id}
                            className={`text-left border rounded p-3 hover:bg-blue-50 transition ${
                              selectedShippingIdx === idx
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200"
                            }`}
                            onClick={() => {
                              setSelectedShippingIdx(idx);
                              setDeliveryOpen(false);
                            }}
                          >
                            <div className="font-semibold text-blue-700">{shipping.shipping_name}</div>
                            <div className="text-sm text-gray-600">{shipping.shipping_description}</div>
                            <div className="text-sm mt-1">
                              <span className="font-semibold">Coût:</span> {shipping.shipping_cost} MAD
                              {"  "} | <span className="font-semibold">Délai:</span> {shipping.shipping_delivery_time}
                            </div>
                          </button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-400">Aucune livraison disponible</span>
                )}
              </div>
            </div>
            {/* Quantity Selector and Buttons */}
            <div className="flex items-center justify-end gap-4 mt-2">
              <div className="flex items-center border rounded px-2 py-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrease}
                    className="text-base font-bold text-gray-500 hover:text-blue-600 px-8"
                >
                    -
                </Button>
                <span className="px-3 text-blue-600 font-semibold text-lg">{quantity}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={increase}
                    className="text-lg font-bold text-gray-500 hover:text-blue-600 px-8"
                >
                    +
                </Button>
              </div>
              <Button className="bg-orange-500 text-lg text-white px-8 py-5 border border-orange-500 rounded font-semibold hover:bg-orange-600 transition">
                Devis instantané
              </Button>
              <Button className="bg-transparent text-lg text-orange-500 border border-orange-500 px-8 py-5 rounded font-semibold hover:bg-orange-200 transition">
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-6 border-b">
            <button
              className={`py-2 px-4 ${activeTab === "description" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`py-2 px-4 ${activeTab === "specification" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("specification")}
            >
              Specification
            </button>
            <button
              className={`py-2 px-4 ${activeTab === "return" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("return")}
            >
              Return
            </button>
            <button
              className={`py-2 px-4 ${activeTab === "reviews" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          <div className="py-6">
            {activeTab === "description" && (
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-line">{product.product_description || "Aucune description disponible."}</p>
                {product.video_path && (
                  <div className="mt-4">
                    <video controls className="w-full max-w-lg rounded">
                      <source src={product.video_path} type="video/mp4" />
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                    {product.video_description && (
                      <div className="text-sm text-gray-500 mt-2">{product.video_description}</div>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === "specification" && (
              <div>
                <h2 className="font-semibold mb-2">Specification</h2>
                {product.details ? (
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Couleur: {product.details.color}</li>
                    <li>Marque: {product.details.brand}</li>
                    <li>Matériau: {product.details.material}</li>
                    <li>GTIN: {product.details.GTIN}</li>
                    <li>MPN: {product.details.MPN}</li>
                  </ul>
                ) : (
                  <p>Aucune spécification disponible.</p>
                )}
              </div>
            )}
            {activeTab === "return" && (
              <div>
                <h2 className="font-semibold mb-2">Return</h2>
                <p>Politique de retour non spécifiée.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <h2 className="font-semibold mb-2">Reviews</h2>
                {product.reviews && Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                  <ul className="space-y-4">
                    {product.reviews.map((review: any, idx: number) => (
                      <li key={review.id || idx} className="border rounded p-3">
                        <div className="font-semibold">Acheteur #{review.buyer_id}</div>
                        <div className="text-sm text-gray-600">{review.comment}</div>
                        <div className="text-xs text-yellow-500">Note: {review.rating ?? "N/A"}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun avis pour ce produit.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductPage;
