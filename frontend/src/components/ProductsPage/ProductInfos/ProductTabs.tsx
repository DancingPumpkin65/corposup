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
} from '@/components/Shadcn/VideoPlayer';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Shadcn/Accordion";

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

  // Tab content renderers
  const renderTabContent = (tab: TabType) => {
    if (tab === "description") {
      return (
        <div className="w-full max-w-4xl mx-auto">
          <p className="whitespace-pre-line">{product.product_description || "Aucune description disponible."}</p>
        </div>
      );
    }
    if (tab === "specification") {
      return (
        <div className="data item content w-full max-w-4xl mx-auto" aria-labelledby="tab-label-additional" id="additional" data-role="content" role="tabpanel" aria-hidden="false">
          <div className="additional-attributes-wrapper table-wrapper">
            {product.details ? (
              <table className="table-fixed table-bordered table-data-attr w-full text-left border border-gray-200">
                <tbody>
                  <tr>
                    <td className="w-1/2 col border label py-2 px-2 sm:px-4 font-semibold text-gray-700" scope="row">Matière</td>
                    <th className="w-1/2 col border data py-2 px-2 sm:px-4 font-normal text-gray-600" data-th="Matière">
                      {product.details.material || "—"}
                    </th>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="w-1/2 col border label py-2 px-2 sm:px-4 font-semibold text-gray-700" scope="row">Couleur</td>
                    <th className="w-1/2 col border data py-2 px-2 sm:px-4 font-normal text-gray-600" data-th="Couleur">
                      {product.details.color || "—"}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/2 col border label py-2 px-2 sm:px-4 font-semibold text-gray-700" scope="row">GTIN</td>
                    <th className="w-1/2 col border data py-2 px-2 sm:px-4 font-normal text-gray-600" data-th="GTIN">
                      {product.details.GTIN || "—"}
                    </th>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="w-1/2 col border label py-2 px-2 sm:px-4 font-semibold text-gray-700" scope="row">MPN</td>
                    <th className="w-1/2 col border data py-2 px-2 sm:px-4 font-normal text-gray-600" data-th="MPN">
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
      );
    }
    if (tab === "video") {
      return (
        <div className="w-full max-w-4xl mx-auto">
          {product.video_path ? (
            <div className="mt-4">
              <VideoPlayer className="w-full overflow-hidden rounded-[12px] border">
                <VideoPlayerContent
                  crossOrigin=""
                  muted
                  preload="auto"
                  slot="media"
                  src={`https://localhost:8000/storage/videos/${product.video_path}`}
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
      );
    }
    if (tab === "reviews") {
      return (
        <div className="w-full max-w-4xl mx-auto">
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
      );
    }
    return null;
  };

  return (
    <div className="mt-10">
      {/* Desktop/Tablet Tabs */}
      <div className="hidden sm:grid grid-cols-4 border-b">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`w-full uppercase text-base sm:text-xl py-2 px-2 sm:px-4 ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {/* Mobile Accordion */}
      <div className="sm:hidden">
        <Accordion
          type="single"
          collapsible
          value={activeTab}
          onValueChange={val => setActiveTab(val as TabType)}
        >
          {TABS.map(tab => (
            <AccordionItem key={tab} value={tab} className="underline-none">
              <AccordionTrigger className="uppercase text-base font-semibold active:underline-none">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </AccordionTrigger>
              <AccordionContent>
                {renderTabContent(tab)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* Tab Content (desktop/tablet) */}
      <div className="py-4 sm:py-6 hidden sm:block">
        {TABS.map(tab =>
          activeTab === tab && (
            <div key={tab} className="block">
              {renderTabContent(tab)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
