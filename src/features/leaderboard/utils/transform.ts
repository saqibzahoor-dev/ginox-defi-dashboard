import type { CoinGeckoMarket } from '../types';
import type { TraderCard } from '@/shared/types';

function generateDeterministicMetrics(coin: CoinGeckoMarket): {
  roi: number;
  pnl: number;
  winRate: number;
  maxDrawdown: number;
} {
  const seed = coin.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const priceChange = coin.price_change_percentage_7d_in_currency ?? coin.price_change_percentage_24h;

  const roi = priceChange * (1 + (seed % 30) / 10);
  const pnl = coin.current_price * coin.total_volume * (priceChange / 100) * 0.00001;
  const winRate = 40 + (seed % 40) + (priceChange > 0 ? 10 : -5);
  const maxDrawdown = -(5 + (seed % 25) + Math.abs(coin.ath_change_percentage) * 0.1);

  return {
    roi: Math.round(roi * 100) / 100,
    pnl: Math.round(pnl * 100) / 100,
    winRate: Math.min(Math.max(Math.round(winRate), 20), 95),
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
  };
}

export function transformCoinToTrader(coin: CoinGeckoMarket): TraderCard {
  const metrics = generateDeterministicMetrics(coin);
  const sparkline = coin.sparkline_in_7d?.price ?? [];
  const sampledSparkline = sparkline.length > 24
    ? sparkline.filter((_, i) => i % Math.floor(sparkline.length / 24) === 0).slice(0, 24)
    : sparkline;

  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    image: coin.image,
    address: `0x${coin.id.slice(0, 4)}...${coin.id.slice(-4)}`,
    roi: metrics.roi,
    pnl: metrics.pnl,
    winRate: metrics.winRate,
    maxDrawdown: metrics.maxDrawdown,
    volume: coin.total_volume,
    sparklineData: sampledSparkline,
    priceChange7d: coin.price_change_percentage_7d_in_currency ?? 0,
    currentPrice: coin.current_price,
    marketCap: coin.market_cap,
  };
}
