import { useState } from "react";
import type { Asset } from "../data/assets";

type Props = {
  asset: Asset;
  className?: string;
};

export default function AssetCard({ asset, className = "" }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = asset.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <article className={["asset-card", className].join(" ").trim()}>
      {asset.thumbnailUrl && !imageFailed ? (
        <img
          src={asset.thumbnailUrl}
          alt={asset.name}
          className="asset-card-thumb"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="asset-card-thumb asset-card-thumb-fallback" aria-hidden="true">
          {initials}
        </div>
      )}

      <div className="asset-card-body">
        <h2 className="asset-card-title">{asset.name}</h2>
        <p className="asset-card-subtitle">by {asset.creator}</p>
      </div>
    </article>
  );
}
