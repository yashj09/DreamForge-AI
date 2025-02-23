import axios from "axios";

const pinataApiKey = "305ee09c0aed441bca0c";
const pinataSecret =
  "573514ed2ca102fcfba5f63bf3268b7a860c65eccc0923c9eb773fd1f8142377";

export const uploadToIPFS = async (imageBase64: string) => {
  // Convert base64 to Blob
  const blob = new Blob([Buffer.from(imageBase64, "base64")], {
    type: "image/png",
  });
  const formData = new FormData();
  formData.append("file", blob, "ai-nft.png");

  // Upload image to Pinata
  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecret,
      },
    }
  );

  return `ipfs://${response.data.IpfsHash}`;
};

export const uploadMetadataToIPFS = async (
  imageUrl: string,
  prompt: string
) => {
  const metadata = {
    name: "AI NFT",
    description: `Generated from prompt: ${prompt}`,
    image: imageUrl,
    attributes: [{ trait_type: "Generated by", value: "AI Model" }],
  };

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    metadata,
    {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecret,
      },
    }
  );

  return `ipfs://${response.data.IpfsHash}`;
};
