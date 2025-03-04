"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ethers } from "ethers";
import contractabi from "../utils/contractabi.json";
import { uploadToIPFS, uploadMetadataToIPFS } from "../utils/pinataClient";
import NFTCollection from "./NftCollection";

const CONTRACT_ADDRESS = "0x3121f213e88cf5b2b02e330c98a92a19ee81a3d6";

const Aigenerator = () => {
  const [imageprompt, setImageprompt] = useState("");
  const [generatedimage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [isminting, setIsMinting] = useState(false);
  const generateImage = async () => {
    if (!imageprompt) return;
    setIsGenerating(true);
    setError("");

    try {
      // Fetch AI-generated image
      const response = await axios.get(
        `https://honoimagegenerator.yashj8858.workers.dev/`,
        {
          params: { prompt: imageprompt },
          responseType: "blob", // Get image as a Blob
        }
      );

      const imageBlob = response.data; // The actual Blob object
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);
      setIsGenerating(false);

      setIsMinting(true);
      // Upload Image to IPFS
      const ipfsImageUrl = await uploadToIPFS(imageBlob); // Pass Blob, not the URL
      console.log("Uploaded Image to IPFS:", ipfsImageUrl);

      // Upload Metadata to IPFS
      const metadataUrl = await uploadMetadataToIPFS(ipfsImageUrl, imageprompt);
      console.log("Uploaded Metadata to IPFS:", metadataUrl);

      // Mint NFT on Blockchain
      if (!window.ethereum) throw new Error("MetaMask not found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Contract Interaction
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractabi.abi,
        signer
      );

      const tx = await contract.mintNft(metadataUrl);
      await tx.wait();

      alert("NFT Minted Successfully!");
      setIsMinting(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setImageprompt("");
      setIsMinting(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold">AI Image Generator</h1>

      {/* Image Display */}
      {generatedimage ? (
        <Image
          width={320}
          height={320}
          src={generatedimage}
          alt="Generated"
          className="w-80 h-80 rounded-xl shadow-lg border border-gray-700"
        />
      ) : (
        <div className="w-80 h-80 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 text-lg font-medium shadow-md">
          <p>
            {isGenerating
              ? "Generating..."
              : "Enter a prompt to generate an image"}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form Section */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <input
            className="w-full h-12 rounded-lg px-4 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter a prompt..."
            value={imageprompt}
            onChange={(e) => setImageprompt(e.target.value)}
          />

          <button
            onClick={generateImage}
            className={`w-full h-12 rounded-lg font-semibold text-white transition ${
              isGenerating || !imageprompt
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
            disabled={isGenerating || !imageprompt}
          >
            {isGenerating
              ? "Generating Image..."
              : isminting
              ? "Minting..."
              : "Generate Image"}
          </button>

          {/* Regenerate Button */}
          {generatedimage && (
            <button
              onClick={() => setGeneratedImage("")}
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Generate Another
            </button>
          )}
        </div>
      </div>
      <div className="md:w-[60%] w-full">
        <NFTCollection />
      </div>
    </div>
  );
};

export default Aigenerator;
