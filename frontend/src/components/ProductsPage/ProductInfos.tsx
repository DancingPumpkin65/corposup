import { useState, useId } from "react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Shadcn/Dialog";
import { Label } from "@/components/Shadcn/Label";
import { RadioGroup, RadioGroupItem } from "@/components/Shadcn/RadioGroup";

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
  const id = useId();

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

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />
      <div className="max-w-7xl mx-auto w-full px-8 pt-4 pb-8 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row h-auto">
          {/* Left: Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <ProductGallery galleries={product.galleries} productName={product.product_name} />
          </div>
          {/* Right: Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            {/* Product Name & Details */}
            <div>
            <ProductShare />

              <div className="flex w-full justify-between items-center">
              <div className="flex text-left flex-wrap items-center gap-2 text-lg mb-4">
                  
                  <a
                    href="#"
                    className="text-orange-500 text-xl font-base uppercase"
                  >
                    {product.store?.store_name}
                  </a>
                </div>
                <div className="text-lg text-right text-gray-400 mb-[10px]">{product.product_ref}</div>

              </div>
              <h1 className="text-4xl w-full uppercase font-base text-gray-700 mb-4">{product.product_name}, {product.details.brand}, {product.details.material}, {product.details.color} (1 Piece)<br /></h1>
              
              {/* Price, Old Price, Discount */}
              <ProductPrice product={product} />
            </div>
            {/* Unit, Minimum, Delivery */}
            <div className="text-lg text-gray-700 mb-8 rounded px-4 py-2">
              <div className="mb-2">
                <Dialog open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                  <DialogTrigger asChild>
                    <div
                      className="flex items-center gap-1 text-gray-800 fill-gray-800 cursor-pointer hover:text-gray-400 fill-gray-800 hover:fill-gray-400"
                      onClick={() => setDeliveryOpen(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" className="mr-1">
                        <path d="M 2.800781 8 C 1.265625 8 0 9.265625 0 10.800781 L 0 37 C 0 38.644531 1.355469 40 3 40 L 7.09375 40 C 7.570313 42.828125 10.039063 45 13 45 C 15.960938 45 18.429688 42.828125 18.90625 40 L 34.09375 40 C 34.570313 42.828125 37.039063 45 40 45 C 42.960938 45 45.429688 42.828125 45.90625 40 L 47 40 C 47.832031 40 48.550781 39.613281 49.082031 39.082031 C 49.613281 38.550781 50 37.832031 50 37 L 50 27.402344 C 50 26.277344 49.582031 25.253906 49.199219 24.46875 C 48.8125 23.6875 48.421875 23.125 48.421875 23.125 L 48.410156 23.113281 L 44.292969 17.589844 L 44.28125 17.578125 C 43.394531 16.46875 41.972656 15 40 15 L 32 15 C 31.640625 15 31.308594 15.082031 31 15.207031 L 31 10.902344 C 31 9.300781 29.699219 8 28.097656 8 Z M 2.800781 10 L 28.097656 10 C 28.5 10 29 10.5 29 10.902344 L 29 38 L 18.90625 38 C 18.429688 35.171875 15.960938 33 13 33 C 10.039063 33 7.570313 35.171875 7.09375 38 L 3 38 C 2.445313 38 2 37.554688 2 37 L 2 10.800781 C 2 10.335938 2.335938 10 2.800781 10 Z M 15 12 C 9.5 12 5 16.5 5 22 C 5 27.5 9.5 32 15 32 C 20.5 32 25 27.5 25 22 C 25 16.5 20.5 12 15 12 Z M 15 14 C 19.398438 14 23 17.601563 23 22 C 23 26.398438 19.398438 30 15 30 C 10.601563 30 7 26.398438 7 22 C 7 17.601563 10.601563 14 15 14 Z M 14 16 L 14 21.5 L 10.402344 24.199219 L 11.597656 25.800781 L 16 22.5 L 16 16 Z M 32 17 L 36 17 L 36 26 C 36 26.832031 36.386719 27.550781 36.917969 28.082031 C 37.449219 28.613281 38.167969 29 39 29 L 48 29 L 48 37 C 48 37.167969 47.886719 37.449219 47.667969 37.667969 C 47.449219 37.886719 47.167969 38 47 38 L 45.90625 38 C 45.429688 35.171875 42.960938 33 40 33 C 37.039063 33 34.570313 35.171875 34.09375 38 L 31 38 L 31 18 C 31 17.832031 31.113281 17.550781 31.332031 17.332031 C 31.550781 17.113281 31.832031 17 32 17 Z M 38 17 L 40 17 C 40.828125 17 42.003906 17.933594 42.71875 18.824219 L 46.78125 24.273438 C 46.78125 24.273438 47.085938 24.710938 47.402344 25.355469 C 47.65625 25.871094 47.800781 26.472656 47.882813 27 L 39 27 C 38.832031 27 38.550781 26.886719 38.332031 26.667969 C 38.113281 26.449219 38 26.167969 38 26 Z M 13 35 C 15.222656 35 17 36.777344 17 39 C 17 41.222656 15.222656 43 13 43 C 10.777344 43 9 41.222656 9 39 C 9 36.777344 10.777344 35 13 35 Z M 40 35 C 42.222656 35 44 36.777344 44 39 C 44 41.222656 42.222656 43 40 43 C 37.777344 43 36 41.222656 36 39 C 36 36.777344 37.777344 35 40 35 Z"></path>
                      </svg>
                      <span className="icon-btn-share font-semibold mr-3">
                        Mode de livraison
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                      <div className="mb-2 flex flex-col gap-2">
                        <DialogHeader>
                          <DialogTitle className="text-left">Choisissez une méthode de livraison</DialogTitle>
                          <DialogDescription className="text-left">
                            Sélectionnez une option ci-dessous.
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                      <form className="space-y-5">
                        <RadioGroup
                          className="gap-2"
                          defaultValue={String(selectedShippingIdx)}
                          onValueChange={val => setSelectedShippingIdx(Number(val))}
                        >
                          {normalizeShippings(product.shippings).map((shipping, idx) => (
                            <div
                              key={shipping.id}
                              className={`border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none`}
                            >
                              <RadioGroupItem
                                value={String(idx)}
                                id={`${id}-${idx}`}
                                aria-describedby={`${id}-${idx}-description`}
                                className="order-1 after:absolute after:inset-0"
                              />
                              <div className="grid grow gap-1">
                                <Label htmlFor={`${id}-${idx}`}>{shipping.shipping_name}</Label>
                                <p
                                  id={`${id}-${idx}-description`}
                                  className="text-muted-foreground text-xs"
                                >
                                  {shipping.shipping_description}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  <span className="font-semibold">Coût:</span> {shipping.shipping_cost} MAD
                                  {"  "} | <span className="font-semibold">Délai:</span> {shipping.shipping_delivery_time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        
                        <div className="grid gap-2">
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => setDeliveryOpen(false)}
                          >
                            Valider la livraison
                          </Button>
                          <DialogClose asChild>
                            <Button type="button" variant="ghost" className="w-full">
                              Annuler
                            </Button>
                          </DialogClose>
                        </div>
                      </form>
                    </DialogContent>
                </Dialog>
                <span className="font-bold"></span>{" "}
                {normalizeShippings(product.shippings).length > 0 ? (
                  <Dialog open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                    <DialogTrigger asChild>
                      <button
                        className="text-blue-500 transition border-none font-semibold"

                        type="button">
                      <span className="hover:underline">
                        {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_delivery_time
                        } - {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_name
                        } - {
                          normalizeShippings(product.shippings)[selectedShippingIdx].shipping_cost
                        } MAD
                      </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="mb-2 flex flex-col gap-2">
                        <DialogHeader>
                          <DialogTitle className="text-left">Choisissez une méthode de livraison</DialogTitle>
                          <DialogDescription className="text-left">
                            Sélectionnez une option ci-dessous.
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                      <form className="space-y-5">
                        <RadioGroup
                          className="gap-2"
                          defaultValue={String(selectedShippingIdx)}
                          onValueChange={val => setSelectedShippingIdx(Number(val))}
                        >
                          {normalizeShippings(product.shippings).map((shipping, idx) => (
                            <div
                              key={shipping.id}
                              className={`border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none`}
                            >
                              <RadioGroupItem
                                value={String(idx)}
                                id={`${id}-${idx}`}
                                aria-describedby={`${id}-${idx}-description`}
                                className="order-1 after:absolute after:inset-0"
                              />
                              <div className="grid grow gap-1">
                                <Label htmlFor={`${id}-${idx}`}>{shipping.shipping_name}</Label>
                                <p
                                  id={`${id}-${idx}-description`}
                                  className="text-muted-foreground text-xs"
                                >
                                  {shipping.shipping_description}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  <span className="font-semibold">Coût:</span> {shipping.shipping_cost} MAD
                                  {"  "} | <span className="font-semibold">Délai:</span> {shipping.shipping_delivery_time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        
                        <div className="grid gap-2">
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => setDeliveryOpen(false)}
                          >
                            Valider la livraison
                          </Button>
                          <DialogClose asChild>
                            <Button type="button" variant="ghost" className="w-full">
                              Annuler
                            </Button>
                          </DialogClose>
                        </div>
                      </form>
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
                    className="text-base font-bold text-gray-500 hover:bg-transparent px-8"
                >
                    -
                </Button>
                <span className="w-6 text-center text-blue-600 font-semibold text-lg">{quantity}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={increase}
                    className="text-lg font-bold text-gray-500 hover:bg-transparent px-8"
                >
                    +
                </Button>
              </div>
              <Button className="bg-orange-500 text-lg text-white px-8 py-5 border border-orange-500 rounded font-semibold hover:bg-orange-600 transition">
                Devis instantané
              </Button>
              <Button className="bg-transparent text-lg text-orange-500 border border-orange-500 px-8 py-5 rounded font-semibold hover:bg-orange-500 hover:text-white transition">
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
