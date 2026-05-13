import { formatCurrency, formatPercent, formatVolume } from '@/shared/utils/format';
import { Sparkline } from './Sparkline';
import type { TraderCard as TraderCardType } from '@/shared/types';

interface TraderCardProps {
  trader: TraderCardType;
  rank: number;
  onClick: (trader: TraderCardType) => void;
}

export function TraderCard({ trader, rank, onClick }: TraderCardProps) {
  return (
    <tr
      onClick={() => onClick(trader)}
      className={`cursor-pointer border-b border-surface-border/60 transition-colors hover:bg-surface-hover ${
        rank <= 3 ? 'bg-accent-green/[0.02]' : ''
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(trader);
        }
      }}
    >
      <td className="px-5 py-4 text-[14px]">
        {rank <= 3 ? (
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold ${
              rank === 1
                ? 'bg-yellow-500/12 text-yellow-400'
                : rank === 2
                  ? 'bg-gray-400/12 text-gray-300'
                  : 'bg-amber-700/12 text-amber-500'
            }`}
          >
            {rank}
          </span>
        ) : (
          <span className="text-secondary">{rank}</span>
        )}
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={trader.image}
            alt={trader.name}
            className="h-8 w-8 rounded-full ring-1 ring-surface-border"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-primary">{trader.name}</p>
            <p className="text-[12px] text-secondary">{trader.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 text-right font-mono text-[14px] font-medium text-primary">
        ${trader.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </td>
      <td className="px-5 py-4">
        <div className="mx-auto w-20">
          <Sparkline data={trader.sparklineData} width={80} height={28} positive={trader.roi >= 0} />
        </div>
      </td>
      <td
        className={`px-5 py-4 text-right font-mono text-[14px] font-semibold ${
          trader.roi >= 0 ? 'text-bullish' : 'text-bearish'
        }`}
      >
        {formatPercent(trader.roi)}
      </td>
      <td
        className={`px-5 py-4 text-right font-mono text-[14px] font-semibold ${
          trader.pnl >= 0 ? 'text-bullish' : 'text-bearish'
        }`}
      >
        {formatCurrency(trader.pnl)}
      </td>
      <td className="px-5 py-4 text-right font-mono text-[14px] text-primary">
        {formatVolume(trader.volume)}
      </td>
    </tr>
  );
}
