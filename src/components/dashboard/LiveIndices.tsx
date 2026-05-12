import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { LiveIndex } from "../../types";

const mockStocks: LiveIndex[] = [
  { symbol: "S&P 500", value: 5234.18, change: 1.24, isPositive: true },
  { symbol: "NASDAQ", value: 16428.82, change: 0.89, isPositive: true },
];

const fetchCryptoIndices = async (): Promise<LiveIndex[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,pax-gold&vs_currencies=usd&include_24hr_change=true"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  
  return [
    {
      symbol: "BTC/USD",
      value: data.bitcoin?.usd || 68452.10,
      change: data.bitcoin?.usd_24h_change || -0.45,
      isPositive: (data.bitcoin?.usd_24h_change || 0) >= 0,
    },
    {
      symbol: "GLD OZ",
      value: data['pax-gold']?.usd || 2156.40,
      change: data['pax-gold']?.usd_24h_change || 2.10,
      isPositive: (data['pax-gold']?.usd_24h_change || 0) >= 0,
    }
  ];
};

export default function LiveIndices() {
  const { data: cryptoIndices, isLoading, isError } = useQuery({
    queryKey: ['cryptoIndices'],
    queryFn: fetchCryptoIndices,
    refetchInterval: 60000, // Refetch every minute
  });

  const displayIndices = isLoading || isError 
    ? [...mockStocks, { symbol: "BTC/USD", value: 68452.10, change: -0.45, isPositive: false }, { symbol: "GLD OZ", value: 2156.40, change: 2.10, isPositive: true }]
    : [...mockStocks, ...(cryptoIndices || [])];

  return (
    <div className="flex items-center gap-8 py-6 overflow-x-auto hide-scrollbar">
      <div className="text-xs font-bold font-montserrat text-white/50 tracking-widest shrink-0 border-r border-white/10 pr-8">
        LIVE INDICES
      </div>
      
      <div className="flex items-center gap-12">
        {displayIndices.map((index) => (
          <div key={index.symbol} className="shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-white">{index.symbol}</span>
              {index.isPositive ? (
                <ArrowUpRight size={14} className="text-[#EAB308]" />
              ) : (
                <ArrowDownRight size={14} className="text-white/50" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#EAB308]">
                {isLoading ? (
                  <span className="inline-block w-16 h-4 bg-white/10 animate-pulse rounded" />
                ) : (
                  index.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                )}
              </span>
              <span className={`text-xs ${index.isPositive ? 'text-[#EAB308]/80' : 'text-white/50'}`}>
                {isLoading ? (
                  <span className="inline-block w-8 h-3 bg-white/10 animate-pulse rounded" />
                ) : (
                  <>{index.isPositive ? '+' : ''}{Number(index.change).toFixed(2)}%</>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
