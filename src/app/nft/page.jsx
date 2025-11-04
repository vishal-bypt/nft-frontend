"use client";
import { useState } from "react";

export default function NFTShowcase() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false); // kept for modal/global if needed
  const [txHash, setTxHash] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNFT, setModalNFT] = useState(null);
  const [loadingIds, setLoadingIds] = useState([]); // track loading per NFT id

  // handle Ready button: validate wallet and give visible feedback
  const handleReady = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!wallet) {
      setMessage("Please enter a wallet address.");
      return;
    }

    // basic wallet format check (very small heuristic)
    const isProbablyAddress = wallet.startsWith("0x") && wallet.length >= 10;
    if (isProbablyAddress) {
      const short = `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
      setMessage(`Ready — using ${short}`);
    } else {
      setMessage("Invalid wallet address format. It should start with 0x.");
    }
  };

  // Mint NFT function
  const handleMint = async (tokenURI, id) => {
    if (!wallet) {
      setMessage("Please enter a wallet address before minting.");
      return;
    }
    // mark this id as loading
    setLoadingIds((s) => (s.includes(id) ? s : [...s, id]));
    setTxHash("");
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/mint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: wallet,
          tokenURI,
        }),
      });

      const data = await res.json();
      if (data && data.success) {
        setTxHash(data.txHash || data.tx || "");
        setMessage("Mint successful — transaction created.");
      } else {
        setMessage("Mint failed: " + (data?.error || "unknown error"));
      }
    } catch (err) {
      console.error(err);
      setMessage("Error: " + (err?.message || String(err)));
    } finally {
      // remove id from loadingIds
      setLoadingIds((s) => s.filter((x) => x !== id));
      setLoading(false);
    }
  };

  // Sample NFT data for the showcase. Replace with real data or fetch from API when available.
  const nfts = [
    {
      id: 1,
      name: "Ape #1024",
      description: "Hand-drawn, limited edition ape.",
      price: "0.05 ETH",
      img: "https://picsum.photos/seed/ape1024/1200/800",
      tokenURI: "ipfs://bafkreifsjetib2tuj6nlrha4mq7j6t6jf336wz2r3wlwrh6pa5h33hxfea",
    },
    {
      id: 2,
      name: "Pixel Kitty",
      description: "Cute pixel kitty — 1 of 100.",
      price: "0.02 ETH",
      img: "https://picsum.photos/seed/pixelkitty/1200/800",
      tokenURI: "ipfs://bafkreifsjetib2tuj6nlrha4mq7j6t6jf336wz2r3wlwrh6pa5h33hxfea",
    },
    {
      id: 3,
      name: "Generative Landscape",
      description: "One-of-a-kind generative art.",
      price: "0.12 ETH",
      img: "https://picsum.photos/seed/landscape/1200/800",
      tokenURI: "ipfs://bafkreifsjetib2tuj6nlrha4mq7j6t6jf336wz2r3wlwrh6pa5h33hxfea",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-white via-slate-50 to-white rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold">NFT Collection Showcase</h1>
            <p className="mt-2 text-gray-600">Beautifully present your NFTs to clients — browse, preview and mint directly from this UI.</p>
            <div className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full md:w-80 p-2 border rounded-lg"
                placeholder="Enter wallet address (0x...)"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleReady}
              >
                Ready
              </button>
            </div>
            {message && <div className="mt-3 text-sm text-amber-700">{message}</div>}
          </div>
          <div className="w-full md:w-56">
            <img
              src="https://picsum.photos/seed/showcase/1200/800"
              alt="Showcase"
              className="rounded-xl object-cover w-full h-40 md:h-48 shadow-sm"
              onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/fallback/1200/800'; }}
            />
          </div>
        </div>
        {/* Gallery */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Featured NFTs</h2>
          <p className="text-gray-500 mt-1">Hand-picked pieces — perfect for client presentations.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {nfts.map((nft) => (
              <article key={nft.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 w-full overflow-hidden bg-gray-100 cursor-pointer" onClick={() => { setModalNFT(nft); setModalOpen(true); }}>
                  <img src={nft.img} alt={nft.name} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/fallback/1200/800'; }} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{nft.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{nft.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Price</div>
                      <div className="font-medium">{nft.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMint(nft.tokenURI, nft.id)}
                        disabled={loadingIds.includes(nft.id)}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
                      >
                        {loadingIds.includes(nft.id) ? "Minting..." : "Buy / Mint"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* Transaction feedback */}
        {txHash && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-medium">Success — NFT minted ✅</div>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm mt-1 inline-block"
            >
              View transaction on Etherscan
            </a>
          </div>
        )}
        {/* Modal Preview */}
        {modalOpen && modalNFT && (
          <div
  className="fixed inset-0 z-50 flex items-center justify-center transition-opacity"
  style={{ backgroundColor: "rgba(55, 65, 81, 0.4)", backdropFilter: "blur(6px)" }}
  role="dialog"
  aria-modal="true"
>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative animate-fadein">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <img src={modalNFT.img} alt={modalNFT.name} className="w-full h-64 object-cover rounded-xl mb-4" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/fallback/1200/800'; }} />
              <h3 className="text-2xl font-bold mb-2">{modalNFT.name}</h3>
              <p className="text-gray-600 mb-2">{modalNFT.description}</p>
              <div className="text-lg font-semibold mb-4">Price: {modalNFT.price}</div>
              <button
                onClick={() => { handleMint(modalNFT.tokenURI, modalNFT.id); setModalOpen(false); }}
                disabled={loadingIds.includes(modalNFT?.id)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                {loadingIds.includes(modalNFT?.id) ? "Minting..." : "Buy / Mint"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
