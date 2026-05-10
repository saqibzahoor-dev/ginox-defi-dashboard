export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

export interface TickerData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  prevPrice: number;
}

export type PriceDirection = 'up' | 'down' | 'neutral';

export type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

export interface TraderCard {
  id: string;
  name: string;
  symbol: string;
  image: string;
  address: string;
  roi: number;
  pnl: number;
  winRate: number;
  maxDrawdown: number;
  volume: number;
  sparklineData: number[];
  priceChange7d: number;
  currentPrice: number;
  marketCap: number;
}

export interface TraderDetail extends TraderCard {
  rank: number;
  totalTrades: number;
  avgTradeSize: number;
  bestTrade: number;
  worstTrade: number;
  priceHistory: Array<{ time: number; value: number }>;
}

export type { Timeframe } from '@/config/constants';

export type SortField = 'roi' | 'pnl' | 'volume';
export type SortDirection = 'asc' | 'desc';

export interface PortfolioToken {
  address: string;
  symbol: string;
  name: string;
  balance: number;
  decimals: number;
  entryPrice: number;
  currentPrice: number;
  isManual: boolean;
}

export interface PortfolioSummary {
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  tokens: PortfolioToken[];
}

export interface ChartAllocation {
  name: string;
  value: number;
  color: string;
}
