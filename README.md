# **AI-Powered NFT Generator**  

## **Overview**  
This project enables users to generate AI-powered NFTs and store them on IPFS via Pinata. It integrates with Alchemy's NFT API to fetch and display all minted NFTs from a smart contract on the Ethereum Sepolia testnet.  

## **Features**  
- Upload AI-generated images to **IPFS**  
- Store NFT metadata securely  
- Fetch all minted NFTs from a smart contract  
- Display NFTs in a responsive **3-column grid**  

## **Tech Stack**  
Next.js, TypeScript, Alchemy API, Pinata, IPFS, TailwindCSS  

## **Setup Instructions**  
### 1️⃣ Clone the Repo  
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Configure API Keys  
Create a `.env.local` file and add your Pinata & Alchemy keys:  
```
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-key
PINATA_API_KEY=your-pinata-key
PINATA_SECRET_KEY=your-pinata-secret
```

### 4️⃣ Run the Development Server  
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.  

---


## **Contributing**  
1. Fork the repo  
2. Create a new branch:  
   ```sh
   git checkout -b feature-name
   ```
3. Make changes and commit:  
   ```sh
   git commit -m "Add feature"
   ```
4. Push to GitHub and create a PR 🚀  

---

## **License**  
This project is **open-source** under the **MIT License**.  

