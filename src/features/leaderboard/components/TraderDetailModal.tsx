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
        <img src={trader.image} alt={trader.name} className="h-12 w-12 rounded-full ring-2 ring-surface-border" />
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="font-display text-[16px] font-semibold text-primary">{trader.name}</h3>
            <span className="rounded-md bg-surface-elevated px-2 py-0.5 text-[12px] font-medium text-secondary">{trader.symbol}</span>
          </div>
          <div className="mt-1 flex items-center gap-2.5">
            <span className="font-mono text-[12px] text-tertiary">{trader.address}</span>
            <button
              onClick={() => copy(trader.address)}
              className="text-[11px] font-semibold text-accent-green transition-colors hover:text-accent-green/80"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-surface-border bg-surface-elevated p-4">
        <Sparkline
          data={trader.sparklineData}
          width={540}
          height={100}
          positive={trader.roi >= 0}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-surface-border bg-surface-elevated px-4 py-3.5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-tertiary">{label}</p>
            <p
              className={`font-mono text-[14px] font-semibold ${
                color === null ? 'text-primary' : color ? 'text-bullish' : 'text-bearish'
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
