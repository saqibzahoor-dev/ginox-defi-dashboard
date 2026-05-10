import { GlassCard } from '@/shared/components';
import { formatCurrency, formatPercent, formatVolume } from '@/shared/utils/format';
import { Sparkline } from './Sparkline';
import type { TraderCard as TraderCardType } from '@/shared/types';

interface TraderCardProps {
  trader: TraderCardType;
  onClick: (trader: TraderCardType) => void;
}

export function TraderCard({ trader, onClick }: TraderCardProps) {
  return (
    <GlassCard
      hoverable
      className="animate-fade-in"
      onClick={() => onClick(trader)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(trader);
        }
      }}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <img
          src={trader.image}
          alt={trader.name}
          className="h-9 w-9 rounded-xl ring-1 ring-white/[0.06]"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">{trader.name}</p>
          <p className="text-[11px] text-secondary">{trader.symbol}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[14px] font-bold text-white">
            ${trader.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="mb-3.5 overflow-hidden rounded-lg bg-white/[0.02] p-2">
        <Sparkline
          data={trader.sparklineData}
          width={260}
          height={44}
          positive={trader.roi >= 0}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-secondary">ROI</p>
          <p className={`font-mono text-[13px] font-bold ${trader.roi >= 0 ? 'text-bullish' : 'text-bearish'}`}>
            {trader.roi >= 0 ? '+' : ''}{formatPercent(trader.roi)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-secondary">PNL</p>
          <p className={`font-mono text-[13px] font-bold ${trader.pnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
            {formatCurrency(trader.pnl)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-secondary">Win Rate</p>
          <p className="font-mono text-[13px] font-bold text-white">{trader.winRate}%</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-secondary">Volume</p>
          <p className="font-mono text-[13px] font-bold text-white">{formatVolume(trader.volume)}</p>
        </div>
      </div>
    </GlassCard>
  );
}
