import { useState } from "react";
import { type Product } from "@/components/ProductsPage/types";

type Review = {
  id: number;
  product_id: number;
  buyer_id: number;
  rating: number;
  comment: string;
};

const TABS = ["description", "specification", "return", "reviews"] as const;
type TabType = typeof TABS[number];

const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  return (
    <div className="mt-10">
      <div className="flex gap-6 border-b">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
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
            {product.reviews && Array.isArray(product.reviews) && (product.reviews as Review[]).length > 0 ? (
              <ul className="space-y-4">
                {(product.reviews as Review[]).map((review, idx) => (
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
  );
};

export default ProductTabs;
