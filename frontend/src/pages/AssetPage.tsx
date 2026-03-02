import { useParams } from "react-router-dom";
import { mockAssets } from "../data/assets";
// import AssetDetail from "../components/AssetDetail"; // if you have it

export default function AssetPage() {
  const { id } = useParams<{ id: string }>();
  const asset = mockAssets.find((a) => a.id === id);

  if (!asset) {
    return <div className="p-6">Not found</div>;
    // or: return <NotFound />
  }

  return (
    <div className="p-6">
      {/* Replace this with your AssetDetail component */}
      <h1 className="text-2xl font-bold">{asset.name}</h1>
      <p className="text-sm text-gray-500">by {asset.creator}</p>
      <img src={asset.thumbnailUrl} alt={asset.name} className="mt-4 w-full max-w-3xl rounded-xl" />
      {asset.description ? <p className="mt-4">{asset.description}</p> : null}
    </div>
  );
}