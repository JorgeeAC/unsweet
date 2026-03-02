import { Link } from "react-router-dom";
import AssetCard from "./AssetCard";
import type { Asset } from "../data/assets";

type Props = {
  assets: Asset[];
  getHref?: (asset: Asset) => string;
};

export default function GalleryGrid({ assets, getHref }: Props) {
  if (!assets.length) {
    return <p className="state-msg">No cards to show yet.</p>;
  }

  return (
    <div className="gallery-grid">
      {assets.map((asset) => (
        <Link key={asset.id} to={getHref ? getHref(asset) : `/asset/${asset.id}`} className="gallery-grid-item">
          <AssetCard asset={asset} />
        </Link>
      ))}
    </div>
  );
}
