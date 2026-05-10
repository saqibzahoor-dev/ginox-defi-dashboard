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
    <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/[0.015] px-3.5 py-3 transition-all hover:border-white/[0.04] hover:bg-white/[0.03]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green/[0.08]">
        <span className="text-[11px] font-bold text-accent-green">{token.symbol.charAt(0)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] font-semibold text-white">{token.symbol}</p>
          {token.isManual && (
            <span className="rounded bg-white/[0.04] px-1 py-[1px] text-[9px] font-medium uppercase tracking-wider text-secondary">
              Manual
            </span>
          )}
        </div>
        <p className="font-mono text-[11px] text-secondary">
          {token.balance.toFixed(4)} tokens
        </p>
      </div>

      <div className="text-right">
        <p className="font-mono text-[13px] font-semibold text-white">{formatCurrency(value)}</p>
        <p className={`font-mono text-[11px] font-medium ${pnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
          {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)} ({formatPercent(pnlPercent)})
        </p>
      </div>

      {token.isManual && onRemove && (
        <button
          onClick={() => onRemove(token.address)}
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-secondary opacity-0 transition-all hover:bg-bearish/[0.08] hover:text-bearish group-hover:opacity-100"
          aria-label={`Remove ${token.symbol}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
