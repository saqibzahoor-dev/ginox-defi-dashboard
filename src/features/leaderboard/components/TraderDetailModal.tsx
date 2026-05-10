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
      <div className="mb-5 flex items-center gap-3">
        <img src={trader.image} alt={trader.name} className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-white">{trader.name}</h3>
            <span className="text-[12px] text-secondary">{trader.symbol}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-mono text-[11px] text-secondary">{trader.address}</span>
            <button
              onClick={() => copy(trader.address)}
              className="text-[10px] font-medium text-accent-green transition-colors hover:text-accent-green/80"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-lg border border-surface-border bg-page p-3">
        <Sparkline
          data={trader.sparklineData}
          width={540}
          height={100}
          positive={trader.roi >= 0}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="rounded-lg border border-surface-border bg-page px-3 py-2.5">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">{label}</p>
            <p
              className={`font-mono text-[13px] font-semibold ${
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
