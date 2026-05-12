import { useState } from "react";
import { Settings2 } from "lucide-react";
import AssetCard from "../components/dashboard/AssetCard";
import TransferModal from "../components/dashboard/TransferModal";

const assetData = [
  {
    title: "Bitcoin Yield Vault",
    category: "BTC Staking",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025",
    roi: 30.0,
    tags: ["6 Months", "Low Risk"],
    description: "Institutional-grade Bitcoin yield generation through delta-neutral strategies and regulated lending markets. Optimized for long-term holders seeking reliable BTC-denominated returns.",
    metrics: { yield: 30.0, duration: "6 Months", asset: "BTC" },
    className: "lg:col-span-12",
  },
  {
    title: "Ethereum Alpha",
    category: "L2 Ecosystem",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
    roi: 35.0,
    tags: ["9 Months", "Staking"],
    description: "Advanced Ethereum staking and yield optimization across layer-2 protocols. Utilizes liquid staking derivatives and MEV capture to maximize ETH-denominated alpha.",
    metrics: { yield: 35.0, duration: "9 Months", asset: "ETH" },
  },
  {
    title: "Solana High-Yield",
    category: "High Speed",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=025",
    roi: 24.0,
    tags: ["3 Months", "Aggressive"],
    description: "Capturing the explosive growth of the Solana ecosystem. This vault focuses on deep liquidity provision and automated yield farming on leading SPL-token DEXs.",
    metrics: { yield: 24.0, duration: "3 Months", asset: "SOL" },
  },
  {
    title: "BNB Smart Growth",
    category: "Binance Chain",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025",
    roi: 40.0,
    tags: ["15 Months", "Balanced"],
    description: "Diversified exposure to the BNB Chain ecosystem. Combines validator staking with strategic allocations to blue-chip DeFi protocols for consistent compounding.",
    metrics: { yield: 40.0, duration: "15 Months", asset: "BNB" },
  },
];

export default function Investment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-gold/50"></div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Capital Allocation</span>
          </div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-bold text-white mb-4">
            Alpha Discovery
          </h1>
          <p className="text-white/50 text-base lg:text-lg font-raleway font-light">
            Curated institutional opportunities with asymmetric risk-reward profiles. Data reflects real-time quantitative delta tracking.
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white/60 hover:bg-white/5 hover:text-white transition-all uppercase font-montserrat shadow-xl shadow-obsidian/40">
          <Settings2 size={16} />
          Filter Parameters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {assetData.map((asset, i) => (
          <AssetCard 
            key={i} 
            {...asset} 
            className={asset.className || "lg:col-span-4"}
            onInvestClick={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      {isModalOpen && <TransferModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
