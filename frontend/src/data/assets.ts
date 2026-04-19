export type Asset = {
  id: string;
  name: string;
  creator: string;
  thumbnailUrl: string;
  description?: string;
};

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Asset One",
    creator: "Jorge",
    thumbnailUrl: "/images/asset1.jpg", // put in /public/images
    description: "Example description",
  },
];