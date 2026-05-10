import { Modal } from '@/shared/components';
import { useClipboard } from '@/shared/hooks/useClipboard';
import { formatCurrency, formatPercent, formatVolume } from '@/shared/utils/format';
import { Sparkline } from './Sparkline';
import type { TraderCard } from '@/shared/types';

interface TraderDetailModalProps {
  trader: TraderCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TraderDetailModal({ trader, isOpen, onClose }: TraderDetailModalProps) {
  const { copied, copy } = useClipboard();

  if (!trader) return null;

  const stats = [
    { label: 'ROI', value: formatPercent(trader.roi), color: trader.roi >= 0 },
    { label: 'PNL', value: formatCurrency(trader.pnl), color: trader.pnl >= 0 },
    { label: 'Win Rate', value: `${trader.winRate}%`, color: null },
    { label: 'Max Drawdown', value: formatPercent(trader.maxDrawdown), color: false },
    { label: '24h Volume', value: formatVolume(trader.volume), color: null },
    { label: 'Market Cap', value: formatCurrency(trader.marketCap), color: null },
    { label: 'Current Price', value: `$${trader.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 6 })}`, color: null },
    { label: '7d Change', value: formatPercent(trader.priceChange7d), color: trader.priceChange7d >= 0 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={trader.name}>
      <div className="mb-6 flex items-center gap-4">
        <img src={trader.image} alt={trader.name} className="h-12 w-12 rounded-2xl ring-1 ring-white/[0.06]" />
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-semibold text-white">{trader.name}</h3>
            <span className="rounded-md bg-white/[0.04] px-1.5 py-[2px] text-[11px] font-medium text-secondary">
              {trader.symbol}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-mono text-[11px] text-secondary">{trader.address}</span>
            <button
              onClick={() => copy(trader.address)}
              className="rounded bg-white/[0.04] px-1.5 py-[1px] text-[10px] font-medium text-accent-green transition-colors hover:bg-white/[0.08]"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
        <Sparkline
          data={trader.sparklineData}
          width={540}
          height={120}
          positive={trader.roi >= 0}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3.5 py-3">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-secondary">{label}</p>
            <p
              className={`font-mono text-[14px] font-bold ${
                color === null ? 'text-white' : color ? 'text-bullish' : 'text-bearish'
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
