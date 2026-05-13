import { GlassCard } from '@/shared/components';
import { formatCurrency, formatPercent } from '@/shared/utils/format';
import { usePortfolio } from '../hooks/usePortfolio';
import { AllocationChart } from './AllocationChart';
import { TokenRow } from './TokenRow';
import { AddTokenForm } from './AddTokenForm';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function PortfolioView() {
  const {
    isConnected,
    allTokens,
    summary,
    allocations,
    addManualToken,
    removeManualToken,
  } = usePortfolio();

  if (!isConnected) {
    return (
      <GlassCard className="py-10 text-center">
        <p className="mb-1.5 font-display text-[15px] font-semibold text-primary">Portfolio</p>
        <p className="mb-6 text-[13px] leading-relaxed text-secondary">
          Connect your wallet to view holdings
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-5">
      <GlassCard>
        <h2 className="mb-5 font-display text-[15px] font-semibold text-primary">Portfolio</h2>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-surface-border bg-surface-elevated px-3.5 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-tertiary">
              Total Value
            </p>
            <p className="font-mono text-[15px] font-semibold text-primary">
              {formatCurrency(summary.totalValue)}
            </p>
          </div>
          <div className="rounded-xl border border-surface-border bg-surface-elevated px-3.5 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-tertiary">
              Total P&L
            </p>
            <p className={`font-mono text-[15px] font-semibold ${summary.totalPnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatCurrency(summary.totalPnl)}
            </p>
          </div>
          <div className="rounded-xl border border-surface-border bg-surface-elevated px-3.5 py-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-tertiary">
              P&L %
            </p>
            <p className={`font-mono text-[15px] font-semibold ${summary.totalPnlPercent >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatPercent(summary.totalPnlPercent)}
            </p>
          </div>
        </div>

        <AllocationChart data={allocations} />
      </GlassCard>

      <GlassCard>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-primary">Holdings</h2>
          <span className="rounded-md bg-surface-elevated px-2 py-0.5 text-[12px] font-medium text-secondary">
            {allTokens.length} tokens
          </span>
        </div>

        <div className="space-y-1">
          {allTokens.map((token) => (
            <TokenRow
              key={token.address}
              token={token}
              onRemove={token.isManual ? removeManualToken : undefined}
            />
          ))}
        </div>

        <div className="mt-4">
          <AddTokenForm onAdd={addManualToken} />
        </div>
      </GlassCard>
    </div>
  );
}
