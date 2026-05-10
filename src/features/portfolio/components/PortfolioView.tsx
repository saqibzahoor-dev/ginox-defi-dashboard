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
      <GlassCard className="py-8 text-center">
        <p className="mb-1 text-sm font-medium text-white">Portfolio</p>
        <p className="mb-4 text-[12px] text-secondary">
          Connect your wallet to view holdings
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      <GlassCard>
        <h2 className="mb-4 text-[14px] font-semibold text-white">Portfolio</h2>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-surface-border bg-page px-2.5 py-2">
            <p className="mb-0.5 text-[9px] font-medium uppercase tracking-wider text-secondary">Total Value</p>
            <p className="font-mono text-[14px] font-semibold text-white">
              {formatCurrency(summary.totalValue)}
            </p>
          </div>
          <div className="rounded-lg border border-surface-border bg-page px-2.5 py-2">
            <p className="mb-0.5 text-[9px] font-medium uppercase tracking-wider text-secondary">Total P&L</p>
            <p className={`font-mono text-[14px] font-semibold ${summary.totalPnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatCurrency(summary.totalPnl)}
            </p>
          </div>
          <div className="rounded-lg border border-surface-border bg-page px-2.5 py-2">
            <p className="mb-0.5 text-[9px] font-medium uppercase tracking-wider text-secondary">P&L %</p>
            <p className={`font-mono text-[14px] font-semibold ${summary.totalPnlPercent >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatPercent(summary.totalPnlPercent)}
            </p>
          </div>
        </div>

        <AllocationChart data={allocations} />
      </GlassCard>

      <GlassCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">Holdings</h2>
          <span className="text-[11px] text-secondary">
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

        <div className="mt-3">
          <AddTokenForm onAdd={addManualToken} />
        </div>
      </GlassCard>
    </div>
  );
}
