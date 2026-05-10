import { formatCurrency, formatPercent } from '@/shared/utils/format';
import type { PortfolioToken } from '@/shared/types';

interface TokenRowProps {
  token: PortfolioToken;
  onRemove?: (address: string) => void;
}

export function TokenRow({ token, onRemove }: TokenRowProps) {
  const value = token.balance * token.currentPrice;
  const costBasis = token.balance * token.entryPrice;
  const pnl = value - costBasis;
  const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

  return (
    <div className="group flex items-center gap-3 rounded px-3 py-2.5 transition-colors hover:bg-surface-hover">
      <div className="flex h-7 w-7 items-center justify-center rounded bg-accent-green/[0.08]">
        <span className="text-[10px] font-bold text-accent-green">{token.symbol.charAt(0)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[12px] font-medium text-white">{token.symbol}</p>
          {token.isManual && (
            <span className="text-[9px] text-secondary">manual</span>
          )}
        </div>
        <p className="font-mono text-[10px] text-secondary">
          {token.balance.toFixed(4)}
        </p>
      </div>

      <div className="text-right">
        <p className="font-mono text-[12px] font-medium text-white">{formatCurrency(value)}</p>
        <p className={`font-mono text-[10px] ${pnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
          {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)} ({formatPercent(pnlPercent)})
        </p>
      </div>

      {token.isManual && onRemove && (
        <button
          onClick={() => onRemove(token.address)}
          className="ml-0.5 flex h-5 w-5 items-center justify-center rounded text-secondary opacity-0 transition-all hover:text-bearish group-hover:opacity-100"
          aria-label={`Remove ${token.symbol}`}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
