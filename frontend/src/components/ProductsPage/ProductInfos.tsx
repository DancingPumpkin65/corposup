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
import { CheckIcon, RefreshCcwIcon } from "lucide-react";

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
      <div className="max-w-7xl mx-auto w-full px-8 pt-4 pb-8 lg:px-8">
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
              <h1 className="text-4xl w-full uppercase font-base text-gray-700 mb-4">{product.product_name}, {product.details.brand}, {product.details.material}, {product.details.color}<br /></h1>
              
              {/* Price, Old Price, Discount */}
              <ProductPrice product={product} />
            </div>
            {/* Unit, Minimum, Delivery */}
            <div className="text-lg text-gray-700 mb-8">
              <div className="mb-2">
                <span className="font-bold"></span>{" "}
                {normalizeShippings(product.shippings).length > 0 ? (
                  <Dialog open={deliveryOpen} onOpenChange={setDeliveryOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-blue-500 text-[21px] hover:text-white hover:bg-blue-500 transition border border-2 border-blue-500 font-base rounded-xl px-10 py-7 border-radius-2xl"
                        type="button"
                      >
                        Mode de livraison
                      </Button>
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
                        <div className="space-y-3">
                          <p>
                            <strong className="text-sm font-medium">Livraison inclut :</strong>
                          </p>
                          <ul className="text-muted-foreground space-y-2 text-sm">
                            <li className="flex gap-2">
                              <CheckIcon size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                              Suivi de commande en ligne.
                            </li>
                            <li className="flex gap-2">
                              <CheckIcon size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                              Assistance client dédiée.
                            </li>
                            <li className="flex gap-2">
                              <CheckIcon size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                              Livraison sécurisée.
                            </li>
                          </ul>
                        </div>
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
              <div className="mb-2">
                <span className="font-bold">Conditionnement :</span> 1 Pièce (pcs)
              </div>
              <div className="mb-2">
                <span className="font-bold">Minimun de commande :</span> {product.product_minimum_commande}
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
