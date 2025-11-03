// app/page.tsx (Next.js 13+ with App Router)
"use client";
import { useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleMint = async () => {
    setLoading(true);
    setTxHash("");

    try {
      const res = await fetch("http://localhost:5000/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: wallet,
          tokenURI: "ipfs://bafkreifsjetib2tuj6nlrha4mq7j6t6jf336wz2r3wlwrh6pa5h33hxfea", // replace
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTxHash(data.txHash);
      } else {
        alert("Mint failed: " + data.error);
      }
    } catch (err) {console.log(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
    {/* NFT Image */}
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg" // replace with your NFT image path or IPFS URL
      alt="NFT Preview"
      className="w-full h-48 object-cover rounded-xl mb-4"
    />

    <h1 className="text-2xl font-bold mb-4 text-center">Buy NFT</h1>

    <label className="block mb-2 text-sm font-medium text-gray-700">
      Wallet Address
    </label>
    <input
      type="text"
      value={wallet}
      onChange={(e) => setWallet(e.target.value)}
      className="w-full p-2 border rounded-lg mb-4"
      placeholder="0x..."
    />

    <button
      onClick={handleMint}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Minting..." : "Buy NFT"}
    </button>

    {txHash && (
      <div className="mt-4 text-sm text-center">
        ✅ NFT Minted!
        <br />
        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Transaction
        </a>
      </div>
    )}
  </div>
</div>

  );
}
