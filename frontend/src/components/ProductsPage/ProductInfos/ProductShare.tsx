import inImg from "@/assets/in.svg";
import whatsImg from "@/assets/whats.svg";
import tweetImg from "@/assets/tweet.svg";
import faceImg from "@/assets/face.svg";
import linkImg from "@/assets/link.svg";

const ProductShare = () => (
  <div className="flex items-center gap-2 mt-10 self-start">
    <span className="text-gray-500 text-base font-bold">Share</span>
    <a href="#"><img src={inImg} alt="Link" className="w-12 h-12" /></a>
    <a href="#"><img src={faceImg} alt="Link" className="w-12 h-12" /></a>
    <a href="#"><img src={whatsImg} alt="Link" className="w-12 h-12" /></a>
    <a href="#"><img src={tweetImg} alt="Link" className="w-12 h-12" /></a>
    <a href="#"><img src={linkImg} alt="Link" className="w-12 h-12" /></a>
  </div>
);

export default ProductShare;
