import { useEffect, useState } from "react";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/app/client";

interface NFT {
  tokenId: string;
  title: string;
  description: string;
  imageUrl: string;
}

const API_URL = `https://eth-sepolia.g.alchemy.com/nft/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj/getNFTsForCollection?contractAddress=0x3121f213e88cf5b2b02e330c98a92a19ee81a3d6&withMetadata=true`;

function resolveIPFS(url?: string): string {
  return url?.startsWith("ipfs://")
    ? url.replace("ipfs://", "https://dweb.link/ipfs/")
    : url || "/fallback-image.png";
}

interface RawNFTData {
  id: { tokenId: string };
  title?: string;
  description?: string;
  metadata?: { name?: string; description?: string; image?: string };
  media?: { gateway?: string }[];
}

function parseNFTData(nftData: RawNFTData[]): NFT[] {
  return nftData.map((nft) => ({
    tokenId: parseInt(nft.id.tokenId, 16).toString(),
    title: nft.title || nft.metadata?.name || "Untitled NFT",
    description:
      nft.description || nft.metadata?.description || "No description",
    imageUrl: resolveIPFS(nft.media?.[0]?.gateway || nft.metadata?.image),
  }));
}

const NFTGrid = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch NFTs");

        const data = await response.json();
        setNfts(parseNFTData(data.nfts || []));
      } catch (err) {
        setError("Error fetching NFTs. Try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🖼 Minted NFTs</h2>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-300 h-48 rounded-lg"
            ></div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div
            key={nft.tokenId}
            className="border rounded-lg p-2 shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white"
          >
            <div className="w-full h-36 overflow-hidden rounded-md">
              <MediaRenderer
                client={client}
                src={nft.imageUrl}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold mt-2 truncate">{nft.title}</h3>
            <p className="text-xs text-gray-500 truncate">{nft.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
