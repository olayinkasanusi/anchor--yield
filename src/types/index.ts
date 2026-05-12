export interface AssetItem {
  id: string;
  name: string;
  category: string;
  roi: number;
  tags: string[];
  type: string;
  metrics?: {
    yield?: number;
    duration?: number;
    rating?: string;
  };
}

export interface PortfolioData {
  totalAssets: number;
  status: string;
}

export interface LiveIndex {
  symbol: string;
  value: number;
  change: number;
  isPositive: boolean;
}
