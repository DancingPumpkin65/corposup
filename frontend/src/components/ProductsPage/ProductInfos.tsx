import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { useProductss } from "@/hooks/useProductss";
import { type Product } from "@/components/ProductsPage/types";
import { MainLayout } from "@/components/layouts/MainLayout";
import ProductBreadcrumb from "@/components/ProductsPage/ProductInfos/ProductBreadcrumb";
import ProductGallery from "@/components/ProductsPage/ProductInfos/ProductGallery";
import ProductShare from "@/components/ProductsPage/ProductInfos/ProductShare";
import ProductPrice from "@/components/ProductsPage/ProductInfos/ProductPrice";
import ProductTabs from "@/components/ProductsPage/ProductInfos/ProductTabs";
import { Button } from "@/components/Shadcn/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Shadcn/Dialog";

// Helper to normalize shippings to always be an array
type Shipping = {
  id: number;
  shipping_name: string;
  shipping_description: string;
  shipping_cost: number;
  shipping_delivery_time: string;
  seller_id: number;
};

const normalizeShippings = (shippings: Product["shippings"] | Product["shippings"][]) => {
  if (!shippings) return [];
  if (Array.isArray(shippings)) return shippings as Shipping[];
  return [shippings as Shipping];
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading } = useProductss();
  const [quantity, setQuantity] = useState(1);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [selectedShippingIdx, setSelectedShippingIdx] = useState(0);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const product = products.find((p) => String(p.id) === String(productId)) as Product | undefined;

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

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />
      <div className="max-w-[1580px] mx-auto w-full px-8 py-8 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row h-auto">
          {/* Left: Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <ProductGallery galleries={product.galleries} productName={product.product_name} />
            <ProductShare />
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
            <ProductPrice product={product} />
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
                {normalizeShippings(product.shippings).length > 0 ? (
                  <Dialog open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                    <DialogTrigger asChild>
                      <button
                        className="text-blue-600 hover:text-blue-800 transition border border-blue-600 font-bold rounded px-3 py-2"
                        type="button"
                      >
                        {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_delivery_time
                        } - {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_name
                        } - {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_cost
                        } MAD
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choisissez une méthode de livraison</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        {normalizeShippings(product.shippings).map((shipping, idx) => (
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
        <ProductTabs product={product} />
      </div>
    </MainLayout>
  );
};

export default ProductPage;
