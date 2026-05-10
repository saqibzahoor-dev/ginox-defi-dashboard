import { useState, useEffect, useRef } from 'react';
import { formatPrice, formatPercent, formatVolume } from '@/shared/utils/format';
import type { TickerData, PriceDirection } from '@/shared/types';

interface TickerCardProps {
  data: TickerData;
  direction: PriceDirection;
}

export function TickerCard({ data }: TickerCardProps) {
  const [flashClass, setFlashClass] = useState('');
  const prevPriceRef = useRef(data.price);
  const isPositive = data.changePercent24h >= 0;

  useEffect(() => {
    if (prevPriceRef.current === data.price) return;
    const dir = data.price > prevPriceRef.current ? 'up' : 'down';
    setFlashClass(dir === 'up' ? 'animate-flash-green' : 'animate-flash-red');
    prevPriceRef.current = data.price;
    const timeout = setTimeout(() => setFlashClass(''), 500);
    return () => clearTimeout(timeout);
  }, [data.price]);

  return (
    <div className={`flex items-center gap-4 rounded px-3 py-1.5 transition-colors ${flashClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-white">{data.symbol}</span>
        <span className="text-[11px] text-secondary">/USDT</span>
      </div>
      <span className="font-mono text-[14px] font-semibold text-white">
        ${formatPrice(data.price)}
      </span>
      <span
        className={`font-mono text-[12px] font-medium ${
          isPositive ? 'text-bullish' : 'text-bearish'
        }`}
      >
        {isPositive ? '+' : ''}{formatPercent(data.changePercent24h)}
      </span>
      <span className="hidden text-[11px] text-secondary sm:inline">
        Vol {formatVolume(data.volume24h)}
      </span>
    </div>
  );
}
