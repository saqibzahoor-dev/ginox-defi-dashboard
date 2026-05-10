import { useState, useEffect, useRef } from 'react';
import { formatPrice, formatPercent, formatVolume } from '@/shared/utils/format';
import type { TickerData, PriceDirection } from '@/shared/types';

interface TickerCardProps {
  data: TickerData;
  direction: PriceDirection;
}

const CRYPTO_META: Record<string, { gradient: string; symbol: string }> = {
  BTC: { gradient: 'from-amber-500 to-orange-500', symbol: 'B' },
  ETH: { gradient: 'from-indigo-400 to-blue-500', symbol: 'E' },
  BNB: { gradient: 'from-yellow-400 to-amber-500', symbol: 'B' },
};

export function TickerCard({ data, direction }: TickerCardProps) {
  const [flashClass, setFlashClass] = useState('');
  const prevPriceRef = useRef(data.price);
  const isPositive = data.changePercent24h >= 0;

  useEffect(() => {
    if (prevPriceRef.current === data.price) return;

    const newDirection = data.price > prevPriceRef.current ? 'up' : 'down';
    setFlashClass(newDirection === 'up' ? 'animate-flash-green' : 'animate-flash-red');
    prevPriceRef.current = data.price;

    const timeout = setTimeout(() => setFlashClass(''), 600);
    return () => clearTimeout(timeout);
  }, [data.price]);

  const meta = CRYPTO_META[data.symbol] ?? { gradient: 'from-slate-500 to-slate-400', symbol: data.symbol.charAt(0) };

  return (
    <div
      className={`group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3.5 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.04] ${flashClass}`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} shadow-lg`}>
        <span className="text-sm font-bold text-white">{meta.symbol}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{data.symbol}</span>
          <span className="text-[11px] text-secondary">/USDT</span>
        </div>
        <p className="font-mono text-lg font-bold tracking-tight text-white">
          ${formatPrice(data.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? 'bg-bullish/[0.1] text-bullish'
              : 'bg-bearish/[0.1] text-bearish'
          }`}
        >
          {isPositive ? '+' : ''}{formatPercent(data.changePercent24h)}
        </span>
        <span className="text-[11px] text-secondary">
          Vol {formatVolume(data.volume24h)}
        </span>
      </div>

      {direction !== 'neutral' && (
        <div
          className={`h-8 w-[3px] rounded-full ${
            direction === 'up' ? 'bg-bullish shadow-[0_0_8px_rgba(10,196,136,0.3)]' : 'bg-bearish shadow-[0_0_8px_rgba(255,87,87,0.3)]'
          }`}
        />
      )}
    </div>
  );
}
