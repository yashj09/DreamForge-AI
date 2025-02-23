import { client } from "@/app/client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { MediaRenderer } from "thirdweb/react";

interface NFT {
  id: { tokenId: string };
  title: string;
  description: string;
  media: { gateway: string }[];
}

const NFTGrid = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const API_URL = `https://eth-sepolia.g.alchemy.com/nft/v2/6jQzxWfrgceXad1Zy2aszbR5jxHqPmCj/getNFTsForCollection?contractAddress=0x3121f213e88cf5b2b02e330c98a92a19ee81a3d6&withMetadata=true`;

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNfts(data.nfts || []);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [API_URL]);
  const formatIPFSUrl = (url: string) => {
    return url.startsWith("ipfs://")
      ? url.replace("ipfs://", "https://dweb.link/ipfs/")
      : url;
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Minted NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map((nft, index) => (
          <div key={index} className="border rounded-lg p-2 shadow-lg">
            <MediaRenderer
              client={client}
              src={formatIPFSUrl(nft.media[0]?.gateway || "/placeholder.jpg")}
              alt={nft.title}
              className="w-full object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{nft.title}</h3>
            <p className="text-sm text-gray-600">{nft.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
