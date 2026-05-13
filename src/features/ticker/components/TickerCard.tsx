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
    const timeout = setTimeout(() => setFlashClass(''), 600);
    return () => clearTimeout(timeout);
  }, [data.price]);

  return (
    <div className={`flex items-center gap-5 rounded-lg px-4 py-2.5 transition-colors ${flashClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-semibold text-primary">{data.symbol}</span>
        <span className="text-[12px] text-tertiary">/USDT</span>
      </div>
      <span className="font-mono text-[15px] font-semibold text-primary">
        ${formatPrice(data.price)}
      </span>
      <span
        className={`rounded-md px-2 py-0.5 font-mono text-[12px] font-semibold ${
          isPositive
            ? 'bg-bullish/[0.08] text-bullish'
            : 'bg-bearish/[0.08] text-bearish'
        }`}
      >
        {isPositive ? '+' : ''}{formatPercent(data.changePercent24h)}
      </span>
      <span className="hidden text-[12px] text-secondary lg:inline">
        Vol {formatVolume(data.volume24h)}
      </span>
    </div>
  );
}
