import { useState } from "react";
import { type Product } from "@/components/ProductsPage/types";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/kibo-ui/video-player';

type Review = {
  id: number;
  product_id: number;
  buyer_id: number;
  rating: number;
  comment: string;
};

const TABS = ["description", "specification", "video", "reviews"] as const;
type TabType = typeof TABS[number];

const ProductTabs = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 border-b">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`w-full py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="py-6">
        {activeTab === "description" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{product.product_description || "Aucune description disponible."}</p>
          </div>
        )}
        {activeTab === "video" && (
          <div className="max-w-4xl mx-auto">
            {product.video_path ? (
              <div className="mt-4">
                <VideoPlayer className="overflow-hidden rounded-[12px] border">
                  <VideoPlayerContent
                    crossOrigin=""
                    muted
                    preload="auto"
                    slot="media"
                    src='https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4'
                  />
                  <VideoPlayerControlBar >
                    <VideoPlayerPlayButton />
                    <VideoPlayerSeekBackwardButton />
                    <VideoPlayerSeekForwardButton />
                    <VideoPlayerTimeRange />
                    <VideoPlayerTimeDisplay showDuration />
                    <VideoPlayerMuteButton />
                    <VideoPlayerVolumeRange />
                  </VideoPlayerControlBar>
                </VideoPlayer>
                <h2 className="font-semibold mt-2">Description de la vidéo</h2>
                {product.video_description && (
                  <div className="text-sm text-gray-500 mt-2">{product.video_description}</div>
                )}
              </div>
            ) : (
              <p>Aucune vidéo disponible.</p>
            )}
          </div>
        )}
        {activeTab === "specification" && (
          <div className="data item content max-w-4xl mx-auto" aria-labelledby="tab-label-additional" id="additional" data-role="content" role="tabpanel" aria-hidden="false">
            <div className="additional-attributes-wrapper table-wrapper">
              {product.details ? (
                <table className="table-fixed table-bordered table-data-attr w-full text-left border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="w-1/2 col border label py-2 px-4 font-semibold text-gray-700" scope="row">Matière</td>
                      <th className="w-1/2 col border data py-2 px-4 font-normal text-gray-600" data-th="Matière">
                        {product.details.material || "—"}
                      </th>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="w-1/2 col border label py-2 px-4 font-semibold text-gray-700" scope="row">Couleur</td>
                      <th className="w-1/2 col border data py-2 px-4 font-normal text-gray-600" data-th="Couleur">
                        {product.details.color || "—"}
                      </th>
                    </tr>
                    <tr>
                      <td className="w-1/2 col border label py-2 px-4 font-semibold text-gray-700" scope="row">GTIN</td>
                      <th className="w-1/2 col border data py-2 px-4 font-normal text-gray-600" data-th="GTIN">
                        {product.details.GTIN || "—"}
                      </th>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="w-1/2 col border label py-2 px-4 font-semibold text-gray-700" scope="row">MPN</td>
                      <th className="w-1/2 col border data py-2 px-4 font-normal text-gray-600" data-th="MPN">
                        {product.details.MPN || "—"}
                      </th>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Aucune spécification disponible.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="max-w-4xl mx-auto">
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
