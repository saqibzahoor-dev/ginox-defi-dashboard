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
      className={`cursor-pointer border-b border-surface-border/50 transition-colors hover:bg-surface-hover ${
        rank <= 3 ? 'bg-[rgba(255,183,77,0.03)]' : ''
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
      <td className="px-4 py-3 text-[13px]">
        {rank <= 3 ? (
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded text-[11px] font-bold ${
              rank === 1
                ? 'bg-yellow-500/10 text-yellow-400'
                : rank === 2
                  ? 'bg-gray-400/10 text-gray-300'
                  : 'bg-amber-700/10 text-amber-500'
            }`}
          >
            {rank}
          </span>
        ) : (
          <span className="text-secondary">{rank}</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img
            src={trader.image}
            alt={trader.name}
            className="h-7 w-7 rounded-full"
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-white">{trader.name}</p>
            <p className="text-[11px] text-secondary">{trader.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-right font-mono text-[13px] text-white">
        ${trader.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </td>
      <td className="px-4 py-3">
        <div className="mx-auto w-20">
          <Sparkline data={trader.sparklineData} width={80} height={24} positive={trader.roi >= 0} />
        </div>
      </td>
      <td
        className={`px-4 py-3 text-right font-mono text-[13px] font-medium ${
          trader.roi >= 0 ? 'text-bullish' : 'text-bearish'
        }`}
      >
        {formatPercent(trader.roi)}
      </td>
      <td
        className={`px-4 py-3 text-right font-mono text-[13px] font-medium ${
          trader.pnl >= 0 ? 'text-bullish' : 'text-bearish'
        }`}
      >
        {formatCurrency(trader.pnl)}
      </td>
      <td className="px-4 py-3 text-right font-mono text-[13px] text-white">
        {formatVolume(trader.volume)}
      </td>
    </tr>
  );
}
